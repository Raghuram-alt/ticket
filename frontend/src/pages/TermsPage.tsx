import React from 'react';
import { Scale, CheckCircle2, AlertCircle, HelpCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TermsPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActivePage('dashboard')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </button>
        <span className="text-xs text-slate-500 font-mono">Effective: October 2026</span>
      </div>

      <div className="glass-card p-8 border border-white/10 space-y-6">
        <div className="flex items-start gap-4 pb-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <Scale className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-display">Terms of Service</h1>
            <p className="text-sm text-slate-400 mt-1">
              Guidelines and operational conditions governing the use of the Support Ticket Router platform.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            1. Platform Purpose & Authorized Use
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The Support Ticket Router is provided for internal IT and customer support operations to intake, classify, prioritize, and route support tickets. Users agree to access the platform solely for lawful customer service and technical administration tasks in compliance with company security policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            2. Automated Routing & Guardrails
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The system employs automated rule logic and classification models to assist triage. While high-confidence tickets are routed automatically, items with confidence scores below the designated threshold (e.g., 80%) are flagged for human agent verification. Support staff are responsible for final customer communications and resolution quality.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            3. Account Responsibilities
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Each operator and administrator is responsible for maintaining the confidentiality of their credentials and session tokens. Any unauthorized activity detected on an account should be promptly reported to system administrators.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">4. Service Availability & Modifications</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            System maintenance, rule definition updates, and classifier model updates may occur periodically. We strive for maximum uptime and reliability, but cannot warrant uninterrupted service in all networking environments.
          </p>
        </section>

        <section className="pt-4 border-t border-white/10 text-xs text-slate-500">
          By utilizing the Support Ticket Router, you agree to these operational terms. For questions or modifications, reach out to your organizational IT lead.
        </section>
      </div>
    </div>
  );
};
