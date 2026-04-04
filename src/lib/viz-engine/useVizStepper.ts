import { useState, useRef, useEffect, useCallback } from 'react';

export interface VizControls {
  currentStep: number;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
  totalSteps: number;
}

export function useVizStepper<T>(steps: T[]): { step: T; controls: VizControls } {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(1000);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = steps.length;

  const next = useCallback(() => {
    setCurrentStep((s) => (s < totalSteps - 1 ? s + 1 : s));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setCurrentStep((s) => (s > 0 ? s - 1 : s));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPaused(true);
  }, []);

  useEffect(() => {
    if (!isPaused && currentStep < totalSteps - 1) {
      timeoutRef.current = setTimeout(() => {
        next();
      }, speed);
    } else if (currentStep === totalSteps - 1) {
      setIsPaused(true);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPaused, currentStep, speed, totalSteps, next]);

  const step = steps[currentStep];

  return {
    step,
    controls: {
      currentStep,
      isPaused,
      setIsPaused,
      speed,
      setSpeed,
      next,
      prev,
      reset,
      totalSteps,
    },
  };
}
