"""
Text Classifier Module for Support Ticket Router
Implements TF-IDF + Classifier with pure-Python resilient fallback.
Supports BILLING, TECHNICAL, OTHER categories with confidence scoring.
"""

import os
import re
import csv
import math
from typing import Dict, Any, List, Tuple

class SupportTicketClassifier:
    """
    NLP Classifier that vectorizes ticket subject + description
    and predicts category with calibrated confidence scores.
    """
    
    def __init__(self, training_data_path: str = None):
        self.categories = ["BILLING", "TECHNICAL", "OTHER"]
        self.training_data_path = training_data_path or os.path.join(
            os.path.dirname(__file__), "training_data.csv"
        )
        self.vocab: Dict[str, int] = {}
        self.idf: Dict[str, float] = {}
        self.class_priors: Dict[str, float] = {}
        self.feature_weights: Dict[str, Dict[str, float]] = {}
        self.is_trained = False
        
        # Keyword anchors for strong domain calibration
        self.domain_anchors = {
            "BILLING": [
                "charge", "charged", "billing", "invoice", "refund", "subscription",
                "payment", "credit", "card", "receipt", "deducted", "overcharged",
                "transaction", "renewal", "price", "cost", "vat", "stripe", "paypal"
            ],
            "TECHNICAL": [
                "error", "bug", "crash", "crashes", "crashing", "login", "api",
                "server", "website", "dashboard", "loading", "failure", "exception",
                "timeout", "latency", "500", "502", "503", "404", "ssl", "token",
                "broken", "down", "stacktrace", "database", "memory", "cpu"
            ],
            "OTHER": [
                "profile", "question", "account", "information", "demo", "roadmap",
                "compliance", "soc2", "invite", "partner", "general", "feedback",
                "feature", "request", "training", "hours", "contact", "support"
            ]
        }
        
        self.train()

    def _tokenize(self, text: str) -> List[str]:
        """Normalize and tokenize text into clean alphanumeric words."""
        cleaned = re.sub(r'[^a-zA-Z0-9\s]', ' ', text.lower())
        tokens = [w for w in cleaned.split() if len(w) > 2]
        return tokens

    def train(self):
        """Train classifier using training_data.csv."""
        if not os.path.exists(self.training_data_path):
            self._init_default_weights()
            self.is_trained = True
            return

        documents = []
        labels = []
        doc_freq = {}
        
        with open(self.training_data_path, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                text = row.get("text", "")
                cat = row.get("category", "OTHER").strip().upper()
                if cat in self.categories:
                    tokens = self._tokenize(text)
                    documents.append((tokens, cat))
                    labels.append(cat)
                    
                    seen_words = set(tokens)
                    for w in seen_words:
                        doc_freq[w] = doc_freq.get(w, 0) + 1

        total_docs = len(documents)
        if total_docs == 0:
            self._init_default_weights()
            self.is_trained = True
            return

        # Compute IDF
        self.idf = {
            w: math.log((total_docs + 1) / (df + 1)) + 1.0
            for w, df in doc_freq.items()
        }

        # Class counts and feature frequencies
        class_word_counts = {c: {} for c in self.categories}
        class_total_words = {c: 0 for c in self.categories}
        class_doc_counts = {c: 0 for c in self.categories}

        for tokens, cat in documents:
            class_doc_counts[cat] += 1
            for w in tokens:
                class_word_counts[cat][w] = class_word_counts[cat].get(w, 0) + 1
                class_total_words[cat] += 1

        # Class priors
        self.class_priors = {
            c: math.log(max(1, class_doc_counts[c]) / total_docs)
            for c in self.categories
        }

        # Feature weights with Laplace smoothing and domain anchor boosting
        vocab_size = max(1, len(self.idf))
        self.feature_weights = {c: {} for c in self.categories}

        for c in self.categories:
            denom = class_total_words[c] + vocab_size
            for w in self.idf.keys():
                count = class_word_counts[c].get(w, 0)
                # Apply domain anchor boost
                if w in self.domain_anchors.get(c, []):
                    count += 5.0
                weight = (count + 1.0) / denom
                self.feature_weights[c][w] = math.log(weight)

        self.is_trained = True

    def _init_default_weights(self):
        """Fallback weights if training data is missing."""
        self.class_priors = {c: math.log(1/3) for c in self.categories}
        self.feature_weights = {c: {} for c in self.categories}
        for cat, anchors in self.domain_anchors.items():
            for word in anchors:
                self.feature_weights[cat][word] = -2.0
                self.idf[word] = 2.0

    def classify(self, text: str) -> Dict[str, Any]:
        """
        Classifies input text into BILLING, TECHNICAL, or OTHER
        with confidence score between 0.0 and 1.0, and explanations.
        """
        if not text or not text.strip():
            return {
                "category": "OTHER",
                "confidence": 0.33,
                "probabilities": {"BILLING": 0.33, "TECHNICAL": 0.33, "OTHER": 0.34},
                "detected_keywords": [],
                "reason": "Empty or whitespace-only input provided."
            }

        tokens = self._tokenize(text)
        if not tokens:
            return {
                "category": "OTHER",
                "confidence": 0.40,
                "probabilities": {"BILLING": 0.30, "TECHNICAL": 0.30, "OTHER": 0.40},
                "detected_keywords": [],
                "reason": "Text does not contain recognizable words."
            }

        # Count term frequencies in query
        tf = {}
        for t in tokens:
            tf[t] = tf.get(t, 0) + 1

        # Check detected anchor keywords
        detected = {c: [] for c in self.categories}
        for token in tokens:
            for cat, anchors in self.domain_anchors.items():
                if token in anchors and token not in detected[cat]:
                    detected[cat].append(token)

        # Calculate log-posterior scores
        log_scores = {}
        for c in self.categories:
            score = self.class_priors.get(c, -1.0)
            for t, freq in tf.items():
                tfidf = (1 + math.log(freq)) * self.idf.get(t, 1.0)
                w = self.feature_weights[c].get(t, -8.0)
                score += tfidf * w
                
            # Domain anchor bonus
            bonus = len(detected[c]) * 3.5
            score += bonus
            log_scores[c] = score

        # Softmax normalization for calibrated probabilities
        max_log = max(log_scores.values())
        exp_scores = {c: math.exp(score - max_log) for c, score in log_scores.items()}
        sum_exp = sum(exp_scores.values())
        probs = {c: round(exp_scores[c] / sum_exp, 4) for c in self.categories}

        # Sort categories by probability
        sorted_cats = sorted(probs.items(), key=lambda x: x[1], reverse=True)
        top_cat, top_prob = sorted_cats[0]
        second_prob = sorted_cats[1][1]

        # Specific ambiguity logic: if no strong keywords and probs are close
        total_anchors = sum(len(kw) for kw in detected.values())
        if total_anchors == 0 and top_prob < 0.65:
            # Uncertain / vague ticket e.g. "My account isn't working"
            final_prob = min(top_prob, 0.58)
        else:
            final_prob = top_prob

        all_detected = []
        for cat in self.categories:
            for kw in detected[cat]:
                all_detected.append(kw)

        return {
            "category": top_cat,
            "confidence": round(float(final_prob), 2),
            "probabilities": probs,
            "detected_keywords": all_detected,
            "top_category_keywords": detected[top_cat],
            "margin": round(float(top_prob - second_prob), 2)
        }
