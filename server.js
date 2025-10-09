"use strict";

/**
 * Codefolio AI Backend (single file)
 *
 * Features:
 * - POST /api/project-description
 * - POST /api/resume-analyzer
 * - POST /api/career-recommender
 *
 * Requirements satisfied:
 * - JSON requests/responses via express.json()
 * - ai_completion(prompt) helper used for AI functionality (with OpenAI support and deterministic fallback)
 * - Example inputs/outputs included in comments at each endpoint
 * - Server start code included (PORT env var supported)
 * - CORS headers enabled for simplicity
 */

const express = require("express");

const app = express();

// Basic JSON parsing
app.use(express.json({ limit: "1mb" }));

// Lightweight CORS headers (no dependency on cors package)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

// Health check (optional helper)
app.get(["/", "/api/health"], (req, res) => {
  res.json({ status: "ok", service: "Codefolio AI Backend" });
});

/**
 * ai_completion(prompt)
 *
 * Where AI is used: This helper attempts to call OpenAI's Chat Completions API
 * if an OPENAI_API_KEY is set and fetch is available. Otherwise, it returns
 * null, so the caller can provide a deterministic fallback output.
 */
async function ai_completion(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const canCallOpenAI = Boolean(apiKey) && typeof fetch === "function";

  if (!canCallOpenAI) {
    return null; // Signal caller to use a deterministic sample
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant for Codefolio users, generating concise, actionable outputs.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 700,
      }),
    });

    if (!response.ok) {
      // Fall back on non-200s
      return null;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim();
    return content || null;
  } catch (err) {
    // Network or runtime failure: use deterministic fallback
    return null;
  }
}

// Middleware to enforce JSON content-type on POST endpoints
function requireJson(req, res, next) {
  const isJson = req.is("application/json");
  if (!isJson) {
    return res.status(415).json({ error: "Content-Type must be application/json" });
  }
  next();
}

// Utilities
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeToText(input) {
  if (typeof input === "string") return input;
  if (input == null) return "";
  try {
    return JSON.stringify(input);
  } catch (_e) {
    return String(input);
  }
}

// 1) AI Project Description Generator
// POST /api/project-description
// input: { userInput: string }
// output: { projectDescription: string }
//
// Example request:
//   POST /api/project-description
//   Content-Type: application/json
//   {
//     "userInput": "React portfolio with projects, blog, and contact form"
//   }
// Example response:
//   200 OK
//   {
//     "projectDescription": "A modern, responsive portfolio built with React..."
//   }
app.post("/api/project-description", requireJson, async (req, res) => {
  const { userInput } = req.body || {};
  if (!isNonEmptyString(userInput)) {
    return res.status(400).json({ error: "Field 'userInput' is required as a non-empty string" });
  }

  const prompt = `PROJECT DESCRIPTION REQUEST\n\nUser input: ${userInput}\n\nTask: Write a concise, engaging project description (150-200 words) suitable for a portfolio. Use clear, outcome-focused language and highlight the tech stack, key features, and impact.`;

  // AI used here via ai_completion(prompt)
  const aiText = await ai_completion(prompt);
  if (isNonEmptyString(aiText)) {
    return res.json({ projectDescription: aiText });
  }

  // Deterministic fallback if AI is unavailable
  const sample = `This project is a modern, responsive portfolio focused on showcasing personal work and writing. Built with a component-based UI and a clean design system, it highlights featured projects, a searchable blog, and an accessible contact form. Visitors can quickly understand your skill set, explore live demos, and view source code.\n\nKey features include a well-structured information architecture, fast-loading pages, and mobile-first layouts. A projects section presents problem statements, solutions, and impact, while the blog captures learning journeys and insights. The contact page supports simple, reliable communication for collaboration or opportunities.\n\nThe result is a clear narrative around your craft and experience, helping recruiters and peers evaluate your capabilities at a glance.`;
  return res.json({ projectDescription: sample });
});

// 2) AI Resume Analyzer
// POST /api/resume-analyzer
// input: { resumeText: string }
// output: { improvedResume: string }
//
// Example request:
//   POST /api/resume-analyzer
//   Content-Type: application/json
//   {
//     "resumeText": "Software engineer with 2 years experience..."
//   }
// Example response:
//   200 OK
//   {
//     "improvedResume": "Rewritten, impact-oriented resume bullets..."
//   }
app.post("/api/resume-analyzer", requireJson, async (req, res) => {
  const { resumeText } = req.body || {};
  if (!isNonEmptyString(resumeText)) {
    return res.status(400).json({ error: "Field 'resumeText' is required as a non-empty string" });
  }

  const prompt = `RESUME ANALYZER\n\nResume text:\n${resumeText}\n\nTask: Rewrite the resume content to be impact-oriented. Use quantified achievements where possible, start bullets with strong verbs, and keep it concise. Output only the improved resume text.`;

  // AI used here via ai_completion(prompt)
  const aiText = await ai_completion(prompt);
  if (isNonEmptyString(aiText)) {
    return res.json({ improvedResume: aiText });
  }

  // Deterministic fallback if AI is unavailable
  const sample = `Experience\n- Built and shipped features across a responsive front-end, increasing session duration by 22%.\n- Automated CI checks and linting, reducing release regressions by 35%.\n- Collaborated with designers and PMs to deliver accessible UI components used across 6 pages.\n\nProjects\n- Portfolio Web App: Implemented SSR-friendly components and image optimizations, improving LCP by ~30%.\n- Blog Engine: Authored markdown-to-HTML pipeline with syntax highlighting and code copy buttons.`;
  return res.json({ improvedResume: sample });
});

// 3) AI Career Path Recommender
// POST /api/career-recommender
// input: { skillsProjects: string | object | array }
// output: { careerSuggestions: string }
//
// Example request:
//   POST /api/career-recommender
//   Content-Type: application/json
//   {
//     "skillsProjects": ["React", "Node.js", "Portfolio site", "Blog engine"]
//   }
// Example response:
//   200 OK
//   {
//     "careerSuggestions": "Top paths: Frontend Engineer, Full-Stack Engineer..."
//   }
app.post("/api/career-recommender", requireJson, async (req, res) => {
  const { skillsProjects } = req.body || {};
  const skillsText = normalizeToText(skillsProjects);
  if (!isNonEmptyString(skillsText)) {
    return res.status(400).json({ error: "Field 'skillsProjects' is required (string, array, or object)" });
  }

  const prompt = `CAREER RECOMMENDER\n\nUser skills and projects:\n${skillsText}\n\nTask: Recommend 3-5 career paths with a one-line rationale each and 2-3 immediate action steps per path. Keep it concise and practical.`;

  // AI used here via ai_completion(prompt)
  const aiText = await ai_completion(prompt);
  if (isNonEmptyString(aiText)) {
    return res.json({ careerSuggestions: aiText });
  }

  // Deterministic fallback if AI is unavailable
  const sample = `Top paths\n1) Frontend Engineer — Strength in React/UX.\n   Steps: Build 1-2 UI-heavy apps; master accessibility; practice system design.\n2) Full-Stack Developer — Comfort across React/Node/DB.\n   Steps: Ship a full CRUD app; add auth + tests; deploy and monitor.\n3) Developer Experience (DX) — Enjoys tooling/docs.\n   Steps: Create CLI or component library; write guides; gather dev feedback.`;
  return res.json({ careerSuggestions: sample });
});

// Global error handler (fallback)
app.use((err, _req, res, _next) => {
  const message = err?.message || "Internal Server Error";
  res.status(500).json({ error: message });
});

// Server start
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Codefolio AI Backend listening on http://localhost:${PORT}`);
});
