import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Priority, Ticket } from '../types';
import { LiveRoutingStepper } from '../components/tickets/LiveRoutingStepper';
import { RoutingResultCard } from '../components/tickets/RoutingResultCard';
import { 
  SendHorizontal, 
  Sparkles, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Bot,
  User,
  Mail,
  FileText,
  Bookmark,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';

export const CreateTicketPage: React.FC = () => {
  const { 
    createAndRouteTicket, 
    isLiveRouting, 
    routingSteps, 
    lastRoutingResult,
    tickets,
    setActivePage,
    selectTicket
  } = useApp();

  const [customerName, setCustomerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('AUTO');
  const [formError, setFormError] = useState<string | null>(null);

  // Preset scenarios
  const loadScenario = (type: 'rahul' | 'uncertain' | 'tech_crash' | 'outage') => {
    setFormError(null);
    if (type === 'rahul') {
      setCustomerName('Rahul Kumar');
      setEmail('rahul.kumar@acme-corp.com');
      setSubject('Charged twice for subscription');
      setDescription('I was charged twice for my monthly subscription and need one payment refunded.');
      setPriority('AUTO');
    } else if (type === 'uncertain') {
      setCustomerName('Marcus Aurelius');
      setEmail('marcus@stoicconsulting.org');
      setSubject('Something is wrong');
      setDescription('My account isn\'t working.');
      setPriority('AUTO');
    } else if (type === 'tech_crash') {
      setCustomerName('Sarah Chen');
      setEmail('sarah.c@techflow.io');
      setSubject('Dashboard crashing on analytics query');
      setDescription('The dashboard crashes and throws 500 internal server error whenever exporting reports.');
      setPriority('AUTO');
    } else if (type === 'outage') {
      setCustomerName('Amina Idris');
      setEmail('amina@saharanet.io');
      setSubject('Production down - service unavailable');
      setDescription('Critical incident: entire system down and database connection exhausted, webhooks failing!');
      setPriority('CRITICAL');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim()) {
      setFormError('Please provide customer name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid customer email address.');
      return;
    }
    if (!subject.trim()) {
      setFormError('Please provide a ticket subject.');
      return;
    }
    if (!description.trim()) {
      setFormError('Please enter a ticket description.');
      return;
    }

    const requestedPriority: Priority | undefined = 
      priority !== 'AUTO' ? (priority as Priority) : undefined;

    await createAndRouteTicket({
      customerName,
      email,
      subject,
      description,
      priority: requestedPriority
    });
  };

  const handleResetForm = () => {
    setCustomerName('');
    setEmail('');
    setSubject('');
    setDescription('');
    setPriority('AUTO');
    setFormError(null);
  };

  const createdTicket = lastRoutingResult 
    ? tickets.find(t => t.ticketId === lastRoutingResult.ticketId) 
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Description */}
      <div className="border-b border-white/[0.08] pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium mb-2">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>TICKET INGESTION &amp; HYBRID TRIAGE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
          Create &amp; Route Support Ticket
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          Submit customer inquiry text into the hybrid Java OOP RuleEngine &amp; Python TF-IDF Classifier pipeline.
        </p>
      </div>

      {/* Preset Scenarios Box (1-Click Run) */}
      <div className="glass-card p-5 shadow-2xl">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Quick Evaluation Scenarios (1-Click Presets)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => loadScenario('rahul')}
            className="p-3.5 rounded-2xl text-left bg-white/[0.04] hover:bg-emerald-500/15 backdrop-blur-md border border-white/[0.12] hover:border-emerald-500/35 transition-all cursor-pointer group shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
          >
            <div className="text-xs font-semibold text-emerald-300 flex items-center justify-between">
              <span>01. Billing</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
            <div className="text-xs font-medium text-slate-100 mt-1 truncate">Rahul: Charged twice</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">Expected: Billing (~94%)</div>
          </button>

          <button
            type="button"
            onClick={() => loadScenario('uncertain')}
            className="p-3.5 rounded-2xl text-left bg-white/[0.04] hover:bg-rose-500/15 backdrop-blur-md border border-white/[0.12] hover:border-rose-500/35 transition-all cursor-pointer group shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
          >
            <div className="text-xs font-semibold text-rose-300 flex items-center justify-between">
              <span>02. Ambiguous</span>
              <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
            </div>
            <div className="text-xs font-medium text-slate-100 mt-1 truncate">Marcus: Something wrong</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">Expected: Review (&lt;80%)</div>
          </button>

          <button
            type="button"
            onClick={() => loadScenario('tech_crash')}
            className="p-3.5 rounded-2xl text-left bg-white/[0.04] hover:bg-cyan-500/15 backdrop-blur-md border border-white/[0.12] hover:border-cyan-500/35 transition-all cursor-pointer group shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
          >
            <div className="text-xs font-semibold text-cyan-300 flex items-center justify-between">
              <span>03. Tech Crash</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            </div>
            <div className="text-xs font-medium text-slate-100 mt-1 truncate">Sarah: 500 error</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">Expected: Technical (~97%)</div>
          </button>

          <button
            type="button"
            onClick={() => loadScenario('outage')}
            className="p-3.5 rounded-2xl text-left bg-white/[0.04] hover:bg-amber-500/15 backdrop-blur-md border border-white/[0.12] hover:border-amber-500/35 transition-all cursor-pointer group shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
          >
            <div className="text-xs font-semibold text-amber-300 flex items-center justify-between">
              <span>04. Major Outage</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            </div>
            <div className="text-xs font-medium text-slate-100 mt-1 truncate">Amina: Production down</div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">Expected: Critical Priority</div>
          </button>
        </div>
      </div>

      {/* Live Routing Sequence Stepper */}
      <LiveRoutingStepper steps={routingSteps} isProcessing={isLiveRouting} />

      {/* Result Card if just routed */}
      {lastRoutingResult && createdTicket && !isLiveRouting && (
        <RoutingResultCard
          ticket={createdTicket}
          result={lastRoutingResult}
          onViewDetails={() => selectTicket(createdTicket.ticketId)}
        />
      )}

      {/* Ticket Creation Form */}
      <div className="glass-card p-6 sm:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {formError && (
            <div className="p-3.5 rounded-2xl bg-rose-500/15 backdrop-blur-md border border-rose-500/30 text-rose-300 font-sans text-xs font-medium flex items-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{formError}</span>
            </div>
          )}

          {/* Customer Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Customer Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Kumar"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                disabled={isLiveRouting}
                className="w-full glass-input px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                Customer Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                placeholder="e.g. rahul.kumar@acme-corp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLiveRouting}
                className="w-full glass-input px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1.5">
              Ticket Subject <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Charged twice for subscription / 500 internal server error"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isLiveRouting}
              className="w-full glass-input px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1.5">
              Ticket Message &amp; Problem Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Describe the issue in natural language. Keywords like 'refund', 'invoice', 'database crash', or 'timeout' will be scanned by both the regex rule engine and TF-IDF machine learning model."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLiveRouting}
              className="w-full glass-input p-4 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 leading-relaxed font-sans resize-none"
            />
          </div>

          {/* Priority override */}
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1.5">
              Priority Override (Optional)
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={isLiveRouting}
              className="w-full sm:w-72 glass-input px-4 py-2 text-xs font-medium text-slate-200 cursor-pointer"
            >
              <option value="AUTO" className="bg-[#0b1021] text-slate-200">Autonomous (AI Inferred)</option>
              <option value="CRITICAL" className="bg-[#0b1021] text-rose-400">Critical (&lt; 15 min SLA)</option>
              <option value="HIGH" className="bg-[#0b1021] text-amber-400">High (&lt; 1 hr SLA)</option>
              <option value="MEDIUM" className="bg-[#0b1021] text-indigo-400">Medium (&lt; 4 hr SLA)</option>
              <option value="LOW" className="bg-[#0b1021] text-slate-400">Low (&lt; 24 hr SLA)</option>
            </select>
          </div>

          {/* Submit & Reset Bar */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetForm}
              disabled={isLiveRouting}
              className="btn-secondary px-4 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-slate-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Form</span>
            </button>

            <button
              type="submit"
              disabled={isLiveRouting}
              className="btn-primary px-6 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/25 disabled:opacity-50"
            >
              <SendHorizontal className="w-4 h-4" />
              <span>{isLiveRouting ? 'Routing Through Engine...' : 'Route Ticket'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
