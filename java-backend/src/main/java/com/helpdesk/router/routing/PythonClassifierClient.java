package com.helpdesk.router.routing;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.helpdesk.router.model.TicketCategory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

/**
 * REST Client communicating with the Python FastAPI Classifier microservice.
 * Includes graceful fallback if Python service is offline.
 */
@Component
public class PythonClassifierClient {

    private static final Logger log = LoggerFactory.getLogger(PythonClassifierClient.class);

    private final RestTemplate restTemplate;
    private final String classifierUrl;
    private final ObjectMapper objectMapper;

    public PythonClassifierClient(@Value("${python.classifier.url:http://localhost:8000/classify}") String classifierUrl) {
        this.restTemplate = new RestTemplate();
        this.classifierUrl = classifierUrl;
        this.objectMapper = new ObjectMapper();
    }

    public static class ClassifierResponse {
        private TicketCategory category;
        private double confidence;
        private boolean fallbackUsed;
        private String note;
        private List<String> detectedKeywords = new ArrayList<>();

        public TicketCategory getCategory() { return category; }
        public void setCategory(TicketCategory category) { this.category = category; }
        public double getConfidence() { return confidence; }
        public void setConfidence(double confidence) { this.confidence = confidence; }
        public boolean isFallbackUsed() { return fallbackUsed; }
        public void setFallbackUsed(boolean fallbackUsed) { this.fallbackUsed = fallbackUsed; }
        public String getNote() { return note; }
        public void setNote(String note) { this.note = note; }
        public List<String> getDetectedKeywords() { return detectedKeywords; }
        public void setDetectedKeywords(List<String> detectedKeywords) { this.detectedKeywords = detectedKeywords; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class PythonApiResponse {
        public String category;
        public double confidence;
        public List<String> detected_keywords;
        public String reason;
    }

    public ClassifierResponse classify(String ticketText) {
        ClassifierResponse response = new ClassifierResponse();

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = new HashMap<>();
            body.put("text", ticketText);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            log.info("Sending ticket text to Python classifier: {}", classifierUrl);
            ResponseEntity<PythonApiResponse> apiResponse = restTemplate.postForEntity(
                    classifierUrl,
                    request,
                    PythonApiResponse.class
            );

            if (apiResponse.getStatusCode().is2xxSuccessful() && apiResponse.getBody() != null) {
                PythonApiResponse data = apiResponse.getBody();
                response.setCategory(TicketCategory.fromString(data.category));
                response.setConfidence(data.confidence);
                response.setFallbackUsed(false);
                if (data.detected_keywords != null) {
                    response.setDetectedKeywords(data.detected_keywords);
                }
                response.setNote("Python FastAPI ML Classifier (TF-IDF)");
                log.info("Python classifier returned: {} (confidence: {})", response.getCategory(), response.getConfidence());
                return response;
            }
        } catch (ResourceAccessException | org.springframework.web.client.RestClientException e) {
            log.warn("Python classifier service unavailable at {}. Triggering rule-based fallback.", classifierUrl);
        } catch (Exception e) {
            log.error("Error communicating with Python classifier: {}", e.getMessage());
        }

        // Resilient Fallback: exact contract emulation
        return executeMockClassifier(ticketText);
    }

    /**
     * High-fidelity fallback classifier ensuring uninterrupted service
     * when Python FastAPI service is offline.
     */
    public ClassifierResponse executeMockClassifier(String text) {
        ClassifierResponse fallback = new ClassifierResponse();
        fallback.setFallbackUsed(true);
        fallback.setNote("AI classifier unavailable — using rule-based fallback.");

        String lower = text.toLowerCase();

        boolean hasBilling = lower.contains("charge") || lower.contains("subscription") ||
                lower.contains("payment") || lower.contains("invoice") || lower.contains("refund") ||
                lower.contains("credit card");

        boolean hasTechnical = lower.contains("crash") || lower.contains("error") ||
                lower.contains("login") || lower.contains("api") || lower.contains("server") ||
                lower.contains("website") || lower.contains("dashboard") || lower.contains("failure");

        if (hasBilling && !hasTechnical) {
            fallback.setCategory(TicketCategory.BILLING);
            fallback.setConfidence(0.94);
        } else if (hasTechnical && !hasBilling) {
            fallback.setCategory(TicketCategory.TECHNICAL);
            fallback.setConfidence(0.96);
        } else if (lower.contains("profile") || lower.contains("question") || lower.contains("information")) {
            fallback.setCategory(TicketCategory.OTHER);
            fallback.setConfidence(0.91);
        } else {
            // Ambiguous
            fallback.setCategory(TicketCategory.OTHER);
            fallback.setConfidence(0.52);
        }

        return fallback;
    }
}
