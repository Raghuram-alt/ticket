import React from 'react';
import { RoutingResult, Ticket } from '../../types';
import { CategoryBadge, PriorityBadge } from '../common/Badge';
import { ConfidenceBar } from '../common/ConfidenceBar';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Users, 
  X,
  Cpu,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface RoutingResultCardProps {
  ticket: Ticket;
  result: RoutingResult;
  onViewDetails?: () => void;
  onDismiss?: () => void;
}

export const RoutingResultCard: React.FC<RoutingResultCardProps> = ({
  ticket,
  result,
  onViewDetails,
  onDismiss
}) => {
  const isAutoRouted = result.autoRouted;

  return (
    <div className="glass-card p-0 overflow-hidden mb-8 border border-white/[0.1] shadow-2xl animate-fade-in">
      {/* Top Graphic Banner */}
      <div 
        className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${
          isAutoRouted 
            ? 'bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-emerald-950/40 border-emerald-500/20' 
            : 'bg-gradient-to-r from-rose-950/60 via-slate-900/80 to-amber-950/40 border-rose-500/20'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg ${
            isAutoRouted 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-500/20' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-rose-500/20'
          }`}>
            {isAutoRouted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            )}
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-wider uppercase font-semibold text-slate-400">
              DISPATCH DECISION TELEMETRY
            </div>
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-display">
              <span>Ticket #{result.ticketId}</span>
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                isAutoRouted 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse'
              }`}>
                {isAutoRouted ? 'AUTO-ROUTED' : 'MANUAL REVIEW REQUIRED'}
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer shadow-indigo-500/30"
            >
              <span>Inspect Ticket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-white/[0.1]">
          <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <span className="text-[10px] uppercase font-mono font-medium text-slate-400 block mb-1.5">
              Target Category
            </span>
            <CategoryBadge category={result.finalCategory} size="md" />
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <span className="text-[10px] uppercase font-mono font-medium text-slate-400 block mb-1.5">
              Confidence Score
            </span>
            <div className="pt-0.5">
              <ConfidenceBar confidence={result.finalConfidence} size="md" />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <span className="text-[10px] uppercase font-mono font-medium text-slate-400 block mb-1.5">
              Urgency Priority
            </span>
            <PriorityBadge priority={result.priority} size="md" />
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <span className="text-[10px] uppercase font-mono font-medium text-slate-400 block mb-1.5">
              Assigned Team
            </span>
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              {result.assignedTeam}
            </span>
          </div>
        </div>

        {/* Pipeline Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 border-b border-white/[0.1] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 uppercase font-medium">Routing Method:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.15] text-indigo-300 font-semibold text-[11px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              {result.routingMethod}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 uppercase font-medium">Decision Rationale:</span>
            <span className="font-sans font-medium text-slate-200">{result.summaryReason}</span>
          </div>
        </div>

        {/* Detected Keywords */}
        {result.detectedKeywords.length > 0 && (
          <div className="py-2 border-b border-white/[0.1] space-y-2">
            <div className="text-[11px] font-mono font-medium uppercase text-slate-400 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              Identified Domain Keywords ({result.detectedKeywords.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {result.detectedKeywords.map((kw, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-indigo-500/15 backdrop-blur-sm text-indigo-300 border border-indigo-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Explanation Bullets (Audit Log) */}
        <div className="pt-2">
          <h4 className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            Execution Trace &amp; Audit Log
          </h4>
          <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/[0.1] font-mono text-xs leading-relaxed space-y-2 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            {result.explanationBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="text-indigo-400 font-bold">[{idx + 1}]</span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
