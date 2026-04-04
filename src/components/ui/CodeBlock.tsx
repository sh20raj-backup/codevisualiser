import React from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  lang: string;
  theme?: string;
}

export async function CodeBlock({ code, lang, theme = 'github-dark' }: CodeBlockProps) {
  try {
    const html = await codeToHtml(code, {
      lang,
      theme,
    });

    return (
      <div 
        className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 text-sm font-mono leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  } catch (error) {
    console.error('Shiki highlighting error:', error);
    return <pre className="p-4 bg-zinc-950 text-zinc-400 rounded-xl border border-zinc-800">{code}</pre>;
  }
}
