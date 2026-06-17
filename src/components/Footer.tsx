import React from 'react';
import { 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck,
  Code
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/80 py-12 transition-colors duration-300 dark:border-slate-850 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Developer Profile Card / Signature Section */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800/80 dark:bg-slate-900/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-700 dark:bg-blue-950/40 dark:border-blue-900/40 dark:text-blue-400">
                <Code className="h-3 w-3" />
                <span>Developer Profile</span>
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-2">
                Jay Jadhav
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Full Stack Developer & AI Integration Engineer
              </p>
            </div>

            {/* Social & Portfolio Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-4 text-xs font-semibold">
              <a
                href="mailto:jaydjadhav1111@gmail.com"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
              >
                <Mail className="h-4 w-4 shrink-0 text-blue-500" />
                <span>jaydjadhav1111@gmail.com</span>
              </a>
              <a
                href="tel:9130481189"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
              >
                <Phone className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>+91 9130481189</span>
              </a>
              <a
                href="https://linkedin.com/in/jayjadhav04"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
              >
                <svg className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>in/jayjadhav04</span>
              </a>
              <a
                href="https://github.com/jayjadhav04"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
              >
                <svg className="h-4 w-4 shrink-0 text-slate-800 dark:text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>github.com/jayjadhav04</span>
              </a>
              <a
                href="https://jay-jadhav-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
              >
                <Globe className="h-4 w-4 shrink-0 text-sky-500" />
                <span>jay-jadhav-portfolio</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Base Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100 pt-8 dark:border-slate-850">
          <div className="text-center sm:text-left">
            <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
              CareerBoost <span className="text-blue-600 dark:text-blue-400 font-bold">AI</span>
            </span>
            <p className="text-xs text-slate-400 mt-1">
              © {new Date().getFullYear()} CareerBoost AI. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:items-end">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-500/10 active:scale-95 dark:bg-slate-800 dark:hover:bg-blue-600 cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Built for Digital Heroes</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
