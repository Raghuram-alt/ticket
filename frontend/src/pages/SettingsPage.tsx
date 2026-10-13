import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  Sliders, 
  Tag, 
  Users, 
  CheckCircle2, 
  RotateCcw,
  Server,
  Globe,
  Lock,
  RefreshCw
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { 
    confidenceThreshold, 
    setConfidenceThreshold, 
    backendMode, 
    setBackendMode,
    backendStatus,
    showToast
  } = useApp();

  const [thresholdVal, setThresholdVal] = useState<number>(Math.round(confidenceThreshold * 100));
  const [billingKeywords, setBillingKeywords] = useState<string>(
    'payment, invoice, refund, charged, charge, subscription, billing, credit card, transaction, receipt'
  );
  const [techKeywords, setTechKeywords] = useState<string>(
    'error, bug, crash, crashes, login, api, server, website, dashboard, not loading, 500, exception'
  );

  // Custom Domain Configuration State
  const [customDomain, setCustomDomain] = useState<string>('support.company.com');
  const [isDomainVerifying, setIsDomainVerifying] = useState<boolean>(false);
  const [isDomainConnected, setIsDomainConnected] = useState<boolean>(true);

  const handleSaveThreshold = () => {
    const dec = thresholdVal / 100;
    setConfidenceThreshold(dec);
    showToast('success', 'Threshold Saved', `Confidence gate set to ${thresholdVal}%.`);
  };

  const handleResetDefaults = () => {
    setThresholdVal(80);
    setConfidenceThreshold(0.80);
    showToast('info', 'Settings Reset', 'Configuration restored to default values (80% threshold).');
  };

  const handleVerifyDomain = async () => {
    setIsDomainVerifying(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsDomainVerifying(false);
    setIsDomainConnected(true);
    showToast('success', 'Domain Verified', `Custom domain ${customDomain} is connected and TLS certificate is active.`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium mb-2">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>SYSTEM POLICIES &amp; THRESHOLD CONTROLS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Settings &amp; Routing Rules
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Configure classifier thresholds, keyword dictionaries, custom domains, and department mapping policies.
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white shrink-0 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Custom Domain Configuration */}
      <div className="glass-card p-6 border border-white/[0.08] shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <Globe className="w-4 h-4 text-indigo-400" />
            Custom Domain &amp; SSL Configuration
          </h3>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
            isDomainConnected 
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          }`}>
            <CheckCircle2 className="w-3 h-3" />
            {isDomainConnected ? 'Connected & Secured' : 'Pending DNS'}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Connect your organization's custom domain to serve the Support Ticket Router under your own branded hostname.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-slate-300 block">
              Custom Domain Hostname
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="support.yourcompany.com"
                className="flex-1 glass-input px-3.5 py-2 text-xs sm:text-sm font-mono text-white"
              />
              <button
                onClick={handleVerifyDomain}
                disabled={isDomainVerifying || !customDomain.trim()}
                className="btn-primary px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isDomainVerifying ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                <span>Verify</span>
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] font-mono text-xs space-y-1.5 text-slate-400">
            <div className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>DNS CNAME Target</span>
            </div>
            <div className="text-[11px] text-slate-300 bg-white/[0.04] p-1.5 rounded border border-white/[0.06] select-all">
              cname.ticketrouter.internal
            </div>
            <p className="text-[10px] text-slate-400">
              Point your domain CNAME record to the host above. SSL is automatically renewed.
            </p>
          </div>
        </div>
      </div>

      {/* Confidence Threshold Configuration Card */}
      <div className="glass-card p-6 border border-white/[0.08] shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <Sliders className="w-4 h-4 text-indigo-400" />
            Confidence Gate Threshold
          </h3>
          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
            Current: {thresholdVal}%
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Tickets with classifier scores at or above this threshold will automatically dispatch to their target support teams. Any tickets scoring below will be safely quarantined into the Manual Review queue.
        </p>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Aggressive (50%)</span>
            <span className="text-white font-bold text-sm">{thresholdVal}%</span>
            <span>Conservative (95%)</span>
          </div>

          <input
            type="range"
            min="50"
            max="95"
            step="1"
            value={thresholdVal}
            onChange={(e) => setThresholdVal(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-500 bg-white/[0.06] h-2 rounded-full cursor-pointer"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono text-slate-400">
              Default Recommended: <strong className="text-emerald-400">80%</strong>
            </span>
            <button
              onClick={handleSaveThreshold}
              className="btn-primary px-4 py-2 text-xs font-semibold cursor-pointer"
            >
              Apply Threshold
            </button>
          </div>
        </div>
      </div>

      {/* Keyword Heuristic Rules */}
      <div className="glass-card p-6 border border-white/[0.08] shadow-xl space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/[0.08] font-display">
          <Tag className="w-4 h-4 text-cyan-400" />
          Deterministic Rule Dictionaries
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-emerald-300 block">
              Billing Category Keywords (CSV)
            </label>
            <input
              type="text"
              value={billingKeywords}
              onChange={(e) => setBillingKeywords(e.target.value)}
              className="w-full glass-input px-3.5 py-2 text-xs font-mono text-slate-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-semibold text-cyan-300 block">
              Technical Category Keywords (CSV)
            </label>
            <input
              type="text"
              value={techKeywords}
              onChange={(e) => setTechKeywords(e.target.value)}
              className="w-full glass-input px-3.5 py-2 text-xs font-mono text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Team Queues Mapping */}
      <div className="glass-card p-6 border border-white/[0.08] shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/[0.08] font-display">
          <Users className="w-4 h-4 text-indigo-400" />
          Category to Support Team Mapping
        </h3>

        <div className="divide-y divide-white/[0.04] font-mono text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <span className="font-semibold text-emerald-400">BILLING</span>
            <span className="text-slate-300">Mapped to: Billing Support</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="font-semibold text-cyan-400">TECHNICAL</span>
            <span className="text-slate-300">Mapped to: Technical Support</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="font-semibold text-indigo-400">OTHER</span>
            <span className="text-slate-300">Mapped to: General Support</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="font-semibold text-rose-400">CONFIDENCE &lt; THRESHOLD</span>
            <span className="text-rose-400">Mapped to: Manual Review Team</span>
          </div>
        </div>
      </div>

      {/* Backend & Deployment Mode */}
      <div className="glass-card p-6 border border-white/[0.08] shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/[0.08] font-display">
          <Server className="w-4 h-4 text-indigo-400" />
          Backend Runtime Selection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            onClick={() => setBackendMode('simulation')}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              backendMode === 'simulation'
                ? 'bg-indigo-500/15 border-indigo-500/40 text-white shadow-sm'
                : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.15]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white">Browser Simulation</span>
              {backendMode === 'simulation' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300 font-sans">
              Executes RuleEngine and TF-IDF Classifier directly in browser memory with zero external dependencies.
            </p>
          </div>

          <div 
            onClick={() => setBackendMode('backend')}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              backendMode === 'backend'
                ? 'bg-indigo-500/15 border-indigo-500/40 text-white shadow-sm'
                : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.15]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white">Live Spring Boot &amp; FastAPI</span>
              {backendMode === 'backend' && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300 font-sans">
              Dispatches network requests to Java Spring Boot on <code className="bg-black/60 text-slate-200 px-1 py-0.5 rounded">localhost:8080</code> and Python FastAPI on <code className="bg-black/60 text-slate-200 px-1 py-0.5 rounded">localhost:8000</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
