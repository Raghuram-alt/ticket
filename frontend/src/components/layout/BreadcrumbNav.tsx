import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { 
  Home, 
  ChevronRight, 
  ArrowLeft,
  Ticket as TicketIcon, 
  PlusCircle, 
  ShieldAlert, 
  Users, 
  BarChart3, 
  BrainCircuit, 
  Sparkles, 
  Cpu, 
  Layers, 
  Settings,
  FileText,
  KeyRound,
  Shield,
  Scale
} from 'lucide-react';

interface PageMeta {
  title: string;
  group: string;
  icon: React.ReactNode;
}

const PAGE_META: Record<string, PageMeta> = {
  'dashboard': { 
    title: 'Dashboard', 
    group: 'Ticket Management', 
    icon: <Home className="w-3.5 h-3.5 text-indigo-400" /> 
  },
  'tickets': { 
    title: 'All Tickets', 
    group: 'Ticket Management', 
    icon: <TicketIcon className="w-3.5 h-3.5 text-cyan-400" /> 
  },
  'create-ticket': { 
    title: 'Create Ticket', 
    group: 'Ticket Management', 
    icon: <PlusCircle className="w-3.5 h-3.5 text-emerald-400" /> 
  },
  'ticket-details': { 
    title: 'Ticket Details', 
    group: 'Ticket Management', 
    icon: <FileText className="w-3.5 h-3.5 text-indigo-400" /> 
  },
  'manual-review': { 
    title: 'Manual Review', 
    group: 'Ticket Management', 
    icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> 
  },
  'customers': { 
    title: 'Customers Directory', 
    group: 'Ticket Management', 
    icon: <Users className="w-3.5 h-3.5 text-slate-400" /> 
  },
  'ai-classification': { 
    title: 'Classifier Testing', 
    group: 'Intelligence & Metrics', 
    icon: <BrainCircuit className="w-3.5 h-3.5 text-blue-400" /> 
  },
  'glyph-portal': { 
    title: 'Routing Portal', 
    group: 'Intelligence & Metrics', 
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 
  },
  'analytics': { 
    title: 'Analytics & SLAs', 
    group: 'Intelligence & Metrics', 
    icon: <BarChart3 className="w-3.5 h-3.5 text-emerald-400" /> 
  },
  'architecture': { 
    title: 'System Architecture', 
    group: 'System & Architecture', 
    icon: <Cpu className="w-3.5 h-3.5 text-indigo-400" /> 
  },
  'oop-structure': { 
    title: 'OOP Java Engine', 
    group: 'System & Architecture', 
    icon: <Layers className="w-3.5 h-3.5 text-cyan-400" /> 
  },
  'settings': { 
    title: 'Router Settings', 
    group: 'System & Architecture', 
    icon: <Settings className="w-3.5 h-3.5 text-slate-400" /> 
  },
  'login': { 
    title: 'Account Sign In', 
    group: 'System & Architecture', 
    icon: <KeyRound className="w-3.5 h-3.5 text-indigo-400" /> 
  },
  'privacy': {
    title: 'Privacy Policy',
    group: 'Legal & Compliance',
    icon: <Shield className="w-3.5 h-3.5 text-slate-400" />
  },
  'terms': {
    title: 'Terms of Service',
    group: 'Legal & Compliance',
    icon: <Scale className="w-3.5 h-3.5 text-slate-400" />
  }
};

export const BreadcrumbNav: React.FC = () => {
  const { activePage, setActivePage, selectedTicketId, selectTicket } = useApp();

  // Do not show breadcrumbs on Dashboard or Login page
  if (activePage === 'dashboard' || activePage === 'login') {
    return null;
  }

  const currentMeta = PAGE_META[activePage] || {
    title: activePage,
    group: 'Platform',
    icon: <Home className="w-3.5 h-3.5 text-indigo-400" />
  };

  return (
    <nav 
      aria-label="Breadcrumb hierarchy" 
      className="mb-5 px-3 py-2 rounded-xl glass-card border border-white/[0.08] flex items-center justify-between gap-3 text-xs shadow-sm bg-white/[0.02] backdrop-blur-md"
    >
      {/* Hierarchy Trail */}
      <ol className="flex items-center gap-1.5 min-w-0 overflow-x-auto py-0.5 no-scrollbar text-slate-400 font-sans">
        {/* Level 0: Home / Dashboard */}
        <li>
          <button
            onClick={() => {
              if (selectedTicketId) selectTicket(null);
              setActivePage('dashboard');
            }}
            title="Go to Dashboard"
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0 font-medium"
          >
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </li>

        {/* Separator */}
        <li aria-hidden="true" className="text-slate-600 shrink-0">
          <ChevronRight className="w-3 h-3" />
        </li>

        {/* Level 1: Functional Category */}
        <li className="shrink-0 font-mono text-[11px] text-slate-400 font-medium px-1">
          {currentMeta.group}
        </li>

        {/* Separator */}
        <li aria-hidden="true" className="text-slate-600 shrink-0">
          <ChevronRight className="w-3 h-3" />
        </li>

        {/* Level 2: Active Page */}
        <li className="shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white font-semibold shadow-inner">
            {currentMeta.icon}
            <span className="truncate max-w-[140px] sm:max-w-[200px]">
              {currentMeta.title}
            </span>
          </div>
        </li>

        {/* Level 3: Deep Ticket ID context if inspected */}
        {activePage === 'ticket-details' && selectedTicketId && (
          <>
            <li aria-hidden="true" className="text-slate-600 shrink-0">
              <ChevronRight className="w-3 h-3" />
            </li>
            <li className="shrink-0">
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 font-mono text-[11px] font-bold">
                {selectedTicketId}
              </span>
            </li>
          </>
        )}
      </ol>

      {/* Right: Quick Context Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* If viewing details, provide quick back to tickets table */}
        {activePage === 'ticket-details' && (
          <button
            onClick={() => setActivePage('tickets')}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer font-medium text-[11px]"
          >
            <TicketIcon className="w-3 h-3 text-cyan-400" />
            <span>All Tickets</span>
          </button>
        )}

        <button
          onClick={() => setActivePage('dashboard')}
          title="Back to Dashboard"
          className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
          <span>Dashboard</span>
        </button>
      </div>
    </nav>
  );
};
