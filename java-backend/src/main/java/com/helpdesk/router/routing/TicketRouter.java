package com.helpdesk.router.routing;

import com.helpdesk.router.model.TicketCategory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Assigns tickets to support teams based on final category and confidence score.
 */
@Component
public class TicketRouter {

    public static final String TEAM_BILLING = "Billing Support";
    public static final String TEAM_TECHNICAL = "Technical Support";
    public static final String TEAM_GENERAL = "General Support";
    public static final String TEAM_MANUAL_REVIEW = "Manual Review Team";

    private final double confidenceThreshold;

    public TicketRouter(@Value("${routing.confidence.threshold:0.80}") double confidenceThreshold) {
        this.confidenceThreshold = confidenceThreshold;
    }

    public static class RoutingAssignment {
        private String assignedTeam;
        private boolean autoRouted;
        private String routingMethod;
        private String decisionSummary;

        public String getAssignedTeam() { return assignedTeam; }
        public void setAssignedTeam(String assignedTeam) { this.assignedTeam = assignedTeam; }
        public boolean isAutoRouted() { return autoRouted; }
        public void setAutoRouted(boolean autoRouted) { this.autoRouted = autoRouted; }
        public String getRoutingMethod() { return routingMethod; }
        public void setRoutingMethod(String routingMethod) { this.routingMethod = routingMethod; }
        public String getDecisionSummary() { return decisionSummary; }
        public void setDecisionSummary(String decisionSummary) { this.decisionSummary = decisionSummary; }
    }

    public RoutingAssignment determineAssignment(TicketCategory category, double confidence, boolean fallbackUsed) {
        RoutingAssignment assignment = new RoutingAssignment();

        if (confidence >= confidenceThreshold) {
            assignment.setAutoRouted(true);
            assignment.setRoutingMethod(fallbackUsed ? "Rule-Based Fallback" : "AI + Rule Engine");

            switch (category) {
                case BILLING:
                    assignment.setAssignedTeam(TEAM_BILLING);
                    break;
                case TECHNICAL:
                    assignment.setAssignedTeam(TEAM_TECHNICAL);
                    break;
                case OTHER:
                default:
                    assignment.setAssignedTeam(TEAM_GENERAL);
                    break;
            }
            assignment.setDecisionSummary("Automatically routed with high confidence (" + (int)(confidence * 100) + "% >= " + (int)(confidenceThreshold * 100) + "% threshold).");
        } else {
            // Low confidence -> Manual Review
            assignment.setAutoRouted(false);
            assignment.setAssignedTeam(TEAM_MANUAL_REVIEW);
            assignment.setRoutingMethod("Manual Review Required");
            assignment.setDecisionSummary("Confidence (" + (int)(confidence * 100) + "%) is below threshold (" + (int)(confidenceThreshold * 100) + "%). Routed to Manual Review Team.");
        }

        return assignment;
    }

    public double getConfidenceThreshold() {
        return confidenceThreshold;
    }
}
