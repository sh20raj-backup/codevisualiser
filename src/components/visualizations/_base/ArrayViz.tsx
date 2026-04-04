'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ArrayVizProps {
  items: (number | string)[];
  highlights?: number[];     // Indices to highlight (e.g. blue)
  matches?: number[];        // Indices that match a target (e.g. green)
  comparing?: number[];      // Indices currently being compared (e.g. yellow)
  pointers?: { index: number; label: string; color?: string }[];
  className?: string;
}

export function ArrayViz({
  items,
  highlights = [],
  matches = [],
  comparing = [],
  pointers = [],
  className,
}: ArrayVizProps) {
  return (
    <div className={cn("flex flex-col gap-12 py-12 items-center w-full overflow-x-auto", className)}>
      <div className="flex gap-2 min-h-[60px] items-center">
        <AnimatePresence mode="popLayout">
          {items.map((item, idx) => {
            const isHighlighted = highlights.includes(idx);
            const isMatch = matches.includes(idx);
            const isComparing = comparing.includes(idx);

            return (
              <motion.div
                key={`${idx}-${item}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={cn(
                  "relative w-12 h-12 flex items-center justify-center rounded-lg border-2 text-lg font-bold font-mono transition-colors duration-300",
                  isMatch 
                    ? "bg-green-500/20 border-green-500 text-green-400"
                    : isComparing
                    ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                    : isHighlighted
                    ? "bg-blue-500/20 border-blue-500 text-blue-400"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300"
                )}
              >
                {item}

                {/* Pointers */}
                {pointers.filter(p => p.index === idx).map((p, pIdx) => (
                  <motion.div
                    key={`pointer-${p.label}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 44 + (pIdx * 20), opacity: 1 }}
                    className="absolute whitespace-nowrap"
                  >
                    <div className="flex flex-col items-center">
                      <div className={cn("w-0.5 h-4 mb-1", p.color || "bg-zinc-400")} />
                      <span className={cn("text-[10px] font-bold uppercase tracking-tighter px-1 rounded bg-zinc-800 border border-zinc-700", p.color?.replace('bg-', 'text-') || "text-zinc-300")}>
                        {p.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
                
                {/* Index label */}
                <span className="absolute -top-6 text-[10px] font-mono text-zinc-600">
                  {idx}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
