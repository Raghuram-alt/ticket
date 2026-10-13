"""
Data models and schema definitions for Python Classifier.
"""
from pydantic import BaseModel, Field
from typing import Optional, Dict, List

class TicketPayload(BaseModel):
    ticket_id: Optional[str] = None
    subject: Optional[str] = ""
    description: Optional[str] = ""
    text: Optional[str] = None

    def get_full_text(self) -> str:
        if self.text and self.text.strip():
            return self.text.strip()
        combined = f"{self.subject or ''} {self.description or ''}".strip()
        return combined

class PredictionResult(BaseModel):
    category: str
    confidence: float
    probabilities: Dict[str, float]
    detected_keywords: List[str]
    routing_advice: str
