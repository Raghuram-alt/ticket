package com.helpdesk.router.routing;

import com.helpdesk.router.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * RoutingAgent acts as the primary coordinator/mediator for the routing pipeline.
 * Coordinates:
 * Ticket -> RuleEngine -> PythonClassifierClient -> Combine Results -> TicketRouter -> RoutingResult
 */
@Service
public class RoutingAgent {

    private static final Logger log = LoggerFactory.getLogger(RoutingAgent.class);

    private final RuleEngine ruleEngine;
    private final PythonClassifierClient classifierClient;
    private final TicketRouter ticketRouter;

    public RoutingAgent(RuleEngine ruleEngine, PythonClassifierClient classifierClient, TicketRouter ticketRouter) {
        this.ruleEngine = ruleEngine;
        this.classifierClient = classifierClient;
        this.ticketRouter = ticketRouter;
    }

    public RoutingResult processTicket(Ticket ticket, CustomerHistory history) {
        log.info("RoutingAgent: processing ticket [{}] - '{}'", ticket.getTicketId(), ticket.getSubject());
        RoutingResult result = new RoutingResult();
        result.setTicketId(ticket.getTicketId());

        // Step 1: Rule Engine analysis
        RuleEngine.RuleAnalysisResult ruleAnalysis = ruleEngine.analyze(ticket, history);
        result.setRuleCategory(ruleAnalysis.getSuggestedCategory());
        result.setRuleScore(ruleAnalysis.getRuleScore());
        result.setPriority(ruleAnalysis.getDetectedPriority());
        result.setDetectedKeywords(ruleAnalysis.getMatchedKeywords());

        // Step 2: Python NLP Classifier invocation
        String fullText = ticket.getCombinedText();
        PythonClassifierClient.ClassifierResponse aiResponse = classifierClient.classify(fullText);
        result.setAiCategory(aiResponse.getCategory());
        result.setAiConfidence(aiResponse.getConfidence());

        // Step 3: Combine Rule Engine + Python AI + Customer History
        TicketCategory finalCategory;
        double finalConfidence;
        List<String> bullets = new ArrayList<>();

        // Add keyword bullets
        for (String kw : ruleAnalysis.getMatchedKeywords()) {
            bullets.add("✓ Keyword '" + kw + "' detected in ticket text");
        }

        // Add AI prediction bullet
        bullets.add("✓ Python text classifier predicted " + aiResponse.getCategory() +
                " (" + (int)(aiResponse.getConfidence() * 100) + "% confidence)");

        // Add Customer History bullet if relevant
        if (history != null && history.getTotalTickets() > 0) {
            if (aiResponse.getCategory() == TicketCategory.BILLING && history.getBillingTickets() > 0) {
                bullets.add("✓ Customer has " + history.getBillingTickets() + " previous billing ticket(s)");
            } else if (aiResponse.getCategory() == TicketCategory.TECHNICAL && history.getTechnicalTickets() > 0) {
                bullets.add("✓ Customer has " + history.getTechnicalTickets() + " previous technical ticket(s)");
            }
        }

        // Combining Decision Logic
        if (aiResponse.getConfidence() >= ticketRouter.getConfidenceThreshold()) {
            // High confidence AI
            if (ruleAnalysis.getSuggestedCategory() == aiResponse.getCategory() || ruleAnalysis.getRuleScore() < 0.60) {
                // Agreement or non-conflicting rule
                finalCategory = aiResponse.getCategory();
                // Slight boost if both agree
                if (ruleAnalysis.getSuggestedCategory() == aiResponse.getCategory() && !ruleAnalysis.getMatchedKeywords().isEmpty()) {
                    finalConfidence = Math.min(0.98, aiResponse.getConfidence() + 0.02);
                    bullets.add("✓ Rule engine and AI classifier in unanimous agreement");
                } else {
                    finalConfidence = aiResponse.getConfidence();
                }
            } else {
                // Conflict between strong rule and high AI confidence
                log.warn("Conflict detected between Rule Engine ({}) and AI ({})", ruleAnalysis.getSuggestedCategory(), aiResponse.getCategory());
                finalCategory = aiResponse.getCategory();
                finalConfidence = 0.72; // Dampen confidence to trigger review
                bullets.add("⚠ Conflicting signals between rules (" + ruleAnalysis.getSuggestedCategory() + ") and AI (" + aiResponse.getCategory() + ")");
            }
        } else {
            // Low confidence AI (< 0.80)
            if (ruleAnalysis.getRuleScore() >= 0.85) {
                // Strong rule evidence overrides weak AI
                finalCategory = ruleAnalysis.getSuggestedCategory();
                finalConfidence = ruleAnalysis.getRuleScore();
                bullets.add("✓ Strong rule-based evidence took precedence over ambiguous AI score");
            } else {
                // Ambiguous ticket, low AI confidence
                finalCategory = aiResponse.getCategory();
                finalConfidence = aiResponse.getConfidence();
                bullets.add("⚠ Insufficient category-specific evidence (confidence " + (int)(finalConfidence * 100) + "% < " + (int)(ticketRouter.getConfidenceThreshold() * 100) + "%)");
            }
        }

        result.setFinalCategory(finalCategory);
        result.setFinalConfidence(Math.round(finalConfidence * 100.0) / 100.0);
        result.setExplanationBullets(bullets);

        // Step 4: Team Assignment via TicketRouter
        TicketRouter.RoutingAssignment assignment = ticketRouter.determineAssignment(
                finalCategory,
                result.getFinalConfidence(),
                aiResponse.isFallbackUsed()
        );

        result.setAssignedTeam(assignment.getAssignedTeam());
        result.setAutoRouted(assignment.isAutoRouted());
        result.setRoutingMethod(assignment.getRoutingMethod());
        result.setSummaryReason(assignment.getDecisionSummary());
        result.setRoutedAt(LocalDateTime.now());

        // Step 5: Update the Ticket entity with routing outcomes
        ticket.setCategory(result.getFinalCategory());
        ticket.setConfidence(result.getFinalConfidence());
        ticket.setPriority(result.getPriority());
        ticket.setAssignedTeam(result.getAssignedTeam());
        ticket.setRoutingMethod(result.getRoutingMethod());
        ticket.setRoutingReason(result.getSummaryReason());
        ticket.setDetectedKeywords(result.getDetectedKeywords());
        ticket.setRoutingResult(result);
        ticket.setStatus(result.isAutoRouted() ? TicketStatus.ROUTED : TicketStatus.MANUAL_REVIEW);

        return result;
    }
}
