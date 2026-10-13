package com.helpdesk.router.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Encapsulates the complete routing outcome, combining rule engine,
 * Python classifier, customer history, confidence check, and explanation logs.
 */
public class RoutingResult {
    private String ticketId;
    private TicketCategory ruleCategory;
    private double ruleScore;
    private TicketCategory aiCategory;
    private double aiConfidence;
    private TicketCategory finalCategory;
    private double finalConfidence;
    private Priority priority;
    private String assignedTeam;
    private boolean autoRouted;
    private String routingMethod;
    private List<String> detectedKeywords;
    private List<String> explanationBullets;
    private String summaryReason;
    private LocalDateTime routedAt;

    public RoutingResult() {
        this.detectedKeywords = new ArrayList<>();
        this.explanationBullets = new ArrayList<>();
        this.routedAt = LocalDateTime.now();
    }

    public void addExplanation(String bullet) {
        this.explanationBullets.add(bullet);
    }

    // Getters and Setters
    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }

    public TicketCategory getRuleCategory() { return ruleCategory; }
    public void setRuleCategory(TicketCategory ruleCategory) { this.ruleCategory = ruleCategory; }

    public double getRuleScore() { return ruleScore; }
    public void setRuleScore(double ruleScore) { this.ruleScore = ruleScore; }

    public TicketCategory getAiCategory() { return aiCategory; }
    public void setAiCategory(TicketCategory aiCategory) { this.aiCategory = aiCategory; }

    public double getAiConfidence() { return aiConfidence; }
    public void setAiConfidence(double aiConfidence) { this.aiConfidence = aiConfidence; }

    public TicketCategory getFinalCategory() { return finalCategory; }
    public void setFinalCategory(TicketCategory finalCategory) { this.finalCategory = finalCategory; }

    public double getFinalConfidence() { return finalConfidence; }
    public void setFinalConfidence(double finalConfidence) { this.finalConfidence = finalConfidence; }

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }

    public String getAssignedTeam() { return assignedTeam; }
    public void setAssignedTeam(String assignedTeam) { this.assignedTeam = assignedTeam; }

    public boolean isAutoRouted() { return autoRouted; }
    public void setAutoRouted(boolean autoRouted) { this.autoRouted = autoRouted; }

    public String getRoutingMethod() { return routingMethod; }
    public void setRoutingMethod(String routingMethod) { this.routingMethod = routingMethod; }

    public List<String> getDetectedKeywords() { return detectedKeywords; }
    public void setDetectedKeywords(List<String> detectedKeywords) { this.detectedKeywords = detectedKeywords; }

    public List<String> getExplanationBullets() { return explanationBullets; }
    public void setExplanationBullets(List<String> explanationBullets) { this.explanationBullets = explanationBullets; }

    public String getSummaryReason() { return summaryReason; }
    public void setSummaryReason(String summaryReason) { this.summaryReason = summaryReason; }

    public LocalDateTime getRoutedAt() { return routedAt; }
    public void setRoutedAt(LocalDateTime routedAt) { this.routedAt = routedAt; }
}
