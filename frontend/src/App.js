import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import jsPDF from "jspdf";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [file, setFile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysis(null);

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("resumeText", resumeText);
    }
    formData.append("jobDescription", jobDescription);

    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setAnalysis(data);
    setLoading(false);
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text(JSON.stringify(analysis, null, 2), 10, 10);
    doc.save("Resume_Report.pdf");
  };

  return (
    <div style={styles.container(darkMode)}>
      <div style={styles.card(darkMode)}>
        <div style={styles.header}>
          <h1 style={{ margin: 0 }}>AI Resume Analyzer 🚀</h1>
          <button style={styles.darkBtn} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div style={styles.uploadBox}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p style={{ margin: 10 }}>OR</p>

          <textarea
            placeholder="Paste Resume Text"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            style={styles.textarea}
            rows={6}
          />

          <textarea
            placeholder="Paste Job Description (Optional)"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={styles.textarea}
            rows={4}
          />

          <button style={styles.primaryBtn} onClick={handleAnalyze}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {analysis && (
          <div style={styles.resultsSection}>
            <h2>Overall Score: {analysis.overallScore}/100</h2>

            <div style={styles.progressBarContainer}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${analysis.overallScore}%`,
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadarChart
                outerRadius={120}
                width={450}
                height={350}
                data={[
                  { subject: "Technical", value: analysis.breakdown.technicalSkills },
                  { subject: "Experience", value: analysis.breakdown.experienceImpact },
                  { subject: "Formatting", value: analysis.breakdown.formatting },
                  { subject: "ATS", value: analysis.breakdown.atsOptimization },
                ]}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar
                  dataKey="value"
                  stroke="#6c63ff"
                  fill="#6c63ff"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </div>

            <Section title={`Keyword Match: ${analysis.keywordMatch}%`}>
              {analysis.missingKeywords.map((word, i) => (
                <li key={i}>{word}</li>
              ))}
            </Section>

            <Section title="Strengths">
              {analysis.strengths.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </Section>

            <Section title="Weaknesses">
              {analysis.weaknesses.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </Section>

            <Section title="Improvements">
              {analysis.improvements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </Section>

            <Section title="Improved Resume">
              <pre style={styles.preBox}>{analysis.improvedResume}</pre>
            </Section>

            <button style={styles.downloadBtn} onClick={downloadReport}>
              Download Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={styles.sectionCard}>
      <h3>{title}</h3>
      <ul>{children}</ul>
    </div>
  );
}

const styles = {
  container: (dark) => ({
    minHeight: "100vh",
    padding: 40,
    background: dark
      ? "#0f172a"
      : "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Inter, sans-serif",
  }),
  card: (dark) => ({
    background: dark ? "#1e293b" : "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 40,
    maxWidth: 1000,
    margin: "auto",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  }),
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  darkBtn: {
    padding: "8px 16px",
    borderRadius: 20,
    border: "none",
    cursor: "pointer",
  },
  uploadBox: {
    marginBottom: 30,
  },
  textarea: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginBottom: 15,
    fontSize: 14,
  },
  primaryBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  progressBarContainer: {
    width: "100%",
    height: 12,
    background: "#e5e7eb",
    borderRadius: 10,
    marginBottom: 30,
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    borderRadius: 10,
  },
  resultsSection: {
    marginTop: 30,
  },
  sectionCard: {
    background: "#f8fafc",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  preBox: {
    whiteSpace: "pre-wrap",
    background: "#111",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  downloadBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "#10b981",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default App;