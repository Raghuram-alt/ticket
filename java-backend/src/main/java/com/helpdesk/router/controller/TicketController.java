package com.helpdesk.router.controller;

import com.helpdesk.router.model.Priority;
import com.helpdesk.router.model.Ticket;
import com.helpdesk.router.model.TicketCategory;
import com.helpdesk.router.model.TicketStatus;
import com.helpdesk.router.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST API Controller for Support Tickets.
 */
@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable String id) {
        return ticketService.getTicketById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public static class CreateTicketRequest {
        public String customerName;
        public String email;
        public String subject;
        public String description;
        public String priority;
    }

    @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody CreateTicketRequest req) {
        if (req.subject == null || req.subject.trim().isEmpty() ||
            req.description == null || req.description.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Subject and description are required."));
        }

        Priority p = req.priority != null ? Priority.fromString(req.priority) : null;
        Ticket ticket = ticketService.createAndRouteTicket(
                req.customerName != null ? req.customerName : "Anonymous User",
                req.email != null ? req.email : "user@example.com",
                req.subject,
                req.description,
                p
        );
        return ResponseEntity.ok(ticket);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String statusStr = body.get("status");
        if (statusStr == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "status field is required"));
        }
        TicketStatus status = TicketStatus.fromString(statusStr);
        Ticket updated = ticketService.updateTicketStatus(id, status);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/manual-assign")
    public ResponseEntity<?> manualAssign(@PathVariable String id, @RequestBody Map<String, String> body) {
        String catStr = body.get("category");
        String team = body.get("team");
        if (catStr == null || team == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "category and team fields are required"));
        }
        TicketCategory category = TicketCategory.fromString(catStr);
        Ticket updated = ticketService.manuallyAssignTeam(id, category, team);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/demo-load")
    public ResponseEntity<?> loadDemoTickets() {
        ticketService.loadSampleTickets();
        return ResponseEntity.ok(Map.of("message", "Demo tickets reloaded successfully.", "count", ticketService.getAllTickets().size()));
    }
}
