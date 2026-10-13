import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  ShieldAlert, 
  Users, 
  Target,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { metrics } = useApp();

  const teams = [
    { name: 'Billing Support', count: metrics.byTeam['Billing Support'] || 0, color: 'from-emerald-500 to-teal-400' },
    { name: 'Technical Support', count: metrics.byTeam['Technical Support'] || 0, color: 'from-cyan-500 to-blue-500' },
    { name: 'General Support', count: metrics.byTeam['General Support'] || 0, color: 'from-indigo-600 to-blue-500' },
    { name: 'Manual Review Team', count: metrics.byTeam['Manual Review Team'] || 0, color: 'from-rose-500 to-pink-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium mb-2">
          <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
          <span>ROUTING TELEMETRY &amp; SLA BENCHMARKS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
          Analytics &amp; SLA Performance
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          Operational metrics, classifier confidence distributions, and support queue telemetry.
        </p>
      </div>

      {/* Top Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Auto-Routing Rate */}
        <div className="glass-card p-5 border border-indigo-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-semibold text-slate-400">Auto-Routing Rate</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white font-display">{metrics.autoRoutedPercentage}%</div>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>&ge; 80% Confidence Gate</span>
          </div>
        </div>

        {/* Average Confidence */}
        <div className="glass-card p-5 border border-cyan-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-semibold text-slate-400">Mean Confidence Score</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white font-display">
            {Math.round(metrics.averageConfidence * 100)}%
          </div>
          <div className="text-[11px] font-mono text-cyan-300">
            Combined Rule &amp; Classifier Score
          </div>
        </div>

        {/* Manual Review Rate */}
        <div className="glass-card p-5 border border-rose-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-semibold text-slate-400">Manual Review Rate</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-bold text-white font-display">{metrics.manualReviewPercentage}%</div>
          <div className="text-[11px] font-mono text-rose-300">
            Safety Guardrails Engaged
          </div>
        </div>

        {/* Critical Severity */}
        <div className="glass-card p-5 border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-semibold text-slate-400">Critical / High SLA</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white font-display">
            {metrics.highOrCriticalTickets}
          </div>
          <div className="text-[11px] font-mono text-amber-300">
            Urgent Incident Pipeline
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Team Workload Distribution */}
        <div className="glass-card p-6 border border-white/[0.08] shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Users className="w-4 h-4 text-indigo-400" />
              Team Workload Distribution
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {metrics.totalTickets} Total Tickets
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {teams.map((team, idx) => {
              const pct = metrics.totalTickets > 0 ? Math.round((team.count / metrics.totalTickets) * 100) : 0;
              return (
                <div key={idx} className="space-y-1.5 font-mono">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-medium">{team.name}</span>
                    <span className="text-slate-400">{team.count} tickets ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full bg-gradient-to-r ${team.color}`}
                      style={{ width: `${Math.max(4, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Hierarchy & Response Distribution */}
        <div className="glass-card p-6 border border-white/[0.08] shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
              <Activity className="w-4 h-4 text-rose-400" />
              Priority SLA Matrix
            </h3>
            <span className="text-xs font-mono text-indigo-400 font-medium">
              Real-time Triage
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-rose-300 uppercase block">Critical</span>
                <span className="text-[10px] text-rose-400">&lt; 15 min SLA</span>
              </div>
              <span className="text-2xl font-bold text-white">
                {metrics.byPriority['CRITICAL'] || 0}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-300 uppercase block">High</span>
                <span className="text-[10px] text-amber-400">&lt; 1 hr SLA</span>
              </div>
              <span className="text-2xl font-bold text-white">
                {metrics.byPriority['HIGH'] || 0}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-300 uppercase block">Medium</span>
                <span className="text-[10px] text-indigo-400">&lt; 4 hr SLA</span>
              </div>
              <span className="text-2xl font-bold text-white">
                {metrics.byPriority['MEDIUM'] || 0}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase block">Low</span>
                <span className="text-[10px] text-slate-400">&lt; 24 hr SLA</span>
              </div>
              <span className="text-2xl font-bold text-white">
                {metrics.byPriority['LOW'] || 0}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs flex items-center justify-between text-slate-400">
            <span>Deterministic Rule Engine:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active &amp; Synchronized
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
