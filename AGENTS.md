# AI Agent Contribution Guide 🤖

Welcome, AI Coding Assistant! This guide is specifically for you. It explains how to add new LeetCode problems and visualizations to this repository without breaking the core structure.

## 🏗️ Core Architecture Overview

AlgoViz is a static Next.js project. To add a new problem, you **MUST** create/update these **3 files**:

1.  **Metadata & Code**: `src/data/problems/<slug>.ts`
2.  **Animation Component**: `src/components/visualizations/<slug>/index.tsx`
3.  **Written Explanation**: `src/content/problems/<slug>.mdx`

Then, you **MUST** register the new problem in:
- `src/data/problems/index.ts` (Metadata Registry)
- `src/content/problems/index.tsx` (MDX Registry)

---

## 🛠️ Step-by-Step Instructions

### Step 1: Create Metadata (`src/data/problems/<slug>.ts`)
Define the problem's metadata using the `Problem` interface from `@/data/schema`. Include at least 2 approaches with code snippets for each (TypeScript & Python preferred).

```typescript
import { Problem } from '../schema';
export const yourProblem: Problem = {
  id: 123,
  slug: 'your-problem-slug',
  title: 'Problem Title',
  difficulty: 'Medium',
  tags: ['Array', 'Stack'],
  leetcodeUrl: '...',
  hasVisualization: true,
  visualizationComponent: 'YourComponentViz',
  approaches: [ ... ]
};
```

### Step 2: Create Visualization (`src/components/visualizations/<slug>/index.tsx`)
Build the React component. Use the `useVizStepper` hook for playback control and the `ArrayViz` primitive for standard array animations.

```tsx
'use client';
import { useVizStepper } from '@/lib/viz-engine/useVizStepper';
import { ArrayViz } from '../_base/ArrayViz';
import { StepController } from '@/components/ui/StepController';

export function YourComponentViz({ nums, target, approach }) {
  const steps = useMemo(() => { ... }, [nums, target, approach]);
  const { step, controls } = useVizStepper(steps);
  return (
    <div>
      <ArrayViz items={nums} highlights={step.highlights} pointers={step.pointers} />
      <StepController {...controls} />
    </div>
  );
}
```

### Step 3: Create Explanation (`src/content/problems/<slug>.mdx`)
Write the prose for the problem. You can embed your custom visualization component directly.

```mdx
# Problem Title
Explain the intuition here.
import { YourComponentViz } from '../../components/visualizations/your-problem-slug';
<YourComponentViz nums={[...]} target={...} approach="..." />
```

---

## 🚦 Important Guidelines for Agents

- **DO NOT** modify `src/lib/viz-engine/useVizStepper.ts` unless absolutely necessary.
- **ALWAYS** check `src/data/schema.ts` before writing metadata.
- **USE** `clsx` and `tailwind-merge` (via our `@/lib/utils` `cn` helper) for styling.
- **NEVER** use standard `alert()` or `console.log()` in the visualization; handle errors gracefully in the UI.
