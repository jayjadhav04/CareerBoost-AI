export interface ATSAnalysisResult {
  ats_score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  suggestions: string[];
}

export interface InterviewQuestionItem {
  question: string;
  answer: string;
}

export interface InterviewQuestionsResult {
  technical: InterviewQuestionItem[];
  hr: InterviewQuestionItem[];
  project: InterviewQuestionItem[];
}
