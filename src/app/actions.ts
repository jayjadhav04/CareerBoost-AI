'use server';

import { extractTextFromPdf } from '../lib/pdfExtractor';
import { analyzeResume, generateQuestions } from '../lib/gemini';
import { ATSAnalysisResult, InterviewQuestionsResult } from '../types';

interface ActionResponse<T> {
  success: boolean;
  data?: T;
  text?: string; // used to send back extracted text for step 2 to step 5 transition
  error?: string;
}

/**
 * Server action to process an uploaded PDF resume:
 * 1. Read PDF file from FormData
 * 2. Extract plain text content
 * 3. Analyze the resume with Gemini AI (ATS score, strengths, etc.)
 */
export async function processResumeAction(formData: FormData): Promise<ActionResponse<ATSAnalysisResult>> {
  try {
    const file = formData.get('resume') as File;
    if (!file) {
      return { success: false, error: 'No file was uploaded.' };
    }

    if (file.type !== 'application/pdf') {
      return { success: false, error: 'Only PDF files are supported.' };
    }

    // Convert File web standard to Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF buffer
    const resumeText = await extractTextFromPdf(buffer);
    
    if (!resumeText.trim()) {
      return { success: false, error: 'Failed to extract text from the PDF. Ensure the file contains selectable text.' };
    }

    // Call Gemini to analyze the resume
    const analysis = await analyzeResume(resumeText);

    return {
      success: true,
      data: analysis,
      text: resumeText // return the text so the client can reuse it to generate questions
    };
  } catch (error) {
    console.error('Error in processResumeAction server action:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred during resume analysis.'
    };
  }
}

/**
 * Server action to generate interview questions tailored to the resume text.
 */
export async function generateQuestionsAction(resumeText: string): Promise<ActionResponse<InterviewQuestionsResult>> {
  try {
    if (!resumeText || !resumeText.trim()) {
      return { success: false, error: 'Resume text is empty. Please upload a resume first.' };
    }

    const questions = await generateQuestions(resumeText);

    return {
      success: true,
      data: questions
    };
  } catch (error) {
    console.error('Error in generateQuestionsAction server action:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred during question generation.'
    };
  }
}
