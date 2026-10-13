export type TicketCategory = 'BILLING' | 'TECHNICAL' | 'OTHER';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type TicketStatus = 
  | 'NEW'
  | 'ANALYZING'
  | 'ROUTED'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_CUSTOMER'
  | 'RESOLVED'
  | 'MANUAL_REVIEW';

export type SupportTeam = 
  | 'Billing Support'
  | 'Technical Support'
  | 'General Support'
  | 'Manual Review Team';

export interface RoutingResult {
  ticketId: string;
  ruleCategory?: TicketCategory;
  ruleScore?: number;
  aiCategory?: TicketCategory;
  aiConfidence?: number;
  finalCategory: TicketCategory;
  finalConfidence: number;
  priority: Priority;
  assignedTeam: SupportTeam | string;
  autoRouted: boolean;
  routingMethod: string;
  detectedKeywords: string[];
  explanationBullets: string[];
  summaryReason: string;
  routedAt: string;
}

export interface Ticket {
  ticketId: string;
  customerId: string;
  customerName: string;
  email: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: Priority;
  confidence: number;
  assignedTeam: SupportTeam | string;
  status: TicketStatus;
  routingMethod: string;
  routingReason: string;
  detectedKeywords: string[];
  routingResult?: RoutingResult;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerHistory {
  customerId: string;
  totalTickets: number;
  billingTickets: number;
  technicalTickets: number;
  otherTickets: number;
  previousSubjects: string[];
}

export interface Customer {
  customerId: string;
  name: string;
  email: string;
  company: string;
  tier: 'STARTER' | 'PRO' | 'ENTERPRISE';
  history: CustomerHistory;
}

export interface DashboardMetrics {
  totalTickets: number;
  billingTickets: number;
  technicalTickets: number;
  otherTickets: number;
  manualReviewTickets: number;
  highOrCriticalTickets: number;
  autoRoutedTickets: number;
  averageConfidence: number;
  autoRoutedPercentage: number;
  manualReviewPercentage: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
  byStatus: Record<string, number>;
  byTeam: Record<string, number>;
}

export interface RoutingStep {
  id: number;
  title: string;
  detail: string;
  status: 'pending' | 'in_progress' | 'completed' | 'warning';
}

export interface AuthUser {
  email: string;
  name: string;
  role: string;
  company: string;
  avatarInitials: string;
}

export type PageId = 
  | 'dashboard'
  | 'tickets'
  | 'create-ticket'
  | 'ticket-details'
  | 'manual-review'
  | 'customers'
  | 'analytics'
  | 'settings'
  | 'architecture'
  | 'oop-structure'
  | 'ai-classification'
  | 'glyph-portal'
  | 'login'
  | 'privacy'
  | 'terms';
