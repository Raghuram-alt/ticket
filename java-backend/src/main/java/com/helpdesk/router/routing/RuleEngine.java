package com.helpdesk.router.routing;

import com.helpdesk.router.model.CustomerHistory;
import com.helpdesk.router.model.Priority;
import com.helpdesk.router.model.Ticket;
import com.helpdesk.router.model.TicketCategory;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Rule-based engine analyzing:
 * - Subject and description text
 * - Billing and Technical domain keywords
 * - Priority indicators (Critical, High, Medium, Low)
 * - Customer historical ticket affinity
 */
@Component
public class RuleEngine {

    private final Set<String> billingKeywords = new LinkedHashSet<>(Arrays.asList(
            "payment", "invoice", "refund", "charged", "charge", "subscription",
            "billing", "credit card", "transaction", "receipt", "deducted",
            "overcharged", "renewal", "vat", "stripe", "paypal", "wire transfer"
    ));

    private final Set<String> technicalKeywords = new LinkedHashSet<>(Arrays.asList(
            "error", "bug", "crash", "crashes", "crashing", "login", "api",
            "server", "website", "dashboard", "not loading", "failure",
            "exception", "timeout", "500", "502", "503", "404", "database",
            "stacktrace", "unresponsive", "corrupted", "slow query"
    ));

    private final Set<String> otherKeywords = new LinkedHashSet<>(Arrays.asList(
            "profile", "question", "account", "information", "product", "demo",
            "roadmap", "compliance", "soc2", "general", "training", "hours"
    ));

    public static class RuleAnalysisResult {
        private TicketCategory suggestedCategory;
        private double ruleScore;
        private Priority detectedPriority;
        private List<String> matchedKeywords = new ArrayList<>();
        private String ruleReason;

        public TicketCategory getSuggestedCategory() { return suggestedCategory; }
        public void setSuggestedCategory(TicketCategory suggestedCategory) { this.suggestedCategory = suggestedCategory; }
        public double getRuleScore() { return ruleScore; }
        public void setRuleScore(double ruleScore) { this.ruleScore = ruleScore; }
        public Priority getDetectedPriority() { return detectedPriority; }
        public void setDetectedPriority(Priority detectedPriority) { this.detectedPriority = detectedPriority; }
        public List<String> getMatchedKeywords() { return matchedKeywords; }
        public void setMatchedKeywords(List<String> matchedKeywords) { this.matchedKeywords = matchedKeywords; }
        public String getRuleReason() { return ruleReason; }
        public void setRuleReason(String ruleReason) { this.ruleReason = ruleReason; }
    }

    public RuleAnalysisResult analyze(Ticket ticket, CustomerHistory history) {
        RuleAnalysisResult result = new RuleAnalysisResult();
        String fullText = ticket.getCombinedText().toLowerCase();

        // 1. Detect Keywords
        List<String> matchedBilling = findKeywords(fullText, billingKeywords);
        List<String> matchedTechnical = findKeywords(fullText, technicalKeywords);
        List<String> matchedOther = findKeywords(fullText, otherKeywords);

        List<String> allMatched = new ArrayList<>();
        allMatched.addAll(matchedBilling);
        allMatched.addAll(matchedTechnical);
        allMatched.addAll(matchedOther);
        result.setMatchedKeywords(allMatched);

        // 2. Detect Priority
        Priority priority = detectPriority(fullText);
        result.setDetectedPriority(priority);

        // 3. Category Scoring
        int billingScore = matchedBilling.size() * 3;
        int technicalScore = matchedTechnical.size() * 3;
        int otherScore = matchedOther.size() * 2;

        // Factor in customer history as supportive context (does not override strong evidence)
        if (history != null && history.getTotalTickets() > 0) {
            if (billingScore == 0 && technicalScore == 0) {
                // Ambiguous ticket: use history affinity
                if (history.getDominantCategory() == TicketCategory.BILLING && history.getBillingTickets() >= 2) {
                    billingScore += 1;
                } else if (history.getDominantCategory() == TicketCategory.TECHNICAL && history.getTechnicalTickets() >= 2) {
                    technicalScore += 1;
                }
            }
        }

        // Determine suggested category and rule confidence score
        if (billingScore > technicalScore && billingScore > otherScore) {
            result.setSuggestedCategory(TicketCategory.BILLING);
            result.setRuleScore(Math.min(0.95, 0.65 + (matchedBilling.size() * 0.10)));
            result.setRuleReason("Rule engine detected " + matchedBilling.size() + " billing keyword(s): " + String.join(", ", matchedBilling));
        } else if (technicalScore > billingScore && technicalScore > otherScore) {
            result.setSuggestedCategory(TicketCategory.TECHNICAL);
            result.setRuleScore(Math.min(0.95, 0.65 + (matchedTechnical.size() * 0.10)));
            result.setRuleReason("Rule engine detected " + matchedTechnical.size() + " technical keyword(s): " + String.join(", ", matchedTechnical));
        } else if (otherScore > 0) {
            result.setSuggestedCategory(TicketCategory.OTHER);
            result.setRuleScore(Math.min(0.85, 0.60 + (matchedOther.size() * 0.08)));
            result.setRuleReason("Rule engine detected general inquiry keywords: " + String.join(", ", matchedOther));
        } else {
            result.setSuggestedCategory(TicketCategory.OTHER);
            result.setRuleScore(0.45);
            result.setRuleReason("No explicit category keywords found. Insufficient rule signals.");
        }

        return result;
    }

    private List<String> findKeywords(String text, Set<String> keywords) {
        List<String> matched = new ArrayList<>();
        for (String kw : keywords) {
            if (text.contains(kw)) {
                matched.add(kw);
            }
        }
        return matched;
    }

    public Priority detectPriority(String fullText) {
        // CRITICAL indicators
        if (fullText.contains("production down") ||
            fullText.contains("entire system down") ||
            fullText.contains("security incident") ||
            fullText.contains("data loss") ||
            fullText.contains("service unavailable")) {
            return Priority.CRITICAL;
        }

        // HIGH indicators
        if (fullText.contains("cannot access") ||
            fullText.contains("urgent") ||
            fullText.contains("business stopped") ||
            fullText.contains("major failure") ||
            fullText.contains("crashes") ||
            fullText.contains("charged twice") ||
            fullText.contains("refund")) {
            return Priority.HIGH;
        }

        // MEDIUM indicators
        if (fullText.contains("error") ||
            fullText.contains("problem") ||
            fullText.contains("issue") ||
            fullText.contains("failed") ||
            fullText.contains("bug")) {
            return Priority.MEDIUM;
        }

        // LOW indicators (default for general queries)
        return Priority.LOW;
    }
}
