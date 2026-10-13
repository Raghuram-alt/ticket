package com.helpdesk.router.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Encapsulates the historical support context of a customer.
 * Used by RuleEngine to support classification of ambiguous tickets.
 */
public class CustomerHistory {
    private String customerId;
    private int totalTickets;
    private int billingTickets;
    private int technicalTickets;
    private int otherTickets;
    private List<String> previousSubjects;

    public CustomerHistory() {
        this.previousSubjects = new ArrayList<>();
    }

    public CustomerHistory(String customerId, int totalTickets, int billingTickets, int technicalTickets, int otherTickets) {
        this.customerId = customerId;
        this.totalTickets = totalTickets;
        this.billingTickets = billingTickets;
        this.technicalTickets = technicalTickets;
        this.otherTickets = otherTickets;
        this.previousSubjects = new ArrayList<>();
    }

    public TicketCategory getDominantCategory() {
        if (totalTickets == 0) return TicketCategory.OTHER;
        if (billingTickets > technicalTickets && billingTickets > otherTickets) {
            return TicketCategory.BILLING;
        } else if (technicalTickets > billingTickets && technicalTickets > otherTickets) {
            return TicketCategory.TECHNICAL;
        }
        return TicketCategory.OTHER;
    }

    public double getCategoryRatio(TicketCategory category) {
        if (totalTickets == 0) return 0.0;
        switch (category) {
            case BILLING: return (double) billingTickets / totalTickets;
            case TECHNICAL: return (double) technicalTickets / totalTickets;
            case OTHER: return (double) otherTickets / totalTickets;
            default: return 0.0;
        }
    }

    public void addHistoricalSubject(String subject) {
        this.previousSubjects.add(subject);
    }

    // Getters and Setters
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public int getTotalTickets() { return totalTickets; }
    public void setTotalTickets(int totalTickets) { this.totalTickets = totalTickets; }

    public int getBillingTickets() { return billingTickets; }
    public void setBillingTickets(int billingTickets) { this.billingTickets = billingTickets; }

    public int getTechnicalTickets() { return technicalTickets; }
    public void setTechnicalTickets(int technicalTickets) { this.technicalTickets = technicalTickets; }

    public int getOtherTickets() { return otherTickets; }
    public void setOtherTickets(int otherTickets) { this.otherTickets = otherTickets; }

    public List<String> getPreviousSubjects() { return previousSubjects; }
    public void setPreviousSubjects(List<String> previousSubjects) { this.previousSubjects = previousSubjects; }
}
