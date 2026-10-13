import React, { useState } from 'react';
import GlyphPortal from '@/components/ui/glyph-portal';
import Demo from '@/components/ui/demo';
import { 
  Sparkles, 
  Layers, 
  Code2, 
  Eye, 
  CheckCircle2, 
  FolderTree, 
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BackgroundPreset {
  id: string;
  name: string;
  overlay: string;
}

const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'deep-slate',
    name: 'Deep Slate Grid',
    overlay: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
  },
  {
    id: 'indigo-technical',
    name: 'Technical Indigo',
    overlay: 'linear-gradient(135deg, #1e1b4b 0%, #0c4a6e 100%)'
  },
  {
    id: 'minimal-dark',
    name: 'Clean Charcoal',
    overlay: 'linear-gradient(135deg, #090d16 0%, #182030 100%)'
  },
  {
    id: 'emerald-ops',
    name: 'Operations Emerald',
    overlay: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)'
  }
];

export const GlyphPortalPage: React.FC = () => {
  const { metrics } = useApp();
  const [activeTab, setActiveTab] = useState<'router' | 'demo' | 'docs'>('router');
  
  // Customizer state for Router theme
  const [word, setWord] = useState('ROUTER');
  const [scrollLength, setScrollLength] = useState(2.8);
  const [interactive, setInteractive] = useState(true);
  const [annotations, setAnnotations] = useState(false);
  const [activeBg, setActiveBg] = useState<BackgroundPreset>(BACKGROUND_PRESETS[0]);
  const [customWordInput, setCustomWordInput] = useState('');

  const handleApplyCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (customWordInput.trim()) {
      setWord(customWordInput.trim().toUpperCase());
      setCustomWordInput('');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Title Banner */}
      <div className="glass-panel p-6 sm:p-8 relative overflow-hidden border border-white/[0.08] shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interactive Component Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Routing Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-sans leading-relaxed">
              Explore scroll-driven typography zooming with vector paths, canvas raster ink measurement, and responsive container controls.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('router')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'router'
                  ? 'btn-primary'
                  : 'btn-secondary text-slate-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Router Portal</span>
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'demo'
                  ? 'btn-primary'
                  : 'btn-secondary text-slate-300'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Component Demo</span>
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'docs'
                  ? 'btn-primary'
                  : 'btn-secondary text-slate-300'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Setup Specs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Support Router Custom Experience */}
      {activeTab === 'router' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="glass-card p-5 border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                  Typography &amp; Viewport Controls
                </span>
              </div>
              <span className="font-mono text-xs text-slate-400">
                Word: <strong className="text-white">{word}</strong> ({word.length} glyphs)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Word Presets */}
              <div>
                <label className="block text-[10px] font-mono font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                  Word Presets
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['ROUTER', 'QUEUES', 'DISPATCH', 'SUPPORT', 'TICKET'].map((w) => (
                    <button
                      key={w}
                      onClick={() => setWord(w)}
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                        word === w
                          ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.06]'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Word Input */}
              <div>
                <label className="block text-[10px] font-mono font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                  Custom Text (Uppercase)
                </label>
                <form onSubmit={handleApplyCustomWord} className="flex gap-1.5">
                  <input
                    type="text"
                    value={customWordInput}
                    onChange={(e) => setCustomWordInput(e.target.value)}
                    placeholder="E.g. SYSTEM"
                    className="flex-1 glass-input px-3 py-1 text-xs font-mono text-white"
                  />
                  <button
                    type="submit"
                    className="btn-primary px-3 py-1 text-xs font-semibold"
                  >
                    Set
                  </button>
                </form>
              </div>

              {/* Scroll Travel Length */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-400">
                    Scroll Distance
                  </label>
                  <span className="font-mono text-xs font-semibold text-indigo-400">{scrollLength.toFixed(1)}x height</span>
                </div>
                <input
                  type="range"
                  min="1.2"
                  max="6.0"
                  step="0.2"
                  value={scrollLength}
                  onChange={(e) => setScrollLength(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-white/[0.05] h-1.5 rounded-full cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div>
                <label className="block text-[10px] font-mono font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                  Interactive Controls
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setInteractive(!interactive)}
                    className={`flex-1 py-1.5 px-2 font-mono text-[11px] rounded-lg border transition-all cursor-pointer ${
                      interactive 
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 font-semibold' 
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-500'
                    }`}
                  >
                    {interactive ? 'Letter Pick: ON' : 'Letter Pick: OFF'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnnotations(!annotations)}
                    className={`flex-1 py-1.5 px-2 font-mono text-[11px] rounded-lg border transition-all cursor-pointer ${
                      annotations 
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-300 font-semibold' 
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-500'
                    }`}
                  >
                    {annotations ? 'Crosshairs: ON' : 'Crosshairs: OFF'}
                  </button>
                </div>
              </div>
            </div>

            {/* Pure CSS Background Presets (No Unsplash stock photos) */}
            <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2.5">
              <span className="text-[10px] font-mono uppercase text-slate-400">Theme Backdrop:</span>
              {BACKGROUND_PRESETS.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setActiveBg(bg)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                    activeBg.id === bg.id
                      ? 'bg-white/[0.1] text-white border border-indigo-400/50 shadow-sm'
                      : 'bg-white/[0.02] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                  }`}
                >
                  {bg.name}
                </button>
              ))}
            </div>
          </div>

          {/* Viewport Frame Container */}
          <div className="glass-card p-0 border border-white/[0.08] shadow-2xl overflow-hidden relative">
            <div 
              className="w-full h-[680px] overflow-y-auto relative"
              tabIndex={0}
              role="region"
              aria-label="Interactive Glyph Portal. Scroll down to enter through the typography."
            >
              <GlyphPortal
                word={word}
                scrollLength={scrollLength}
                interactive={interactive}
                annotations={annotations}
                fontFamily='"Plus Jakarta Sans", "Inter", sans-serif'
                fontWeight={900}
                enterLabel="Enter Support Router"
                background={
                  <div 
                    className="absolute inset-0"
                    style={{ background: activeBg.overlay }}
                  >
                    <div 
                      className="absolute inset-0 opacity-10" 
                      style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                      }}
                    />
                  </div>
                }
                front={
                  <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                    <div className="flex items-center justify-between">
                      <div className="rounded-xl px-4 py-2 bg-black/60 backdrop-blur-md border border-white/[0.1] text-white font-mono font-semibold text-xs uppercase tracking-wider pointer-events-auto">
                        TICKET ROUTER // SYSTEM PIPELINE
                      </div>
                      <div className="rounded-xl px-3 py-1 bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-indigo-300 font-mono text-xs">
                        SERVICES ACTIVE
                      </div>
                    </div>

                    <div className="text-center space-y-2 pointer-events-auto">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200 bg-black/60 backdrop-blur-md inline-block px-4 py-1.5 rounded-full border border-white/[0.1] shadow-lg">
                        Select any letter above or below, then scroll into the typography
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="font-mono text-xs text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.1]">
                        Camera Distance: <strong>{scrollLength}x Container</strong>
                      </div>
                      <div className="font-mono text-xs text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.1]">
                        Scroll Downward &darr;
                      </div>
                    </div>
                  </div>
                }
              >
                {/* Content Inside the Portal */}
                <div className="max-w-4xl mx-auto space-y-8 p-8 md:p-14 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-xs text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pipeline View: Support Ticket Routing Engine</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-white">
                    Support Ticket Routing Pipeline
                  </h2>

                  <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
                    You have traveled directly into the Support Ticket Router engine. 
                    Every incoming customer request is processed with text classification and validated through deterministic business rules.
                  </p>

                  {/* 3 Real Computed Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="glass-card p-6 border border-indigo-500/20 space-y-2">
                      <div className="font-mono text-3xl font-bold text-indigo-400">{metrics.autoRoutedPercentage}%</div>
                      <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold font-mono">
                        Automated Routing Rate
                      </div>
                      <p className="text-xs text-slate-400">
                        Percentage of ingested tickets meeting or exceeding the 80% confidence threshold.
                      </p>
                    </div>

                    <div className="glass-card p-6 border border-rose-500/20 space-y-2">
                      <div className="font-mono text-3xl font-bold text-rose-400">{metrics.manualReviewTickets}</div>
                      <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold font-mono">
                        Manual Review Queue
                      </div>
                      <p className="text-xs text-slate-400">
                        Ambiguous or low-confidence tickets held for human support triage.
                      </p>
                    </div>

                    <div className="glass-card p-6 border border-emerald-500/20 space-y-2">
                      <div className="font-mono text-3xl font-bold text-emerald-400">{Math.round(metrics.averageConfidence * 100)}%</div>
                      <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold font-mono">
                        Average Confidence
                      </div>
                      <p className="text-xs text-slate-400">
                        Average confidence score across all {metrics.totalTickets} active tickets.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <a
                      href="#top"
                      className="btn-primary px-6 py-3 text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Scroll Up to Re-Enter</span>
                    </a>
                  </div>
                </div>
              </GlyphPortal>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Exact 21st.dev Demo */}
      {activeTab === 'demo' && (
        <div className="space-y-4">
          <div className="glass-card p-4 border border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-white">
                Component Demo ("SUBLIME" Typography)
              </span>
            </div>
            <span className="font-mono text-xs text-slate-400">
              Source: <code className="text-indigo-300">@/components/ui/demo.tsx</code>
            </span>
          </div>

          <div className="glass-card p-0 border border-white/[0.08] shadow-2xl overflow-hidden">
            <Demo />
          </div>
        </div>
      )}

      {/* Tab 3: Setup & shadcn Specs */}
      {activeTab === 'docs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 border border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-indigo-400">shadcn/ui Structure</span>
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Configured &amp; Active</h3>
              <p className="text-xs text-slate-400">
                <code className="text-indigo-300 font-mono">components.json</code> maps to <code className="text-slate-300">@/components/ui</code> and <code className="text-slate-300">@/lib/utils</code>.
              </p>
            </div>

            <div className="glass-card p-6 border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-cyan-400">Tailwind CSS</span>
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">v4 Native Engine</h3>
              <p className="text-xs text-slate-400">
                Utilizing modern <code className="text-cyan-300 font-mono">@tailwindcss/vite</code> with full container query support.
              </p>
            </div>

            <div className="glass-card p-6 border border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-emerald-400">TypeScript</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Strict Type-Safe</h3>
              <p className="text-xs text-slate-400">
                Clean bundler resolution paths configured in <code className="text-emerald-300 font-mono">tsconfig.app.json</code> with zero warnings.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 border border-white/[0.08] shadow-xl space-y-4">
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-indigo-400" />
              Component Path Architecture &amp; The /components/ui Standard
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Separating atomic UI primitives in <code className="text-indigo-400 font-mono">/components/ui</code> guarantees that the shadcn CLI (<code className="text-slate-200 font-mono">npx shadcn@latest add ...</code>) can add components with zero circular imports, predictable paths, and instant portability across design systems.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlyphPortalPage;
