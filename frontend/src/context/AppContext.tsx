import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  Ticket, 
  Customer, 
  DashboardMetrics, 
  PageId, 
  TicketCategory, 
  Priority, 
  TicketStatus, 
  RoutingResult,
  RoutingStep,
  AuthUser
} from '../types';
import { mockEngine } from '../services/mockEngine';
import { apiService } from '../services/api';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  tickets: Ticket[];
  customers: Customer[];
  metrics: DashboardMetrics;
  activePage: PageId;
  selectedTicketId: string | null;
  selectedCustomerId: string | null;
  isLiveRouting: boolean;
  routingSteps: RoutingStep[];
  lastRoutingResult: RoutingResult | null;
  searchQuery: string;
  categoryFilter: string;
  priorityFilter: string;
  statusFilter: string;
  teamFilter: string;
  backendMode: 'simulation' | 'backend';
  backendStatus: 'connected' | 'simulation';
  isCheckingBackend: boolean;
  confidenceThreshold: number;
  toast: Toast | null;
  theme: 'dark' | 'light' | 'midnight';
  
  // Authentication
  currentUser: AuthUser | null;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  
  // Interactive Demo Tour
  isTourOpen: boolean;
  tourStep: number;
  startTour: () => void;
  closeTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  setTourStep: (step: number) => void;
  
  // Actions
  setTheme: (theme: 'dark' | 'light' | 'midnight') => void;
  setActivePage: (page: PageId) => void;
  selectTicket: (id: string | null) => void;
  selectCustomer: (id: string | null) => void;
  setSearchQuery: (q: string) => void;
  setCategoryFilter: (c: string) => void;
  setPriorityFilter: (p: string) => void;
  setStatusFilter: (s: string) => void;
  setTeamFilter: (t: string) => void;
  setBackendMode: (mode: 'simulation' | 'backend') => void;
  setConfidenceThreshold: (val: number) => void;
  createAndRouteTicket: (payload: {
    customerName: string;
    email: string;
    subject: string;
    description: string;
    priority?: Priority;
  }) => Promise<Ticket>;
  updateTicketStatus: (id: string, status: TicketStatus) => Promise<void>;
  manualAssignTicket: (id: string, category: TicketCategory, team: string) => Promise<void>;
  loadDemoTickets: () => Promise<void>;
  createRandomDemoTicket: () => Promise<Ticket>;
  showToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  dismissToast: () => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>(mockEngine.getDashboardMetrics());
  const [activePage, setActivePage] = useState<PageId>('login');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Live Routing Stepper state
  const [isLiveRouting, setIsLiveRouting] = useState<boolean>(false);
  const [routingSteps, setRoutingSteps] = useState<RoutingStep[]>([]);
  const [lastRoutingResult, setLastRoutingResult] = useState<RoutingResult | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [teamFilter, setTeamFilter] = useState<string>('ALL');

  // Backend Connectivity
  const [backendMode, setBackendModeState] = useState<'simulation' | 'backend'>('simulation');
  const [backendStatus, setBackendStatus] = useState<'connected' | 'simulation'>('simulation');
  const [isCheckingBackend, setIsCheckingBackend] = useState<boolean>(false);
  const [confidenceThreshold, setThresholdState] = useState<number>(mockEngine.getConfidenceThreshold());
  const [theme, setThemeState] = useState<'dark' | 'light' | 'midnight'>(() => {
    return (localStorage.getItem('ticket_router_theme') as 'dark' | 'light' | 'midnight') || 'dark';
  });

  const setTheme = useCallback((newTheme: 'dark' | 'light' | 'midnight') => {
    setThemeState(newTheme);
    localStorage.setItem('ticket_router_theme', newTheme);
    document.documentElement.className = newTheme;
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('router_ai_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return {
      email: 'alex.rivera@router.ai',
      name: 'Alex Rivera',
      role: 'Revenue Operations Lead',
      company: 'Acme SaaS Corp',
      avatarInitials: 'AR'
    };
  });

  const login = useCallback(async (email: string, _password?: string): Promise<boolean> => {
    // Simulated authentication verification
    const namePart = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const initials = formattedName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'US';

    const user: AuthUser = {
      email,
      name: formattedName || 'Operations Manager',
      role: email.includes('admin') ? 'Global RevOps Administrator' : 'Revenue Operations Lead',
      company: email.includes('@') ? email.split('@')[1] : 'Enterprise Cloud',
      avatarInitials: initials
    };

    setCurrentUser(user);
    localStorage.setItem('router_ai_user', JSON.stringify(user));
    return true;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('router_ai_user');
  }, []);

  // Interactive Demo Tour
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [tourStep, setTourStepState] = useState<number>(0);

  const startTour = useCallback(() => {
    setIsTourOpen(true);
    setTourStepState(0);
    setActivePage('dashboard');
  }, []);

  const closeTour = useCallback(() => {
    setIsTourOpen(false);
  }, []);

  const nextTourStep = useCallback(() => {
    setTourStepState(prev => prev + 1);
  }, []);

  const prevTourStep = useCallback(() => {
    setTourStepState(prev => Math.max(0, prev - 1));
  }, []);

  const setTourStep = useCallback((step: number) => {
    setTourStepState(step);
  }, []);

  // Toast
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    setToast({ id: Date.now().toString(), type, title, message });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  const refreshData = useCallback(() => {
    const t = mockEngine.getTickets();
    const c = mockEngine.getCustomers();
    const m = mockEngine.getDashboardMetrics();
    setTickets(t);
    setCustomers(c);
    setMetrics(m);
  }, []);

  // Initial load
  useEffect(() => {
    refreshData();

    // Check if real Java Spring Boot backend is running
    setIsCheckingBackend(true);
    apiService.checkBackendHealth().then(isAvailable => {
      setIsCheckingBackend(false);
      if (isAvailable) {
        setBackendStatus('connected');
        setBackendModeState('backend');
        showToast('success', 'Backend Connected', 'Connected to real Java Spring Boot & Python services!');
      } else {
        setBackendStatus('simulation');
        setBackendModeState('simulation');
      }
    });
  }, [refreshData, showToast]);

  const selectTicket = (id: string | null) => {
    setSelectedTicketId(id);
    if (id) {
      setActivePage('ticket-details');
    }
  };

  const selectCustomer = (id: string | null) => {
    setSelectedCustomerId(id);
    if (id) {
      setActivePage('customers');
    }
  };

  const setConfidenceThreshold = (val: number) => {
    setThresholdState(val);
    mockEngine.setConfidenceThreshold(val);
    refreshData();
    showToast('info', 'Threshold Updated', `Routing confidence threshold set to ${Math.round(val * 100)}%`);
  };

  const setBackendMode = (mode: 'simulation' | 'backend') => {
    setBackendModeState(mode);
    if (mode === 'backend') {
      setIsCheckingBackend(true);
      apiService.checkBackendHealth().then(ok => {
        setIsCheckingBackend(false);
        if (ok) {
          setBackendStatus('connected');
          showToast('success', 'Backend Live', 'Now communicating directly with Spring Boot REST API');
        } else {
          setBackendStatus('simulation');
          showToast('warning', 'Backend Offline', 'Spring Boot is not detected on port 8080. Operating in High-Fidelity Simulation mode.');
        }
      });
    } else {
      setBackendStatus('simulation');
      showToast('info', 'Simulation Active', 'Operating in High-Fidelity In-Browser Simulation mode.');
    }
  };

  const createAndRouteTicket = async (payload: {
    customerName: string;
    email: string;
    subject: string;
    description: string;
    priority?: Priority;
  }): Promise<Ticket> => {
    setIsLiveRouting(true);
    setRoutingSteps([]);
    setLastRoutingResult(null);

    try {
      const ticket = await mockEngine.routeTicketWithSteps(payload, (step) => {
        setRoutingSteps(prev => {
          const next = [...prev];
          const existsIdx = next.findIndex(s => s.id === step.id);
          if (existsIdx >= 0) {
            next[existsIdx] = step;
          } else {
            next.push(step);
          }
          return next;
        });
      });

      refreshData();
      if (ticket.routingResult) {
        setLastRoutingResult(ticket.routingResult);
      }

      if (ticket.assignedTeam !== 'Manual Review Team') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
        showToast('success', 'Ticket Automatically Routed', `Assigned to ${ticket.assignedTeam} with ${Math.round(ticket.confidence * 100)}% confidence.`);
      } else {
        showToast('warning', 'Sent to Manual Review', `Confidence ${Math.round(ticket.confidence * 100)}% below threshold. Dispatched to Manual Review.`);
      }

      return ticket;
    } finally {
      setIsLiveRouting(false);
    }
  };

  const updateTicketStatus = async (id: string, status: TicketStatus) => {
    mockEngine.updateTicketStatus(id, status);
    refreshData();
    showToast('info', 'Status Updated', `Ticket #${id} status changed to ${status}`);
  };

  const manualAssignTicket = async (id: string, category: TicketCategory, team: string) => {
    mockEngine.manualAssignTicket(id, category, team);
    refreshData();
    showToast('success', 'Ticket Assigned', `Ticket #${id} manually assigned to ${team} (${category})`);
  };

  const loadDemoTickets = async () => {
    const res = mockEngine.loadDemoTickets();
    refreshData();
    showToast('info', 'Demo Tickets Loaded', res.message);
  };

  const createRandomDemoTicket = async (): Promise<Ticket> => {
    const presets = [
      {
        customerName: 'Rahul Kumar',
        email: 'rahul.kumar@acme-corp.com',
        subject: 'Charged twice for monthly subscription renewal',
        description: 'I was charged twice on my credit card for my monthly subscription and need one payment refunded immediately.'
      },
      {
        customerName: 'Sarah Chen',
        email: 'sarah.c@techflow.io',
        subject: 'API returning 500 error when uploading large files',
        description: 'Our backend microservice receives a 500 internal server error and timeout exception whenever calling the document export endpoint.'
      },
      {
        customerName: 'Elena Rostova',
        email: 'elena@novasoft.dev',
        subject: 'Inquiry regarding GDPR compliance and audit report',
        description: 'Where can we download your latest SOC2 Type II certification and GDPR data processing addendum for our compliance audit?'
      },
      {
        customerName: 'Marcus Aurelius',
        email: 'marcus@stoicconsulting.org',
        subject: 'Account seems strange today',
        description: 'Something feels wrong and sluggish with my account today. Please check.'
      },
      {
        customerName: 'Amina Idris',
        email: 'amina@saharanet.io',
        subject: 'Production down - service unavailable for all users',
        description: 'Urgent critical incident: our entire production cluster is reporting service unavailable and all API requests are failing.'
      }
    ];

    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    setActivePage('create-ticket');
    return createAndRouteTicket(randomPreset);
  };

  return (
    <AppContext.Provider
      value={{
        tickets,
        customers,
        metrics,
        activePage,
        selectedTicketId,
        selectedCustomerId,
        isLiveRouting,
        routingSteps,
        lastRoutingResult,
        searchQuery,
        categoryFilter,
        priorityFilter,
        statusFilter,
        teamFilter,
        backendMode,
        backendStatus,
        isCheckingBackend,
        confidenceThreshold,
        toast,
        theme,
        setTheme,
        setActivePage,
        selectTicket,
        selectCustomer,
        setSearchQuery,
        setCategoryFilter,
        setPriorityFilter,
        setStatusFilter,
        setTeamFilter,
        setBackendMode,
        setConfidenceThreshold,
        createAndRouteTicket,
        updateTicketStatus,
        manualAssignTicket,
        loadDemoTickets,
        createRandomDemoTicket,
        showToast,
        dismissToast,
        refreshData,
        isTourOpen,
        tourStep,
        startTour,
        closeTour,
        nextTourStep,
        prevTourStep,
        setTourStep,
        currentUser,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
