import React from 'react';

interface ConfidenceBarProps {
  confidence: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ 
  confidence, 
  showLabel = true, 
  size = 'md' 
}) => {
  const normalized = confidence > 1 ? Math.round(confidence) : Math.round(confidence * 100);
  
  let gradient = 'bg-gradient-to-r from-emerald-500 to-teal-400';
  let badgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

  if (normalized < 65) {
    gradient = 'bg-gradient-to-r from-rose-500 to-red-400';
    badgeStyle = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
  } else if (normalized < 80) {
    gradient = 'bg-gradient-to-r from-amber-500 to-yellow-400';
    badgeStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  }

  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';

  return (
    <div className="flex items-center gap-2.5 w-full">
      <div className={`flex-1 bg-white/[0.08] rounded-full overflow-hidden ${heightClass}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${gradient}`} 
          style={{ width: `${Math.min(100, Math.max(5, normalized))}%` }}
        />
      </div>
      {showLabel && (
        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
          {normalized}%
        </span>
      )}
    </div>
  );
};
