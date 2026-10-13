import React from 'react';
import { useApp } from '../context/AppContext';
import { TicketCategory, SupportTeam } from '../types';
import { CategoryBadge, PriorityBadge } from '../components/common/Badge';
import { ConfidenceBar } from '../components/common/ConfidenceBar';
import { 
  ShieldAlert, 
  CheckCircle2, 
  CreditCard, 
  Wrench, 
  HelpCircle, 
  Eye, 
  Inbox, 
  AlertTriangle,
  User,
  Clock,
  ArrowRight
} from 'lucide-react';

export const ManualReviewPage: React.FC = () => {
  const { tickets, manualAssignTicket, selectTicket, confidenceThreshold } = useApp();

  const manualTickets = tickets.filter(
    t => t.assignedTeam === 'Manual Review Team' || t.status === 'MANUAL_REVIEW' || t.confidence < confidenceThreshold
  );

  const handleAssign = async (ticketId: string, category: TicketCategory, team: SupportTeam) => {
    await manualAssignTicket(ticketId, category, team);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono font-medium mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>TRIAGE GUARDRAIL &bull; HUMAN-IN-THE-LOOP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Manual Review Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Tickets where the AI classifier or rule engine confidence fell below the <strong className="text-slate-200">{Math.round(confidenceThreshold * 100)}%</strong> threshold.
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl glass-card border border-rose-500/30 flex items-center gap-3">
          <span className="font-mono text-xs text-slate-400">PENDING AUDIT:</span>
          <span className="font-mono font-bold text-2xl text-rose-400">{manualTickets.length}</span>
        </div>
      </div>

      {/* Review Queue Cards */}
      {manualTickets.length === 0 ? (
        <div className="glass-card p-12 text-center border border-white/[0.08] shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-display">Manual Review Queue is Clear!</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto font-sans">
            All customer tickets met or exceeded the confidence threshold and were automatically dispatched to appropriate support teams.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {manualTickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="glass-card p-6 border border-white/[0.08] shadow-2xl space-y-5"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-mono font-semibold text-indigo-400">
                      #{ticket.ticketId}
                    </span>
                    <PriorityBadge priority={ticket.priority} />
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 animate-pulse">
                      Low Confidence
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {ticket.subject}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      {ticket.customerName} ({ticket.email})
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(ticket.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Confidence Score
                  </span>
                  <div className="w-36 sm:ml-auto">
                    <ConfidenceBar confidence={ticket.confidence} size="md" />
                  </div>
                </div>
              </div>

              {/* Description Quote */}
              <div className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.12] text-xs text-slate-200 leading-relaxed font-sans shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                "{ticket.description}"
              </div>

              {/* Triage Reason & Preliminary Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                  <span className="text-[10px] uppercase text-slate-400 font-medium block mb-1">
                    Suggested Category:
                  </span>
                  <div className="flex items-center gap-2">
                    <CategoryBadge category={ticket.category} size="md" />
                    <span className="text-slate-400">({Math.round(ticket.confidence * 100)}% score)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                  <span className="text-[10px] uppercase text-slate-400 font-medium block mb-1">
                    Review Rationale:
                  </span>
                  <p className="text-rose-300 font-medium text-xs">
                    {ticket.routingReason || 'Insufficient category-specific domain keywords found.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.1] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-mono font-medium text-slate-400 uppercase">
                  Human Agent Reassignment:
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleAssign(ticket.ticketId, 'BILLING', 'Billing Support')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/35 transition-all cursor-pointer backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Assign Billing</span>
                  </button>

                  <button
                    onClick={() => handleAssign(ticket.ticketId, 'TECHNICAL', 'Technical Support')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/35 transition-all cursor-pointer backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Assign Technical</span>
                  </button>

                  <button
                    onClick={() => handleAssign(ticket.ticketId, 'OTHER', 'General Support')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/35 transition-all cursor-pointer backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Assign General</span>
                  </button>

                  <button
                    onClick={() => selectTicket(ticket.ticketId)}
                    className="btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs cursor-pointer text-slate-200"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
