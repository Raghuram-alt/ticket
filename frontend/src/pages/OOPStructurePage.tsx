import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  GitFork, 
  Workflow, 
  Code2, 
  FileCode, 
  Copy, 
  Check, 
  Box,
  Share2,
  Terminal,
  Cpu,
  Home,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OOPStructurePage: React.FC = () => {
  const { setActivePage } = useApp();
  const [activeClassTab, setActiveClassTab] = useState<string>('Ticket');
  const [copied, setCopied] = useState<boolean>(false);

  const oopPrinciples = [
    {
      title: 'Encapsulation',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      border: 'border-indigo-500/20',
      description: 'Internal state is protected through private fields (e.g., ticketId, status, confidence) accessible exclusively via public getters/setters and domain mutation methods like ticket.updateStatus(). Prevents illegal state transitions.'
    },
    {
      title: 'Abstraction',
      icon: <Box className="w-5 h-5 text-cyan-400" />,
      border: 'border-cyan-500/20',
      description: 'Complex subsystems hide implementation details behind clear interfaces. For example, PythonClassifierClient abstracts the HTTP REST exchange and JSON serialization behind a single classify(text) contract.'
    },
    {
      title: 'Polymorphism',
      icon: <GitFork className="w-5 h-5 text-emerald-400" />,
      border: 'border-emerald-500/20',
      description: 'Enables interchangeable behavior through common interfaces or sub-typing. Fallback mock classification and live remote Python client fulfill the same ClassifierResponse contract seamlessly.'
    },
    {
      title: 'Modularity & Composition',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      border: 'border-indigo-500/20',
      description: 'RoutingAgent coordinates collaborating domain objects (RuleEngine, TicketRouter, CustomerHistory, PythonClassifierClient) rather than monopolizing business logic, adhering to the Single Responsibility Principle (SRP).'
    }
  ];

  const codeSnippets: Record<string, { desc: string; code: string }> = {
    Ticket: {
      desc: 'Encapsulates ticket lifecycle, category, priority, confidence score, and routing result.',
      code: `public class Ticket {
    private String ticketId;
    private String customerId;
    private String customerName;
    private String email;
    private String subject;
    private String description;
    private TicketCategory category;
    private Priority priority;
    private double confidence;
    private String assignedTeam;
    private TicketStatus status;
    private RoutingResult routingResult;

    // Encapsulated state transition
    public void updateStatus(TicketStatus newStatus) {
        this.status = newStatus;
        this.updatedAt = LocalDateTime.now();
    }

    public String getCombinedText() {
        return (subject + " " + description).trim();
    }
}`
    },
    RoutingAgent: {
      desc: 'Mediator/Coordinator that orchestrates RuleEngine, Python classifier, and TicketRouter.',
      code: `@Service
public class RoutingAgent {
    private final RuleEngine ruleEngine;
    private final PythonClassifierClient classifierClient;
    private final TicketRouter ticketRouter;

    public RoutingResult processTicket(Ticket ticket, CustomerHistory history) {
        // 1. Rule Engine keyword & priority analysis
        RuleAnalysisResult ruleAnalysis = ruleEngine.analyze(ticket, history);
        
        // 2. Python FastAPI text classifier invocation
        ClassifierResponse aiResponse = classifierClient.classify(ticket.getCombinedText());
        
        // 3. Synthesize confidence and resolve conflicts
        TicketCategory finalCat = resolveCategory(ruleAnalysis, aiResponse);
        double finalConf = resolveConfidence(ruleAnalysis, aiResponse);
        
        // 4. Team assignment & Guardrails
        RoutingAssignment assignment = ticketRouter.determineAssignment(finalCat, finalConf);
        
        return buildRoutingResult(ticket, assignment, ruleAnalysis, aiResponse);
    }
}`
    },
    RuleEngine: {
      desc: 'Deterministic rule analysis evaluating keywords, priority markers, and customer history.',
      code: `@Component
public class RuleEngine {
    private final Set<String> billingKeywords = Set.of("payment", "invoice", "refund", "subscription", "charge");
    private final Set<String> technicalKeywords = Set.of("error", "bug", "crash", "login", "api", "server");

    public RuleAnalysisResult analyze(Ticket ticket, CustomerHistory history) {
        String text = ticket.getCombinedText().toLowerCase();
        List<String> billingMatches = findKeywords(text, billingKeywords);
        List<String> techMatches = findKeywords(text, technicalKeywords);
        
        // Priority Detection
        Priority priority = detectPriority(text);
        
        // Category scoring taking historical affinity into account
        return evaluateScores(billingMatches, techMatches, history, priority);
    }
}`
    },
    TicketRouter: {
      desc: 'Dispatches tickets to department queues enforcing the 80% confidence threshold gate.',
      code: `@Component
public class TicketRouter {
    private final double confidenceThreshold = 0.80;

    public RoutingAssignment determineAssignment(TicketCategory category, double confidence) {
        if (confidence >= confidenceThreshold) {
            // High Confidence -> Automatic Routing
            switch (category) {
                case BILLING: return new RoutingAssignment("Billing Support", true);
                case TECHNICAL: return new RoutingAssignment("Technical Support", true);
                default: return new RoutingAssignment("General Support", true);
            }
        } else {
            // Low Confidence -> Manual Review Guardrail
            return new RoutingAssignment("Manual Review Team", false);
        }
    }
}`
    },
    PythonClassifierClient: {
      desc: 'HTTP REST client calling Python FastAPI /classify with seamless fallback.',
      code: `@Component
public class PythonClassifierClient {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String url = "http://localhost:8000/classify";

    public ClassifierResponse classify(String ticketText) {
        try {
            HttpEntity<Map<String, String>> request = new HttpEntity<>(Map.of("text", ticketText));
            ResponseEntity<PythonApiResponse> res = restTemplate.postForEntity(url, request, PythonApiResponse.class);
            return mapResponse(res.getBody());
        } catch (Exception ex) {
            // High-fidelity fallback if Python server is unreachable
            return executeMockClassifier(ticketText);
        }
    }
}`
    },
    Customer: {
      desc: 'Customer domain model holding CustomerHistory used for affinity scoring.',
      code: `public class Customer {
    private String customerId;
    private String name;
    private String email;
    private String company;
    private String tier;
    private CustomerHistory history;

    // Encapsulation via getters/setters
    public CustomerHistory getHistory() { return history; }
    public void setHistory(CustomerHistory history) { this.history = history; }
}`
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeClassTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-medium mb-2">
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>OBJECT-ORIENTED PROGRAMMING // JAVA SPRING BOOT ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
          OOP Java Backend Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          Detailed explanation of OOP principles, class relationships, and design patterns utilized in the Java Spring Boot Helpdesk Routing Engine.
        </p>
      </div>

      {/* Core OOP Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {oopPrinciples.map((p, idx) => (
          <div
            key={idx}
            className={`glass-card p-5 border ${p.border} shadow-xl space-y-2`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                {p.icon}
              </div>
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wide">
                {p.title}
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>

      {/* Code Inspector Tabs */}
      <div className="glass-card p-0 border border-white/[0.08] shadow-2xl overflow-hidden">
        {/* Class Selection Bar */}
        <div className="p-4 border-b border-white/[0.1] flex items-center justify-between flex-wrap gap-3 bg-white/[0.03] backdrop-blur-md">
          <div className="flex items-center gap-1.5 flex-wrap">
            {Object.keys(codeSnippets).map((className) => (
              <button
                key={className}
                onClick={() => setActiveClassTab(className)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeClassTab === className
                    ? 'btn-primary text-white shadow-lg shadow-indigo-500/30'
                    : 'glass-badge text-slate-300 hover:text-white hover:border-white/[0.25]'
                }`}
              >
                {className}.java
              </button>
            ))}
          </div>

          <button
            onClick={copyCode}
            className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Source'}</span>
          </button>
        </div>

        {/* Code Description */}
        <div className="px-6 py-3 border-b border-white/[0.06] bg-black/40 text-xs font-mono text-slate-400">
          <span className="text-indigo-400 font-semibold">{activeClassTab}.java:</span> {codeSnippets[activeClassTab].desc}
        </div>

        {/* Code Content */}
        <div className="p-6 bg-black/60 overflow-x-auto">
          <pre className="font-mono text-xs text-slate-200 leading-relaxed">
            <code>{codeSnippets[activeClassTab].code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
