'use client';

import React, { useState } from 'react';
import { 
  Terminal, 
  UserCheck, 
  FolderGit, 
  Copy, 
  Check, 
  HelpCircle,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff
} from 'lucide-react';
import { InterviewQuestionsResult, InterviewQuestionItem } from '../types';

interface InterviewQuestionsProps {
  questions: InterviewQuestionsResult;
}

type TabType = 'technical' | 'hr' | 'project';

export default function InterviewQuestions({ questions }: InterviewQuestionsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('technical');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  
  // Track open state for individual questions (indexed by category + index string)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  
  // Toggle all answers at once
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getActiveTabQuestions = (): InterviewQuestionItem[] => {
    switch (activeTab) {
      case 'technical':
        return questions.technical;
      case 'hr':
        return questions.hr;
      case 'project':
        return questions.project;
      default:
        return [];
    }
  };

  const getActiveTabLabel = (): string => {
    switch (activeTab) {
      case 'technical': return 'Technical Questions';
      case 'hr': return 'HR / Behavioral Questions';
      case 'project': return 'Project-Based Questions';
    }
  };

  const getActiveTabIcon = () => {
    switch (activeTab) {
      case 'technical': return <Terminal className="h-5 w-5 text-blue-600 dark:text-blue-450" />;
      case 'hr': return <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-450" />;
      case 'project': return <FolderGit className="h-5 w-5 text-indigo-600 dark:text-indigo-450" />;
    }
  };

  const formatQuestionsForCopy = (qList: InterviewQuestionItem[], title: string, includeAnswers = true) => {
    let formatted = `${title}\n${'-'.repeat(title.length)}\n`;
    qList.forEach((q, i) => {
      formatted += `Q${i + 1}: ${q.question}\n`;
      if (includeAnswers) {
        formatted += `A${i + 1}: [Reference Answer] ${q.answer}\n`;
      }
      formatted += '\n';
    });
    return formatted;
  };

  const getFullQuestionsText = () => {
    let text = `CareerBoost AI - Tailored Interview Questions & Reference Answers\n===========================================================\n\n`;
    text += formatQuestionsForCopy(questions.technical, 'Technical Questions (10)');
    text += '\n';
    text += formatQuestionsForCopy(questions.hr, 'HR / Behavioral Questions (10)');
    text += '\n';
    text += formatQuestionsForCopy(questions.project, 'Project-Based Questions (5)');
    return text;
  };

  const toggleItem = (index: number) => {
    const key = `${activeTab}-${index}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleToggleAllAnswers = () => {
    const nextState = !showAllAnswers;
    setShowAllAnswers(nextState);
    
    // Set all items in active tab to open or closed
    const activeQuestions = getActiveTabQuestions();
    const updated: Record<string, boolean> = { ...openItems };
    activeQuestions.forEach((_, index) => {
      updated[`${activeTab}-${index}`] = nextState;
    });
    setOpenItems(updated);
  };

  const activeQuestions = getActiveTabQuestions();
  const activeLabel = getActiveTabLabel();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in" id="interview-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2 dark:text-white">
            <ClipboardList className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Interview Preparation Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">
            Personalized interview questions with suggested reference answers tailored strictly to your experience.
          </p>
        </div>

        <button
          onClick={() => copyToClipboard(getFullQuestionsText(), 'all-questions')}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {copiedSection === 'all-questions' ? (
            <>
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">Copied All Q&As!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy All Q&As</span>
            </>
          )}
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
        <button
          onClick={() => { setActiveTab('technical'); setShowAllAnswers(false); }}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'technical'
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-700'
          }`}
        >
          <Terminal className="h-4 w-4" />
          <span>Technical ({questions.technical.length})</span>
        </button>
        <button
          onClick={() => { setActiveTab('hr'); setShowAllAnswers(false); }}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'hr'
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-700'
          }`}
        >
          <UserCheck className="h-4 w-4" />
          <span>HR / Behavioral ({questions.hr.length})</span>
        </button>
        <button
          onClick={() => { setActiveTab('project'); setShowAllAnswers(false); }}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'project'
              ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-700'
          }`}
        >
          <FolderGit className="h-4 w-4" />
          <span>Project ({questions.project.length})</span>
        </button>
      </div>

      {/* Tab Content Panel */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6 dark:border-slate-800">
          <div className="flex items-center gap-2.5 text-slate-800 font-bold dark:text-white">
            {getActiveTabIcon()}
            <span>{activeLabel}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle All Answers */}
            <button
              onClick={handleToggleAllAnswers}
              className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-950 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white cursor-pointer"
            >
              {showAllAnswers ? (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>Hide Reference Answers</span>
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  <span>Show Reference Answers</span>
                </>
              )}
            </button>

            {/* Copy Section */}
            <button
              onClick={() => copyToClipboard(formatQuestionsForCopy(activeQuestions, activeLabel), activeTab)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors p-1.5 dark:text-slate-400 dark:hover:text-blue-400 cursor-pointer"
            >
              {copiedSection === activeTab ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Section</span>
                </>
              )}
            </button>
          </div>
        </div>

        {activeQuestions.length > 0 ? (
          <div className="space-y-4">
            {activeQuestions.map((item, index) => {
              const isItemOpen = !!openItems[`${activeTab}-${index}`];
              return (
                <div 
                  key={index} 
                  className="rounded-xl border border-slate-100 hover:border-blue-100/50 hover:bg-slate-50/10 transition-all duration-200 dark:border-slate-850 dark:hover:border-blue-900/30 dark:hover:bg-slate-900/10 overflow-hidden"
                >
                  {/* Collapsable Header */}
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex items-start gap-4 p-4 text-left w-full cursor-pointer focus:outline-none"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold shrink-0 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-sm font-semibold text-slate-800 leading-relaxed dark:text-slate-200">
                        {item.question}
                      </p>
                    </div>
                    <div className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 mt-1">
                      {isItemOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Collapsable Body */}
                  {isItemOpen && (
                    <div className="px-4 pb-4 pl-15 border-t border-slate-50/40 dark:border-slate-850/40 bg-slate-50/30 dark:bg-slate-900/20 animate-fade-in">
                      <div className="mt-3 rounded-lg bg-blue-50/40 border border-blue-100/30 p-3.5 text-xs text-slate-655 dark:bg-blue-950/15 dark:border-blue-900/20 dark:text-slate-350 leading-relaxed">
                        <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1.5 uppercase tracking-wider text-[10px]">
                          Reference Answer Guide
                        </span>
                        {item.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
            <HelpCircle className="h-8 w-8 text-slate-300 dark:text-slate-700" />
            <p className="text-sm text-slate-500 italic dark:text-slate-400">
              No questions found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
