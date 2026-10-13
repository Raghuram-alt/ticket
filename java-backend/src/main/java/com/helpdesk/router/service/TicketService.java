package com.helpdesk.router.service;

import com.helpdesk.router.model.*;
import com.helpdesk.router.routing.RoutingAgent;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Core Ticket management service.
 */
@Service
public class TicketService {

    private final Map<String, Ticket> ticketMap = new ConcurrentHashMap<>();
    private final AtomicInteger idCounter = new AtomicInteger(1030);
    private final RoutingAgent routingAgent;
    private final CustomerService customerService;

    public TicketService(RoutingAgent routingAgent, CustomerService customerService) {
        this.routingAgent = routingAgent;
        this.customerService = customerService;
        loadSampleTickets();
    }

    public void loadSampleTickets() {
        ticketMap.clear();

        // Ticket 1: High confidence Billing
        createPreloadedTicket(
                "TK-1025", "CUST-103", "John Smith", "jsmith@globallogistics.com",
                "Duplicate subscription payment",
                "I was charged twice this month for my monthly subscription. Please refund the duplicate transaction.",
                TicketCategory.BILLING, Priority.HIGH, 0.94, "Billing Support", TicketStatus.IN_PROGRESS,
                "AI + Rule Engine", "Detected payment and subscription-related keywords and confirmed by text classifier (94% confidence).",
                Arrays.asList("charged", "payment", "subscription", "refund", "transaction")
        );

        // Ticket 2: High confidence Technical
        createPreloadedTicket(
                "TK-1026", "CUST-102", "Sarah Chen", "sarah.c@techflow.io",
                "Dashboard crashing on analytics export",
                "The dashboard crashes whenever I try to open analytics and export CSV data. 500 error in console.",
                TicketCategory.TECHNICAL, Priority.HIGH, 0.97, "Technical Support", TicketStatus.NEW,
                "AI + Rule Engine", "Detected technical failure keywords: crash, error, console. AI text classifier predicted TECHNICAL with 97% confidence.",
                Arrays.asList("crashes", "error", "console", "dashboard")
        );

        // Ticket 3: General Support Other
        createPreloadedTicket(
                "TK-1027", "CUST-104", "Elena Rostova", "elena@novasoft.dev",
                "How to update company profile details",
                "How can I update my company profile and add a new administrator email to our account?",
                TicketCategory.OTHER, Priority.LOW, 0.91, "General Support", TicketStatus.RESOLVED,
                "AI + Rule Engine", "General account guidance request. AI text classifier predicted OTHER with 91% confidence.",
                Arrays.asList("profile", "account", "update")
        );

        // Ticket 4: Low confidence -> Manual Review
        createPreloadedTicket(
                "TK-1028", "CUST-105", "Marcus Aurelius", "marcus@stoicconsulting.org",
                "Something is wrong with my account",
                "My account is not working correctly. Things seem stuck and weird.",
                TicketCategory.OTHER, Priority.MEDIUM, 0.52, "Manual Review Team", TicketStatus.MANUAL_REVIEW,
                "Manual Review Required", "Low confidence score (52%) below 80% threshold. Ambiguous keywords require human verification.",
                Arrays.asList("account")
        );

        // Ticket 5: Billing invoice
        createPreloadedTicket(
                "TK-1029", "CUST-101", "Rahul Kumar", "rahul.kumar@acme-corp.com",
                "Wire transfer invoice missing tax ID",
                "Please provide an updated invoice with our European VAT registration number for the wire transfer.",
                TicketCategory.BILLING, Priority.MEDIUM, 0.92, "Billing Support", TicketStatus.WAITING_FOR_CUSTOMER,
                "AI + Rule Engine", "Confirmed billing inquiry via invoice and VAT keywords. Supported by customer billing history.",
                Arrays.asList("invoice", "vat", "wire transfer")
        );

        // Ticket 6: Critical API down
        createPreloadedTicket(
                "TK-1030", "CUST-106", "Amina Idris", "amina@saharanet.io",
                "Production API returning 503 Service Unavailable",
                "Critical incident: our production webhooks are failing with 503 Service Unavailable and entire system down!",
                TicketCategory.TECHNICAL, Priority.CRITICAL, 0.98, "Technical Support", TicketStatus.IN_PROGRESS,
                "AI + Rule Engine", "Critical priority detected (production down, 503, service unavailable). High-confidence technical classification.",
                Arrays.asList("production down", "503", "service unavailable", "api", "failing")
        );
    }

    private void createPreloadedTicket(String id, String custId, String name, String email, String subject,
                                       String desc, TicketCategory cat, Priority prio, double conf,
                                       String team, TicketStatus status, String method, String reason, List<String> kws) {
        Ticket t = new Ticket(id, custId, name, email, subject, desc);
        t.setCategory(cat);
        t.setPriority(prio);
        t.setConfidence(conf);
        t.setAssignedTeam(team);
        t.setStatus(status);
        t.setRoutingMethod(method);
        t.setRoutingReason(reason);
        t.setDetectedKeywords(kws);

        RoutingResult rr = new RoutingResult();
        rr.setTicketId(id);
        rr.setFinalCategory(cat);
        rr.setFinalConfidence(conf);
        rr.setPriority(prio);
        rr.setAssignedTeam(team);
        rr.setAutoRouted(!team.equals("Manual Review Team"));
        rr.setRoutingMethod(method);
        rr.setSummaryReason(reason);
        rr.setDetectedKeywords(kws);
        rr.setRoutedAt(LocalDateTime.now().minusHours(2));
        for (String kw : kws) {
            rr.addExplanation("✓ Keyword '" + kw + "' detected");
        }
        rr.addExplanation("✓ Confirmed category: " + cat);
        t.setRoutingResult(rr);

        ticketMap.put(id, t);
    }

    public List<Ticket> getAllTickets() {
        return ticketMap.values().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public Optional<Ticket> getTicketById(String id) {
        return Optional.ofNullable(ticketMap.get(id));
    }

    public Ticket createAndRouteTicket(String customerName, String email, String subject, String description, Priority requestedPriority) {
        String ticketId = "TK-" + idCounter.incrementAndGet();
        Customer customer = customerService.findOrCreateByEmail(email, customerName);
        CustomerHistory history = customerService.getCustomerHistory(customer.getCustomerId());

        Ticket ticket = new Ticket(ticketId, customer.getCustomerId(), customer.getName(), customer.getEmail(), subject, description);
        if (requestedPriority != null) {
            ticket.setPriority(requestedPriority);
        }

        // Execute full Routing Agent pipeline
        RoutingResult result = routingAgent.processTicket(ticket, history);

        // If user explicitly specified priority, keep high/critical if requested
        if (requestedPriority != null && requestedPriority.ordinal() > ticket.getPriority().ordinal()) {
            ticket.setPriority(requestedPriority);
            result.setPriority(requestedPriority);
        }

        ticketMap.put(ticketId, ticket);
        return ticket;
    }

    public Ticket updateTicketStatus(String ticketId, TicketStatus newStatus) {
        Ticket ticket = ticketMap.get(ticketId);
        if (ticket != null) {
            ticket.updateStatus(newStatus);
        }
        return ticket;
    }

    public Ticket manuallyAssignTeam(String ticketId, TicketCategory category, String team) {
        Ticket ticket = ticketMap.get(ticketId);
        if (ticket != null) {
            ticket.setCategory(category);
            ticket.setAssignedTeam(team);
            ticket.setStatus(TicketStatus.ROUTED);
            ticket.setRoutingMethod("Manual Assignment");
            ticket.setRoutingReason("Manually assigned to " + team + " by administrator.");
            if (ticket.getRoutingResult() != null) {
                ticket.getRoutingResult().setFinalCategory(category);
                ticket.getRoutingResult().setAssignedTeam(team);
                ticket.getRoutingResult().setAutoRouted(false);
                ticket.getRoutingResult().setRoutingMethod("Manual Assignment");
                ticket.getRoutingResult().addExplanation("✓ Administrator manually assigned to " + team);
            }
        }
        return ticket;
    }
}
