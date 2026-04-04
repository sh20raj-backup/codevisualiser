# Contributing to AlgoViz 🚀

Thank you for your interest in contributing to AlgoViz! This project aims to make learning algorithms intuitive and accessible through high-quality visualizations.

We welcome contributions of all kinds: from fixing typos in explanations to building complex new visualizations.

---

## 🏗️ Core Principles

1.  **Static & Performance-First**: The site is a static export. Keep client-side JS to a minimum.
2.  **Schema-Driven**: All problems must follow the strict TypeScript schema in `src/data/schema.ts`.
3.  **Visualization Primitives**: Whenever possible, use existing components in `src/components/visualizations/_base/`.

---

## 📂 Repository Structure

-   `src/data/problems/`: Metadata and code snippets for each problem.
-   `src/components/visualizations/`: Animated React components for specific problems.
-   `src/content/problems/`: MDX-based explanations and prose.
-   `src/lib/viz-engine/`: Core logic for visualization playback (`useVizStepper`).

---

## 🛠️ Getting Started

### 1. Prerequisites
-   Node.js 18+
-   `bun` or `npm`

### 2. Setup
```bash
git clone https://github.com/shaswatraj/algo-viz.git
cd algo-viz
npm install
```

### 3. Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## 📝 How to Add a New Problem

Adding a problem requires a 3-step process. Each problem is identified by a unique `slug` (e.g., `two-sum`).

### Phase 1: Define Metadata
Create `src/data/problems/<slug>.ts`. Follow the `Problem` interface. Define at least two approaches (if applicable) and provide code in both TypeScript and Python.

### Phase 2: Build the Visualization
Create `src/components/visualizations/<slug>/index.tsx`.
- Use the `useVizStepper` hook for controls.
- Use `ArrayViz` for any array-based animations.
- Ensure the component is responsive.

### Phase 3: Write the Explanation
Create `src/content/problems/<slug>.mdx`.
- Explain the intuition behind the approaches.
- Embed your visualization component:
  ```mdx
  import { YourViz } from '../../components/visualizations/your-slug';
  <YourViz ... />
  ```

### Phase 4: Registration
Register your new problem in:
1. `src/data/problems/index.ts`
2. `src/content/problems/index.tsx`

---

## 🚦 Pull Request Process

1.  Create a new branch: `feat/add-<slug>`.
2.  Ensure your code passes linting: `npm run lint`.
3.  Verify the production build: `npm run build`.
4.  Submit a PR with a description of what you've added.

---

## 🤖 AI Agents
If you are an AI coding assistant, please refer to [AGENTS.md](./AGENTS.md) for specialized instructions.
