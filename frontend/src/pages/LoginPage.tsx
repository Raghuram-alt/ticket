import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  Activity, 
  Loader2, 
  HelpCircle, 
  Check 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setActivePage, currentUser, login, logout, showToast } = useApp();

  const [email, setEmail] = useState(currentUser?.email || 'alex.rivera@company.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Form validation
  const validateForm = () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your work email address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid business email address.');
      return false;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      await login(email.trim(), password);

      showToast(
        'success',
        'Authentication Successful',
        `Welcome back, ${email.split('@')[0]}! Logged in with support permissions.`
      );

      setActivePage('dashboard');
    } catch {
      setErrorMessage('Authentication failed. Please verify your credentials or contact IT support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('routerSecure2026!');
    setErrorMessage(null);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSubmitted(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSubmitted(false);
      showToast('info', 'Recovery Link Sent', `If ${forgotEmail} is in our system, a reset link was sent.`);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Operational Insights Preview */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-card border border-white/[0.12] shadow-xl relative overflow-hidden order-2 lg:order-1 bg-slate-900/50">
          {/* Header Info */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>SUPPORT OPERATIONS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display leading-tight">
              Customer Support Ticket Triage.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Multi-tier classification protecting SLA thresholds and response times in real time.
            </p>
          </div>

          {/* Routing Volume Preview */}
          <div className="relative z-10 my-6 p-5 rounded-xl bg-black/30 border border-white/[0.08] backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Routing Velocity
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-bold font-display text-white tracking-tight">
                    +18.4%
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> Throughput
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>94.2% Auto Rate</span>
              </div>
            </div>

            {/* Clean SVG Trendline */}
            <div className="h-24 w-full relative">
              <svg viewBox="0 0 320 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,80 Q40,65 80,72 T160,45 T240,30 T320,15 L320,100 L0,100 Z"
                  fill="url(#revenueGradient)"
                />

                <path
                  d="M0,80 Q40,65 80,72 T160,45 T240,30 T320,15"
                  fill="none"
                  stroke="url(#lineGlow)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <circle cx="80" cy="72" r="3" fill="#4f46e5" />
                <circle cx="160" cy="45" r="3" fill="#06b6d4" />
                <circle cx="240" cy="30" r="3" fill="#6366f1" />
                <circle cx="320" cy="15" r="4" fill="#ffffff" stroke="#06b6d4" strokeWidth="2" />
              </svg>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.08]">
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <span className="text-[10px] font-mono text-slate-400 block">Avg. Routing</span>
                <span className="text-xs font-bold text-slate-100 font-mono">0.84s</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <span className="text-[10px] font-mono text-slate-400 block">SLA Breaches</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">0.00%</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <span className="text-[10px] font-mono text-slate-400 block">Auto-Dispatch</span>
                <span className="text-xs font-bold text-cyan-300 font-mono">92.4%</span>
              </div>
            </div>
          </div>

          {/* Security & System Info */}
          <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TLS Encrypted Connection • Internal Access</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">v2.4</span>
          </div>
        </div>

        {/* Right Column: Clean Login Form */}
        <div className="lg:col-span-6 flex flex-col justify-center p-6 sm:p-8 rounded-2xl glass-card border border-white/[0.14] shadow-xl relative order-1 lg:order-2 bg-slate-900/60">
          {/* Brand Logo & Heading */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30 ring-1 ring-white/20">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1 font-display">
                  TICKET<span className="text-indigo-400 font-mono text-sm font-semibold">ROUTER</span>
                </h1>
                <p className="text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                  Support Staff Gateway
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white font-display">
              Sign In
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Sign in to manage automated ticket queues, rules, and SLA tracking.
            </p>
          </div>

          {/* Active Session Notification */}
          {currentUser && (
            <div className="mb-6 p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-mono font-bold text-white">
                  {currentUser.avatarInitials || 'US'}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActivePage('dashboard')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
                >
                  Dashboard &rarr;
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {errorMessage && (
            <div 
              role="alert" 
              className="mb-6 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block text-rose-200">Authentication Error</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label 
                htmlFor="login-email" 
                className="block text-xs font-semibold font-mono text-slate-300"
              >
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="alex.rivera@company.com"
                  className="w-full glass-input pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="login-password" 
                  className="block text-xs font-semibold font-mono text-slate-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full glass-input pl-10 pr-11 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-md transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                    rememberMe 
                      ? 'bg-indigo-600 border-indigo-500 text-white' 
                      : 'border-white/20 bg-white/[0.05] group-hover:border-white/40'
                  }`}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors">
                  Remember this device for 30 days
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Quick Fill Demo Account:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('alex.rivera@company.com')}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-[11px] text-slate-300 hover:text-white transition-all cursor-pointer font-mono"
              >
                alex.rivera@company.com <span className="text-indigo-400">(Support Lead)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal Dialog */}
      {showForgotModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md p-6 rounded-2xl glass-panel border border-white/20 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Reset Your Password</h3>
                <p className="text-xs text-slate-400">Account Recovery</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Enter your corporate email address to receive password reset instructions.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="forgot-email" className="text-xs font-mono text-slate-300 block">
                  Work Email Address
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="alex.rivera@company.com"
                  className="w-full glass-input px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="btn-secondary px-3.5 py-1.5 text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotSubmitted}
                  className="btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {forgotSubmitted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Sending Link...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
