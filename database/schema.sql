-- Support Ticket Router Database Schema (SQLite / PostgreSQL compatible)

CREATE TABLE IF NOT EXISTS customers (
    customer_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    company TEXT,
    tier TEXT DEFAULT 'STANDARD',
    total_tickets INTEGER DEFAULT 0,
    billing_tickets INTEGER DEFAULT 0,
    technical_tickets INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- BILLING, TECHNICAL, OTHER
    priority TEXT NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    confidence REAL NOT NULL, -- 0.0 to 1.0
    assigned_team TEXT NOT NULL, -- Billing Support, Technical Support, General Support, Manual Review Team
    status TEXT NOT NULL, -- NEW, ANALYZING, ROUTED, IN_PROGRESS, WAITING_FOR_CUSTOMER, RESOLVED, MANUAL_REVIEW
    routing_method TEXT NOT NULL, -- AI + Rule Engine, Rule-Based Fallback, Manual Assignment
    routing_reason TEXT,
    detected_keywords TEXT, -- JSON array string
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE IF NOT EXISTS routing_results (
    result_id TEXT PRIMARY KEY,
    ticket_id TEXT NOT NULL,
    rule_category TEXT,
    rule_score REAL,
    ai_category TEXT,
    ai_confidence REAL,
    customer_history_affinity TEXT,
    final_category TEXT NOT NULL,
    final_confidence REAL NOT NULL,
    assigned_team TEXT NOT NULL,
    is_auto_routed INTEGER NOT NULL, -- 1 or 0
    decision_log TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(ticket_id) REFERENCES tickets(ticket_id)
);

CREATE TABLE IF NOT EXISTS ticket_history (
    history_id TEXT PRIMARY KEY,
    ticket_id TEXT NOT NULL,
    action TEXT NOT NULL,
    actor TEXT NOT NULL,
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(ticket_id) REFERENCES tickets(ticket_id)
);

CREATE TABLE IF NOT EXISTS keyword_rules (
    rule_id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    keyword TEXT NOT NULL,
    weight REAL DEFAULT 1.0,
    is_active INTEGER DEFAULT 1
);
