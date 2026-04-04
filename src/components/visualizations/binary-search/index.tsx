'use client';

import React, { useMemo } from 'react';
import { useVizStepper } from '@/lib/viz-engine/useVizStepper';
import { ArrayViz } from '../_base/ArrayViz';
import { StepController } from '@/components/ui/StepController';

interface BinarySearchVizProps {
  nums: number[];
  target: number;
}

export function BinarySearchViz({ nums = [-1, 0, 3, 5, 9, 12], target = 9 }: BinarySearchVizProps) {
  const steps = useMemo(() => {
    const s = [];
    let left = 0;
    let right = nums.length - 1;

    // Initial state
    s.push({
      pointers: [
        { index: left, label: 'L', color: 'bg-blue-500' },
        { index: right, label: 'R', color: 'bg-red-500' }
      ],
      highlights: [],
      message: 'Initial search range'
    });

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);
      
      // Calculate mid
      s.push({
        pointers: [
          { index: left, label: 'L', color: 'bg-blue-500' },
          { index: right, label: 'R', color: 'bg-red-500' },
          { index: mid, label: 'M', color: 'bg-yellow-500' }
        ],
        highlights: [mid],
        message: `Checking element at index ${mid}`
      });

      if (nums[mid] === target) {
        s.push({
          pointers: [
            { index: left, label: 'L', color: 'bg-blue-500' },
            { index: right, label: 'R', color: 'bg-red-500' },
            { index: mid, label: 'MATCH', color: 'bg-green-500' }
          ],
          highlights: [mid],
          message: `Target found at index ${mid}!`
        });
        break;
      }

      if (nums[mid] < target) {
        const oldLeft = left;
        left = mid + 1;
        s.push({
          pointers: [
            { index: mid, label: 'M', color: 'bg-yellow-500' },
            { index: left, label: 'L', color: 'bg-blue-500' },
            { index: right, label: 'R', color: 'bg-red-500' }
          ],
          highlights: Array.from({ length: mid - oldLeft + 1 }, (_, i) => oldLeft + i),
          message: `${nums[mid]} < ${target}, search right half`
        });
      } else {
        const oldRight = right;
        right = mid - 1;
        s.push({
          pointers: [
            { index: mid, label: 'M', color: 'bg-yellow-500' },
            { index: left, label: 'L', color: 'bg-blue-500' },
            { index: right, label: 'R', color: 'bg-red-500' }
          ],
          highlights: Array.from({ length: oldRight - mid + 1 }, (_, i) => mid + i),
          message: `${nums[mid]} > ${target}, search left half`
        });
      }
    }

    if (left > right) {
      s.push({
        pointers: [],
        highlights: [],
        message: 'Target not found in the array'
      });
    }

    return s;
  }, [nums, target]);

  const { step, controls } = useVizStepper(steps);

  return (
    <div className="space-y-8 bg-zinc-950/50 p-8 rounded-3xl border border-white/5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Binary Search Visualization</h4>
        <div className="text-xs font-mono text-zinc-500">Target: {target}</div>
      </div>

      <ArrayViz 
        items={nums} 
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
