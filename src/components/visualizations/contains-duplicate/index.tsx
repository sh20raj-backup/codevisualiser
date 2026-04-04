'use client';

import React, { useMemo } from 'react';
import { useVizStepper } from '@/lib/viz-engine/useVizStepper';
import { ArrayViz } from '../_base/ArrayViz';
import { StepController } from '@/components/ui/StepController';
import { motion, AnimatePresence } from 'framer-motion';

interface ContainsDuplicateVizProps {
  nums: number[];
}

export function ContainsDuplicateViz({ nums = [1, 2, 3, 1] }: ContainsDuplicateVizProps) {
  const steps = useMemo(() => {
    const stepsArr = [];
    const seen = new Set<number>();

    // Step 0: Initial
    stepsArr.push({
      highlights: [],
      seen: new Set(seen),
      message: "Initialize an empty set to track seen elements"
    });

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      
      // Checking
      stepsArr.push({
        highlights: [i],
        seen: new Set(seen),
        message: `Checking if ${num} is in the set...`
      });

      if (seen.has(num)) {
        stepsArr.push({
          highlights: [i],
          seen: new Set(seen),
          message: `Duplicate found! ${num} is already in the set.`,
          isMatch: true
        });
        return stepsArr;
      }

      seen.add(num);
      stepsArr.push({
        highlights: [i],
        seen: new Set(seen),
        message: `Adding ${num} to the set.`
      });
    }

    stepsArr.push({
      highlights: [],
      seen: new Set(seen),
      message: "No duplicates found after checking all elements."
    });

    return stepsArr;
  }, [nums]);

  const { step, controls } = useVizStepper(steps);

  return (
    <div className="space-y-12 bg-zinc-950/50 p-8 rounded-3xl border border-white/5">
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Input Array</h4>
        <ArrayViz items={nums} highlights={step.highlights} matches={step.isMatch ? step.highlights : []} />
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Seen Elements Set</h4>
        <div className="flex flex-wrap justify-center gap-2 min-h-[60px] p-6 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
          <AnimatePresence mode="popLayout">
            {Array.from(step.seen as Set<number>).map((val) => (
              <motion.div
                key={val}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="w-10 h-10 flex items-center justify-center bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-mono text-sm font-bold"
              >
                {val}
              </motion.div>
            ))}
            {Array.from(step.seen as Set<number>).length === 0 && (
              <span className="text-zinc-700 text-[10px] uppercase font-bold tracking-tighter self-center">Set is empty</span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 min-h-[80px] flex items-center justify-center text-center">
        <p className="text-zinc-300 font-medium">{step.message}</p>
      </div>

      <StepController {...controls} />
    </div>
  );
}
