import React from 'react';
import { 
  Cpu, 
  BrainCircuit, 
  Layers, 
  ArrowDown, 
  CheckCircle2, 
  Server, 
  Code, 
  Workflow,
  Sparkles,
  Users,
  Radio,
  Home,
  ArrowLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ArchitecturePage: React.FC = () => {
  const { setActivePage } = useApp();
  const components = [
    {
      title: 'React 19 + TypeScript Frontend',
      role: 'User Interface & Interaction Layer',
      tech: 'React 19, TypeScript, Tailwind CSS, Vite',
      description: 'Provides real-time ticket creation, live 8-step routing visualization, dashboard analytics, manual review triage, and customer management.',
      icon: <Layers className="w-5 h-5 text-indigo-400" />
    },
    {
      title: 'Java Spring Boot Routing Agent',
      role: 'Core Business Logic & Coordinator',
      tech: 'Java 17/21, Spring Boot 3.2, REST Controller',
      description: 'Acts as the central orchestrator coordinating rule-based checks, priority detection, customer history retrieval, and external classifier calls.',
      icon: <Server className="w-5 h-5 text-indigo-400" />
    },
    {
      title: 'Java Rule Engine',
      role: 'Deterministic Rule Processing',
      tech: 'Object-Oriented Rule Pattern',
      description: 'Performs dictionary keyword lookups, priority keyword scans (Critical, High, Medium, Low), and initial category scoring.',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'Customer History Module',
      role: 'Historical Context & Affinity Scoring',
      tech: 'OOP Domain Aggregates',
      description: 'Tracks customer past tickets and category ratios. Serves as supporting context for ambiguous tickets without overriding strong direct evidence.',
      icon: <Workflow className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Python FastAPI Classifier Microservice',
      role: 'Machine Learning NLP Service',
      tech: 'Python 3.11, FastAPI, Uvicorn',
      description: 'Exposes POST /classify endpoint. Ingests ticket text, normalizes tokens, computes term vectors, and outputs probability distributions.',
      icon: <BrainCircuit className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'TF-IDF + Multinomial ML Model',
      role: 'Text Classification Model',
      tech: 'TF-IDF Vectorizer + Multinomial Probability',
      description: 'Trained on 80+ realistic SaaS support tickets covering Billing, Technical, and Other categories with calibrated confidence scores.',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Java TicketRouter & Confidence Gate',
      role: 'Guardrail & Team Queue Assignment',
      tech: 'Threshold Logic (>=80% Auto, <80% Manual)',
      description: 'Enforces the confidence gate. High confidence items are assigned to Billing, Technical, or General Support. Low confidence items go to Manual Review.',
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />
    },
    {
      title: 'Support Team Queues',
      role: 'Final Resolution Destinations',
      tech: 'Billing Support, Technical Support, General Support, Manual Review',
      description: 'Target destinations where agents resolve tickets according to SLAs.',
      icon: <Users className="w-5 h-5 text-indigo-400" />
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium mb-2">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span>ENTERPRISE DISTRIBUTED SYSTEM TOPOLOGY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
          System Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          End-to-end data flow between React frontend, Java Spring Boot business engine, and Python NLP classifier microservice.
        </p>
      </div>

      {/* Visual Pipeline Flow Diagram */}
      <div className="glass-card p-6 md:p-8 border border-white/[0.08] shadow-2xl">
        <h2 className="text-sm font-mono font-semibold uppercase tracking-wider mb-6 text-center text-slate-300">
          End-to-End Execution Pipeline
        </h2>

        <div className="flex flex-col items-center space-y-4 max-w-xl mx-auto font-mono text-xs">
          {/* Step 1 */}
          <div className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-center font-medium shadow-md">
            [1] Customer Ticket Ingestion (React &bull; REST Client)
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-400 animate-bounce" />

          {/* Step 2 */}
          <div className="w-full p-4 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 text-center font-semibold shadow-lg shadow-indigo-500/10">
            [2] Java Spring Boot Routing Agent (Coordinator Service)
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-400" />

          {/* Step 3 */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-center">
              <span className="font-semibold block">[3A] Java Rule Engine</span>
              <span className="text-[10px] text-cyan-400/80 block mt-0.5">Regex Keywords &amp; Priority</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-center">
              <span className="font-semibold block">[3B] Customer History</span>
              <span className="text-[10px] text-amber-400/80 block mt-0.5">Past Affinity Context</span>
            </div>
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-400" />

          {/* Step 4 */}
          <div className="w-full p-4 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-center font-semibold">
            [4] Python FastAPI NLP Service (POST /classify)
          </div>
          <ArrowDown className="w-4 h-4 text-blue-400" />

          {/* Step 5 */}
          <div className="w-full p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-200 text-center">
            <span className="font-semibold block">[5] TF-IDF + Multinomial Probability Model</span>
            <span className="text-[10px] text-indigo-300/80 mt-0.5 block">Outputs Category Probability Distribution</span>
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-400" />

          {/* Step 6 */}
          <div className="w-full p-4 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 text-center font-semibold shadow-md">
            [6] Java RoutingAgent Synthesizes Scores &amp; Enforces 80% Gate
          </div>
          <ArrowDown className="w-4 h-4 text-indigo-400" />

          {/* Step 7 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full text-center">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
              <span className="font-semibold text-xs block">Billing Support</span>
              <span className="text-[10px] text-emerald-400/80">Conf &ge; 80%</span>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-300">
              <span className="font-semibold text-xs block">Tech Support</span>
              <span className="text-[10px] text-cyan-400/80">Conf &ge; 80%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/25 text-slate-300">
              <span className="font-semibold text-xs block">General Support</span>
              <span className="text-[10px] text-slate-400/80">Conf &ge; 80%</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300">
              <span className="font-semibold text-xs block">Manual Review</span>
              <span className="text-[10px] text-rose-400/80">Conf &lt; 80%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Component Responsibility Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold uppercase tracking-tight text-white font-display">
          Subsystem Responsibility Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {components.map((comp, idx) => (
            <div
              key={idx}
              className="glass-card p-5 border border-white/[0.08] shadow-2xl space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                  {comp.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">{comp.title}</h3>
                  <span className="text-xs text-indigo-400 font-sans">{comp.role}</span>
                </div>
              </div>
              <div className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.06] text-slate-300">
                Tech: {comp.tech}
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
