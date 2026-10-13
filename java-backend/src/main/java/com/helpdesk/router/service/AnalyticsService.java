package com.helpdesk.router.service;

import com.helpdesk.router.model.Priority;
import com.helpdesk.router.model.Ticket;
import com.helpdesk.router.model.TicketCategory;
import com.helpdesk.router.model.TicketStatus;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Computes dashboard analytics and real-time operational statistics.
 */
@Service
public class AnalyticsService {

    private final TicketService ticketService;

    public AnalyticsService(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    public Map<String, Object> getDashboardMetrics() {
        List<Ticket> tickets = ticketService.getAllTickets();
        int total = tickets.size();

        int billing = 0;
        int technical = 0;
        int other = 0;
        int manualReview = 0;
        int highOrCritical = 0;
        int autoRouted = 0;
        double sumConfidence = 0.0;

        Map<String, Integer> byCategory = new LinkedHashMap<>();
        byCategory.put("BILLING", 0);
        byCategory.put("TECHNICAL", 0);
        byCategory.put("OTHER", 0);

        Map<String, Integer> byPriority = new LinkedHashMap<>();
        for (Priority p : Priority.values()) {
            byPriority.put(p.name(), 0);
        }

        Map<String, Integer> byStatus = new LinkedHashMap<>();
        for (TicketStatus s : TicketStatus.values()) {
            byStatus.put(s.name(), 0);
        }

        Map<String, Integer> byTeam = new LinkedHashMap<>();
        byTeam.put("Billing Support", 0);
        byTeam.put("Technical Support", 0);
        byTeam.put("General Support", 0);
        byTeam.put("Manual Review Team", 0);

        for (Ticket t : tickets) {
            if (t.getCategory() == TicketCategory.BILLING) billing++;
            else if (t.getCategory() == TicketCategory.TECHNICAL) technical++;
            else other++;

            if (t.getCategory() != null) {
                byCategory.put(t.getCategory().name(), byCategory.getOrDefault(t.getCategory().name(), 0) + 1);
            }

            if (t.getPriority() == Priority.HIGH || t.getPriority() == Priority.CRITICAL) {
                highOrCritical++;
            }
            if (t.getPriority() != null) {
                byPriority.put(t.getPriority().name(), byPriority.getOrDefault(t.getPriority().name(), 0) + 1);
            }

            if (t.getStatus() != null) {
                byStatus.put(t.getStatus().name(), byStatus.getOrDefault(t.getStatus().name(), 0) + 1);
            }

            if (t.getAssignedTeam() != null) {
                byTeam.put(t.getAssignedTeam(), byTeam.getOrDefault(t.getAssignedTeam(), 0) + 1);
            }

            if ("Manual Review Team".equalsIgnoreCase(t.getAssignedTeam()) || t.getStatus() == TicketStatus.MANUAL_REVIEW) {
                manualReview++;
            } else {
                autoRouted++;
            }

            sumConfidence += t.getConfidence();
        }

        double avgConfidence = total > 0 ? (sumConfidence / total) : 0.0;
        double autoRoutedPct = total > 0 ? ((double) autoRouted / total) * 100.0 : 0.0;
        double manualReviewPct = total > 0 ? ((double) manualReview / total) * 100.0 : 0.0;

        Map<String, Object> metrics = new LinkedHashMap<>();
        metrics.put("totalTickets", total);
        metrics.put("billingTickets", billing);
        metrics.put("technicalTickets", technical);
        metrics.put("otherTickets", other);
        metrics.put("manualReviewTickets", manualReview);
        metrics.put("highOrCriticalTickets", highOrCritical);
        metrics.put("autoRoutedTickets", autoRouted);
        metrics.put("averageConfidence", Math.round(avgConfidence * 100.0) / 100.0);
        metrics.put("autoRoutedPercentage", Math.round(autoRoutedPct * 10.0) / 10.0);
        metrics.put("manualReviewPercentage", Math.round(manualReviewPct * 10.0) / 10.0);
        metrics.put("byCategory", byCategory);
        metrics.put("byPriority", byPriority);
        metrics.put("byStatus", byStatus);
        metrics.put("byTeam", byTeam);

        return metrics;
    }
}
