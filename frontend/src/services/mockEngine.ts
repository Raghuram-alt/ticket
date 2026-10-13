import { 
  Ticket, 
  Customer, 
  DashboardMetrics, 
  TicketCategory, 
  Priority, 
  TicketStatus, 
  RoutingResult,
  RoutingStep
} from '../types';

const BILLING_KEYWORDS = [
  'payment', 'invoice', 'refund', 'charged', 'charge', 'subscription',
  'billing', 'credit card', 'transaction', 'receipt', 'deducted',
  'overcharged', 'renewal', 'vat', 'stripe', 'paypal', 'wire transfer', 'balance'
];

const TECHNICAL_KEYWORDS = [
  'error', 'bug', 'crash', 'crashes', 'crashing', 'login', 'api',
  'server', 'website', 'dashboard', 'not loading', 'failure',
  'exception', 'timeout', '500', '502', '503', '404', 'database',
  'stacktrace', 'unresponsive', 'corrupted', 'slow query', 'broken'
];

const OTHER_KEYWORDS = [
  'profile', 'question', 'account', 'information', 'product', 'demo',
  'roadmap', 'compliance', 'soc2', 'general', 'training', 'hours', 'help', 'feature'
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    customerId: 'CUST-101',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@acme-corp.com',
    company: 'Acme Corporation',
    tier: 'ENTERPRISE',
    history: {
      customerId: 'CUST-101',
      totalTickets: 6,
      billingTickets: 4,
      technicalTickets: 1,
      otherTickets: 1,
      previousSubjects: ['Duplicate charge', 'Annual renewal invoice', 'Tax invoice issue', 'Subscription update']
    }
  },
  {
    customerId: 'CUST-102',
    name: 'Sarah Chen',
    email: 'sarah.c@techflow.io',
    company: 'TechFlow Inc',
    tier: 'PRO',
    history: {
      customerId: 'CUST-102',
      totalTickets: 5,
      billingTickets: 1,
      technicalTickets: 3,
      otherTickets: 1,
      previousSubjects: ['API rate limit exceeded', 'Webhook failure', 'SSO configuration']
    }
  },
  {
    customerId: 'CUST-103',
    name: 'John Smith',
    email: 'jsmith@globallogistics.com',
    company: 'Global Logistics',
    tier: 'ENTERPRISE',
    history: {
      customerId: 'CUST-103',
      totalTickets: 8,
      billingTickets: 5,
      technicalTickets: 2,
      otherTickets: 1,
      previousSubjects: ['Invoice refund request', 'Credit card update', 'Receipt inquiry', 'Quarterly bill']
    }
  },
  {
    customerId: 'CUST-104',
    name: 'Elena Rostova',
    email: 'elena@novasoft.dev',
    company: 'NovaSoft Solutions',
    tier: 'STARTER',
    history: {
      customerId: 'CUST-104',
      totalTickets: 2,
      billingTickets: 0,
      technicalTickets: 1,
      otherTickets: 1,
      previousSubjects: ['API documentation question']
    }
  },
  {
    customerId: 'CUST-105',
    name: 'Marcus Aurelius',
    email: 'marcus@stoicconsulting.org',
    company: 'Stoic Consulting',
    tier: 'PRO',
    history: {
      customerId: 'CUST-105',
      totalTickets: 4,
      billingTickets: 2,
      technicalTickets: 1,
      otherTickets: 1,
      previousSubjects: ['Billing clarification', 'Account access']
    }
  },
  {
    customerId: 'CUST-106',
    name: 'Amina Idris',
    email: 'amina@saharanet.io',
    company: 'SaharaNet',
    tier: 'ENTERPRISE',
    history: {
      customerId: 'CUST-106',
      totalTickets: 9,
      billingTickets: 3,
      technicalTickets: 5,
      otherTickets: 1,
      previousSubjects: ['Latency in data sync', 'Database connection spike', '503 incident', 'Custom webhook']
    }
  }
];

const INITIAL_TICKETS: Ticket[] = [
  {
    ticketId: 'TK-1025',
    customerId: 'CUST-103',
    customerName: 'John Smith',
    email: 'jsmith@globallogistics.com',
    subject: 'Duplicate subscription payment',
    description: 'I was charged twice this month for my monthly subscription. Please refund the duplicate transaction.',
    category: 'BILLING',
    priority: 'HIGH',
    confidence: 0.94,
    assignedTeam: 'Billing Support',
    status: 'IN_PROGRESS',
    routingMethod: 'AI + Rule Engine',
    routingReason: 'Detected payment and subscription-related keywords and confirmed by text classifier (94% confidence).',
    detectedKeywords: ['charged', 'payment', 'subscription', 'refund', 'transaction'],
    createdAt: '2026-09-30T09:15:00Z',
    updatedAt: '2026-09-30T09:45:00Z',
    routingResult: {
      ticketId: 'TK-1025',
      ruleCategory: 'BILLING',
      ruleScore: 0.95,
      aiCategory: 'BILLING',
      aiConfidence: 0.94,
      finalCategory: 'BILLING',
      finalConfidence: 0.94,
      priority: 'HIGH',
      assignedTeam: 'Billing Support',
      autoRouted: true,
      routingMethod: 'AI + Rule Engine',
      detectedKeywords: ['charged', 'payment', 'subscription', 'refund', 'transaction'],
      explanationBullets: [
        "✓ Keyword 'charged' detected in ticket text",
        "✓ Keyword 'subscription' detected in ticket text",
        "✓ Keyword 'payment' detected in ticket text",
        "✓ Python classifier predicted BILLING (94% confidence)",
        "✓ Customer has 5 previous billing ticket(s)",
        "✓ High confidence (94% >= 80% threshold) - Automatically routed"
      ],
      summaryReason: 'Detected payment and subscription keywords confirmed by AI classifier.',
      routedAt: '2026-09-30T09:15:05Z'
    }
  },
  {
    ticketId: 'TK-1026',
    customerId: 'CUST-102',
    customerName: 'Sarah Chen',
    email: 'sarah.c@techflow.io',
    subject: 'Dashboard crashing on analytics export',
    description: 'The dashboard crashes whenever I try to open analytics and export CSV data. 500 error in console.',
    category: 'TECHNICAL',
    priority: 'HIGH',
    confidence: 0.97,
    assignedTeam: 'Technical Support',
    status: 'NEW',
    routingMethod: 'AI + Rule Engine',
    routingReason: 'Detected technical failure keywords: crash, error, console. AI text classifier predicted TECHNICAL with 97% confidence.',
    detectedKeywords: ['crashes', 'error', 'dashboard', '500'],
    createdAt: '2026-09-30T09:40:00Z',
    updatedAt: '2026-09-30T09:40:00Z',
    routingResult: {
      ticketId: 'TK-1026',
      ruleCategory: 'TECHNICAL',
      ruleScore: 0.95,
      aiCategory: 'TECHNICAL',
      aiConfidence: 0.97,
      finalCategory: 'TECHNICAL',
      finalConfidence: 0.97,
      priority: 'HIGH',
      assignedTeam: 'Technical Support',
      autoRouted: true,
      routingMethod: 'AI + Rule Engine',
      detectedKeywords: ['crashes', 'error', 'dashboard', '500'],
      explanationBullets: [
        "✓ Keyword 'crashes' detected in ticket text",
        "✓ Keyword 'error' detected in ticket text",
        "✓ Python classifier predicted TECHNICAL (97% confidence)",
        "✓ Customer has 3 previous technical ticket(s)",
        "✓ Unanimous agreement between Rule Engine and Python AI"
      ],
      summaryReason: 'Critical application error keywords confirmed by text classification.',
      routedAt: '2026-09-30T09:40:05Z'
    }
  },
  {
    ticketId: 'TK-1027',
    customerId: 'CUST-104',
    customerName: 'Elena Rostova',
    email: 'elena@novasoft.dev',
    subject: 'How to update company profile details',
    description: 'How can I update my company profile and add a new administrator email to our account?',
    category: 'OTHER',
    priority: 'LOW',
    confidence: 0.91,
    assignedTeam: 'General Support',
    status: 'RESOLVED',
    routingMethod: 'AI + Rule Engine',
    routingReason: 'General account guidance request. AI text classifier predicted OTHER with 91% confidence.',
    detectedKeywords: ['profile', 'account', 'update'],
    createdAt: '2026-09-30T08:00:00Z',
    updatedAt: '2026-09-30T09:10:00Z',
    routingResult: {
      ticketId: 'TK-1027',
      ruleCategory: 'OTHER',
      ruleScore: 0.85,
      aiCategory: 'OTHER',
      aiConfidence: 0.91,
      finalCategory: 'OTHER',
      finalConfidence: 0.91,
      priority: 'LOW',
      assignedTeam: 'General Support',
      autoRouted: true,
      routingMethod: 'AI + Rule Engine',
      detectedKeywords: ['profile', 'account', 'update'],
      explanationBullets: [
        "✓ General account guidance keyword detected: profile",
        "✓ Python classifier predicted OTHER (91% confidence)",
        "✓ Non-urgent operational inquiry"
      ],
      summaryReason: 'Standard administrative inquiry routed to General Support.',
      routedAt: '2026-09-30T08:00:05Z'
    }
  },
  {
    ticketId: 'TK-1028',
    customerId: 'CUST-105',
    customerName: 'Marcus Aurelius',
    email: 'marcus@stoicconsulting.org',
    subject: 'Something is wrong with my account',
    description: 'My account is not working correctly. Things seem stuck and weird.',
    category: 'OTHER',
    priority: 'MEDIUM',
    confidence: 0.52,
    assignedTeam: 'Manual Review Team',
    status: 'MANUAL_REVIEW',
    routingMethod: 'Manual Review Required',
    routingReason: 'Low confidence score (52%) below 80% threshold. Ambiguous keywords require human verification.',
    detectedKeywords: ['account'],
    createdAt: '2026-09-30T10:05:00Z',
    updatedAt: '2026-09-30T10:05:00Z',
    routingResult: {
      ticketId: 'TK-1028',
      ruleCategory: 'OTHER',
      ruleScore: 0.45,
      aiCategory: 'OTHER',
      aiConfidence: 0.52,
      finalCategory: 'OTHER',
      finalConfidence: 0.52,
      priority: 'MEDIUM',
      assignedTeam: 'Manual Review Team',
      autoRouted: false,
      routingMethod: 'Manual Review Required',
      detectedKeywords: ['account'],
      explanationBullets: [
        "⚠ Vague description with minimal category keywords",
        "✓ Python classifier predicted OTHER (confidence: 52%)",
        "⚠ Confidence score (52%) is below routing threshold (80%)",
        "✓ Guardrail activated: Low confidence sent to Manual Review Team"
      ],
      summaryReason: 'The ticket contains insufficient category-specific information.',
      routedAt: '2026-09-30T10:05:05Z'
    }
  },
  {
    ticketId: 'TK-1029',
    customerId: 'CUST-101',
    customerName: 'Rahul Kumar',
    email: 'rahul.kumar@acme-corp.com',
    subject: 'Wire transfer invoice missing tax ID',
    description: 'Please provide an updated invoice with our European VAT registration number for the wire transfer.',
    category: 'BILLING',
    priority: 'MEDIUM',
    confidence: 0.92,
    assignedTeam: 'Billing Support',
    status: 'WAITING_FOR_CUSTOMER',
    routingMethod: 'AI + Rule Engine',
    routingReason: 'Confirmed billing inquiry via invoice and VAT keywords. Supported by customer billing history.',
    detectedKeywords: ['invoice', 'vat', 'wire transfer'],
    createdAt: '2026-09-30T07:30:00Z',
    updatedAt: '2026-09-30T08:15:00Z',
    routingResult: {
      ticketId: 'TK-1029',
      ruleCategory: 'BILLING',
      ruleScore: 0.90,
      aiCategory: 'BILLING',
      aiConfidence: 0.92,
      finalCategory: 'BILLING',
      finalConfidence: 0.92,
      priority: 'MEDIUM',
      assignedTeam: 'Billing Support',
      autoRouted: true,
      routingMethod: 'AI + Rule Engine',
      detectedKeywords: ['invoice', 'vat', 'wire transfer'],
      explanationBullets: [
        "✓ Keyword 'invoice' detected",
        "✓ Keyword 'wire transfer' detected",
        "✓ Python classifier predicted BILLING (92% confidence)",
        "✓ Customer has 4 previous billing tickets"
      ],
      summaryReason: 'Financial document request automatically sent to Billing Support.',
      routedAt: '2026-09-30T07:30:05Z'
    }
  },
  {
    ticketId: 'TK-1030',
    customerId: 'CUST-106',
    customerName: 'Amina Idris',
    email: 'amina@saharanet.io',
    subject: 'Production API returning 503 Service Unavailable',
    description: 'Critical incident: our production webhooks are failing with 503 Service Unavailable and entire system down!',
    category: 'TECHNICAL',
    priority: 'CRITICAL',
    confidence: 0.98,
    assignedTeam: 'Technical Support',
    status: 'IN_PROGRESS',
    routingMethod: 'AI + Rule Engine',
    routingReason: 'Critical priority detected (production down, 503, service unavailable). High-confidence technical classification.',
    detectedKeywords: ['production down', '503', 'service unavailable', 'api', 'failing'],
    createdAt: '2026-09-30T10:20:00Z',
    updatedAt: '2026-09-30T10:22:00Z',
    routingResult: {
      ticketId: 'TK-1030',
      ruleCategory: 'TECHNICAL',
      ruleScore: 0.98,
      aiCategory: 'TECHNICAL',
      aiConfidence: 0.98,
      finalCategory: 'TECHNICAL',
      finalConfidence: 0.98,
      priority: 'CRITICAL',
      assignedTeam: 'Technical Support',
      autoRouted: true,
      routingMethod: 'AI + Rule Engine',
      detectedKeywords: ['production down', '503', 'service unavailable', 'api', 'failing'],
      explanationBullets: [
        "[CRITICAL] Priority: 'production down' and 'service unavailable' detected",
        "• High severity technical keywords: api, 503, failing",
        "• Python classifier predicted TECHNICAL (98% confidence)",
        "• Immediate routing to Technical Support on-call"
      ],
      summaryReason: 'Service outage incident routed immediately with CRITICAL priority.',
      routedAt: '2026-09-30T10:20:05Z'
    }
  }
];

class MockHelpdeskEngine {
  private tickets: Ticket[] = [];
  private customers: Customer[] = [];
  private idCounter = 1030;
  private confidenceThreshold = 0.80;

  constructor() {
    this.init();
  }

  private init() {
    const savedTickets = localStorage.getItem('s_ticket_router_tickets');
    const savedCustomers = localStorage.getItem('s_ticket_router_customers');
    const savedThreshold = localStorage.getItem('s_ticket_router_threshold');

    if (savedTickets) {
      try {
        this.tickets = JSON.parse(savedTickets);
      } catch {
        this.tickets = [...INITIAL_TICKETS];
      }
    } else {
      this.tickets = [...INITIAL_TICKETS];
    }

    if (savedCustomers) {
      try {
        this.customers = JSON.parse(savedCustomers);
      } catch {
        this.customers = [...INITIAL_CUSTOMERS];
      }
    } else {
      this.customers = [...INITIAL_CUSTOMERS];
    }

    if (savedThreshold) {
      this.confidenceThreshold = parseFloat(savedThreshold) || 0.80;
    }
  }

  private persist() {
    localStorage.setItem('s_ticket_router_tickets', JSON.stringify(this.tickets));
    localStorage.setItem('s_ticket_router_customers', JSON.stringify(this.customers));
    localStorage.setItem('s_ticket_router_threshold', this.confidenceThreshold.toString());
  }

  public getConfidenceThreshold(): number {
    return this.confidenceThreshold;
  }

  public setConfidenceThreshold(val: number) {
    this.confidenceThreshold = val;
    this.persist();
  }

  public getTickets(): Ticket[] {
    return [...this.tickets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getTicketById(id: string): Ticket | undefined {
    return this.tickets.find(t => t.ticketId === id);
  }

  public getCustomers(): Customer[] {
    return [...this.customers];
  }

  public getCustomerById(id: string): Customer | undefined {
    return this.customers.find(c => c.customerId === id);
  }

  public loadDemoTickets(): { message: string; count: number } {
    this.tickets = [...INITIAL_TICKETS];
    this.customers = [...INITIAL_CUSTOMERS];
    this.idCounter = 1030;
    this.persist();
    return { message: 'Demo tickets reset successfully', count: this.tickets.length };
  }

  // Priority detection logic
  public detectPriority(text: string): Priority {
    const lower = text.toLowerCase();
    if (
      lower.includes('production down') ||
      lower.includes('entire system down') ||
      lower.includes('security incident') ||
      lower.includes('data loss') ||
      lower.includes('service unavailable')
    ) {
      return 'CRITICAL';
    }
    if (
      lower.includes('cannot access') ||
      lower.includes('urgent') ||
      lower.includes('business stopped') ||
      lower.includes('major failure') ||
      lower.includes('crashes') ||
      lower.includes('charged twice') ||
      lower.includes('refund')
    ) {
      return 'HIGH';
    }
    if (
      lower.includes('error') ||
      lower.includes('problem') ||
      lower.includes('issue') ||
      lower.includes('failed') ||
      lower.includes('bug')
    ) {
      return 'MEDIUM';
    }
    return 'LOW';
  }

  // NLP Classifier simulation
  public classifyText(text: string): {
    category: TicketCategory;
    confidence: number;
    detectedKeywords: string[];
    probabilities: Record<TicketCategory, number>;
  } {
    const lower = text.toLowerCase();
    const matchedBilling = BILLING_KEYWORDS.filter(k => lower.includes(k));
    const matchedTechnical = TECHNICAL_KEYWORDS.filter(k => lower.includes(k));
    const matchedOther = OTHER_KEYWORDS.filter(k => lower.includes(k));

    const allDetected = Array.from(new Set([...matchedBilling, ...matchedTechnical, ...matchedOther]));

    let billingScore = matchedBilling.length * 3.5;
    let technicalScore = matchedTechnical.length * 3.5;
    let otherScore = matchedOther.length * 2.0;

    // Base priors
    billingScore += 0.5;
    technicalScore += 0.5;
    otherScore += 1.0;

    const total = billingScore + technicalScore + otherScore;
    const probBilling = billingScore / total;
    const probTech = technicalScore / total;
    const probOther = otherScore / total;

    const probs: Record<TicketCategory, number> = {
      BILLING: Math.round(probBilling * 100) / 100,
      TECHNICAL: Math.round(probTech * 100) / 100,
      OTHER: Math.round(probOther * 100) / 100
    };

    let topCat: TicketCategory = 'OTHER';
    let topScore = probOther;

    if (probBilling > probTech && probBilling > probOther) {
      topCat = 'BILLING';
      topScore = probBilling;
    } else if (probTech > probBilling && probTech > probOther) {
      topCat = 'TECHNICAL';
      topScore = probTech;
    }

    // Specific domain calibration
    let confidence = 0.52;
    if (topCat === 'BILLING') {
      confidence = Math.min(0.97, Math.max(0.88, 0.82 + matchedBilling.length * 0.04));
    } else if (topCat === 'TECHNICAL') {
      confidence = Math.min(0.98, Math.max(0.89, 0.84 + matchedTechnical.length * 0.04));
    } else {
      if (allDetected.length > 0 && (lower.includes('profile') || lower.includes('question') || lower.includes('demo'))) {
        confidence = 0.91;
      } else {
        // Vague ticket like "My account isn't working"
        confidence = 0.52;
      }
    }

    return {
      category: topCat,
      confidence: Math.round(confidence * 100) / 100,
      detectedKeywords: allDetected,
      probabilities: probs
    };
  }

  // Full 8-step Routing Agent pipeline
  public async routeTicketWithSteps(
    payload: {
      customerName: string;
      email: string;
      subject: string;
      description: string;
      priority?: Priority;
    },
    onStepUpdate?: (step: RoutingStep, stepIndex: number) => void
  ): Promise<Ticket> {
    const steps: RoutingStep[] = [
      { id: 1, title: 'Receiving Ticket', detail: 'Ingesting customer submission into Routing Agent', status: 'pending' },
      { id: 2, title: 'Rule-Based Checks', detail: 'Scanning subject & description for domain keywords', status: 'pending' },
      { id: 3, title: 'Checking Customer History', detail: 'Querying historical ticket distribution and affinity', status: 'pending' },
      { id: 4, title: 'Sending to AI Classifier', detail: 'Vectorizing text with TF-IDF NLP model', status: 'pending' },
      { id: 5, title: 'Receiving Prediction', detail: 'Evaluating multinomial class distribution', status: 'pending' },
      { id: 6, title: 'Calculating Confidence', detail: 'Comparing against routing threshold', status: 'pending' },
      { id: 7, title: 'Assigning Support Team', detail: 'Mapping category and confidence to team queue', status: 'pending' },
      { id: 8, title: 'Ticket Routed', detail: 'Finalizing routing result and persistence', status: 'pending' }
    ];

    const updateStep = async (idx: number, status: 'in_progress' | 'completed' | 'warning', detail?: string, delay = 220) => {
      steps[idx].status = status;
      if (detail) steps[idx].detail = detail;
      if (onStepUpdate) onStepUpdate({ ...steps[idx] }, idx);
      await new Promise(r => setTimeout(r, delay));
    };

    // Step 1: Receiving
    await updateStep(0, 'in_progress', 'Ingesting ticket metadata...');
    const ticketId = `TK-${++this.idCounter}`;
    const combinedText = `${payload.subject} ${payload.description}`;
    await updateStep(0, 'completed', `Ticket ID allocated: #${ticketId}`);

    // Step 2: Rule Engine
    await updateStep(1, 'in_progress', 'Executing Java RuleEngine keyword checks...');
    const detectedPriority = this.detectPriority(combinedText);
    const finalPriority = payload.priority || detectedPriority;
    const lower = combinedText.toLowerCase();
    const matchedBilling = BILLING_KEYWORDS.filter(k => lower.includes(k));
    const matchedTech = TECHNICAL_KEYWORDS.filter(k => lower.includes(k));
    const matchedOther = OTHER_KEYWORDS.filter(k => lower.includes(k));
    const allKeywords = Array.from(new Set([...matchedBilling, ...matchedTech, ...matchedOther]));
    await updateStep(1, 'completed', `Rules detected ${allKeywords.length} keyword(s), Priority: ${finalPriority}`);

    // Step 3: Customer History
    await updateStep(2, 'in_progress', 'Checking customer record and past tickets...');
    let customer = this.customers.find(c => c.email.toLowerCase() === payload.email.toLowerCase());
    if (!customer) {
      customer = {
        customerId: `CUST-${100 + this.customers.length + 1}`,
        name: payload.customerName,
        email: payload.email,
        company: 'New Organization',
        tier: 'STARTER',
        history: {
          customerId: `CUST-${100 + this.customers.length + 1}`,
          totalTickets: 0,
          billingTickets: 0,
          technicalTickets: 0,
          otherTickets: 0,
          previousSubjects: []
        }
      };
      this.customers.push(customer);
    }
    const historyText = customer.history.totalTickets > 0
      ? `Found ${customer.history.totalTickets} previous tickets (${customer.history.billingTickets} billing, ${customer.history.technicalTickets} technical)`
      : 'New customer (first support interaction)';
    await updateStep(2, 'completed', historyText);

    // Step 4: Python AI Classifier call
    await updateStep(3, 'in_progress', 'Dispatching payload to Python FastAPI text classifier...');
    await new Promise(r => setTimeout(r, 260));
    await updateStep(3, 'completed', 'Text tokenized and vectorized via TF-IDF model');

    // Step 5: Receiving Prediction
    await updateStep(4, 'in_progress', 'Computing category probabilities...');
    const aiResult = this.classifyText(combinedText);
    await updateStep(4, 'completed', `Predicted Category: ${aiResult.category} (${Math.round(aiResult.confidence * 100)}%)`);

    // Step 6: Confidence calculation
    await updateStep(5, 'in_progress', `Comparing ${Math.round(aiResult.confidence * 100)}% to threshold (${Math.round(this.confidenceThreshold * 100)}%)...`);
    const isHighConfidence = aiResult.confidence >= this.confidenceThreshold;
    if (isHighConfidence) {
      await updateStep(5, 'completed', `Confidence ${Math.round(aiResult.confidence * 100)}% >= ${Math.round(this.confidenceThreshold * 100)}% - Auto-routing authorized`);
    } else {
      await updateStep(5, 'warning', `Confidence ${Math.round(aiResult.confidence * 100)}% < ${Math.round(this.confidenceThreshold * 100)}% - Triggering Manual Review guardrail`);
    }

    // Step 7: Support Team assignment
    await updateStep(6, 'in_progress', 'Assigning queue...');
    let assignedTeam = 'General Support';
    let status: TicketStatus = 'ROUTED';
    let routingMethod = 'AI + Rule Engine';
    let summaryReason = '';

    if (isHighConfidence) {
      if (aiResult.category === 'BILLING') {
        assignedTeam = 'Billing Support';
      } else if (aiResult.category === 'TECHNICAL') {
        assignedTeam = 'Technical Support';
      } else {
        assignedTeam = 'General Support';
      }
      summaryReason = `Detected ${allKeywords.slice(0, 3).join(', ')} keywords and confirmed by text classifier (${Math.round(aiResult.confidence * 100)}% confidence).`;
      status = 'ROUTED';
    } else {
      assignedTeam = 'Manual Review Team';
      routingMethod = 'Manual Review Required';
      summaryReason = `Low confidence score (${Math.round(aiResult.confidence * 100)}%) below ${Math.round(this.confidenceThreshold * 100)}% threshold. Ambiguous keywords require human verification.`;
      status = 'MANUAL_REVIEW';
    }
    await updateStep(6, 'completed', `Assigned to ${assignedTeam}`);

    // Step 8: Build explanations and finalize
    await updateStep(7, 'in_progress', 'Compiling audit logs and explanation bullets...');
    const bullets: string[] = [];
    allKeywords.forEach(kw => {
      bullets.push(`✓ Keyword '${kw}' detected in ticket text`);
    });
    bullets.push(`✓ Python text classifier predicted ${aiResult.category} (${Math.round(aiResult.confidence * 100)}% confidence)`);
    if (customer.history.totalTickets > 0) {
      if (aiResult.category === 'BILLING' && customer.history.billingTickets > 0) {
        bullets.push(`✓ Customer has ${customer.history.billingTickets} previous billing ticket(s)`);
      } else if (aiResult.category === 'TECHNICAL' && customer.history.technicalTickets > 0) {
        bullets.push(`✓ Customer has ${customer.history.technicalTickets} previous technical ticket(s)`);
      }
    }
    if (isHighConfidence) {
      bullets.push(`✓ High confidence (${Math.round(aiResult.confidence * 100)}% >= ${Math.round(this.confidenceThreshold * 100)}%) - Automatically routed to ${assignedTeam}`);
    } else {
      bullets.push(`⚠ Low confidence score (${Math.round(aiResult.confidence * 100)}%) below ${Math.round(this.confidenceThreshold * 100)}% threshold`);
      bullets.push(`✓ Guardrail safety check: Dispatched to Manual Review Team`);
    }

    const routingResult: RoutingResult = {
      ticketId,
      ruleCategory: aiResult.category,
      ruleScore: aiResult.confidence,
      aiCategory: aiResult.category,
      aiConfidence: aiResult.confidence,
      finalCategory: aiResult.category,
      finalConfidence: aiResult.confidence,
      priority: finalPriority,
      assignedTeam,
      autoRouted: isHighConfidence,
      routingMethod,
      detectedKeywords: allKeywords,
      explanationBullets: bullets,
      summaryReason,
      routedAt: new Date().toISOString()
    };

    const newTicket: Ticket = {
      ticketId,
      customerId: customer.customerId,
      customerName: customer.name,
      email: customer.email,
      subject: payload.subject,
      description: payload.description,
      category: aiResult.category,
      priority: finalPriority,
      confidence: aiResult.confidence,
      assignedTeam,
      status,
      routingMethod,
      routingReason: summaryReason,
      detectedKeywords: allKeywords,
      routingResult,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update customer history
    customer.history.totalTickets++;
    if (aiResult.category === 'BILLING') customer.history.billingTickets++;
    else if (aiResult.category === 'TECHNICAL') customer.history.technicalTickets++;
    else customer.history.otherTickets++;
    customer.history.previousSubjects.unshift(payload.subject);

    this.tickets.unshift(newTicket);
    this.persist();

    await updateStep(7, 'completed', `Ticket #${ticketId} successfully processed and stored`);
    return newTicket;
  }

  public updateTicketStatus(id: string, status: TicketStatus): Ticket | null {
    const t = this.tickets.find(x => x.ticketId === id);
    if (!t) return null;
    t.status = status;
    t.updatedAt = new Date().toISOString();
    this.persist();
    return t;
  }

  public manualAssignTicket(id: string, category: TicketCategory, team: string): Ticket | null {
    const t = this.tickets.find(x => x.ticketId === id);
    if (!t) return null;
    t.category = category;
    t.assignedTeam = team;
    t.status = 'ROUTED';
    t.routingMethod = 'Manual Assignment';
    t.routingReason = `Manually assigned to ${team} by administrator.`;
    t.updatedAt = new Date().toISOString();
    if (t.routingResult) {
      t.routingResult.finalCategory = category;
      t.routingResult.assignedTeam = team;
      t.routingResult.autoRouted = false;
      t.routingResult.routingMethod = 'Manual Assignment';
      t.routingResult.explanationBullets.push(`✓ Administrator manually assigned to ${team} (${new Date().toLocaleTimeString()})`);
    }
    this.persist();
    return t;
  }

  public getDashboardMetrics(): DashboardMetrics {
    const total = this.tickets.length;
    let billing = 0;
    let technical = 0;
    let other = 0;
    let manualReview = 0;
    let highOrCritical = 0;
    let autoRouted = 0;
    let sumConfidence = 0;

    const byCategory: Record<string, number> = { BILLING: 0, TECHNICAL: 0, OTHER: 0 };
    const byPriority: Record<string, number> = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
    const byStatus: Record<string, number> = {
      NEW: 0,
      ANALYZING: 0,
      ROUTED: 0,
      IN_PROGRESS: 0,
      WAITING_FOR_CUSTOMER: 0,
      RESOLVED: 0,
      MANUAL_REVIEW: 0
    };
    const byTeam: Record<string, number> = {
      'Billing Support': 0,
      'Technical Support': 0,
      'General Support': 0,
      'Manual Review Team': 0
    };

    this.tickets.forEach(t => {
      if (t.category === 'BILLING') billing++;
      else if (t.category === 'TECHNICAL') technical++;
      else other++;

      byCategory[t.category] = (byCategory[t.category] || 0) + 1;
      byPriority[t.priority] = (byPriority[t.priority] || 0) + 1;
      byStatus[t.status] = (byStatus[t.status] || 0) + 1;
      byTeam[t.assignedTeam] = (byTeam[t.assignedTeam] || 0) + 1;

      if (t.priority === 'HIGH' || t.priority === 'CRITICAL') {
        highOrCritical++;
      }

      if (t.assignedTeam === 'Manual Review Team' || t.status === 'MANUAL_REVIEW') {
        manualReview++;
      } else {
        autoRouted++;
      }

      sumConfidence += t.confidence;
    });

    const averageConfidence = total > 0 ? sumConfidence / total : 0;
    const autoRoutedPercentage = total > 0 ? (autoRouted / total) * 100 : 0;
    const manualReviewPercentage = total > 0 ? (manualReview / total) * 100 : 0;

    return {
      totalTickets: total,
      billingTickets: billing,
      technicalTickets: technical,
      otherTickets: other,
      manualReviewTickets: manualReview,
      highOrCriticalTickets: highOrCritical,
      autoRoutedTickets: autoRouted,
      averageConfidence: Math.round(averageConfidence * 100) / 100,
      autoRoutedPercentage: Math.round(autoRoutedPercentage * 10) / 10,
      manualReviewPercentage: Math.round(manualReviewPercentage * 10) / 10,
      byCategory,
      byPriority,
      byStatus,
      byTeam
    };
  }
}

export const mockEngine = new MockHelpdeskEngine();
