import React from 'react';
import { TicketCategory, Priority, TicketStatus } from '../../types';

export const CategoryBadge: React.FC<{ category: TicketCategory; size?: 'sm' | 'md' }> = ({ category, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';
  const base = "inline-flex items-center gap-1.5 font-mono font-medium rounded-full backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.15)]";
  
  switch (category) {
    case 'BILLING':
      return (
        <span className={`${base} bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          BILLING
        </span>
      );
    case 'TECHNICAL':
      return (
        <span className={`${base} bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
          TECHNICAL
        </span>
      );
    case 'OTHER':
    default:
      return (
        <span className={`${base} bg-slate-500/15 text-slate-300 border border-slate-500/30 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shadow-[0_0_6px_rgba(148,163,184,0.8)]" />
          GENERAL
        </span>
      );
  }
};

export const PriorityBadge: React.FC<{ priority: Priority; size?: 'sm' | 'md' }> = ({ priority, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';
  const base = "inline-flex items-center gap-1.5 font-mono font-semibold rounded-full backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_2px_8px_rgba(0,0,0,0.2)]";

  switch (priority) {
    case 'CRITICAL':
      return (
        <span className={`${base} bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_14px_rgba(244,63,94,0.3)] ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 pulse-indicator shadow-[0_0_6px_rgba(251,113,133,0.9)]" />
          CRITICAL
        </span>
      );
    case 'HIGH':
      return (
        <span className={`${base} bg-amber-500/20 text-amber-300 border border-amber-500/40 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          HIGH
        </span>
      );
    case 'MEDIUM':
      return (
        <span className={`${base} bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
          MEDIUM
        </span>
      );
    case 'LOW':
    default:
      return (
        <span className={`${base} bg-white/[0.06] text-slate-300 border border-white/[0.15] ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          LOW
        </span>
      );
  }
};

export const StatusBadge: React.FC<{ status: TicketStatus; size?: 'sm' | 'md' }> = ({ status, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';
  const base = "inline-flex items-center font-mono font-medium rounded-full backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]";

  switch (status) {
    case 'NEW':
      return (
        <span className={`${base} bg-blue-500/15 text-blue-300 border border-blue-500/30 ${sizeClasses}`}>
          NEW
        </span>
      );
    case 'ROUTED':
      return (
        <span className={`${base} bg-teal-500/15 text-teal-300 border border-teal-500/30 ${sizeClasses}`}>
          ROUTED
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span className={`${base} bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 ${sizeClasses}`}>
          IN PROGRESS
        </span>
      );
    case 'WAITING_FOR_CUSTOMER':
      return (
        <span className={`${base} bg-amber-500/15 text-amber-300 border border-amber-500/30 ${sizeClasses}`}>
          WAITING
        </span>
      );
    case 'RESOLVED':
      return (
        <span className={`${base} bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 ${sizeClasses}`}>
          RESOLVED
        </span>
      );
    case 'MANUAL_REVIEW':
      return (
        <span className={`${base} bg-rose-500/25 text-rose-300 border border-rose-500/50 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.4)] ${sizeClasses}`}>
          MANUAL REVIEW
        </span>
      );
    default:
      return (
        <span className={`${base} bg-white/[0.06] text-slate-300 border border-white/[0.15] ${sizeClasses}`}>
          {status}
        </span>
      );
  }
};

export const TeamBadge: React.FC<{ team: string }> = ({ team }) => {
  let color = 'bg-white/[0.06] text-slate-300 border-white/[0.15]';

  if (team.includes('Billing')) {
    color = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35';
  } else if (team.includes('Technical')) {
    color = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/35';
  } else if (team.includes('Manual')) {
    color = 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.25)]';
  } else {
    color = 'bg-slate-500/15 text-slate-300 border-slate-500/35';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${color}`}>
      {team}
    </span>
  );
};
