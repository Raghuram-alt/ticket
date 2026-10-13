-- Seed data for Support Ticket Router

INSERT OR REPLACE INTO customers (customer_id, name, email, company, tier, total_tickets, billing_tickets, technical_tickets) VALUES
('CUST-101', 'Rahul Kumar', 'rahul.kumar@acme-corp.com', 'Acme Corporation', 'ENTERPRISE', 6, 4, 1),
('CUST-102', 'Sarah Chen', 'sarah.c@techflow.io', 'TechFlow Inc', 'PRO', 5, 1, 3),
('CUST-103', 'John Smith', 'jsmith@globallogistics.com', 'Global Logistics', 'ENTERPRISE', 8, 5, 2),
('CUST-104', 'Elena Rostova', 'elena@novasoft.dev', 'NovaSoft Solutions', 'STARTER', 2, 0, 1),
('CUST-105', 'Marcus Aurelius', 'marcus@stoicconsulting.org', 'Stoic Consulting', 'PRO', 4, 2, 1),
('CUST-106', 'Amina Idris', 'amina@saharanet.io', 'SaharaNet', 'ENTERPRISE', 9, 3, 5);

INSERT OR REPLACE INTO tickets (ticket_id, customer_id, customer_name, email, subject, description, category, priority, confidence, assigned_team, status, routing_method, routing_reason, detected_keywords) VALUES
('TK-1025', 'CUST-103', 'John Smith', 'jsmith@globallogistics.com', 'Duplicate subscription payment', 'I was charged twice this month for my monthly subscription. Please refund the duplicate transaction.', 'BILLING', 'HIGH', 0.94, 'Billing Support', 'IN_PROGRESS', 'AI + Rule Engine', 'Detected payment and subscription-related keywords and confirmed by text classifier (94% confidence).', '["charged", "payment", "subscription", "refund", "transaction"]'),

('TK-1026', 'CUST-102', 'Sarah Chen', 'sarah.c@techflow.io', 'Dashboard crashing on analytics export', 'The dashboard crashes whenever I try to open analytics and export CSV data. 500 error in console.', 'TECHNICAL', 'HIGH', 0.97, 'Technical Support', 'NEW', 'AI + Rule Engine', 'Detected technical failure keywords: crash, error, console. AI text classifier predicted TECHNICAL with 97% confidence.', '["crashes", "error", "console", "dashboard"]'),

('TK-1027', 'CUST-104', 'Elena Rostova', 'elena@novasoft.dev', 'How to update company profile details', 'How can I update my company profile and add a new administrator email to our account?', 'OTHER', 'LOW', 0.91, 'General Support', 'RESOLVED', 'AI + Rule Engine', 'General account guidance request. AI text classifier predicted OTHER with 91% confidence.', '["profile", "account", "update"]'),

('TK-1028', 'CUST-105', 'Marcus Aurelius', 'marcus@stoicconsulting.org', 'Something is wrong with my account', 'My account is not working correctly. Things seem stuck and weird.', 'OTHER', 'MEDIUM', 0.52, 'Manual Review Team', 'MANUAL_REVIEW', 'Manual Review Routing', 'Low confidence score (52%) below 80% threshold. Ambiguous keywords require human verification.', '["account"]'),

('TK-1029', 'CUST-101', 'Rahul Kumar', 'rahul.kumar@acme-corp.com', 'Wire transfer invoice missing tax ID', 'Please provide an updated invoice with our European VAT registration number for the wire transfer.', 'BILLING', 'MEDIUM', 0.92, 'Billing Support', 'WAITING_FOR_CUSTOMER', 'AI + Rule Engine', 'Confirmed billing inquiry via invoice and VAT keywords. Supported by customer billing history.', '["invoice", "vat", "wire transfer"]'),

('TK-1030', 'CUST-106', 'Amina Idris', 'amina@saharanet.io', 'Production API returning 503 Service Unavailable', 'Critical incident: our production webhooks are failing with 503 Service Unavailable and entire system down!', 'TECHNICAL', 'CRITICAL', 0.98, 'Technical Support', 'IN_PROGRESS', 'AI + Rule Engine', 'Critical priority detected (production down, 503, service unavailable). High-confidence technical classification.', '["production down", "503", "service unavailable", "api", "failing"]');
