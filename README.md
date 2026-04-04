# CodeVisualizer

> **Understand algorithms by watching them run** — step-by-step animated visualizations for every major LeetCode problem, with multiple approaches and code in your language of choice.

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://codevisualiser.pages.dev)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## What is this?

CodeVisualizer is an open-source platform where you can **see** how algorithms work, not just read about them. Every problem comes with:

- **Animated step-by-step visualization** — play, pause, step through, and control speed
- **Multiple approaches** — Brute Force → Optimal, with clear tradeoffs
- **Code in every major language** — Python, TypeScript, Java, C++, Go
- **Plain English explanation** — intuition first, complexity second

Built with Next.js 15 App Router, deployed globally on Cloudflare Pages.

---

## Problems Covered

| # | Problem | Difficulty | Tags |
|---|---------|------------|------|
| 1 | Two Sum | Easy | Array, Hash Map |
| 704 | Binary Search | Easy | Binary Search |
| 21 | Merge Two Sorted Lists | Easy | Linked List |
| 102 | Binary Tree Level Order | Medium | BFS, Tree |
| 15 | 3Sum | Medium | Two Pointers |
| ... | *more added regularly* | | |

> **Don't see your problem?** [Request it](https://github.com/SH20RAJ/codevisualiser/issues/new?template=request_problem.md) or [contribute it yourself](#contributing).

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 App Router | Static export, fast routing |
| Animations | Framer Motion | Smooth, controllable step animations |
| Code highlighting | Shiki | Build-time, zero client JS |
| Styling | Tailwind CSS | Contributor-friendly utility classes |
| Prose | MDX | Rich explanations with embedded components |
| Search | Fuse.js | Fuzzy client-side search, no backend |
| Package manager | Bun | Fast installs |
| Deployment | Cloudflare Pages (OpenNext) | Global edge, free tier |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.0+
- Node.js 20+

### Local Development

```bash
# Clone the repo
git clone https://github.com/SH20RAJ/codevisualiser.git
cd codevisualiser

# Install dependencies
bun install

# Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it.

### Preview on Cloudflare Runtime

To test exactly how it'll behave on Cloudflare Pages before deploying:

```bash
bun run preview
```

### Deploy

```bash
bun run deploy
```

This builds the app with OpenNext and deploys to your Cloudflare Pages project via Wrangler.

---

## Project Structure

```
codevisualiser/
├── src/
│   └── app/
│       ├── page.tsx                   ← Homepage
│       ├── problems/
│       │   ├── page.tsx               ← Problem list + filters
│       │   └── [slug]/page.tsx        ← Problem detail (viz + code)
│       └── tags/[tag]/page.tsx        ← Problems by topic
│
├── components/
│   ├── ui/                            ← CodeBlock, Tabs, Badges, StepController
│   ├── visualizations/                ← One folder per problem
│   │   ├── _base/                     ← Reusable primitives (ArrayViz, TreeViz…)
│   │   ├── two-sum/index.tsx
│   │   └── binary-search/index.tsx
│   └── layouts/
│
├── data/
│   ├── problems/                      ← Typed TS file per problem
│   │   ├── two-sum.ts
│   │   └── binary-search.ts
│   ├── index.ts                       ← Problem registry
│   ├── schema.ts                      ← TypeScript interfaces
│   └── categories.ts
│
├── content/
│   └── problems/                      ← MDX explanation per problem
│       ├── two-sum.mdx
│       └── binary-search.mdx
│
├── next.config.ts
├── open-next.config.ts
└── wrangler.jsonc
```

---

## Contributing

Contributions are the heart of this project. Adding a new problem is intentionally straightforward — you only need to touch **3 files**.

### Adding a New Problem

**Step 1 — Data file** (`data/problems/[slug].ts`)

Define the problem metadata, all approaches, and code snippets for every language:

```typescript
import type { Problem } from '../schema'

const problem: Problem = {
  id: 1,
  slug: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
  tags: ['Array', 'Hash Table'],
  leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
  approaches: [
    {
      name: 'Brute Force',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      intuition: 'Check every pair of numbers until you find ones that sum to target.',
      codes: [
        {
          language: 'python',
          code: `def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]`,
        },
        // add more languages...
      ],
    },
    {
      name: 'Hash Map',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      intuition: 'Store each number\'s index in a map; for each number check if its complement already exists.',
      codes: [ /* ... */ ],
    },
  ],
  visualizationComponent: 'TwoSumViz',
  hasVisualization: true,
}

export default problem
```

**Step 2 — Visualization component** (`components/visualizations/[slug]/index.tsx`)

Use the base primitives and the `useVizStepper` hook — you only need to implement `buildSteps()`:

```tsx
import { ArrayViz, HashMapViz } from '../_base'
import { useVizStepper } from '@/lib/useVizStepper'
import StepController from '@/components/ui/StepController'

export function TwoSumViz() {
  const steps = buildSteps([2, 7, 11, 15], 9)
  const { step, controls } = useVizStepper(steps)

  return (
    <div className="space-y-4">
      <ArrayViz array={step.array} highlights={step.highlights} />
      <HashMapViz map={step.hashMap} />
      <p className="text-sm text-muted">{step.description}</p>
      <StepController {...controls} total={steps.length} />
    </div>
  )
}

function buildSteps(nums: number[], target: number) {
  // Return an array of step snapshots that the stepper will play through
  // Each step: { array, highlights, hashMap, description }
}
```

**Step 3 — Explanation prose** (`content/problems/[slug].mdx`)

Write the explanation in MDX. You can use standard markdown plus any component from `components/ui/`:

```mdx
## Intuition

The naive approach checks every pair — that's O(n²). But we only need to check each number once if we store what we've already seen.

## The Hash Map insight

For each number `x`, we need `target - x`. If we store every number we've visited in a hash map...

<Callout type="tip">
  The key insight: instead of looking forward for the complement, look backward — it might already be in the map.
</Callout>
```

**Step 4 — Register it** in `data/index.ts`:

```typescript
import twoSum from './problems/two-sum'

export const problems = [
  twoSum,
  // your new problem here
]
```

That's it. Open a PR and it's live.

### Contribution Guidelines

- Keep visualizations accessible — every animation must have a step-through mode (no auto-play-only)
- Code snippets should be idiomatic for each language, not just translated from Python
- Explanations should start with intuition, not with code
- If a problem has multiple valid approaches, include all of them
- Test locally with `bun run preview` before submitting

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide including PR checklist and code style.

---

## Requesting a Problem

Open an issue using the [Problem Request](https://github.com/SH20RAJ/codevisualiser/issues/new?template=request_problem.md) template. Include the LeetCode problem number, link, and why a visualization would be especially helpful for it.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Author

Built by [@SH20RAJ](https://github.com/SH20RAJ). If this helped you crack an interview or finally understand binary search, consider starring the repo.