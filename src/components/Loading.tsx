import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  type: 'analysis' | 'questions';
}

const analysisMessages = [
  'Extracting text from PDF resume...',
  'Analyzing resume structure and formatting...',
  'Calculating ATS compliance score...',
  'Identifying candidate strengths and weaknesses...',
  'Extracting key skills and detecting gaps...',
  'Generating professional improvement recommendations...',
  'Finalizing ATS feedback dashboard...'
];

const questionMessages = [
  'Reading resume keywords and tech stack...',
  'Formulating targeted technical questions...',
  'Synthesizing behavioral HR prep questions...',
  'Designing realistic project-based scenarios...',
  'Formatting and styling questions...',
  'Finalizing interview prep database...'
];

export default function Loading({ type }: LoadingProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = type === 'analysis' ? analysisMessages : questionMessages;

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Loading Status Indicator */}
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-500 mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          {type === 'analysis' ? 'Analyzing Resume' : 'Preparing Interview Prep'}
        </h3>
        <p className="mt-1.5 text-sm text-slate-500 font-medium animate-pulse dark:text-slate-400">
          {messages[messageIndex]}
        </p>
      </div>

      {/* Skeletons */}
      {type === 'analysis' ? (
        <div className="space-y-6">
          {/* Top Row: Score & Summary Skeletons */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Score circle skeleton */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="h-28 w-28 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-white dark:bg-slate-900" />
              </div>
              <div className="mt-4 h-5 w-24 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>
            
            {/* Summary skeleton */}
            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3 dark:border-slate-800 dark:bg-slate-900">
              <div className="h-5 w-36 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-4 w-4/5 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>
          </div>

          {/* Middle Row: Strengths and Weaknesses */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="h-5 w-32 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="h-5 w-32 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Skills Tags skeleton */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="h-5 w-40 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-20 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-8 w-24 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-8 w-16 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-8 w-28 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-8 w-20 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>
          </div>
        </div>
      ) : (
        /* Questions Skeletons */
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex border-b border-slate-200 pb-2 gap-4 dark:border-slate-800">
            <div className="h-8 w-28 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
            <div className="h-8 w-28 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
            <div className="h-8 w-28 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3 items-start border border-slate-50 p-4 rounded-xl dark:border-slate-850">
                <div className="h-5 w-5 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                  <div className="h-3.5 w-1/2 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
