'use client';

import React, { useMemo } from 'react';
import { useVizStepper } from '@/lib/viz-engine/useVizStepper';
import { ArrayViz } from '../_base/ArrayViz';
import { StepController } from '@/components/ui/StepController';

interface TwoSumVizProps {
  nums: number[];
  target: number;
  approach: 'Brute Force' | 'One-pass Hash Map';
}

interface TwoSumStep {
  highlights: number[];
  matches: number[];
  comparing: number[];
  pointers: { index: number; label: string; color?: string }[];
  description: string;
  hashMap: Record<number, number>;
}

export function TwoSumViz({ nums, target, approach }: TwoSumVizProps) {
  const steps = useMemo(() => {
    const s: TwoSumStep[] = [];
    
    if (approach === 'Brute Force') {
      for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
          const sum = nums[i] + nums[j];
          const isMatch = sum === target;
          
          s.push({
            highlights: [i, j],
            matches: isMatch ? [i, j] : [],
            comparing: isMatch ? [] : [i, j],
            pointers: [
              { index: i, label: 'i', color: 'bg-blue-400' },
              { index: j, label: 'j', color: 'bg-yellow-400' }
            ],
            description: `Checking nums[${i}] (${nums[i]}) + nums[${j}] (${nums[j]}) = ${sum}.${isMatch ? ' Found target!' : ''}`,
            hashMap: {},
          });
          
          if (isMatch) return s;
        }
      }
    } else {
      const map: Record<number, number> = {};
      for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        const found = complement in map;
        
        s.push({
          highlights: found ? [map[complement], i] : [i],
          matches: found ? [map[complement], i] : [],
          comparing: [i],
          pointers: [
            { index: i, label: 'curr', color: 'bg-blue-400' },
            ...(found ? [{ index: map[complement], label: 'found', color: 'bg-green-400' }] : [])
          ],
          description: found 
            ? `Found complement ${complement} (at index ${map[complement]}) for current value ${nums[i]}. Total = ${target}!`
            : `Current value is ${nums[i]}. Looking for complement ${complement} in hash map. Not found. Adding ${nums[i]} to map.`,
          hashMap: { ...map },
        });

        if (found) return s;
        map[nums[i]] = i;
      }
    }
    
    return s;
  }, [nums, target, approach]);

  const { step, controls } = useVizStepper(steps);

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-zinc-100 font-semibold">{approach}</h3>
        <div className="text-zinc-500 text-sm">Target: <span className="text-blue-400 font-mono font-bold">{target}</span></div>
      </div>

      <ArrayViz 
        items={nums}
        highlights={step.highlights}
        matches={step.matches}
        comparing={step.comparing}
        pointers={step.pointers}
      />

      {approach === 'One-pass Hash Map' && (
        <div className="flex flex-col gap-2 p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl">
          <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Hash Map (Value → Index)</label>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {Object.entries(step.hashMap).length === 0 ? (
              <span className="text-zinc-600 text-xs italic">Empty</span>
            ) : (
              Object.entries(step.hashMap).map(([val, idx]) => (
                <div key={val} className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-300 font-mono">
                  <span className="text-blue-400">{val}</span>: {idx}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl min-h-[80px] flex items-center">
        <p className="text-zinc-300 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>

      <StepController {...controls} className="mt-4" />
    </div>
  );
}
