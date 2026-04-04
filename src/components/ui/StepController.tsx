'use client';

import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VizControls } from '@/lib/viz-engine/useVizStepper';

interface StepControllerProps extends VizControls {
  className?: string;
}

export function StepController({
  currentStep,
  isPaused,
  setIsPaused,
  speed,
  setSpeed,
  next,
  prev,
  reset,
  totalSteps,
  className,
}: StepControllerProps) {
  return (
    <div className={cn("flex flex-col gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-400">
          Step {currentStep + 1} / {totalSteps}
        </span>
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Speed</label>
          <select 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="bg-zinc-800 text-zinc-300 text-xs rounded border border-zinc-700 px-1 py-0.5 outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={2000}>0.5x</option>
            <option value={1000}>1x</option>
            <option value={500}>2x</option>
            <option value={200}>5x</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors"
          title="Reset"
        >
          <RotateCcw size={18} />
        </button>

        <button
          onClick={prev}
          disabled={currentStep === 0}
          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Previous Step"
        >
          <SkipBack size={18} />
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          title={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
        </button>

        <button
          onClick={next}
          disabled={currentStep === totalSteps - 1}
          className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Next Step"
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
