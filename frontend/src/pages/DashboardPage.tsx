import React from 'react';
import { useApp } from '../context/AppContext';
import { TicketTable } from '../components/tickets/TicketTable';
import { 
  Ticket as TicketIcon, 
  CreditCard, 
  Wrench, 
  HelpCircle, 
  ShieldAlert, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight,
  Zap,
  Activity,
  Compass
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { metrics, setActivePage, createRandomDemoTicket, startTour } = useApp();

  const kpis = [
    {
      label: 'Total Tickets',
      value: metrics.totalTickets,
      icon: <TicketIcon className="w-4 h-4 text-indigo-400" />,
      accent: 'border-indigo-500/30',
      glow: 'group-hover:shadow-sm',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      badge: 'INGESTED',
      badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
    },
    {
      label: 'Billing Support',
      value: metrics.billingTickets,
      icon: <CreditCard className="w-4 h-4 text-emerald-400" />,
      accent: 'border-emerald-500/30',
      glow: 'group-hover:shadow-sm',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      badge: `${metrics.totalTickets > 0 ? Math.round((metrics.billingTickets / metrics.totalTickets) * 100) : 0}%`,
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
    },
    {
      label: 'Technical Support',
      value: metrics.technicalTickets,
      icon: <Wrench className="w-4 h-4 text-cyan-400" />,
      accent: 'border-cyan-500/30',
      glow: 'group-hover:shadow-sm',
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      badge: `${metrics.totalTickets > 0 ? Math.round((metrics.technicalTickets / metrics.totalTickets) * 100) : 0}%`,
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
    },
    {
      label: 'General / Other',
      value: metrics.otherTickets,
      icon: <HelpCircle className="w-4 h-4 text-slate-400" />,
      accent: 'border-slate-600/30',
      glow: 'group-hover:shadow-sm',
      iconBg: 'bg-slate-500/10 border-slate-500/20',
      badge: `${metrics.totalTickets > 0 ? Math.round((metrics.otherTickets / metrics.totalTickets) * 100) : 0}%`,
      badgeColor: 'bg-slate-500/10 text-slate-300 border-slate-500/20'
    },
    {
      label: 'Manual Review',
      value: metrics.manualReviewTickets,
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      accent: 'border-rose-500/30',
      glow: 'group-hover:shadow-sm',
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      badge: metrics.manualReviewTickets > 0 ? 'ALERT' : 'CLEARED',
      badgeColor: metrics.manualReviewTickets > 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
    },
    {
      label: 'High / Critical',
      value: metrics.highOrCriticalTickets,
      icon: <Flame className="w-4 h-4 text-amber-400" />,
      accent: 'border-amber-500/30',
      glow: 'group-hover:shadow-sm',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      badge: 'SLA RISK',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
    },
    {
      label: 'Auto-Routed',
      value: metrics.autoRoutedTickets,
      icon: <Sparkles className="w-4 h-4 text-indigo-300" />,
      accent: 'border-indigo-400/30',
      glow: 'group-hover:shadow-sm',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      badge: `${metrics.autoRoutedPercentage}%`,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Enterprise Overview Hero Banner */}
      <div className="glass-panel p-6 sm:p-8 relative overflow-hidden shadow-xl border border-white/[0.08]">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-400 pulse-indicator" />
              <span>SUPPORT TICKET ROUTING SYSTEM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-display">
              Ticket Routing & Triage Dashboard
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
              Customer support ticket triage combining rule-based classification and NLP machine learning. Confidence thresholds route high-certainty tickets to team queues while flagging low-certainty items for human manual review.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                80% Confidence Gate
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Deterministic Rules
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                FastAPI ML Classifier
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={startTour}
              className="btn-secondary px-4 py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Walkthrough</span>
            </button>

            <button
              onClick={() => setActivePage('create-ticket')}
              className="btn-primary px-5 py-3 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-white fill-white" />
              <span>Create Ticket</span>
              <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
            </button>

            <button
              onClick={createRandomDemoTicket}
              className="btn-secondary px-4 py-3 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-300" />
              <span>Simulate Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* Routing Portal Banner */}
      <div className="glass-card p-5 relative overflow-hidden border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5 bg-slate-900/60">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Visualizer
              </span>
              <span className="text-xs font-mono text-slate-400">
                Live Pipeline Inspection
              </span>
            </div>
            <h3 className="font-display font-bold text-lg md:text-xl text-white">
              Interactive Routing Visualizer
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Inspect classification queues, confidence gates, rule engine signals, and automated dispatch workflows in real time.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActivePage('glyph-portal')}
          className="btn-primary px-5 py-2.5 text-xs font-semibold flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Open Visualizer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className={`glass-card p-4 relative group ${kpi.accent} ${kpi.glow}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`p-1.5 rounded-lg border ${kpi.iconBg}`}>
                {kpi.icon}
              </span>
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${kpi.badgeColor}`}>
                {kpi.badge}
              </span>
            </div>
            <div className="text-2xl font-bold font-display text-white tracking-tight">
              {kpi.value}
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-1 truncate">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>

      {/* Visual Analytics Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Category Breakdown Panel */}
        <div className="glass-card p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 font-display">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Tickets By Category
              </h3>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                DISTRIBUTION
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {/* Billing */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Billing Support
                  </span>
                  <span className="text-slate-400">
                    {metrics.billingTickets} ({metrics.totalTickets > 0 ? Math.round((metrics.billingTickets / metrics.totalTickets) * 100) : 0}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                    style={{ width: `${metrics.totalTickets > 0 ? (metrics.billingTickets / metrics.totalTickets) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Technical */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Technical Support
                  </span>
                  <span className="text-slate-400">
                    {metrics.technicalTickets} ({metrics.totalTickets > 0 ? Math.round((metrics.technicalTickets / metrics.totalTickets) * 100) : 0}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-500" 
                    style={{ width: `${metrics.totalTickets > 0 ? (metrics.technicalTickets / metrics.totalTickets) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Other */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    General Support
                  </span>
                  <span className="text-slate-400">
                    {metrics.otherTickets} ({metrics.totalTickets > 0 ? Math.round((metrics.otherTickets / metrics.totalTickets) * 100) : 0}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-500 rounded-full transition-all duration-500" 
                    style={{ width: `${metrics.totalTickets > 0 ? (metrics.otherTickets / metrics.totalTickets) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] mt-4 text-xs font-mono flex items-center justify-between text-slate-400">
            <span>Overall Confidence:</span>
            <span className="font-semibold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
              {Math.round(metrics.averageConfidence * 100)}%
            </span>
          </div>
        </div>

        {/* Priority Matrix Panel */}
        <div className="glass-card p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 font-display">
                <Flame className="w-4 h-4 text-rose-400" />
                Priority SLA Matrix
              </h3>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                GUARANTEES
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4 font-mono">
              <div className="p-3 rounded-xl bg-rose-500/15 backdrop-blur-md border border-rose-500/30 text-center">
                <span className="text-[10px] uppercase text-rose-300 font-semibold block">Critical</span>
                <span className="text-2xl font-bold text-white block mt-0.5">{metrics.byPriority['CRITICAL'] || 0}</span>
                <span className="text-[10px] text-rose-300/80 block">&lt; 15 min SLA</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/15 backdrop-blur-md border border-amber-500/30 text-center">
                <span className="text-[10px] uppercase text-amber-300 font-semibold block">High</span>
                <span className="text-2xl font-bold text-white block mt-0.5">{metrics.byPriority['HIGH'] || 0}</span>
                <span className="text-[10px] text-amber-300/80 block">&lt; 1 hr SLA</span>
              </div>

              <div className="p-3 rounded-xl bg-indigo-500/15 backdrop-blur-md border border-indigo-500/30 text-center">
                <span className="text-[10px] uppercase text-indigo-300 font-semibold block">Medium</span>
                <span className="text-2xl font-bold text-white block mt-0.5">{metrics.byPriority['MEDIUM'] || 0}</span>
                <span className="text-[10px] text-indigo-300/80 block">&lt; 4 hr SLA</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/[0.15] text-center">
                <span className="text-[10px] uppercase text-slate-300 font-semibold block">Low</span>
                <span className="text-2xl font-bold text-white block mt-0.5">{metrics.byPriority['LOW'] || 0}</span>
                <span className="text-[10px] text-slate-400 block">&lt; 24 hr SLA</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.1] mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>High Urgency Ratio:</span>
            <span className="text-slate-200 font-medium">
              {metrics.totalTickets > 0 ? Math.round((metrics.highOrCriticalTickets / metrics.totalTickets) * 100) : 0}% of stream
            </span>
          </div>
        </div>

        {/* Routing Automation Rate Panel */}
        <div className="glass-card p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.1]">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 font-display">
                <Activity className="w-4 h-4 text-emerald-400" />
                Automation Rate
              </h3>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                GUARDRAILS
              </span>
            </div>

            <div className="mt-4 space-y-3 font-mono">
              <div className="p-3.5 rounded-xl bg-emerald-500/15 backdrop-blur-md border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Auto-Routed (&ge;80%)
                  </span>
                  <span className="text-white text-sm font-bold">{metrics.autoRoutedPercentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500" 
                    style={{ width: `${metrics.autoRoutedPercentage}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/15 backdrop-blur-md border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-rose-300">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    Manual Review (&lt;80%)
                  </span>
                  <span className="text-white text-sm font-bold">{metrics.manualReviewPercentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 rounded-full transition-all duration-500" 
                    style={{ width: `${metrics.manualReviewPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] mt-4 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Review Queue:</span>
            <button
              onClick={() => setActivePage('manual-review')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Inspect Queue ({metrics.manualReviewTickets})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Ticket Table */}
      <TicketTable />
    </div>
  );
};
