import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockEngine } from '../services/mockEngine';
import { CategoryBadge } from '../components/common/Badge';
import { ConfidenceBar } from '../components/common/ConfidenceBar';
import { 
  BrainCircuit, 
  Sparkles, 
  SendHorizontal, 
  RotateCcw, 
  Tag, 
  CheckCircle2, 
  HelpCircle,
  Cpu,
  ArrowRight,
  Zap
} from 'lucide-react';

export const AIClassificationPage: React.FC = () => {
  const { createAndRouteTicket, setActivePage } = useApp();

  const [inputText, setInputText] = useState<string>(
    'I was charged twice for my subscription and need a refund for the duplicate transaction.'
  );

  const presets = [
    {
      title: 'Billing Inquiry',
      text: 'I was charged twice for my monthly subscription and need one payment refunded.'
    },
    {
      title: 'Crash / 500 Error',
      text: 'The analytics dashboard crashes whenever I click export and returns 500 internal server error.'
    },
    {
      title: 'General Support',
      text: 'How can I update my company profile and invite new team members to our workspace?'
    },
    {
      title: 'Vague / Ambiguous',
      text: 'My account is not working properly. Things seem weird today.'
    }
  ];

  // Run live classification on the current text
  const result = mockEngine.classifyText(inputText);
  const priority = mockEngine.detectPriority(inputText);

  const handleCreateTicketFromPlayground = async () => {
    await createAndRouteTicket({
      customerName: 'Playground Tester',
      email: 'tester@playground.internal',
      subject: inputText.slice(0, 50) + (inputText.length > 50 ? '...' : ''),
      description: inputText
    });
    setActivePage('create-ticket');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium mb-2">
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
          <span>NATURAL LANGUAGE PROCESSING // INTERACTIVE PLAYGROUND</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
          AI Text Classification Inspector
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          Type or paste arbitrary customer messages to inspect real-time NLP tokenization, keyword matching, class probabilities, and confidence score calculation.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setInputText(preset.text)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium glass-badge text-slate-200 hover:text-white hover:border-indigo-400/50 transition-all cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Interactive Input Box */}
      <div className="glass-card p-6 shadow-2xl space-y-4">
        <div>
          <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-2">
            Inbound Customer Text
          </label>
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type ticket description here..."
            className="w-full glass-input p-4 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 leading-relaxed font-sans resize-none"
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
          <span>Words Count: {inputText.trim().split(/\s+/).filter(Boolean).length}</span>
          <button
            onClick={() => setInputText('')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Input</span>
          </button>
        </div>
      </div>

      {/* Live Classification Result Card */}
      <div className="glass-card p-6 sm:p-7 border border-white/[0.08] shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Predicted Category</div>
              <div className="flex items-center gap-2 mt-1">
                <CategoryBadge category={result.category} size="md" />
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Confidence Score
            </span>
            <div className="w-40 sm:ml-auto">
              <ConfidenceBar confidence={result.confidence} size="md" />
            </div>
          </div>
        </div>

        {/* Detected Keywords */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-400" />
            Identified Domain Keywords ({result.detectedKeywords.length})
          </h4>
          {result.detectedKeywords.length === 0 ? (
            <p className="text-xs font-mono text-slate-500 italic">
              No strong billing or technical dictionary keywords detected in current text.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {result.detectedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Category Probability Matrix */}
        <div className="space-y-3 pt-2 font-mono">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Softmax Class Probability Distribution
          </h4>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-medium">Billing Support</span>
                <span className="text-slate-200">{Math.round((result.probabilities.BILLING || 0) * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.max(2, Math.round((result.probabilities.BILLING || 0) * 100))}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-cyan-400 font-medium">Technical Support</span>
                <span className="text-slate-200">{Math.round((result.probabilities.TECHNICAL || 0) * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.max(2, Math.round((result.probabilities.TECHNICAL || 0) * 100))}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-indigo-400 font-medium">General Support (Other)</span>
                <span className="text-slate-200">{Math.round((result.probabilities.OTHER || 0) * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.max(2, Math.round((result.probabilities.OTHER || 0) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="text-xs text-slate-400">
            Detected Priority: <strong className="text-rose-400 text-sm uppercase">{priority}</strong>
          </div>
          <button
            onClick={handleCreateTicketFromPlayground}
            className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold cursor-pointer shadow-indigo-500/25"
          >
            <span>Route in Helpdesk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
