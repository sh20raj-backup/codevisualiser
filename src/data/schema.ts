export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Language = 'python' | 'typescript' | 'java' | 'cpp' | 'go';

export interface CodeSnippet {
  language: Language;
  code: string;
}

export interface Approach {
  name: string;                  // e.g., "Two Pointers"
  timeComplexity: string;        // e.g., "O(n)"
  spaceComplexity: string;       // e.g., "O(1)"
  intuition: string;             // Short summary
  codes: CodeSnippet[];          // Code for this specific approach
}

export interface Problem {
  id: number;
  slug: string;                  // URL identifier
  title: string;
  difficulty: Difficulty;
  tags: string[];
  leetcodeUrl: string;
  approaches: Approach[];
  hasVisualization: boolean;
  visualizationComponent?: string; // The component name if it has one
}
