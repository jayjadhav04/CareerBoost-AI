# CareerBoost AI 🚀

CareerBoost AI is a complete, production-ready, AI-powered Resume Analyzer and Interview Preparation Coach designed to help job seekers pass ATS filters and prepare for technical, HR, and project-based interviews.

Built as a lightweight, single-session web app, it processes resumes entirely in memory without requiring a database, keeping candidate data secure and private.

## ✨ Features

- 📂 **PDF Resume Parsing**: Upload your PDF resume to extract clean text server-side.
- 📊 **Deterministic ATS Scoring**: Evaluates the resume systematically and calculates an objective ATS score (out of 100) using a strict prompt grading rubric.
- 💡 **Actionable ATS Insights**: Highlights resume summaries, key strengths, formatting weaknesses, missing critical skills, and specific suggestions for improvement.
- 🎓 **Personalized Interview prep**: Generates a tailored deck of:
  - 10 Technical Questions
  - 10 HR / Behavioral Questions
  - 5 Project-Based Questions
- 🔑 **Resume-Specific Guideline Answers**: Each interview question comes with a suggested answer guide showing you how to phrase your answers using your specific work experience and accomplishments.
- 📋 **Click-to-Copy Reports**: Copy individual sections or the entire analysis/interview Q&As to your clipboard with a single click.
- 🌓 **Premium UI & Dark Mode**: Beautiful SaaS-style design featuring floating gradient glows, repeating background grids, smooth keyframe animations, and full system-preference dark mode support.

## 🛠️ Technology Stack

- **Framework**: Next.js App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **AI Integration**: Google Gemini 2.5 Flash API
- **PDF Extraction**: pdf-parse (Node.js buffer parsing)
- **Icons**: Lucide React / Custom SVGs

## 🚀 Local Setup

Follow these steps to run the application on your computer:

1. **Clone or Navigate to the Directory**:
   ```bash
   cd careerboost-ai
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the environment variables template file:
   ```bash
   cp .env.local.example .env.local
   ```
   Open the `.env.local` file and replace `your_gemini_api_key_here` with your Gemini API key from [Google AI Studio](https://aistudio.google.com/).

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Vercel Deployment

Deploying the app to Vercel takes less than 2 minutes:

1. Push your repository to **GitHub**.
2. Go to **Vercel** and import your repository.
3. Under **Environment Variables**, add:
   - Key: `GEMINI_API_KEY`
   - Value: `YOUR_ACTUAL_GEMINI_API_KEY`
4. Click **Deploy**. Vercel will build and host your Next.js app on their free tier.
