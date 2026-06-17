'use client';

import React from 'react';
import { Sparkles, Sun, Moon, Info } from 'lucide-react';

interface NavbarProps {
  onAboutClick?: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ onAboutClick, darkMode, toggleDarkMode }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:bg-blue-500 dark:shadow-blue-500/10">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              CareerBoost <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">AI</span>
            </span>
          </div>
        </div>

        {/* Controls */}
        <nav className="flex items-center gap-4">
          {/* About Button */}
          <button
            onClick={onAboutClick}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white cursor-pointer"
            title="Learn about CareerBoost AI"
          >
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">About</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-850 dark:hover:text-white cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-amber-500 animate-spin-slow" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
