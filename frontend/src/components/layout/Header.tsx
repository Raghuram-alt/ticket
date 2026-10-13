import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Search, 
  Bell, 
  Sparkles, 
  RotateCcw, 
  CheckCircle,
  Command,
  Activity,
  Zap,
  Compass,
  Home,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  onMobileToggle: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  'dashboard': 'Dashboard',
  'tickets': 'All Tickets',
  'create-ticket': 'Create Ticket',
  'ticket-details': 'Ticket Details',
  'manual-review': 'Manual Review',
  'customers': 'Customer Directory',
  'analytics': 'Analytics & SLAs',
  'settings': 'Router Configuration',
  'architecture': 'System Architecture',
  'oop-structure': 'Java OOP Structure',
  'ai-classification': 'Classifier Testing',
  'glyph-portal': 'Routing Portal',
  'login': 'Account Sign In',
  'privacy': 'Privacy Policy',
  'terms': 'Terms of Service'
};

export const Header: React.FC<HeaderProps> = ({ onMobileToggle }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    loadDemoTickets, 
    createRandomDemoTicket, 
    activePage,
    setActivePage,
    tickets,
    backendStatus,
    startTour,
    currentUser
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleReset = async () => {
    setIsResetting(true);
    await loadDemoTickets();
    setTimeout(() => setIsResetting(false), 500);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await createRandomDemoTicket();
    setIsGenerating(false);
  };

  const recentEvents = tickets.slice(0, 4);

  return (
    <header className="h-16 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between gap-4 glass-header transition-all duration-200">
      {/* Left: Mobile Toggle & Global Search (or Brand on Login) */}
      {activePage === 'login' ? (
        <button
          onClick={() => setActivePage('dashboard')}
          title="Go to Dashboard"
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30 ring-1 ring-white/20 transition-all">
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
      ) : (
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onMobileToggle}
            className="lg:hidden p-2 rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/[0.15] text-slate-300 hover:text-white hover:bg-white/[0.12] transition-all"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Home Navigation Button */}
          <button
            onClick={() => setActivePage('dashboard')}
            title="Go to Dashboard"
            aria-label="Dashboard"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer backdrop-blur-md shadow-sm shrink-0 ${
              activePage === 'dashboard'
                ? 'border-indigo-400/50 bg-indigo-500/25 text-white shadow-sm'
                : 'border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white hover:border-white/20'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-medium">Home</span>
          </button>

          {/* Breadcrumb path for inner pages */}
          {activePage !== 'dashboard' && (
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 shrink-0 select-none">
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <span className="text-slate-200 font-medium truncate max-w-[150px]">
                {PAGE_TITLES[activePage] || activePage}
              </span>
            </div>
          )}

          {/* Global Search Bar */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tickets by subject, customer, keywords, ID... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim() && window.location.hash !== '#tickets') {
                  setActivePage('tickets');
                }
              }}
              className="w-full glass-input pl-10 pr-12 py-2 text-xs md:text-sm text-slate-200 placeholder:text-slate-500 font-sans"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-white/[0.15] bg-white/[0.08] backdrop-blur-sm text-slate-300">
              <Command className="w-3 h-3" /> K
            </kbd>
          </div>
        </div>
      )}

      {/* Right: Engine Status, Quick Actions & Notifications */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Real-time Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 backdrop-blur-md border border-emerald-500/25 text-emerald-300 text-xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator" />
          <span>Services Active</span>
        </div>

        {activePage === 'login' ? (
          <button
            onClick={() => setActivePage('dashboard')}
            className="btn-secondary px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer text-slate-200 hover:text-white"
          >
            <Home className="w-3.5 h-3.5 text-indigo-400" />
            <span>Go to Dashboard</span>
          </button>
        ) : (
          <>
            {/* Tour Button */}
            <button
              onClick={startTour}
              title="Start feature walkthrough"
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Tour</span>
            </button>

            {/* Simulate Inbound Ticket */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              title="Simulate incoming support ticket"
              className="btn-primary px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-slate-200 ${isGenerating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Simulate Ticket</span>
            </button>

            {/* Reload Demo Tickets */}
            <button
              onClick={handleReset}
              disabled={isResetting}
              title="Reset tickets to default set"
              className="btn-secondary px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-slate-200 hover:text-white"
            >
              <RotateCcw className={`w-3.5 h-3.5 text-slate-400 ${isResetting ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Reset</span>
            </button>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/[0.15] text-slate-300 hover:text-white hover:bg-white/[0.12] relative transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {tickets.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-400 rounded-full ring-2 ring-[#080d1a]" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl glass-panel p-4 z-50 animate-fade-in text-slate-200 border border-white/20">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.1]">
                    <div className="flex items-center gap-2 font-semibold text-sm text-white">
                      <Activity className="w-4 h-4 text-indigo-400" />
                      <span>Recent Activity</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {tickets.length} total
                    </span>
                  </div>

                  <div className="divide-y divide-white/[0.08] max-h-72 overflow-y-auto mt-2 space-y-1">
                    {recentEvents.map((t) => (
                      <div key={t.ticketId} className="py-2.5 px-2 rounded-lg hover:bg-white/[0.06] transition-colors">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-mono text-indigo-300 font-medium">{t.ticketId}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold backdrop-blur-sm border ${
                            t.category === 'BILLING' 
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : t.category === 'TECHNICAL'
                              ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                              : 'bg-slate-500/15 text-slate-300 border-slate-500/30'
                          }`}>
                            {t.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 line-clamp-1">{t.subject}</p>
                        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                          <span>&rarr; {t.assignedTeam}</span>
                          <span className="font-mono text-slate-400">
                            {Math.round((t.confidence || 0.85) * 100)}% conf
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <button
              onClick={() => setActivePage('login')}
              title={currentUser ? `Signed in as ${currentUser.name}` : "Sign In"}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer backdrop-blur-md shadow-sm border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white hover:border-white/20"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-white/20">
                {currentUser?.avatarInitials || 'IN'}
              </div>
              <span className="hidden sm:inline font-medium max-w-[90px] truncate text-slate-200">
                {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
