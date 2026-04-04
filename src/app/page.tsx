import { problems } from '@/data/problems';
import Link from 'next/link';
import { Play, ArrowRight, Code, Zap, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-3 duration-1000">
            <Sparkles size={12} />
            Interactive Learning
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 italic">
            Master Algorithms <br />
            <span className="text-blue-500 not-italic">Through Motion</span>
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            High-quality, step-by-step visualizations for LeetCode problems. 
            See the logic, understand the complexity, and build intuition in motion.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <Link 
              href="#problems" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-blue-500/20 active:scale-95"
            >
              Start Visualizing
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Zap, title: "Zero Overhead", desc: "Build-time syntax highlighting and pre-rendered animations for instant loads." },
          { icon: Code, title: "Multi-Language", desc: "Every solution comes with hand-crafted code in TypeScript, Python, and more." },
          { icon: Globe, title: "Open Platform", desc: "Designed for open-source contributions. Add your own visualizations in minutes." }
        ].map((f, i) => (
          <div key={i} className="p-8 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4 hover:border-zinc-800 transition-colors group">
            <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-blue-400 transition-colors">
              <f.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">{f.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Problems List */}
      <section id="problems" className="max-w-7xl mx-auto px-6 space-y-12 pt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white tracking-tight">Explore Visualizations</h2>
          <div className="text-sm text-zinc-500 font-medium">
            Showing {problems.length} problems
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <Link 
              key={problem.slug} 
              href={`/problems/${problem.slug}`}
              className="group p-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[2rem] hover:bg-zinc-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="bg-zinc-950 rounded-[1.8rem] p-8 h-full flex flex-col justify-between border border-white/[0.02]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      problem.difficulty === 'Easy' ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                      problem.difficulty === 'Medium' ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                      "bg-red-500/10 text-red-400 border border-red-500/20"
                    )}>
                      {problem.difficulty}
                    </span>
                    <span className="text-zinc-700 font-mono text-[10px]">#{problem.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {problem.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] text-zinc-600 font-medium uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-between pt-6 border-t border-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <Play size={10} fill="white" className="text-white ml-0.5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-200 transition-colors">
                      Visualize
                    </span>
                  </div>
                  <ArrowRight size={16} className="text-zinc-700 group-hover:translate-x-1 group-hover:text-zinc-400 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
