package com.helpdesk.router.model;

/**
 * Extensible Ticket Category enumeration.
 */
public enum TicketCategory {
    BILLING("Billing Support"),
    TECHNICAL("Technical Support"),
    OTHER("General Support");

    private final String defaultTeam;

    TicketCategory(String defaultTeam) {
        this.defaultTeam = defaultTeam;
    }

    public String getDefaultTeam() {
        return defaultTeam;
    }

    public static TicketCategory fromString(String text) {
        if (text == null) return OTHER;
        for (TicketCategory b : TicketCategory.values()) {
            if (b.name().equalsIgnoreCase(text.trim())) {
                return b;
            }
        }
        return OTHER;
    }
}
