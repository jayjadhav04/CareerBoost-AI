import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Decorative gradient background glows for rich light/dark mode aesthetics */}
      <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-900/10 animate-float-1" />
      <div className="absolute top-12 left-1/3 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-50/20 blur-3xl dark:bg-indigo-900/5 animate-float-2" />

      <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8">
        {/* Gemini Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100/70 transition-all duration-200 shadow-sm dark:bg-blue-950/30 dark:border-blue-900/50 dark:text-blue-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Smart Career Optimization Powered by AI</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          AI Resume Analyzer &<br />
          <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400">
            Interview Prep
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Upload your resume and instantly receive ATS analysis, improvement suggestions, and personalized interview questions.
        </p>

        {/* Button */}
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#upload-section"
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transition-all duration-200 active:scale-95"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
