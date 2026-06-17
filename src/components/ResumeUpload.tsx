'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { processResumeAction } from '../app/actions';
import { ATSAnalysisResult } from '../types';

interface ResumeUploadProps {
  onUploadStart: () => void;
  onUploadSuccess: (analysis: ATSAnalysisResult, text: string, fileName: string) => void;
  onUploadError: (error: string) => void;
}

export default function ResumeUpload({
  onUploadStart,
  onUploadSuccess,
  onUploadError
}: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      const err = 'Invalid file type. Please upload a PDF file.';
      setErrorMsg(err);
      setUploadState('error');
      onUploadError(err);
      return;
    }

    setFile(selectedFile);
    setUploadState('success');
    setErrorMsg('');
    triggerUpload(selectedFile);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const triggerUpload = async (pdfFile: File) => {
    onUploadStart();
    
    try {
      const formData = new FormData();
      formData.append('resume', pdfFile);

      const response = await processResumeAction(formData);

      if (response.success && response.data && response.text) {
        onUploadSuccess(response.data, response.text, pdfFile.name);
      } else {
        const errMsg = response.error || 'Failed to analyze the resume.';
        setUploadState('error');
        setErrorMsg(errMsg);
        onUploadError(errMsg);
      }
    } catch (err) {
      console.error('Upload error:', err);
      const errMsg = 'An unexpected network error occurred. Please try again.';
      setUploadState('error');
      setErrorMsg(errMsg);
      onUploadError(errMsg);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="upload-section">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50/50 scale-[1.01] dark:bg-blue-950/20'
            : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50/30 dark:border-slate-750 dark:bg-slate-900/60 dark:hover:border-blue-500 dark:hover:bg-slate-900'
        } shadow-sm`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
          accept=".pdf"
          className="hidden"
        />

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6 shadow-sm dark:bg-blue-950/40 dark:text-blue-400">
          <Upload className="h-7 w-7" />
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          Upload your resume PDF
        </h3>
        <p className="mt-2 text-sm text-slate-500 max-w-sm dark:text-slate-400">
          Drag and drop your PDF file here, or click to browse from your computer. Only standard text PDFs are supported.
        </p>

        <button
          type="button"
          onClick={onButtonClick}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Select PDF File
        </button>

        {/* Display file and success/error status */}
        {file && uploadState === 'success' && (
          <div className="mt-8 flex items-center gap-3 rounded-xl bg-green-50 border border-green-100 p-4 text-left w-full animate-fade-in dark:bg-green-950/25 dark:border-green-900/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate dark:text-slate-200">
                {file.name}
              </p>
              <p className="text-xs text-green-700 flex items-center gap-1 mt-0.5 font-medium dark:text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>Upload successful! Extracting and analyzing resume...</span>
              </p>
            </div>
          </div>
        )}

        {uploadState === 'error' && (
          <div className="mt-8 flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 p-4 text-left w-full animate-fade-in dark:bg-red-950/20 dark:border-red-900/50">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-700 shrink-0 dark:bg-red-900/30 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Analysis Failed
              </p>
              <p className="text-xs text-red-600 mt-0.5 font-medium dark:text-red-400">
                {errorMsg}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
