import { GoogleGenerativeAI } from '@google/generative-ai';
import { ATSAnalysisResult, InterviewQuestionsResult } from '../types';

// Initialize the Gemini API client
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Analyzes the resume text using Gemini AI and returns structured ATS feedback.
 * Uses temperature = 0 to ensure deterministic scoring.
 * 
 * @param resumeText - The plain text extracted from the PDF resume.
 * @returns The structured ATS analysis result.
 */
export async function analyzeResume(resumeText: string): Promise<ATSAnalysisResult> {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in your environment variables. Please add it to your .env.local file.');
  }

  try {
    // Configure the model to return JSON structure deterministically (temp = 0)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0,
      },
    });

    const prompt = `
Analyze the following resume and return JSON. 

SCORING RULES:
You must grade the resume systematically. The grading criteria should be highly consistent, returning the exact same score for the same resume text. Use these rubrics to calculate a score from 0 to 100:
- Presence of clear contact details & professional links (LinkedIn, GitHub) (10 points)
- Quality and impact of professional summary (15 points)
- Technical/Core skills explicitly listed (20 points)
- Detail and quantifiability of work experience/projects (e.g. actions, metrics, technologies used) (35 points)
- Formatting, logical structure, and lack of visual gaps (20 points)

JSON Schema to return:
{
  "ats_score": number,
  "summary": "Short professional summary based on the resume.",
  "strengths": ["Strength 1", "Strength 2", ...],
  "weaknesses": ["Weakness 1", "Weakness 2", ...],
  "missing_skills": ["Skill 1", "Skill 2", ...],
  "suggestions": ["Suggestion 1", "Suggestion 2", ...]
}

Return valid JSON only. Keep suggestions actionable and relevant to improving the resume for ATS systems.

Resume Content:
${resumeText}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();

    if (!jsonText) {
      throw new Error('Empty response received from Gemini.');
    }

    const data: ATSAnalysisResult = JSON.parse(jsonText);
    
    // Validate required fields
    if (
      typeof data.ats_score !== 'number' ||
      !data.summary ||
      !Array.isArray(data.strengths) ||
      !Array.isArray(data.weaknesses) ||
      !Array.isArray(data.missing_skills) ||
      !Array.isArray(data.suggestions)
    ) {
      throw new Error('Response JSON is missing required fields or has incorrect types.');
    }

    return data;
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    let errMsg = 'Gemini Analysis failed due to an unexpected error.';
    if (error instanceof Error) {
      if (error.message.includes('fetch failed')) {
        errMsg = 'Gemini API connection timed out or failed. This is usually a temporary network issue or DNS failure. Please verify your internet connection and try uploading your resume again.';
      } else {
        errMsg = `Gemini Analysis failed: ${error.message}`;
      }
    }
    throw new Error(errMsg);
  }
}

/**
 * Generates personalized interview questions and reference answers based on the candidate's resume.
 * 
 * @param resumeText - The plain text extracted from the PDF resume.
 * @returns The structured list of interview questions with suggested answers.
 */
export async function generateQuestions(resumeText: string): Promise<InterviewQuestionsResult> {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in your environment variables. Please add it to your .env.local file.');
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    });

    const prompt = `
Generate interview questions from this resume, along with a short, specific reference answer for each question based ONLY on the candidate's resume content.

JSON Schema to return:
{
  "technical": [
    {
      "question": "Question text?",
      "answer": "Suggested short reference answer (1-2 sentences) linking specifically to their work experience, projects, or technologies mentioned in their resume."
    }
  ],
  "hr": [
    {
      "question": "Question text?",
      "answer": "Suggested behavioral answer linking directly to the companies, roles, or career progression shown in their resume."
    }
  ],
  "project": [
    {
      "question": "Question text?",
      "answer": "Suggested reference answer outlining how they should describe their project, referencing specific accomplishments, technologies, or tools listed in their resume."
    }
  ]
}

Return valid JSON only. 
Generate exactly:
- 10 Technical Questions with reference answers
- 10 HR Questions with reference answers
- 5 Project-Based Questions with reference answers

The questions and reference answers must be highly tailored to the resume content. For example, if the resume contains Python, Machine Learning, and Data Science, generate technical and project questions specifically relevant to those technologies, and ensure the reference answers tell the candidate how to talk about their specific projects and experience using those technologies.

Resume Content:
${resumeText}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();

    if (!jsonText) {
      throw new Error('Empty response received from Gemini.');
    }

    const data: InterviewQuestionsResult = JSON.parse(jsonText);

    // Validate fields
    if (
      !Array.isArray(data.technical) ||
      !Array.isArray(data.hr) ||
      !Array.isArray(data.project)
    ) {
      throw new Error('Response JSON is missing required question categories.');
    }

    return data;
  } catch (error) {
    console.error('Error generating questions with Gemini:', error);
    let errMsg = 'Failed to generate interview questions due to an unexpected error.';
    if (error instanceof Error) {
      if (error.message.includes('fetch failed')) {
        errMsg = 'Gemini API connection timed out or failed. This is usually a temporary network issue. Please check your internet connection and try clicking "Generate Interview Questions" again.';
      } else {
        errMsg = `Failed to generate interview questions: ${error.message}`;
      }
    }
    throw new Error(errMsg);
  }
}
