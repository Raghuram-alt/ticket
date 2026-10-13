# SUPPORT TICKET ROUTER
### AI-Assisted SaaS Helpdesk Routing & Automated Triage System

An enterprise-grade, responsive AI helpdesk prototype combining **Java Object-Oriented Rule Processing**, **Customer History Context**, and **Python NLP Machine Learning Classification** to automatically categorize customer support tickets, calculate confidence scores, and route them to specialized support teams with safety manual review guardrails.

---

## 📑 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Core Architectural Workflow](#3-core-architectural-workflow)
4. [Technology Stack](#4-technology-stack)
5. [Key System Features](#5-key-system-features)
6. [Object-Oriented Programming (OOP) Design](#6-object-oriented-programming-oop-design)
7. [Machine Learning & NLP Text Classifier](#7-machine-learning--nlp-text-classifier)
8. [Java ↔ Python API Integration Contract](#8-java--python-api-integration-contract)
9. [Installation & Setup Guide](#9-installation--setup-guide)
10. [How to Run the Prototype](#10-how-to-run-the-prototype)
11. [Step-by-Step Viva & Demo Walkthrough](#11-step-by-step-viva--demo-walkthrough)
12. [API Reference Documentation](#12-api-reference-documentation)
13. [Database Schema (SQLite)](#13-database-schema-sqlite)
14. [College Viva Q&A Guide (Simple Language)](#14-college-viva-qa-guide-simple-language)
15. [Future Improvements & Roadmap](#15-future-improvements--roadmap)

---

## 1. Project Overview

**Support Ticket Router** is an intelligent SaaS helpdesk routing platform. When customers submit support tickets, the system:
1. Ingests ticket metadata and extracts subject & description.
2. Evaluates deterministic rules using a **Java Rule Engine** (domain keywords & priority indicators).
3. Cross-references historical customer support affinity via **Customer History**.
4. Dispatches the text to a **Python FastAPI NLP microservice** trained with **TF-IDF Vectorization** and calibrated **Multinomial Class Probabilities**.
5. The **Java Routing Agent** synthesizes the deterministic and probabilistic findings, validates confidence against an **80% threshold**, and automatically routes the ticket to the proper department queue (**Billing Support**, **Technical Support**, or **General Support**).
6. Tickets that have ambiguous text or confidence below 80% are intercepted by safety guardrails and sent to the **Manual Review Team**.

---

## 2. Problem Statement

SaaS companies face high ticket volumes daily. Manual categorization causes:
- **Incorrect ticket routing:** Tickets assigned to the wrong engineering or billing team.
- **Delayed resolution:** High-severity outages lost in generic triage queues.
- **Escalating human overhead:** Support managers manually sorting repetitive queries.
- **Inconsistent classification:** Human error and fatigue.

**The Solution:** An automated hybrid routing system that merges rule-based precision with probabilistic AI text classification and an explicit human-in-the-loop fallback mechanism.

---

## 3. Core Architectural Workflow

```
                  ┌──────────────────────┐
                  │   React Frontend     │
                  │ Dashboard / Tickets  │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   Java Spring Boot   │
                  │    Routing Agent     │
                  └──────────┬───────────┘
                             │
                 ┌───────────┴───────────┐
                 ▼                       ▼
        ┌────────────────┐      ┌─────────────────┐
        │   Rule Engine  │      │ Customer History│
        └────────┬───────┘      └────────┬────────┘
                 │                       │
                 └───────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │   Python FastAPI     │
                  │  Text Classifier     │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   ML Classification  │
                  │ Billing / Technical  │
                  │       / Other        │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Final Routing Result │
                  └──────────┬───────────┘
                             │
             ┌───────────────┼───────────────┐
             ▼               ▼               ▼
        Billing Team   Technical Team   General Team
                             │
                             ▼
                       Manual Review
                       if confidence
                         is low (<80%)
```

---

## 4. Technology Stack

| Layer | Technology | Key Libraries / Frameworks |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4 | `lucide-react`, `canvas-confetti` |
| **Java Backend** | Java 17+, Spring Boot 3.2 | Spring Web MVC, Spring Validation, Jackson |
| **Python Microservice** | Python 3.10+, FastAPI | `uvicorn`, `pydantic`, `scikit-learn` |
| **Database** | SQLite / Relational | `support_tickets.db`, `schema.sql`, `seed.sql` |
| **DevOps / Containers** | Docker, Docker Compose | Multi-stage Dockerfiles for all 3 tiers |

---

## 5. Key System Features

- **8-Step Live Routing Animation:** Real-time visual feedback showing Receiving → Rule Engine → Customer History → AI Classification → Probability Analysis → Confidence Check → Team Queue Assignment → Final Audit Log.
- **Multi-Category Architecture:** Initially supports `BILLING`, `TECHNICAL`, and `OTHER` (extensible enum structure).
- **Rule Engine & Priority Detection:**
  - `CRITICAL`: Entire system down, production down, data loss, service unavailable.
  - `HIGH`: Cannot access, urgent, business stopped, major failure, crashes, duplicate charge.
  - `MEDIUM`: Error, bug, problem, issue.
  - `LOW`: Question, profile, documentation, feature request.
- **Customer History Context:** Incorporates past ticket counts and category affinity to help resolve ambiguous queries without overriding strong direct evidence.
- **Manual Review Guardrail:** Ensures uncertain tickets (< 80% confidence) are never silently misrouted.
- **Interactive Educational Pages:**
  - **System Architecture Page:** Interactive data flow diagram and component responsibility cards for presentations.
  - **OOP Structure Page:** Deep dive into Encapsulation, Abstraction, Polymorphism, Class relationships, and Java code viewer.
  - **AI Classification Playground:** Live text inspector showing real-time tokenization, keyword matching, and softmax probability distributions.
- **Dual Operating Modes:** Works seamlessly connected to real Java/Python backends OR in high-fidelity in-browser simulation mode with zero setup dependencies.

---

## 6. Object-Oriented Programming (OOP) Design

### Primary Java Classes

| Class | OOP Concept | Responsibility |
|---|---|---|
| `Ticket` | **Encapsulation** | Models the ticket entity. Maintains private fields, status lifecycle mutations (`updateStatus()`), and audit history. |
| `Customer` | **Domain Aggregate** | Encapsulates customer identity, tier, and historical interaction records. |
| `CustomerHistory` | **Encapsulation & Affinity** | Tracks historical category distribution and calculates category affinity weights. |
| `RuleEngine` | **Single Responsibility** | Deterministic keyword dictionary matcher and regex-based priority detector. |
| `PythonClassifierClient` | **Abstraction** | Encapsulates REST calls to FastAPI with resilient fallback emulation. |
| `TicketRouter` | **Business Policy** | Applies the 80% confidence gate and maps categories to support team queues. |
| `RoutingAgent` | **Mediator / Coordinator** | Central orchestrator coordinating all domain objects to produce a `RoutingResult`. |
| `RoutingResult` | **Value Object** | Immutable audit container holding decision logs, keywords, and explanation bullets. |

---

## 7. Machine Learning & NLP Text Classifier

The Python classification service (`python-classifier/`) utilizes:
- **Preprocessing & Tokenization:** Lowercasing, punctuation stripping, token filtering (min length 2).
- **TF-IDF Vectorization:** Calculates term frequency with inverse document frequency smoothing:
  $$\text{IDF}(t) = \log\left(\frac{N + 1}{\text{DF}(t) + 1}\right) + 1$$
- **Laplace-Smoothed Multinomial Model:** Incorporates domain anchor boosting for high precision across technical and financial terminologies.
- **Softmax Normalization:** Converts log-posterior scores into calibrated probabilities summing to 1.0.

### Training Dataset (`training_data.csv`)
Trained on 80+ realistic SaaS customer support tickets:
- **BILLING:** Double charges, refund inquiries, VAT invoice requests, wire transfers, failed recurring subscriptions.
- **TECHNICAL:** 500 internal server errors, API 503 service unavailable, dashboard memory leaks, database connection pool exhaustion.
- **OTHER:** Profile updates, SOC2 compliance requests, demo inquiries, general help.

---

## 8. Java ↔ Python API Integration Contract

### Request: Java sends POST to `http://localhost:8000/classify`
```json
{
  "text": "I was charged twice for my subscription and need one payment refunded."
}
```

### Response: Python returns
```json
{
  "category": "BILLING",
  "confidence": 0.94,
  "probabilities": {
    "BILLING": 0.94,
    "TECHNICAL": 0.03,
    "OTHER": 0.03
  },
  "detected_keywords": ["charged", "subscription", "refund"],
  "reason": "Predicted BILLING with 94% confidence."
}
```

---

## 9. Installation & Setup Guide

### Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (v3.10+) (Optional for standalone Python server)
- **Java JDK** (17+) & **Maven** (Optional for standalone Spring Boot server)

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The React web application is live at `http://localhost:5173/`.

### 2. Python Microservice Setup
```bash
cd python-classifier
pip install -r requirements.txt
python -m uvicorn app:app --port 8000 --reload
```
API docs available at `http://localhost:8000/docs`.

### 3. Java Spring Boot Backend Setup
```bash
cd java-backend
mvn spring-boot:run
```
Java API available at `http://localhost:8080/api/tickets`.

### 4. Database Setup (SQLite)
```bash
cd database
python sqlite_setup.py
```
Initializes `support_tickets.db` from `schema.sql` and `seed.sql`.

---

## 10. How to Run the Prototype

You have 3 easy ways to run the project:

### Option A: Complete Web Prototype (Zero Dependencies)
Double-click `run_frontend.bat` or run:
```bash
cd frontend && npm run dev
```
Open **`http://localhost:5173/`**.
The frontend includes a high-fidelity client-side simulation engine that emulates the exact Java RuleEngine and Python NLP classifier with sample data and live 8-step routing animations!

### Option B: Multi-Service Launcher
Double-click `run_all.bat`. It will launch:
1. Frontend on `http://localhost:5173/`
2. Python FastAPI on `http://localhost:8000/`
3. Java Spring Boot on `http://localhost:8080/`

### Option C: Docker Compose
```bash
docker compose up --build
```

---

## 11. Step-by-Step Viva & Demo Walkthrough

### Scenario 1: High Confidence Billing Routing
1. Open the dashboard at `http://localhost:5173/`.
2. Click **"Create Ticket"** in the sidebar.
3. Click the preset button: **"Scenario 1: Billing (High)"**.
   - Customer: `Rahul Kumar`
   - Subject: `Charged twice for subscription`
   - Description: `I was charged twice for my monthly subscription and need one payment refunded.`
4. Click **"Route Ticket"**.
5. Observe the live 8-step execution animation:
   - ✓ Ingesting ticket
   - ✓ Java RuleEngine matches keywords: `charged`, `subscription`, `refund`
   - ✓ Customer history shows past billing ticket affinity
   - ✓ Python classifier predicts `BILLING` with `94%+` confidence
   - ✓ Team Queue: **Billing Support**
   - ✓ Status: **Automatically Routed**
6. Open the Dashboard: Total tickets and Billing counts increment automatically.

### Scenario 2: Low Confidence & Manual Review Guardrail
1. Click **"Create Ticket"**.
2. Click preset: **"Scenario 2: Uncertain"**.
   - Customer: `Marcus Aurelius`
   - Subject: `Something is wrong`
   - Description: `My account isn't working.`
3. Click **"Route Ticket"**.
4. The system detects ambiguous text with low category signals (Confidence ~52% < 80% threshold).
5. The safety guardrail activates: Assigned to **Manual Review Team**.
6. Navigate to **"Manual Review"** in the sidebar:
   - Review the card and click **[Assign Billing]** or **[Assign Technical]** to manually reassign.

---

## 12. API Reference Documentation

### Java Spring Boot API (`http://localhost:8080`)
- `GET /api/tickets` — Retrieve all tickets.
- `GET /api/tickets/{id}` — Retrieve ticket details by ID.
- `POST /api/tickets` — Submit a ticket to the Routing Agent.
- `PUT /api/tickets/{id}/status` — Update ticket status.
- `POST /api/tickets/{id}/manual-assign` — Administrator override for manual review.
- `POST /api/tickets/demo-load` — Reload realistic sample tickets.
- `GET /api/customers` — List all customers with ticket history.
- `GET /api/analytics` — Compute live dashboard metrics.

### Python FastAPI Classifier (`http://localhost:8000`)
- `POST /classify` — Classifies ticket text and returns `{ "category": "BILLING", "confidence": 0.94 }`.
- `GET /health` — Service health and vocab stats.
- `GET /categories` — Supported categories and domain anchor dictionaries.

---

## 13. Database Schema (SQLite)

Tables defined in `database/schema.sql`:
- `customers` (customer_id, name, email, company, tier, total_tickets, billing_tickets, technical_tickets)
- `tickets` (ticket_id, customer_id, customer_name, email, subject, description, category, priority, confidence, assigned_team, status, routing_method, routing_reason)
- `routing_results` (result_id, ticket_id, rule_category, rule_score, ai_category, ai_confidence, final_category, final_confidence, assigned_team, is_auto_routed, decision_log)
- `ticket_history` (history_id, ticket_id, action, actor, details, timestamp)
- `keyword_rules` (rule_id, category, keyword, weight, is_active)

---

## 14. College Viva Q&A Guide (Simple Language)

### Q1: What is the main objective of this project?
**Answer:** The project automates the sorting and routing of customer support tickets in a SaaS company. It replaces slow, error-prone manual triage by combining Java object-oriented business rules, customer history, and a Python NLP machine learning classifier.

### Q2: Why use both Java and Python instead of just one?
**Answer:** In modern enterprise systems, different services excel at different tasks. **Java** provides rock-solid Object-Oriented design, type safety, deterministic rule processing, and transactional enterprise management. **Python** is the industry standard for AI/NLP text classification. Connecting them via REST APIs demonstrates realistic microservice architecture.

### Q3: How does the system decide where to route a ticket?
**Answer:** The Java RoutingAgent runs rule checks (keywords + priority + customer history) and asks the Python classifier for an AI prediction with a confidence score. If confidence is 80% or higher and aligns with the rules, it routes automatically to Billing, Technical, or General Support. If confidence is below 80%, it sends the ticket to the Manual Review Team so humans can verify uncertain cases.

### Q4: What OOP principles are implemented in the Java backend?
**Answer:**
1. **Encapsulation:** Private variables with public accessors and controlled mutation methods in `Ticket` and `Customer`.
2. **Abstraction:** Hiding HTTP communication complexity behind the `PythonClassifierClient`.
3. **Polymorphism:** The classifier client seamlessly supports both real HTTP REST calls and resilient fallback mock implementations under the same interface.
4. **Single Responsibility:** Distinct classes for `RuleEngine` (rules), `TicketRouter` (team assignments), and `RoutingAgent` (coordination).

### Q5: What happens if the Python AI classifier goes offline?
**Answer:** The system has graceful fallback architecture. If the Python microservice is down, the Java backend catches the exception and falls back to deterministic rule scoring without crashing, marking the ticket with `"AI classifier unavailable — using rule-based fallback"`.

---

## 15. Future Improvements & Roadmap
- [ ] Integration with LLMs (e.g., Gemini Flash) for automated draft response generation.
- [ ] Multi-lingual support ticket translation.
- [ ] Webhook triggers to Slack / Microsoft Teams on Critical outages.
- [ ] Advanced ticket clustering for emerging anomaly detection.
