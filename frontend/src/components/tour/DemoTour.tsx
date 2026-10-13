import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Maximize2,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PageId } from '../../types';

interface TourStepData {
  title: string;
  tagline: string;
  targetPage: PageId;
  icon: React.ReactNode;
  accentColor: string;
  description: string;
  highlights: string[];
  actionLabel?: string;
  actionHandler?: (app: ReturnType<typeof useApp>) => void;
}

const TOUR_STEPS: TourStepData[] = [
  {
    title: 'Support Ticket Router',
    tagline: 'Automated Ingestion & Triage Platform',
    targetPage: 'dashboard',
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
    accentColor: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400',
    description: 'An automated ticketing platform combining deterministic keyword heuristics with NLP classification and safety guardrails.',
    highlights: [
      'Real-time SLA telemetry and queue distribution',
      'Dual-engine classification with 80% confidence threshold',
      'Full glassmorphic UI with responsive controls'
    ],
    actionLabel: 'Explore Dashboard Metrics',
    actionHandler: (app) => {
      app.setActivePage('dashboard');
      app.showToast('info', 'Dashboard Active', 'Viewing support telemetry and metrics.');
    }
  },
  {
    title: 'Ticket Simulation Engine',
    tagline: 'Realistic Inbound Stream Generation',
    targetPage: 'dashboard',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    accentColor: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    description: 'Experience instant simulated customer traffic. Test billing inquiries, server 500 crashes, SOC2 compliance audits, and critical production outage tickets with a single click.',
    highlights: [
      'Pre-configured realistic corporate scenarios',
      'Instantaneous pipeline execution & categorization',
      'Live metric recalculation upon ingestion'
    ],
    actionLabel: 'Inject Simulated Ticket',
    actionHandler: (app) => {
      app.createRandomDemoTicket();
      app.showToast('success', 'Ticket Ingested', 'Simulated ticket injected and routed through the pipeline!');
    }
  },
  {
    title: '8-Step Routing Stepper',
    tagline: 'Explainable Pipeline Diagnostics',
    targetPage: 'create-ticket',
    icon: <Cpu className="w-5 h-5 text-sky-400" />,
    accentColor: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400',
    description: 'Watch incoming tickets stream through our 8-stage routing pipeline: Lexical analysis -> Heuristic rules -> Vector embedding -> Softmax NLP classification -> Confidence scoring -> Risk guardrails -> Team dispatch.',
    highlights: [
      'Transparent rule-score vs. AI-score comparison',
      'Live animated 8-stage pipeline visualization',
      'One-click scenario pre-fill buttons for rapid testing'
    ],
    actionLabel: 'Go to 8-Step Pipeline',
    actionHandler: (app) => {
      app.setActivePage('create-ticket');
    }
  },
  {
    title: 'Manual Review Queue',
    tagline: 'Safety Guardrail for Low-Confidence Items',
    targetPage: 'manual-review',
    icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
    accentColor: 'from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400',
    description: 'Any ticket falling below the configurable 80% confidence threshold is held in the Manual Review queue with automated reasoning bullets for human verification.',
    highlights: [
      'Configurable 0%–100% confidence threshold slider',
      'Automated explanation bullets detailing why review is required',
      'Instant one-click manual triage & re-routing'
    ],
    actionLabel: 'Inspect Review Queue',
    actionHandler: (app) => {
      app.setActivePage('manual-review');
    }
  },
  {
    title: 'NLP Classifier Lab',
    tagline: 'Machine Learning Model Inspector',
    targetPage: 'ai-classification',
    icon: <BarChart3 className="w-5 h-5 text-emerald-400" />,
    accentColor: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    description: 'A live NLP laboratory. Type or paste any raw customer inquiry to watch real-time tokenization, TF-IDF vectorization, and Softmax probability distributions across BILLING, TECHNICAL, and OTHER categories.',
    highlights: [
      'Softmax probability distribution bar chart',
      'Interactive token attention & weight highlighter',
      'Synchronized with Python classifier model endpoints'
    ],
    actionLabel: 'Launch Classifier Lab',
    actionHandler: (app) => {
      app.setActivePage('ai-classification');
    }
  },
  {
    title: 'Interactive Routing Portal',
    tagline: 'Scroll-Driven Typography Showcase',
    targetPage: 'glyph-portal',
    icon: <Eye className="w-5 h-5 text-sky-400" />,
    accentColor: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400',
    description: 'A scroll-driven virtual 3D camera traversing live typography and ticket routing telemetry. Powered by bespoke optical matrix transforms.',
    highlights: [
      'Scroll-driven 3D focal depth navigation',
      'Live reactive typography rendering with zero canvas overhead',
      'Direct shortcut links back into system triage queues'
    ],
    actionLabel: 'Enter Routing Portal',
    actionHandler: (app) => {
      app.setActivePage('glyph-portal');
    }
  },
  {
    title: 'Java Backend Architecture',
    tagline: 'Clean Architecture & Design Patterns',
    targetPage: 'architecture',
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    accentColor: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
    description: 'Discover the production-grade Java OOP implementation behind the router. Inspect the Chain of Responsibility, Strategy, Observer, and Decorator patterns that ensure thread-safe concurrent routing.',
    highlights: [
      'Interactive UML class hierarchy and relationship diagram',
      'Full Java source code snippets for design patterns',
      'Thread-safe concurrent ticket ingestion pipeline specs'
    ],
    actionLabel: 'Explore Java Architecture',
    actionHandler: (app) => {
      app.setActivePage('architecture');
    }
  }
];

export const DemoTour: React.FC = () => {
  const app = useApp();
  const { isTourOpen, tourStep, closeTour, nextTourStep, prevTourStep, setTourStep, setActivePage } = app;
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const currentStepData = TOUR_STEPS[tourStep] || TOUR_STEPS[0];
  const totalSteps = TOUR_STEPS.length;
  const isFirstStep = tourStep === 0;
  const isLastStep = tourStep === totalSteps - 1;

  // Auto navigate to the target page when step changes
  useEffect(() => {
    if (isTourOpen && currentStepData) {
      setActivePage(currentStepData.targetPage);
    }
  }, [isTourOpen, tourStep, currentStepData, setActivePage]);

  // Keyboard navigation
  useEffect(() => {
    if (!isTourOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeTour();
      } else if (e.key === 'ArrowRight' && !isLastStep) {
        nextTourStep();
      } else if (e.key === 'ArrowLeft' && !isFirstStep) {
        prevTourStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourOpen, isLastStep, isFirstStep, closeTour, nextTourStep, prevTourStep]);

  const handleFinish = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    app.showToast('success', 'Tour Completed', 'You have explored all core features of the Support Ticket Router.');
    closeTour();
  }, [app, closeTour]);

  if (!isTourOpen) return null;

  // Minimized dock pill
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="glass-panel px-4 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-white/20 dark:border-white/10 bg-card/90 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-xs font-semibold text-foreground">
              Tour: Step {tourStep + 1} of {totalSteps}
            </span>
          </div>

          <div className="h-4 w-px bg-border/60" />

          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            title="Expand Tour Guide"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand</span>
          </button>

          <button
            onClick={closeTour}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
            title="Close Tour"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = ((tourStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end p-4 sm:p-6 md:items-end">
      {/* Subtle backdrop overlay for focus */}
      <div 
        className="fixed inset-0 bg-background/30 backdrop-blur-[2px] pointer-events-auto transition-opacity duration-300"
        onClick={closeTour}
      />

      {/* Floating Tour Card */}
      <div className="relative pointer-events-auto w-full max-w-xl glass-panel rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/25 dark:border-white/15 bg-card/92 dark:bg-card/88 backdrop-blur-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6">
        {/* Top Progress Bar */}
        <div className="h-1.5 w-full bg-muted/40 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Card Header */}
        <div className="p-5 pb-3 flex items-start justify-between gap-4 border-b border-white/10 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border bg-gradient-to-br shadow-inner ${currentStepData.accentColor}`}>
              {currentStepData.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                  Feature Walkthrough
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {tourStep + 1} / {totalSteps}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mt-0.5 tracking-tight">
                {currentStepData.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              title="Minimize to Pill"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeTour}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              title="Close Tour (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 space-y-4">
          <p className="text-xs font-medium text-primary tracking-wide">
            {currentStepData.tagline}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {currentStepData.description}
          </p>

          {/* Highlights checklist */}
          <div className="space-y-2 py-1">
            {currentStepData.highlights.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {/* Direct Interactive Action Trigger */}
          {currentStepData.actionLabel && currentStepData.actionHandler && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => currentStepData.actionHandler!(app)}
                className="w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary font-medium text-xs transition-all duration-200 shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
                  <span>{currentStepData.actionLabel}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Step Dots */}
        <div className="px-5 py-2 flex items-center justify-center gap-1.5 border-t border-white/10 dark:border-white/5 bg-muted/20">
          {TOUR_STEPS.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setTourStep(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === tourStep 
                  ? 'w-6 bg-primary' 
                  : idx < tourStep 
                    ? 'w-2 bg-primary/50 hover:bg-primary/70' 
                    : 'w-2 bg-muted hover:bg-muted-foreground/40'
              }`}
              title={`Jump to: ${step.title}`}
            />
          ))}
        </div>

        {/* Footer Navigation Controls */}
        <div className="p-4 px-5 flex items-center justify-between border-t border-white/10 dark:border-white/5 bg-card/60">
          <button
            onClick={closeTour}
            className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Skip Tour
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={prevTourStep}
              disabled={isFirstStep}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                isFirstStep
                  ? 'opacity-40 cursor-not-allowed border-transparent text-muted-foreground'
                  : 'border-white/20 dark:border-white/10 bg-card hover:bg-muted/40 text-foreground'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {isLastStep ? (
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Finish Tour</span>
              </button>
            ) : (
              <button
                onClick={nextTourStep}
                className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground shadow-md transition-all cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
