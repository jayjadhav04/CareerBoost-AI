'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Sparkles, AlertTriangle, UserCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ResumeUpload from '../components/ResumeUpload';
import ATSAnalysis from '../components/ATSAnalysis';
import InterviewQuestions from '../components/InterviewQuestions';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import { ATSAnalysisResult, InterviewQuestionsResult } from '../types';
import { generateQuestionsAction } from './actions';

type FlowStep = 'upload' | 'analyzing' | 'analyzed' | 'generating-questions' | 'completed';

export default function Home() {
  const [step, setStep] = useState<FlowStep>('upload');
  const [analysisData, setAnalysisData] = useState<ATSAnalysisResult | null>(null);
  const [questionsData, setQuestionsData] = useState<InterviewQuestionsResult | null>(null);
  const [rawText, setRawText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Initialize theme from localStorage or system preferences on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const nextMode = !prev;
      if (nextMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return nextMode;
    });
  };

  const handleUploadStart = () => {
    setStep('analyzing');
    setError(null);
  };

  const handleUploadSuccess = (analysis: ATSAnalysisResult, text: string, name: string) => {
    setAnalysisData(analysis);
    setRawText(text);
    setFileName(name);
    setStep('analyzed');
  };

  const handleUploadError = (errMsg: string) => {
    setError(errMsg);
    setStep('upload');
  };

  const handleGenerateQuestions = async () => {
    if (!rawText) return;
    
    setStep('generating-questions');
    setError(null);

    try {
      const response = await generateQuestionsAction(rawText);
      if (response.success && response.data) {
        setQuestionsData(response.data);
        setStep('completed');
        // Smooth scroll to the interview section
        setTimeout(() => {
          document.getElementById('interview-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError(response.error || 'Failed to generate interview questions.');
        setStep('analyzed');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred while generating interview questions.');
      setStep('analyzed');
    }
  };

  const handleReset = () => {
    setStep('upload');
    setAnalysisData(null);
    setQuestionsData(null);
    setRawText('');
    setFileName('');
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0b111e] bg-grid-pattern transition-colors duration-300 relative overflow-hidden">
      
      {/* Background glowing blobs for rich aesthetics */}
      <div className="absolute top-[20%] left-[-10%] -z-10 h-[350px] w-[350px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl animate-float-1" />
      <div className="absolute bottom-[30%] right-[-10%] -z-10 h-[450px] w-[450px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl animate-float-2" />

      <Navbar 
        onAboutClick={() => setShowAbout(!showAbout)} 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 z-10">
        
        {/* About Panel */}
        {showAbout && (
          <div className="mx-auto max-w-4xl px-4 mt-6 animate-fade-in">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm relative dark:border-blue-900/40 dark:bg-blue-950/20 backdrop-blur-sm space-y-6">
              <button 
                onClick={() => setShowAbout(false)}
                className="absolute top-4 right-4 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕ Close
              </button>
              
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 dark:text-white">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-450" />
                  About CareerBoost AI
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  CareerBoost AI is a modern SaaS-style resume evaluation and interview preparation platform designed for job seekers. Leveraging the Google Gemini 2.5 Flash model, it parses uploaded PDF resumes to conduct thorough ATS checks, highlight skill gaps, provide optimization recommendations, and draft personalized interview Q&As based strictly on candidate profiles.
                </p>
              </div>

              {/* Grid: Workflow & Architecture */}
              <div className="grid gap-6 md:grid-cols-2 text-xs border-t border-blue-100/50 pt-5 dark:border-slate-800/40">
                {/* Workflow Column */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
                    🔄 Core Workflow
                  </h4>
                  <ul className="space-y-2 text-slate-655 dark:text-slate-350">
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400">1.</span>
                      <span><strong>PDF Text Extraction:</strong> Uploaded resume PDFs are processed server-side as raw file buffers using standard parsing to pull clean text.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400">2.</span>
                      <span><strong>ATS Scoring Rubric:</strong> Plain text is analyzed using structured prompts under temperature constraints to generate stable compliance scores and tags.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
                      <span><strong>Reference Q&A Preparation:</strong> Generates targeted Technical, HR, and Project questions alongside specific guideline answers drawn from the resume experience.</span>
                    </li>
                  </ul>
                </div>

                {/* Architecture Column */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
                    🏗️ System Architecture
                  </h4>
                  <ul className="space-y-2 text-slate-655 dark:text-slate-350">
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Frontend:</strong> Highly responsive Next.js client layout utilizing Tailwind CSS v4 styling, supporting fluid micro-animations and persistent theme states.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Backend actions:</strong> Next.js Server Actions (`'use server'`) run parsing and call Gemini API endpoints securely, keeping API keys protected.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Data Security:</strong> Single-session client state management. Resume uploads, scores, and questions exist only in memory, with zero databases or tracking trackers.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Developer Contact Footer Row */}
              <div className="mt-4 border-t border-blue-100/50 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 dark:border-slate-800/40 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 font-semibold text-slate-655 dark:text-slate-350">
                  <UserCheck className="h-4 w-4 text-blue-500" />
                  <span>Developer Contact: Jay Jadhav</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <a href="mailto:jaydjadhav1111@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400">jaydjadhav1111@gmail.com</a>
                  <a href="tel:9130481189" className="hover:text-blue-600 dark:hover:text-blue-400">+91 9130481189</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section - Only show when in upload stage */}
        {step === 'upload' && <Hero />}

        {/* Global Error Banner */}
        {error && step !== 'upload' && (
          <div className="mx-auto max-w-4xl px-4 mt-6 animate-fade-in">
            <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 p-4 text-left dark:bg-red-950/20 dark:border-red-900/50">
              <AlertTriangle className="h-5 w-5 text-red-700 shrink-0 mt-0.5 dark:text-red-400" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  System Error
                </p>
                <p className="text-xs text-red-700 mt-0.5 font-medium dark:text-red-450">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Core Steps Handler */}
        <div className="mt-8 px-4 sm:px-6 lg:px-8">
          {step === 'upload' && (
            <ResumeUpload 
              onUploadStart={handleUploadStart} 
              onUploadSuccess={handleUploadSuccess} 
              onUploadError={handleUploadError} 
            />
          )}

          {step === 'analyzing' && (
            <Loading type="analysis" />
          )}

          {/* Dashboards (Analyzed / Generating Questions / Completed) */}
          {(step === 'analyzed' || step === 'generating-questions' || step === 'completed') && analysisData && (
            <div className="space-y-10">
              {/* Dashboard Control Bar */}
              <div className="mx-auto max-w-4xl flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Active File: <span className="text-slate-900 font-bold dark:text-white">{fileName}</span>
                  </span>
                </div>
                
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Analyze New Resume</span>
                </button>
              </div>

              {/* ATS Analysis results */}
              <ATSAnalysis
                analysis={analysisData}
                onGenerateQuestions={handleGenerateQuestions}
                questionsGenerated={!!questionsData}
                isGeneratingQuestions={step === 'generating-questions'}
              />

              {/* Question Loading skeleton */}
              {step === 'generating-questions' && (
                <div className="border-t border-slate-200/60 pt-10 dark:border-slate-800/60">
                  <Loading type="questions" />
                </div>
              )}

              {/* Generated Interview Questions */}
              {step === 'completed' && questionsData && (
                <div className="border-t border-slate-200/60 pt-10 dark:border-slate-800/60">
                  <InterviewQuestions questions={questionsData} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
