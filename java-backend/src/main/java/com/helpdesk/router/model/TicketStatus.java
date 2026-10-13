package com.helpdesk.router.model;

/**
 * Lifecycle status of a Support Ticket.
 */
public enum TicketStatus {
    NEW,
    ANALYZING,
    ROUTED,
    IN_PROGRESS,
    WAITING_FOR_CUSTOMER,
    RESOLVED,
    MANUAL_REVIEW;

    public static TicketStatus fromString(String text) {
        if (text == null) return NEW;
        for (TicketStatus s : TicketStatus.values()) {
            if (s.name().equalsIgnoreCase(text.trim())) {
                return s;
            }
        }
        return NEW;
    }
}
