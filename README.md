# 🚀 ResumeRadar AI – AI-Powered Resume Analyzer
ResumeRadar AI is a full-stack AI-powered Resume Analysis platform built using React, Node.js, and Groq LLM (LLaMA 3.3).  

It evaluates resumes for ATS compatibility, keyword match, skill breakdown, and generates AI-powered improvement suggestions and an optimized resume version.

---

## ✨ Features

### 📄 Resume Input Options
- Upload PDF resume
- Upload DOCX resume
- Paste resume text manually

### 🎯 Job Description Matching
- Optional job description input
- Keyword match percentage
- Missing keyword detection
- Resume-job gap analysis

### 📊 AI Resume Analysis
- Overall Score (0–100)
- Technical Skills Score
- Experience Impact Score
- Formatting Score
- ATS Optimization Score
- Radar Chart Visualization

### 🤖 AI Enhancements
- Strengths detection
- Weaknesses detection
- Improvement suggestions
- Fully AI-generated improved resume

### 🎨 UI Features
- Modern gradient UI
- Dark mode toggle
- Downloadable PDF report
- Clean dashboard layout

---

## 🛠 Tech Stack

### Frontend
- React.js
- Recharts (Radar Chart)
- jsPDF (Report Download)
- Modern CSS

### Backend
- Node.js
- Express.js
- Multer (File Upload)
- pdf-parse (PDF Parsing)
- Mammoth (DOCX Parsing)
- Groq LLM API (LLaMA 3.3)

---

## 📂 Project Structure

```
AI-RESUME-ANALYZER/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env (NOT uploaded to GitHub)
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# ⚠️ IMPORTANT: node_modules NOT Included

The `node_modules` folders are intentionally NOT uploaded to GitHub.

This is standard industry practice because:
- node_modules is very large
- It slows down Git
- Anyone can regenerate it using `npm install`

After cloning the project, you MUST install dependencies manually.

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```
git clone https://github.com/your-username/AI-RESUME-ANALYZER.git
cd AI-RESUME-ANALYZER
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
```

### Create `.env` file inside backend folder:

```
GROQ_API_KEY=your_groq_api_key_here
```

Then start backend:

```
node server.js
```

Backend runs on:
```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open new terminal:

```
cd frontend
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

# 🧠 How It Works

1. User uploads resume or pastes text.
2. Backend extracts resume content.
3. Resume + optional job description is sent to Groq LLM.
4. AI returns structured JSON analysis.
5. Frontend visualizes:
   - Overall score
   - Skill breakdown
   - Radar chart
   - Keyword match
   - Missing keywords
   - AI improved resume
6. User can download analysis report as PDF.

---

# 🔐 Environment Variables

Required:

```
GROQ_API_KEY
```

Get API key from:
https://console.groq.com/

⚠️ Never upload your `.env` file to GitHub.

---

# 🚀 Future Enhancements

- User authentication
- Save resume history
- MongoDB integration
- AI cover letter generator
- Role-specific resume optimization
- SaaS deployment
- Resume version tracking

---

# 💼 Use Cases

- Students applying for internships
- Job seekers improving ATS score
- Resume-job matching analysis
- HR Tech experimentation
- Career coaching tools

---

# 📜 License

MIT License

---

# 👨‍💻 Author

Developed by Priyam Kotnala

If you found this helpful, consider giving it a ⭐ on GitHub!
