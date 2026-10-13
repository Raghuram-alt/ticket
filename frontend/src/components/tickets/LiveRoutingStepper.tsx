import React from 'react';
import { RoutingStep } from '../../types';
import { 
  CheckCircle2, 
  Loader2, 
  Circle, 
  AlertTriangle,
  Brain,
  Zap
} from 'lucide-react';

interface LiveRoutingStepperProps {
  steps: RoutingStep[];
  isProcessing: boolean;
}

export const LiveRoutingStepper: React.FC<LiveRoutingStepperProps> = ({ steps, isProcessing }) => {
  if (steps.length === 0 && !isProcessing) return null;

  return (
    <div className="glass-card p-5 sm:p-6 mb-6 animate-fade-in relative border border-indigo-500/20 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-4 border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
              Autonomous Routing Execution Sequence
              {isProcessing && (
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse">
                  EXECUTING PIPELINE
                </span>
              )}
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Java RuleEngine &bull; Customer Metadata Context &bull; Python FastAPI NLP
            </p>
          </div>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {steps.map((step) => {
          let cardStyle = 'bg-white/[0.04] backdrop-blur-md border-white/[0.12] text-slate-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]';
          let icon = <Circle className="w-3.5 h-3.5 text-slate-500 shrink-0" />;

          if (step.status === 'in_progress') {
            cardStyle = 'bg-indigo-500/20 backdrop-blur-md border-indigo-500/40 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_20px_rgba(99,102,241,0.25)]';
            icon = <Loader2 className="w-3.5 h-3.5 text-indigo-300 animate-spin shrink-0" />;
          } else if (step.status === 'completed') {
            cardStyle = 'bg-emerald-500/15 backdrop-blur-md border-emerald-500/30 text-slate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]';
            icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />;
          } else if (step.status === 'warning') {
            cardStyle = 'bg-rose-500/20 backdrop-blur-md border-rose-500/40 text-rose-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_16px_rgba(244,63,94,0.2)]';
            icon = <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
          }

          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start gap-2.5 ${cardStyle}`}
            >
              <div className="pt-0.5">{icon}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-xs font-mono font-semibold">
                  <span className="truncate">{step.title}</span>
                  <span className="text-[10px] opacity-60">#{step.id}</span>
                </div>
                <p className="text-[11px] font-sans mt-1 leading-snug break-words opacity-85">
                  {step.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
