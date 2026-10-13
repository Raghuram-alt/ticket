import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TicketCategory, TicketStatus, SupportTeam } from '../types';
import { CategoryBadge, PriorityBadge, StatusBadge, TeamBadge } from '../components/common/Badge';
import { ConfidenceBar } from '../components/common/ConfidenceBar';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  BrainCircuit, 
  History, 
  Tag, 
  Sparkles,
  Edit3,
  Users,
  ChevronRight,
  Zap
} from 'lucide-react';

export const TicketDetailsPage: React.FC = () => {
  const { 
    tickets, 
    selectedTicketId, 
    setActivePage, 
    customers,
    updateTicketStatus,
    manualAssignTicket
  } = useApp();

  const ticket = tickets.find(t => t.ticketId === selectedTicketId) || tickets[0];
  const customer = customers.find(c => c.customerId === ticket?.customerId);

  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(ticket?.status || 'NEW');
  const [showReassignModal, setShowReassignModal] = useState<boolean>(false);
  const [reassignCategory, setReassignCategory] = useState<TicketCategory>(ticket?.category || 'OTHER');
  const [reassignTeam, setReassignTeam] = useState<SupportTeam>('General Support');

  if (!ticket) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 text-sm">No ticket selected.</p>
        <button
          onClick={() => setActivePage('tickets')}
          className="mt-3 text-xs text-indigo-400 hover:underline"
        >
          Return to Tickets Directory
        </button>
      </div>
    );
  }

  const handleStatusChange = async (newStatus: TicketStatus) => {
    setSelectedStatus(newStatus);
    await updateTicketStatus(ticket.ticketId, newStatus);
  };

  const handleReassign = async () => {
    await manualAssignTicket(ticket.ticketId, reassignCategory, reassignTeam);
    setShowReassignModal(false);
  };

  const isAutoRouted = ticket.routingResult?.autoRouted ?? (ticket.assignedTeam !== 'Manual Review Team');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <button
          onClick={() => setActivePage('tickets')}
          className="btn-secondary inline-flex items-center gap-2 px-3.5 py-1.5 text-xs cursor-pointer text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tickets Directory</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Status Changer */}
          <div className="flex items-center gap-2 glass-badge rounded-xl px-3 py-1.5 text-xs font-mono shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <span className="text-slate-400 uppercase text-[10px]">Status:</span>
            <select
              value={ticket.status}
              onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="NEW" className="bg-[#0b1021] text-blue-400">New</option>
              <option value="ROUTED" className="bg-[#0b1021] text-teal-400">Routed</option>
              <option value="IN_PROGRESS" className="bg-[#0b1021] text-indigo-400">In Progress</option>
              <option value="WAITING_FOR_CUSTOMER" className="bg-[#0b1021] text-amber-400">Waiting for Customer</option>
              <option value="RESOLVED" className="bg-[#0b1021] text-emerald-400">Resolved</option>
              <option value="MANUAL_REVIEW" className="bg-[#0b1021] text-rose-400">Manual Review</option>
            </select>
          </div>

          {/* Manual Reassign Button */}
          <button
            onClick={() => setShowReassignModal(true)}
            className="btn-primary inline-flex items-center gap-1.5 px-4 py-1.5 text-xs cursor-pointer shadow-indigo-500/25"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Re-Route / Assign</span>
          </button>
        </div>
      </div>

      {/* Main Ticket Card */}
      <div className="glass-card p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-semibold text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                #{ticket.ticketId}
              </span>
              <PriorityBadge priority={ticket.priority} size="md" />
              <StatusBadge status={ticket.status} size="md" />
              <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                isAutoRouted
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-300 border-rose-500/30 animate-pulse'
              }`}>
                {isAutoRouted ? 'AUTO-ROUTED' : 'MANUAL REVIEW REQUIRED'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
              {ticket.subject}
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {new Date(ticket.createdAt).toLocaleString()}
              </span>
              <span>&bull;</span>
              <span>
                Method: <strong className="text-indigo-300">{ticket.routingMethod}</strong>
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] shrink-0 w-full md:w-64 space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-medium">
              Assigned Support Team
            </span>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              {ticket.assignedTeam}
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-400">
                <span>Confidence:</span>
                <span className="text-slate-200">{Math.round(ticket.confidence * 100)}%</span>
              </div>
              <ConfidenceBar confidence={ticket.confidence} showLabel={false} size="sm" />
            </div>
          </div>
        </div>

        {/* Ticket Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400">
            Ticket Inquiry Description
          </h3>
          <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06] text-sm text-slate-200 leading-relaxed font-sans">
            "{ticket.description}"
          </div>
        </div>

        {/* Customer Profile & Historical Affinity */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User className="w-4 h-4 text-indigo-400" />
              Customer Profile &amp; Historical Affinity
            </h3>
            {customer && (
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {customer.tier} Tier
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block mb-0.5">Customer Name</span>
              <span className="font-semibold text-white">{ticket.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block mb-0.5">Email</span>
              <span className="font-medium text-slate-300">{ticket.email}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block mb-0.5">Account / Company</span>
              <span className="font-medium text-slate-300">{customer?.company || 'Enterprise Account'}</span>
            </div>
          </div>

          {/* Customer History */}
          {customer && customer.history && (
            <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06] text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-indigo-400 font-semibold uppercase">
                  <History className="w-3.5 h-3.5" />
                  Historical Tickets Context:
                </span>
                <span>
                  Total: {customer.history.totalTickets} ({customer.history.billingTickets} Billing, {customer.history.technicalTickets} Tech)
                </span>
              </div>
              {customer.history.previousSubjects.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {customer.history.previousSubjects.map((sub, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.03] text-slate-300 text-[11px]">
                      &bull; {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dual Classification Breakdown: Java Rule Engine vs Python Classifier */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            Hybrid Pipeline Verification (Java OOP vs Python NLP)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Java Rule Engine */}
            <div className="p-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-cyan-500/30 space-y-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(6,182,212,0.12)]">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  Java RuleEngine
                </span>
                <CategoryBadge category={ticket.routingResult?.ruleCategory || ticket.category} />
              </div>
              <p className="text-xs font-mono text-slate-200">
                Score: {ticket.routingResult?.ruleScore ? Math.round(ticket.routingResult.ruleScore * 100) : 90}%
              </p>
              <p className="text-[10px] text-slate-400">
                Deterministic regex pattern scanner and priority matrix.
              </p>
            </div>

            {/* Python NLP Classifier */}
            <div className="p-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-indigo-500/30 space-y-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(99,102,241,0.12)]">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                  <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                  Python Classifier
                </span>
                <CategoryBadge category={ticket.routingResult?.aiCategory || ticket.category} />
              </div>
              <p className="text-xs font-mono text-slate-200">
                Confidence: {Math.round(ticket.confidence * 100)}%
              </p>
              <p className="text-[10px] text-slate-400">
                TF-IDF probability distribution via FastAPI /classify.
              </p>
            </div>

            {/* Final Synthesized Category */}
            <div className="p-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-emerald-500/30 space-y-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(16,185,129,0.12)]">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Final Synthesis
                </span>
                <CategoryBadge category={ticket.category} size="md" />
              </div>
              <p className="text-xs font-mono text-slate-200">
                Team: {ticket.assignedTeam}
              </p>
              <p className="text-[10px] text-slate-400">
                Validated by Java RoutingAgent confidence threshold.
              </p>
            </div>
          </div>
        </div>

        {/* Detected Keywords */}
        {ticket.detectedKeywords.length > 0 && (
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              Identified Domain Keywords ({ticket.detectedKeywords.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {ticket.detectedKeywords.map((kw, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Routing Explanation & Audit Log */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Decision Audit Trail
          </h3>
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed">
            {ticket.routingResult?.explanationBullets && ticket.routingResult.explanationBullets.length > 0 ? (
              ticket.routingResult.explanationBullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-semibold">[{i + 1}]</span>
                  <span>{bullet}</span>
                </div>
              ))
            ) : (
              <>
                <div>[1] Detected keywords: {ticket.detectedKeywords.join(', ') || 'None'}</div>
                <div>[2] Predicted Category: {ticket.category} ({Math.round(ticket.confidence * 100)}% confidence)</div>
                <div>[3] Assigned to: {ticket.assignedTeam}</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Manual Reassign Modal */}
      {showReassignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="w-full max-w-md glass-panel p-6 shadow-2xl space-y-4 border border-white/20">
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-3">
              <h3 className="text-base font-bold text-white font-display">
                Manual Reassignment Override
              </h3>
              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/35 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                OVERRIDE
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans">
              Override the automatic classification and route this ticket directly to another team.
            </p>

            <div className="space-y-3 font-sans">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Target Category
                </label>
                <select
                  value={reassignCategory}
                  onChange={(e) => setReassignCategory(e.target.value as TicketCategory)}
                  className="w-full glass-input px-3.5 py-2 text-xs text-slate-200 cursor-pointer"
                >
                  <option value="BILLING" className="bg-[#0b1021] text-emerald-400">Billing Support</option>
                  <option value="TECHNICAL" className="bg-[#0b1021] text-cyan-400">Technical Support</option>
                  <option value="OTHER" className="bg-[#0b1021] text-indigo-400">General Support</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Target Support Team
                </label>
                <select
                  value={reassignTeam}
                  onChange={(e) => setReassignTeam(e.target.value as SupportTeam)}
                  className="w-full glass-input px-3.5 py-2 text-xs text-slate-200 cursor-pointer"
                >
                  <option value="Billing Support" className="bg-[#0b1021] text-emerald-400">Billing Support</option>
                  <option value="Technical Support" className="bg-[#0b1021] text-cyan-400">Technical Support</option>
                  <option value="General Support" className="bg-[#0b1021] text-indigo-400">General Support</option>
                  <option value="Manual Review Team" className="bg-[#0b1021] text-rose-400">Manual Review Team</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.1]">
              <button
                onClick={() => setShowReassignModal(false)}
                className="btn-secondary px-4 py-2 text-xs cursor-pointer text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleReassign}
                className="btn-primary px-4 py-2 text-xs cursor-pointer"
              >
                Confirm Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
