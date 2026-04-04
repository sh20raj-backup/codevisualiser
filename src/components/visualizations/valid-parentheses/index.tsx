'use client';

import React, { useMemo } from 'react';
import { useVizStepper } from '@/lib/viz-engine/useVizStepper';
import { ArrayViz } from '../_base/ArrayViz';
import { StepController } from '@/components/ui/StepController';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ValidParenthesesVizProps {
  s: string;
}

export function ValidParenthesesViz({ s = "()[]{}" }: ValidParenthesesVizProps) {
  const steps = useMemo(() => {
    const stepsArr = [];
    const stack: string[] = [];
    const mapping: Record<string, string> = {
      ")": "(",
      "}": "{",
      "]": "["
    };

    // Step 0: Initial
    stepsArr.push({
      highlights: [],
      stack: [...stack],
      message: "Start with an empty stack"
    });

    for (let i = 0; i < s.length; i++) {
      const char = s[i];
      
      if (char in mapping) {
        // Closing bracket
        stepsArr.push({
          highlights: [i],
          stack: [...stack],
          message: `Encountered '${char}'. Checking the top of the stack...`
        });

        if (stack.length === 0 || stack[stack.length - 1] !== mapping[char]) {
          stepsArr.push({
            highlights: [i],
            stack: [...stack],
            message: `Mismatched bracket! '${char}' does not match '${stack[stack.length - 1] || 'empty'}'.`,
            isError: true
          });
          return stepsArr;
        }

        const popped = stack.pop();
        stepsArr.push({
          highlights: [i],
          stack: [...stack],
          message: `Match found! Popped '${popped}' from the stack.`,
          isMatch: true
        });
      } else {
        // Opening bracket
        stack.push(char);
        stepsArr.push({
          highlights: [i],
          stack: [...stack],
          message: `Encountered '${char}'. Pushing to the stack.`
        });
      }
    }

    if (stack.length > 0) {
      stepsArr.push({
        highlights: [],
        stack: [...stack],
        message: "Finished processing, but stack is not empty! Invalid string.",
        isError: true
      });
    } else {
      stepsArr.push({
        highlights: [],
        stack: [...stack],
        message: "All brackets matched! Valid string.",
        isMatch: true
      });
    }

    return stepsArr;
  }, [s]);

  const { step, controls } = useVizStepper(steps);

  return (
    <div className="space-y-12 bg-zinc-950/50 p-8 rounded-3xl border border-white/5">
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Input String</h4>
        <ArrayViz 
          items={s.split('')} 
          highlights={step.highlights} 
          matches={step.isMatch ? step.highlights : []} 
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        {/* Stack Visualization */}
        <div className="w-full md:w-32 flex flex-col items-center gap-4">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Stack</h4>
          <div className="w-24 min-h-[160px] border-x-2 border-b-2 border-zinc-700 bg-zinc-900/20 rounded-b-xl flex flex-col-reverse p-2 gap-2 overflow-hidden">
            <AnimatePresence initial={false}>
              {(step.stack as string[]).map((val, idx) => (
                <motion.div
                  key={`${idx}-${val}`}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  className={cn(
                    "h-10 w-full flex items-center justify-center rounded-lg border-2 font-mono font-bold text-lg",
                    "bg-blue-500/10 border-blue-500/50 text-blue-400"
                  )}
                >
                  {val}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono">BOTTOM</span>
        </div>

        <div className="flex-1 space-y-4 self-center">
            <div className={cn(
                "p-6 rounded-2xl border min-h-[100px] flex items-center justify-center transition-colors duration-500",
                step.isError ? "bg-red-500/10 border-red-500/30" : 
                step.isMatch ? "bg-green-500/10 border-green-500/30" : 
                "bg-zinc-900/50 border-white/5"
            )}>
                <p className={cn(
                    "text-lg font-medium text-center",
                    step.isError ? "text-red-400" : 
                    step.isMatch ? "text-green-400" : 
                    "text-zinc-300"
                )}>
                    {step.message}
                </p>
            </div>
            <StepController {...controls} />
        </div>
      </div>
    </div>
  );
}
