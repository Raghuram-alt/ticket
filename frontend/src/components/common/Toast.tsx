import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast, dismissToast } = useApp();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-950/80',
    warning: 'border-amber-500/30 bg-amber-950/80',
    error: 'border-rose-500/30 bg-rose-950/80',
    info: 'border-sky-500/30 bg-sky-950/80'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short">
      <div className={`p-4 rounded-xl shadow-2xl border backdrop-blur-xl flex items-start gap-3 ${borders[toast.type]}`}>
        {icons[toast.type]}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-100">{toast.title}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={dismissToast}
          className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
