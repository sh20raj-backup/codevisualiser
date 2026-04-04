import React from 'react';
import { cn } from '@/lib/utils';

interface ComplexityBadgeProps {
  label: string;
  value: string;
  variant?: 'time' | 'space';
}

export function ComplexityBadge({ label, value, variant = 'time' }: ComplexityBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full shadow-inner">
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      <code className={cn(
        "text-xs font-mono font-bold px-1.5 py-0.5 rounded",
        variant === 'time' ? "text-blue-400 bg-blue-500/10" : "text-purple-400 bg-purple-500/10"
      )}>
        {value}
      </code>
    </div>
  );
}
