import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Github, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoViz | Master Algorithms Through Motion",
  description: "High-quality, interactive visualizations for LeetCode problems and algorithms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={cn(
        inter.variable,
        jetbrainsMono.variable,
        "antialiased min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30"
      )}>
        <div className="flex flex-col min-h-screen">
          {/* Global Navbar */}
          <nav className="sticky top-0 z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
                  <Play size={16} fill="white" className="text-white ml-0.5" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">AlgoViz</span>
              </Link>

              <div className="flex items-center gap-8 text-sm font-medium text-zinc-400">
                <Link href="/" className="hover:text-white transition-colors">Problems</Link>
                <Link href="/CONTRIBUTING" className="hover:text-white transition-colors">Contribute</Link>
                <a
                  href="https://github.com/sh20RAJ/codevisualiser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github size={16} />
                  GitHub
                </a>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Global Footer */}
          <footer className="py-12 border-t border-zinc-900 bg-zinc-950/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 text-xs font-medium text-zinc-600 uppercase tracking-widest">
                  <span>Open Source</span>
                  <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                  <span>Build with Next.js 15</span>
                  <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                  <span>Cloudflare Pages</span>
                </div>
                <p className="text-sm text-zinc-500">
                  Built by <a href="https://github.com/shaswatraj" className="hover:text-zinc-300 transition-colors">@shaswatraj</a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
