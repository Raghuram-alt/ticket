import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrivacyPolicyPage: React.FC = () => {
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
        <span className="text-xs text-slate-500 font-mono">Last Updated: October 2026</span>
      </div>

      <div className="glass-card p-8 border border-white/10 space-y-6">
        <div className="flex items-start gap-4 pb-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-display">Privacy Policy</h1>
            <p className="text-sm text-slate-400 mt-1">
              How the Support Ticket Router collects, processes, and safeguards ticket and customer information.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            1. Information We Collect
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            When you use the Support Ticket Router, we collect the necessary metadata and ticket details required to categorize and route inquiries to the appropriate support teams:
          </p>
          <ul className="list-disc list-inside text-sm text-slate-400 space-y-1.5 pl-2">
            <li><strong>Ticket Content:</strong> Subject line, message body, error logs, and customer-provided context.</li>
            <li><strong>Customer Identifiers:</strong> Name, business email address, company account, and service subscription tier.</li>
            <li><strong>Operational History:</strong> Timestamped lifecycle events, assignment records, and previous ticket interaction counts used solely for affinity routing.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            2. How Information is Processed
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Information submitted into the router is processed through deterministic rule engines and local classification models:
          </p>
          <ul className="list-disc list-inside text-sm text-slate-400 space-y-1.5 pl-2">
            <li>To extract relevant keywords and determine routing confidence scores.</li>
            <li>To queue tickets for Billing Support, Technical Support, General Support, or Human Manual Review.</li>
            <li>We do not sell customer data or share ticket descriptions with third-party advertising networks.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            3. Data Retention and Security
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            All stored tickets, customer profile records, and audit logs are retained in accordance with your organization's support data retention policies. Data in transit is protected using TLS encryption, and access controls restrict sensitive ticket details strictly to authorized support personnel and system administrators.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">4. User Rights and Controls</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Authorized administrators may request data exports, audit log reviews, or the redaction and deletion of specific ticket records at any time through the system settings or by contacting the system administrator.
          </p>
        </section>

        <section className="pt-4 border-t border-white/10 text-xs text-slate-500">
          For privacy inquiries or technical data requests, contact your support operations team or system administrator.
        </section>
      </div>
    </div>
  );
};
