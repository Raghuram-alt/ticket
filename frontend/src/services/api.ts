import { Ticket, Customer, DashboardMetrics, TicketCategory, Priority, TicketStatus } from '../types';

const JAVA_API_BASE = 'http://localhost:8080/api';
const PYTHON_API_BASE = 'http://localhost:8000';

export interface ClassifyResponse {
  category: TicketCategory;
  confidence: number;
  probabilities?: Record<string, number>;
  detected_keywords?: string[];
  reason?: string;
}

export const apiService = {
  // Check if real Java Spring Boot backend is reachable
  async checkBackendHealth(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`${JAVA_API_BASE}/tickets`, {
        signal: controller.signal,
        method: 'GET'
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Check if real Python FastAPI service is reachable
  async checkPythonHealth(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`${PYTHON_API_BASE}/health`, {
        signal: controller.signal,
        method: 'GET'
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Call Python FastAPI classifier directly
  async classifyTextWithPython(text: string): Promise<ClassifyResponse> {
    const res = await fetch(`${PYTHON_API_BASE}/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) {
      throw new Error(`Python classification failed: ${res.statusText}`);
    }
    return res.json();
  },

  // Tickets API
  async getTickets(): Promise<Ticket[]> {
    const res = await fetch(`${JAVA_API_BASE}/tickets`);
    if (!res.ok) throw new Error('Failed to fetch tickets');
    return res.json();
  },

  async getTicket(id: string): Promise<Ticket> {
    const res = await fetch(`${JAVA_API_BASE}/tickets/${id}`);
    if (!res.ok) throw new Error('Ticket not found');
    return res.json();
  },

  async createTicket(payload: {
    customerName: string;
    email: string;
    subject: string;
    description: string;
    priority?: Priority;
  }): Promise<Ticket> {
    const res = await fetch(`${JAVA_API_BASE}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create ticket');
    return res.json();
  },

  async updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket> {
    const res = await fetch(`${JAVA_API_BASE}/tickets/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update ticket status');
    return res.json();
  },

  async manuallyAssignTicket(id: string, category: TicketCategory, team: string): Promise<Ticket> {
    const res = await fetch(`${JAVA_API_BASE}/tickets/${id}/manual-assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, team })
    });
    if (!res.ok) throw new Error('Failed to assign ticket');
    return res.json();
  },

  async loadDemoTickets(): Promise<{ message: string; count: number }> {
    const res = await fetch(`${JAVA_API_BASE}/tickets/demo-load`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reload demo tickets');
    return res.json();
  },

  // Customers API
  async getCustomers(): Promise<Customer[]> {
    const res = await fetch(`${JAVA_API_BASE}/customers`);
    if (!res.ok) throw new Error('Failed to fetch customers');
    return res.json();
  },

  // Analytics API
  async getAnalytics(): Promise<DashboardMetrics> {
    const res = await fetch(`${JAVA_API_BASE}/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  }
};
