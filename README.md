# CareerBoost AI 🚀

CareerBoost AI is a complete, production-ready, AI-powered Resume Analyzer and Interview Preparation Coach built using **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and the **Google Gemini AI API**.

Job seekers upload their PDF resume to instantly receive an ATS compliance score, resume formatting suggestions, strengths, weaknesses, and a custom deck of 25 interview questions (Technical, HR, and Project-based) complete with suggested reference answers customized specifically to the experiences listed on their resume.

---

## 🏗️ System Architecture

This application is built as a single-session web app, keeping all candidate data secure and private by processing resume contents strictly in-memory without a database.

```mermaid
graph TD
    %% Frontend Layer
    subgraph Client [Browser - Client Side]
        UI[React Components <br/> /src/components]
        Theme[Theme Toggle <br/> Light / Dark Mode]
    end

    %% Backend Server Action Layer
    subgraph Server [Next.js Server Actions - Secure Node.js]
        Actions[actions.ts <br/> 'use server' entrypoint]
        Parser[pdfExtractor.ts <br/> pdf-parse engine]
        Gemini[gemini.ts <br/> Gemini API Wrapper]
    end

    %% Google Cloud Models Layer
    subgraph API [Google Gemini API Layer]
        Model[Gemini 2.5 Flash <br/> Model Output Mime: JSON]
    end

    %% Flow Connections
    UI -->|1. Upload PDF Resume| Actions
    Actions -->|2. Buffer Processing| Parser
    Parser -->|3. Extracted Plain Text| Actions
    Actions -->|4. Prompt Query| Gemini
    Gemini -->|5. Encrypted Request| Model
    Model -->|6. Structured JSON| Gemini
    Gemini -->|7. Validated ATS Object| Actions
    Actions -->|8. State Update| UI
    Theme -->|9. Toggle .dark class| UI
```

---

## 🔄 Core Application Workflow

1. **Upload & Parser (In-Memory)**: The candidate uploads a resume PDF. The React upload component converts the file into a Node buffer and executes text extraction using `pdf-parse` strictly on the server.
2. **ATS Scoring Rubric**: The plain text is fed to `gemini-2.5-flash` with a temperature setting of `0` to guarantee deterministic and stable scores. The prompt calculates a score out of 100 based on standard formatting and key credentials.
3. **Reference Q&As**: Generates 10 Technical, 10 Behavioral, and 5 Project questions, including a 1-to-2 sentence answer guide showing the user how to talk about their achievements.
4. **Interactive Accordion UI**: Renders results in a responsive tabbed view where candidate questions feature toggleable accordion panels to reveal reference answer guides.

---

## 📷 Screenshots & Visual Demo


### 1. Landing Page & Upload Dropzone
![Landing & Upload Zone](CareerBoost-AI/src/public/screenshots/landing_upload.png)
> This landing screen invites job seekers to upload their resume using a drag-and-drop file uploader. 
> The UI features an animated radial grid backdrop and a sleek light/dark mode header selector.

### 2. ATS Analysis Dashboard
![ATS Scoring & Insights](src/public/screenshots/ats_dashboard.png)
> Displays the calculated ATS score inside a custom-styled circular progress gauge with rating indicators. 
> Features detailed cards for professional summaries, key strengths, formatting weaknesses, missing skills, and suggestions.

### 3. Interview Preparation Q&As
![Interview Questions & Answers](/public/screenshots/interview_prep.png)
> Renders Technical, HR, and Project interview questions in a clean tabbed panel. 
> Each card can be clicked to slide open a "Reference Answer Guide" displaying custom, resume-specific guidance.

### 4. Adaptive Dark Mode View
![Dark Mode Dashboard](/public/screenshots/dark_mode.png)
> Shows the entire SaaS interface adapted to a premium dark theme using HSL slate variables. 
> Provides high-contrast readability and glowing ambient blur blobs for a premium user experience.

---

## 🚀 Local Development Setup

To run CareerBoost AI locally on your machine, follow these steps:

1. **Clone the Directory & Install**:
   ```bash
   cd careerboost-ai
   npm install
   ```

2. **Configure Environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Open `.env.local` and replace `your_gemini_api_key_here` with your API key from [Google AI Studio](https://aistudio.google.com/).

3. **Start Local Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deploying to Vercel

1. Push your repository to **GitHub**.
2. Connect your GitHub account to **Vercel** and import this project.
3. Add the following **Environment Variable** in the Vercel project configuration page:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `YOUR_AI_STUDIO_API_KEY_HERE`
4. Click **Deploy**. Vercel will host your site on its secure, global serverless framework.

---

## 👨‍💻 Developer Profile

**Jay Jadhav**
- **Email**: [jaydjadhav1111@gmail.com](mailto:jaydjadhav1111@gmail.com)

- **LinkedIn**: [in/jayjadhav04](https://linkedin.com/in/jayjadhav04)
- **GitHub**: [github.com/jayjadhav04](https://github.com/jayjadhav04)
- **Portfolio**: [jay-jadhav-portfolio.vercel.app](https://jay-jadhav-portfolio.vercel.app)
