package com.helpdesk.router.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Core Ticket Entity demonstrating Object-Oriented Design and Encapsulation.
 */
public class Ticket {
    private String ticketId;
    private String customerId;
    private String customerName;
    private String email;
    private String subject;
    private String description;
    private TicketCategory category;
    private Priority priority;
    private double confidence;
    private String assignedTeam;
    private TicketStatus status;
    private String routingMethod;
    private String routingReason;
    private List<String> detectedKeywords;
    private RoutingResult routingResult;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Ticket() {
        this.detectedKeywords = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = TicketStatus.NEW;
        this.priority = Priority.MEDIUM;
    }

    public Ticket(String ticketId, String customerId, String customerName, String email, String subject, String description) {
        this();
        this.ticketId = ticketId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.email = email;
        this.subject = subject;
        this.description = description;
    }

    public String getCombinedText() {
        return ((subject != null ? subject : "") + " " + (description != null ? description : "")).trim();
    }

    public void updateStatus(TicketStatus newStatus) {
        this.status = newStatus;
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TicketCategory getCategory() { return category; }
    public void setCategory(TicketCategory category) { this.category = category; }

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public String getAssignedTeam() { return assignedTeam; }
    public void setAssignedTeam(String assignedTeam) { this.assignedTeam = assignedTeam; }

    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }

    public String getRoutingMethod() { return routingMethod; }
    public void setRoutingMethod(String routingMethod) { this.routingMethod = routingMethod; }

    public String getRoutingReason() { return routingReason; }
    public void setRoutingReason(String routingReason) { this.routingReason = routingReason; }

    public List<String> getDetectedKeywords() { return detectedKeywords; }
    public void setDetectedKeywords(List<String> detectedKeywords) { this.detectedKeywords = detectedKeywords; }

    public RoutingResult getRoutingResult() { return routingResult; }
    public void setRoutingResult(RoutingResult routingResult) { this.routingResult = routingResult; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
