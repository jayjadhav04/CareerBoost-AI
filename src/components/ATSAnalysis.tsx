'use client';

import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  Copy, 
  Check, 
  BrainCircuit, 
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { ATSAnalysisResult } from '../types';

interface ATSAnalysisProps {
  analysis: ATSAnalysisResult;
  onGenerateQuestions: () => void;
  questionsGenerated: boolean;
  isGeneratingQuestions: boolean;
}

export default function ATSAnalysis({
  analysis,
  onGenerateQuestions,
  questionsGenerated,
  isGeneratingQuestions
}: ATSAnalysisProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getFullAnalysisText = () => {
    return `CareerBoost AI - ATS Analysis Report
--------------------------------------
ATS Score: ${analysis.ats_score}/100

Summary:
${analysis.summary}

Strengths:
${analysis.strengths.map(s => `- ${s}`).join('\n')}

Weaknesses:
${analysis.weaknesses.map(w => `- ${w}`).join('\n')}

Missing Skills:
${analysis.missing_skills.join(', ')}

Suggestions for Improvement:
${analysis.suggestions.map(s => `- ${s}`).join('\n')}
`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Top Banner & Main Copy Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2 dark:text-white">
            <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            ATS Resume Analysis
          </h2>
          <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">
            Review your resume score, detailed insights, and actionable improvement recommendations.
          </p>
        </div>
        
        <button
          onClick={() => copyToClipboard(getFullAnalysisText(), 'full')}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {copiedSection === 'full' ? (
            <>
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">Copied Full Report!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Full Report</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid Layout: Score & Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* ATS Score Card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <span className="text-sm font-bold tracking-wide uppercase text-slate-400 mb-6 dark:text-slate-500">
            ATS Score
          </span>
          
          {/* Radial Progress SVG */}
          <div className="relative flex items-center justify-center">
            <svg className="h-32 w-32 -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="54"
                strokeWidth="10"
                stroke="#f1f5f9"
                fill="transparent"
                className="dark:stroke-slate-800"
              />
              <circle
                cx="64"
                cy="64"
                r="54"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 54}
                strokeDashoffset={2 * Math.PI * 54 * (1 - analysis.ats_score / 100)}
                strokeLinecap="round"
                className={`transition-all duration-1000 ease-out ${
                  analysis.ats_score >= 80 
                    ? 'stroke-blue-600 dark:stroke-blue-500' 
                    : analysis.ats_score >= 60 
                      ? 'stroke-amber-500 dark:stroke-amber-400' 
                      : 'stroke-red-500 dark:stroke-red-450'
                }`}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {analysis.ats_score}
              </span>
              <span className="text-xs font-semibold text-slate-400 mt-0.5 dark:text-slate-500">
                out of 100
              </span>
            </div>
          </div>

          <div className={`mt-6 px-3 py-1 rounded-full text-xs font-semibold ${
            analysis.ats_score >= 80 
              ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/40'
              : analysis.ats_score >= 60 
                ? 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-950/20 dark:text-amber-450 dark:border-amber-900/40'
                : 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/40'
          }`}>
            {analysis.ats_score >= 80 ? 'Good Fit' : analysis.ats_score >= 60 ? 'Needs Improvement' : 'Critical Issues'}
          </div>
        </div>

        {/* Summary Card */}
        <div className="md:col-span-2 flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 dark:text-white">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Resume Summary
            </h3>
            <button
              onClick={() => copyToClipboard(analysis.summary, 'summary')}
              className="text-slate-400 hover:text-slate-650 transition-colors p-1 dark:text-slate-500 dark:hover:text-slate-300"
              title="Copy Summary"
            >
              {copiedSection === 'summary' ? (
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 flex-1 dark:text-slate-350">
            {analysis.summary}
          </p>
        </div>
      </div>

      {/* Strengths & Weaknesses Split Columns */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Strengths Card */}
        <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 dark:text-white">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              Key Strengths
            </h3>
            <button
              onClick={() => copyToClipboard(analysis.strengths.map(s => `- ${s}`).join('\n'), 'strengths')}
              className="text-slate-400 hover:text-slate-650 transition-colors p-1 dark:text-slate-500 dark:hover:text-slate-300"
              title="Copy Strengths"
            >
              {copiedSection === 'strengths' ? (
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <ul className="space-y-3 flex-1">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-350">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mt-2 shrink-0 dark:bg-green-400" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses Card */}
        <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 dark:text-white">
              <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
              Weaknesses / Areas of Improvement
            </h3>
            <button
              onClick={() => copyToClipboard(analysis.weaknesses.map(w => `- ${w}`).join('\n'), 'weaknesses')}
              className="text-slate-400 hover:text-slate-650 transition-colors p-1 dark:text-slate-500 dark:hover:text-slate-300"
              title="Copy Weaknesses"
            >
              {copiedSection === 'weaknesses' ? (
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <ul className="space-y-3 flex-1">
            {analysis.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-350">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400 mt-2 shrink-0 dark:bg-red-400" />
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Missing Skills Section */}
      <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 dark:text-white">
            <BrainCircuit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Missing Skills (Highly Recommended for ATS)
          </h3>
          <button
            onClick={() => copyToClipboard(analysis.missing_skills.join(', '), 'skills')}
            className="text-slate-400 hover:text-slate-650 transition-colors p-1 dark:text-slate-500 dark:hover:text-slate-300"
            title="Copy Missing Skills"
          >
            {copiedSection === 'skills' ? (
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        
        {analysis.missing_skills.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {analysis.missing_skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-lg bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm dark:bg-blue-950/40 dark:border-blue-900/45 dark:text-blue-400"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic dark:text-slate-400">
            Excellent! No critical missing skills identified.
          </p>
        )}
      </div>

      {/* Improvement Suggestions Card */}
      <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 dark:text-white">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Actionable Improvement Suggestions
          </h3>
          <button
            onClick={() => copyToClipboard(analysis.suggestions.map(s => `- ${s}`).join('\n'), 'suggestions')}
            className="text-slate-400 hover:text-slate-650 transition-colors p-1 dark:text-slate-500 dark:hover:text-slate-300"
            title="Copy Suggestions"
          >
            {copiedSection === 'suggestions' ? (
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <ul className="space-y-4 flex-1">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-350">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100 shrink-0 dark:bg-amber-950/40 dark:border-amber-900/40 dark:text-amber-400">
                {index + 1}
              </span>
              <span className="leading-relaxed">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Call to action for Interview questions */}
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-center gap-4 dark:from-blue-950/20 dark:to-indigo-950/5 dark:border-blue-900/40">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Ready to prepare for interviews?</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-lg dark:text-slate-450">
            Let Gemini AI review your profile text and prepare custom Technical, HR, and Project-based questions tailored specifically to your experience.
          </p>
        </div>

        <button
          onClick={onGenerateQuestions}
          disabled={isGeneratingQuestions || questionsGenerated}
          className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md transition-all duration-200 active:scale-95 cursor-pointer ${
            questionsGenerated
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/10 dark:bg-blue-600 dark:hover:bg-blue-500'
          }`}
        >
          {isGeneratingQuestions ? (
            <span>Generating Questions...</span>
          ) : questionsGenerated ? (
            <span>Questions Generated Below</span>
          ) : (
            <>
              <span>Generate Interview Questions</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
