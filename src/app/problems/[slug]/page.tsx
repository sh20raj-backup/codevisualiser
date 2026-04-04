import { problems, getProblemBySlug } from '@/data/problems';
import { notFound } from 'next/navigation';
import { ComplexityBadge } from '@/components/ui/ComplexityBadge';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { ExternalLink, Tag } from 'lucide-react';
import dynamic from 'next/dynamic';

import { ProblemExplanations } from '@/content/problems';

export async function generateStaticParams() {
  return problems.map((problem) => ({
    slug: problem.slug,
  }));
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) notFound();

  // Look up the explanation component from our registry
  const Explanation = ProblemExplanations[slug];

  if (!Explanation) {
    return (
      <div className="p-8 text-zinc-500 italic">
        Explanation coming soon for {problem.title}...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
             <span className={cn(
              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
              problem.difficulty === 'Easy' ? "bg-green-500/10 text-green-400 border border-green-500/20" :
              problem.difficulty === 'Medium' ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
              "bg-red-500/10 text-red-400 border border-red-500/20"
            )}>
              {problem.difficulty}
            </span>
            <span className="text-zinc-600 font-mono text-xs">#{problem.id}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                {problem.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {problem.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <a 
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-sm font-medium transition-colors w-fit"
            >
              View on LeetCode
              <ExternalLink size={14} />
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Visualization & Explanation */}
          <section className="space-y-12">
            <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:border-b prose-h2:border-zinc-800 prose-h2:pb-2">
              <Explanation />
            </div>
          </section>

          {/* Right Column: Code & Approaches */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              Solutions
            </h2>
            
            <div className="space-y-10">
              {problem.approaches.map((approach, idx) => (
                <div key={approach.name} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-[10px] text-zinc-400 border border-zinc-700">
                        {idx + 1}
                      </span>
                      {approach.name}
                    </h3>
                    <div className="flex gap-2">
                      <ComplexityBadge label="Time" value={approach.timeComplexity} variant="time" />
                      <ComplexityBadge label="Space" value={approach.spaceComplexity} variant="space" />
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 text-sm italic py-1">
                    {approach.intuition}
                  </p>
                  
                  <div className="space-y-4">
                    {approach.codes.map(snippet => (
                      <div key={snippet.language} className="space-y-2">
                        <div className="flex items-center justify-between px-2">
                          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                            {snippet.language}
                          </label>
                        </div>
                        <CodeBlock code={snippet.code} lang={snippet.language} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Simple CN helper for this file if needed, or import from utils
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
