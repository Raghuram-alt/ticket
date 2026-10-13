import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { 
  LayoutDashboard, 
  Ticket as TicketIcon, 
  PlusCircle, 
  ShieldAlert, 
  Users, 
  BarChart3, 
  Settings, 
  Cpu, 
  Layers, 
  BrainCircuit,
  Sparkles,
  Server,
  X,
  Compass,
  Radio,
  Home,
  Zap,
  KeyRound,
  Shield,
  Scale
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const { activePage, setActivePage, metrics, backendStatus, startTour, currentUser } = useApp();

  const autoRoutedPct = metrics.totalTickets > 0 
    ? Math.round((metrics.autoRoutedTickets / metrics.totalTickets) * 100) 
    : 0;

  const navGroups: {
    title: string;
    items: {
      id: PageId;
      label: string;
      icon: React.ReactNode;
      badge?: number | string;
      badgeColor?: string;
    }[];
  }[] = [
    {
      title: 'TICKET MANAGEMENT',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4 text-indigo-400" /> },
        { id: 'tickets', label: 'All Tickets', icon: <TicketIcon className="w-4 h-4 text-cyan-400" />, badge: metrics.totalTickets },
        { id: 'create-ticket', label: 'Create Ticket', icon: <PlusCircle className="w-4 h-4 text-emerald-400" /> },
        { 
          id: 'manual-review', 
          label: 'Manual Review', 
          icon: <ShieldAlert className="w-4 h-4 text-rose-400" />, 
          badge: metrics.manualReviewTickets,
          badgeColor: metrics.manualReviewTickets > 0 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : undefined
        },
        { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4 text-slate-400" /> },
      ]
    },
    {
      title: 'INTELLIGENCE & METRICS',
      items: [
        { id: 'ai-classification', label: 'Classifier Testing', icon: <BrainCircuit className="w-4 h-4 text-blue-400" /> },
        { 
          id: 'glyph-portal', 
          label: 'Routing Portal', 
          icon: <Sparkles className="w-4 h-4 text-amber-400" />
        },
        { id: 'analytics', label: 'Analytics & SLA', icon: <BarChart3 className="w-4 h-4 text-emerald-400" /> },
      ]
    },
    {
      title: 'SYSTEM & SETTINGS',
      items: [
        { id: 'architecture', label: 'System Architecture', icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
        { id: 'oop-structure', label: 'OOP Java Engine', icon: <Layers className="w-4 h-4 text-cyan-400" /> },
        { id: 'settings', label: 'Settings & Rules', icon: <Settings className="w-4 h-4 text-slate-400" /> },
        { id: 'login', label: 'Account Sign In', icon: <KeyRound className="w-4 h-4 text-indigo-400" /> },
      ]
    },
    {
      title: 'LEGAL & COMPLIANCE',
      items: [
        { id: 'privacy', label: 'Privacy Policy', icon: <Shield className="w-4 h-4 text-slate-400" /> },
        { id: 'terms', label: 'Terms of Service', icon: <Scale className="w-4 h-4 text-slate-400" /> },
      ]
    }
  ];

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden animate-fade-in"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 flex flex-col glass-sidebar transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-16 px-5 border-b border-white/[0.1] flex items-center justify-between">
          <button 
            onClick={() => handleNavClick('dashboard')}
            title="Go to Dashboard"
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30 ring-1 ring-white/20 transition-all duration-200">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1 font-display group-hover:text-indigo-300 transition-colors">
                TICKET<span className="text-indigo-400 font-mono text-xs font-semibold">ROUTER</span>
              </h1>
              <p className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                Support Triage Platform
              </p>
            </div>
          </button>
          <button 
            onClick={onMobileClose} 
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="px-3 pb-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600/20 text-white border-l-2 border-indigo-500 font-semibold backdrop-blur-md'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] backdrop-blur-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-white' : 'opacity-80'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                          item.badgeColor || 'bg-white/[0.08] text-slate-300 border-white/[0.15]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Guided Tour Launcher */}
        <div className="p-3 border-t border-white/[0.08]">
          <button
            onClick={() => {
              if (mobileOpen) onMobileClose();
              startTour();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
              <span>Feature Walkthrough</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Guide
            </span>
          </button>
        </div>

        {/* User Account / Profile Strip */}
        <div className="p-3 border-t border-white/[0.08] bg-black/10">
          <button
            onClick={() => handleNavClick('login')}
            className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer group ${
              activePage === 'login'
                ? 'bg-indigo-500/20 border-indigo-400/40 shadow-sm'
                : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.08]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm ring-1 ring-white/20">
                {currentUser?.avatarInitials || 'US'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                  {currentUser ? currentUser.name : 'Sign In'}
                </p>
                <p className="text-[10px] text-slate-400 font-mono truncate">
                  {currentUser ? currentUser.role : 'Support Staff'}
                </p>
              </div>
            </div>
            <KeyRound className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-300 shrink-0" />
          </button>
        </div>

        {/* Real Dynamic Telemetry Footer */}
        <div className="p-3.5 border-t border-white/[0.1] bg-black/20">
          <div className="p-3 rounded-lg bg-white/[0.04] backdrop-blur-md border border-white/[0.1] space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300 font-sans">Routing Health</span>
              <span className="font-mono text-emerald-300 flex items-center gap-1.5 text-[10px]">
                <Radio className="w-3 h-3 text-emerald-400" /> {autoRoutedPct}% Auto-Routed
              </span>
            </div>
            <div className="w-full bg-white/[0.08] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full transition-all duration-500" 
                style={{ width: `${autoRoutedPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Auto: {metrics.autoRoutedTickets}</span>
              <span>Manual: {metrics.manualReviewTickets}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
