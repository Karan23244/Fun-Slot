const express = require("express");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// ✅ Allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// ➕ Rate limiter for bot check
const botLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: "Too many requests from this IP. Try again later.",
});
app.use("/check-bot", botLimiter);



app.post("/check-bot", (req, res) => {
  const { checks, behavior, fingerprint } = req.body;
  console.log("🔍 Received bot detection request");

  let score = 0;
  const suspiciousUA = [/bot/i, /HeadlessChrome/i];

  // ✅ Explicit check for Googlebot
  const isGoogleBot = /Googlebot/i.test(checks.userAgent);

  console.log(`[${new Date().toISOString()}] IP: ${req.ip} | Fingerprint: ${fingerprint}`);
  console.log("User-Agent:", checks.userAgent);

  // Only run heuristics if it's not Googlebot
  if (!isGoogleBot) {
    if (checks.webdriver) score += 2;
    if (checks.pluginsLength === 0) score += 1;
    if (!checks.languages || checks.languages.length === 0) score += 1;
    if (!behavior.movedMouse) score += 2;
    if (!behavior.scrolled) score += 2;
    if (suspiciousUA.some((regex) => regex.test(checks.userAgent))) score += 3;
  }

  const isBot = isGoogleBot || score >= 4;
  console.log("Score:", score, "| isBot:", isBot);

  res.json({ isBot, isGoogleBot });
});


// Fallback route for SPA
app.get("*", (req, res) => {
  console.log("Serving React app...");
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
