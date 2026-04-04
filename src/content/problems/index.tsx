import React from 'react';
import dynamic from 'next/dynamic';

// Map of slug to dynamic MDX component
export const ProblemExplanations: Record<string, React.ComponentType<any>> = {
  'two-sum': dynamic(() => import('./two-sum.mdx'), {
    loading: () => <div className="animate-pulse bg-zinc-900/50 rounded-2xl h-96 w-full border border-zinc-800" />,
  }),
  'binary-search': dynamic(() => import('./binary-search.mdx'), {
    loading: () => <div className="animate-pulse bg-zinc-900/50 rounded-2xl h-96 w-full border border-zinc-800" />,
  }),
  'valid-anagram': dynamic(() => import('./valid-anagram.mdx'), {
    loading: () => <div className="animate-pulse bg-zinc-900/50 rounded-2xl h-96 w-full border border-zinc-800" />,
  }),
  'reverse-string': dynamic(() => import('./reverse-string.mdx'), {
    loading: () => <div className="animate-pulse bg-zinc-900/50 rounded-2xl h-96 w-full border border-zinc-800" />,
  }),
};
