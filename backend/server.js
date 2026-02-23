require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const upload = multer({
  storage: multer.memoryStorage(),
});

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    let resumeText = "";

    // Text input
    if (req.body.resumeText) {
      resumeText = req.body.resumeText;
    }

    // File upload
    if (req.file) {
      if (req.file.mimetype === "application/pdf") {
        const pdfData = await pdfParse(req.file.buffer);
        resumeText = pdfData.text;
      } else if (
        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const docData = await mammoth.extractRawText({
          buffer: req.file.buffer,
        });
        resumeText = docData.value;
      } else {
        return res.status(400).json({ error: "Unsupported file type." });
      }
    }

    if (!resumeText || resumeText.length < 20) {
      return res.status(400).json({ error: "Resume too short." });
    }

    const jobDescription = req.body.jobDescription || "";

    const prompt = `
You are an ATS expert recruiter.

Return ONLY valid JSON in this format:

{
  "overallScore": number,
  "breakdown": {
    "technicalSkills": number,
    "experienceImpact": number,
    "formatting": number,
    "atsOptimization": number
  },
  "keywordMatch": number,
  "missingKeywords": [string],
  "strengths": [string],
  "weaknesses": [string],
  "improvements": [string],
  "improvedResume": string
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
        }),
      }
    );

    const data = await response.json();

    if (!data.choices) {
      return res.status(500).json({ error: "AI request failed." });
    }

    let content = data.choices[0].message.content;

    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(content);

    res.json(parsed);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server crashed." });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});