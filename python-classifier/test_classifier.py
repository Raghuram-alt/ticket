"""
Unit test & demonstration script for SupportTicketClassifier.
Run with: python test_classifier.py
"""
import sys
from classifier import SupportTicketClassifier

def main():
    print("==================================================")
    print("Testing SupportTicketClassifier (Python Service)")
    print("==================================================")
    
    clf = SupportTicketClassifier()
    print(f"Classifier loaded successfully. Vocab size: {len(clf.idf)}")

    test_cases = [
        "I was charged twice for my monthly subscription and need a refund",
        "The application crashes every time I try to open the analytics dashboard",
        "How can I update our company profile and billing contact address?",
        "My account is not working properly"
    ]

    for text in test_cases:
        res = clf.classify(text)
        print("\nInput:       ", text)
        print("Category:    ", res["category"])
        print("Confidence:  ", f"{int(res['confidence']*100)}%")
        print("Keywords:    ", res.get("detected_keywords", []))
        print("Probabilities:", res.get("probabilities", {}))

if __name__ == "__main__":
    main()
