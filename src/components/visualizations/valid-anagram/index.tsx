'use client';

import React, { useMemo } from 'react';
import { useVizStepper } from '@/lib/viz-engine/useVizStepper';
import { ArrayViz } from '../_base/ArrayViz';
import { StepController } from '@/components/ui/StepController';
import { motion, AnimatePresence } from 'framer-motion';

interface ValidAnagramVizProps {
  s: string;
  t: string;
}

export function ValidAnagramViz({ s = "race", t = "care" }: ValidAnagramVizProps) {
  const steps = useMemo(() => {
    const stepsArr = [];
    const sChars = s.split('');
    const tChars = t.split('');
    
    let counts: Record<string, number> = {};

    // Step 0: Initial state
    stepsArr.push({
      sHighlights: [],
      tHighlights: [],
      counts: { ...counts },
      message: "Check if lengths are equal"
    });

    if (s.length !== t.length) {
      stepsArr.push({
        sHighlights: [],
        tHighlights: [],
        counts: { ...counts },
        message: "Lengths are not equal! Not an anagram."
      });
      return stepsArr;
    }

    // Step 1: Count first string
    for (let i = 0; i < sChars.length; i++) {
      const char = sChars[i];
      counts[char] = (counts[char] || 0) + 1;
      stepsArr.push({
        sHighlights: [i],
        tHighlights: [],
        counts: { ...counts },
        message: `Incrementing count for '${char}' from string S`
      });
    }

    // Step 2: Decrement second string
    for (let i = 0; i < tChars.length; i++) {
      const char = tChars[i];
      
      const prevMessage = counts[char] ? `Decrementing count for '${char}' from string T` : `'${char}' not found or zero count! Not an anagram.`;
      
      if (!counts[char]) {
        stepsArr.push({
          sHighlights: [],
          tHighlights: [i],
          counts: { ...counts },
          message: prevMessage
        });
        return stepsArr;
      }
      
      counts[char]--;
      stepsArr.push({
        sHighlights: [],
        tHighlights: [i],
        counts: { ...counts },
        message: prevMessage
      });
    }

    stepsArr.push({
      sHighlights: [],
      tHighlights: [],
      counts: { ...counts },
      message: "All counts matched! It's a valid anagram."
    });

    return stepsArr;
  }, [s, t]);

  const { step, controls } = useVizStepper(steps);

  return (
    <div className="space-y-12 bg-zinc-950/50 p-8 rounded-3xl border border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* String S */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">String S</h4>
          <ArrayViz items={s.split('')} highlights={step.sHighlights} />
        </div>

        {/* String T */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">String T</h4>
          <ArrayViz items={t.split('')} highlights={step.tHighlights} />
        </div>
      </div>

      {/* Counts Display */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Character Frequency Map</h4>
        <div className="flex flex-wrap justify-center gap-4 min-h-[60px]">
          <AnimatePresence mode="popLayout">
            {Object.entries(step.counts).map(([char, count]) => (
              <motion.div
                key={char}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center p-3 bg-zinc-900 border border-zinc-800 rounded-xl min-w-[50px]"
              >
                <span className="text-blue-400 font-mono font-bold text-lg">{char}</span>
                <span className="text-zinc-500 text-xs font-bold font-mono">{count}</span>
              </motion.div>
            ))}
            {Object.keys(step.counts).length === 0 && (
               <span className="text-zinc-600 text-xs italic py-4">Map is empty</span>
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
