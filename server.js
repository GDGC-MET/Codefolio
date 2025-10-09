const express = require("express");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from project root (index.html, styles.css, etc.)
app.use(express.static(path.join(__dirname)));

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many contact form submissions, please try again later.",
});

// Email configuration (optional - requires .env)
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Verify email configuration (will log but won't crash if not configured)
  transporter.verify((error, success) => {
    if (error) {
      console.log(
        "Email configuration error:",
        error && error.message ? error.message : error
      );
    } else {
      console.log("Email server is ready to send messages");
    }
  });
} else {
  // Fallback to a no-op transport so sendMail calls won't throw when env is missing
  transporter = nodemailer.createTransport({ jsonTransport: true });
  console.log(
    "EMAIL_USER/EMAIL_PASSWORD not set — using jsonTransport fallback (no real emails will be sent)"
  );
}

// Contact form endpoint
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    // Email to yourself
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p>${message}</p>`,
    };

    // Confirmation email to sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `<p>Hi ${name},</p><p>Thanks for reaching out — I'll get back to you soon.</p>`,
    };

    // Send both emails only if transporter is configured with credentials
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      await transporter.sendMail(mailOptionsToYou);
      await transporter.sendMail(mailOptionsToSender);
    } else {
      console.log(
        "Skipping sending email because EMAIL_USER/EMAIL_PASSWORD are not set."
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(
      "Contact form error:",
      error && error.message ? error.message : error
    );
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Fallback to index.html for SPA-style routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
