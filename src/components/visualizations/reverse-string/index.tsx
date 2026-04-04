'use client';

import React, { useMemo } from 'react';
import { useVizStepper } from '@/lib/viz-engine/useVizStepper';
import { ArrayViz } from '../_base/ArrayViz';
import { StepController } from '@/components/ui/StepController';

interface ReverseStringVizProps {
  s: string[];
}

export function ReverseStringViz({ s = ["h", "e", "l", "l", "o"] }: ReverseStringVizProps) {
  const steps = useMemo(() => {
    const sArr = [...s];
    const stepsArr = [];
    let left = 0;
    let right = sArr.length - 1;

    // Initial state
    stepsArr.push({
      items: [...sArr],
      pointers: [
        { index: left, label: 'L', color: 'bg-blue-500' },
        { index: right, label: 'R', color: 'bg-red-500' }
      ],
      highlights: [],
      message: "Initialize pointers at both ends"
    });

    while (left < right) {
      // Highlight current pair
      stepsArr.push({
        items: [...sArr],
        pointers: [
          { index: left, label: 'L', color: 'bg-blue-500' },
          { index: right, label: 'R', color: 'bg-red-500' }
        ],
        highlights: [left, right],
        message: `Swapping '${sArr[left]}' and '${sArr[right]}'`
      });

      // Swap
      [sArr[left], sArr[right]] = [sArr[right], sArr[left]];
      
      stepsArr.push({
        items: [...sArr],
        pointers: [
          { index: left, label: 'L', color: 'bg-blue-500' },
          { index: right, label: 'R', color: 'bg-red-500' }
        ],
        highlights: [left, right],
        message: "Swapped! Moving pointers inward."
      });

      left++;
      right--;
    }

    stepsArr.push({
      items: [...sArr],
      pointers: [],
      highlights: [],
      message: "Reverse complete!"
    });

    return stepsArr;
  }, [s]);

  const { step, controls } = useVizStepper(steps);

  return (
    <div className="space-y-8 bg-zinc-950/50 p-8 rounded-3xl border border-white/5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Reverse String Viz</h4>
      </div>

      <ArrayViz 
        items={step.items} 
        highlights={step.highlights} 
        pointers={step.pointers}
      />

      <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 min-h-[80px] flex items-center justify-center text-center">
        <p className="text-zinc-300 font-medium">{step.message}</p>
      </div>

      <StepController {...controls} />
    </div>
  );
}
