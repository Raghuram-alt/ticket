"""
FastAPI Server for Support Ticket Router Classifier
Endpoint: POST /classify
Expects: {"text": "ticket text here"}
Returns: {"category": "BILLING", "confidence": 0.94, ...}
"""

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List

from classifier import SupportTicketClassifier

app = FastAPI(
    title="Support Ticket AI Classifier",
    description="NLP microservice for categorizing SaaS customer support tickets with confidence scores.",
    version="1.0.0"
)

# Enable CORS for React frontend & Java Spring Boot
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

classifier = SupportTicketClassifier()

class ClassifyRequest(BaseModel):
    text: str = Field(..., description="The combined subject and description of the support ticket")

class ClassifyResponse(BaseModel):
    category: str
    confidence: float
    probabilities: Optional[Dict[str, float]] = None
    detected_keywords: Optional[List[str]] = None
    reason: Optional[str] = None

@app.get("/")
def root():
    return {
        "service": "Support Ticket AI Classifier",
        "status": "online",
        "version": "1.0.0",
        "endpoints": {
            "classify": "POST /classify",
            "health": "GET /health",
            "categories": "GET /categories"
        }
    }

@app.get("/health")
def health():
    return {
        "status": "UP",
        "model_trained": classifier.is_trained,
        "vocab_size": len(classifier.idf),
        "supported_categories": classifier.categories
    }

@app.get("/categories")
def get_categories():
    return {
        "categories": classifier.categories,
        "anchors": classifier.domain_anchors
    }

@app.post("/classify", response_model=ClassifyResponse)
def classify_ticket(req: ClassifyRequest):
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Ticket text cannot be empty.")
    
    result = classifier.classify(req.text)
    return ClassifyResponse(
        category=result["category"],
        confidence=result["confidence"],
        probabilities=result.get("probabilities"),
        detected_keywords=result.get("detected_keywords"),
        reason=f"Predicted {result['category']} with {int(result['confidence']*100)}% confidence."
    )

if __name__ == "__main__":
    print("Starting Support Ticket Classifier on http://localhost:8000 ...")
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
