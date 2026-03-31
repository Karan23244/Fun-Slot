// const express = require("express");
// const path = require("path");
// const cors = require("cors");
// const rateLimit = require("express-rate-limit");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const mysql = require("mysql2/promise");
// const he = require("he");
// const cron = require("node-cron");
// const https = require("https");
// const app = express();
// const JWT_SECRET = "supersecret";
// // ✅ Allow requests from your frontend
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://192.168.1.38:3000",
//       "https://funslot.online",
//       "https://admin.funslot.online",
//     ],
//     credentials: true,
//   }),
// );

// app.use(express.json());
// app.use(express.static(path.join(__dirname, "build")));

// // ➕ Rate limiter for bot check
// const botLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 20, // limit each IP to 20 requests per windowMs
//   message: "Too many requests from this IP. Try again later.",
// });
// app.use("/check-bot", botLimiter);

// // app.post("/check-bot", (req, res) => {
// //   const { checks, behavior, fingerprint } = req.body;
// //   console.log("🔍 Received bot detection request");

// //   let score = 0;
// //   const suspiciousUA = [/bot/i, /HeadlessChrome/i];

// //   // ✅ Explicit check for Googlebot
// //   const isGoogleBot = /Googlebot/i.test(checks.userAgent);

// //   console.log(`[${new Date().toISOString()}] IP: ${req.ip} | Fingerprint: ${fingerprint}`);
// //   console.log("User-Agent:", checks.userAgent);

// //   // Only run heuristics if it's not Googlebot
// //   if (!isGoogleBot) {
// //     if (checks.webdriver) score += 2;
// //     if (checks.pluginsLength === 0) score += 1;
// //     if (!checks.languages || checks.languages.length === 0) score += 1;
// //     if (!behavior.movedMouse) score += 2;
// //     if (!behavior.scrolled) score += 2;
// //     if (suspiciousUA.some((regex) => regex.test(checks.userAgent))) score += 3;
// //   }

// //   const isBot = isGoogleBot || score >= 4;
// //   console.log("Score:", score, "| isBot:", isBot);

// //   res.json({ isBot, isGoogleBot });
// // });
// app.post("/check-bot", (req, res) => {
//   const { checks, behavior } = req.body;

//   let score = 0;
//   const suspiciousUA = [/bot/i, /HeadlessChrome/i];
//   const isGoogleBot = /Googlebot/i.test(checks.userAgent);
//   const isMobile = checks.isMobile === true; // ✅ read mobile flag

//   if (!isGoogleBot) {
//     if (checks.webdriver) score += 2;
//     if (checks.pluginsLength === 0) score += 1;
//     if (!checks.languages || checks.languages.length === 0) score += 1;
//     if (suspiciousUA.some((regex) => regex.test(checks.userAgent))) score += 3;

//     // ✅ Only penalize mouse/scroll on desktop
//     if (!isMobile) {
//       if (!behavior.movedMouse) score += 2;
//       if (!behavior.scrolled) score += 2;
//     } else {
//       // On mobile, reward a tap as human signal (optional)
//       if (!behavior.tapped && !behavior.scrolled) score += 1; // light penalty only
//     }
//   }

//   const isBot = isGoogleBot || score >= 4;
//   console.log(`Score: ${score} | isMobile: ${isMobile} | isBot: ${isBot}`);

//   res.json({ isBot, isGoogleBot });
// });

// //  ^|^e Database connection wrapper
// let db;
// const initDB = async () => {
//   try {
//     db = await mysql.createConnection({
//       host: "160.153.172.237",
//       user: "clickorbits",
//       password: "Clickorbits@123",
//       database: "steptosale",
//     });
//     console.log(" ^|^e Database connected successfully");
//   } catch (err) {
//     console.error(" ^}^l Database connection failed:", err.message);
//     // Don't crash the server, just log the error
//   }
// };

// //  ^|^e Simple Hello API (works even if DB is down)
// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello World! API is working  ^=^n^i" });
// });

// //  ^|^e Login Endpoint
// app.post("/api/loginigaming", async (req, res) => {
//   if (!db) return res.status(500).json({ message: "Database not connected" });
//   try {
//     const { username, password } = req.body;
//     const [users] = await db.query(
//       "SELECT * FROM admin_users WHERE username = ?",
//       [username],
//     );

//     if (users.length === 0)
//       return res.status(401).json({ message: "Invalid username" });

//     const user = users[0];
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//     const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" });
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// //  ^|^e Auth Middleware
// const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.sendStatus(403);
//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// //  ^|^e Get Campaign Status
// app.get("/api/campaign-status", async (req, res) => {
//   if (!db) return res.status(500).json({ message: "Database not connected" });
//   try {
//     const [rows] = await db.query(
//       "SELECT is_live FROM campaign_status WHERE id = 1",
//     );
//     res.json({ live: rows[0]?.is_live });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });

// //  ^|^e Toggle Campaign Status
// app.post("/api/toggle-campaign", auth, async (req, res) => {
//   if (!db) return res.status(500).json({ message: "Database not connected" });
//   try {
//     const { is_live } = req.body;
//     await db.query("UPDATE campaign_status SET is_live=? WHERE id=1", [
//       is_live,
//     ]);
//     res.json({ message: "Campaign status updated", live: is_live });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Database error" });
//   }
// });
// //igaming api code

// // SSL Agent
// const agent = new https.Agent({
//   rejectUnauthorized: false, // Ignore SSL check
// });

// // Create table if not exists
// async function initDB1() {
//   try {
//     const createTable = `
//       CREATE TABLE IF NOT EXISTS campaigns (
//         id INT PRIMARY KEY,
//         title VARCHAR(255),
//         description TEXT,
//         currency VARCHAR(20),
//         model VARCHAR(50),
//         tracking_link TEXT,
//         preview_url TEXT,
//         bonus VARCHAR(50),
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;
//     await db.query(createTable);
//     console.log(" ^|^e Campaigns table ensured");
//   } catch (err) {
//     console.error(" ^}^l Error creating campaigns table:", err.message);
//   }
// }
// initDB1();

// // Function to fetch data & store in DB
// async function fetchAndStoreCampaigns() {
//   try {
//     const response = await axios.get(
//       "https://api.clickorbits.in/v2/publisher/campaigns?apiKey=68c17ce546730d177aad86c703c68c17ce54677d",
//       { httpsAgent: agent },
//     );

//     const campaigns = response.data?.data?.campaigns || [];
//     const apiCampaignIds = campaigns.map((c) => c.id);

//     // Insert/Update campaigns
//     for (let c of campaigns) {
//       const bonus = c.payouts?.[0]?.payout
//         ? `${c.payouts[0].payout} ${c.payouts[0].currency || ""}`
//         : "N/A";

//       const decodedDescription = he.decode(c.description || "");

//       await db.query(
//         `REPLACE INTO campaigns (id, title, description, currency, model, tracking_link, preview_url, bonus)
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           c.id,
//           c.title,
//           decodedDescription,
//           c.currency,
//           c.model,
//           c.tracking_link,
//           c.preview_url || "",
//           bonus,
//         ],
//       );
//     }

//     // Delete campaigns not in API
//     if (apiCampaignIds.length > 0) {
//       await db.query(`DELETE FROM campaigns WHERE id NOT IN (?)`, [
//         apiCampaignIds,
//       ]);
//     } else {
//       await db.query(`DELETE FROM campaigns`);
//     }

//     console.log(" ^|^e Campaigns synced with API");
//   } catch (err) {
//     console.error(" ^}^l Error fetching campaigns:", err.message);
//   }
// }

// // API to get campaigns from DB
// app.get("/api/campaigns", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM campaigns");
//     res.json({ success: true, data: rows });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // Run cron every 15 minutes
// cron.schedule("*/15 * * * *", fetchAndStoreCampaigns);

// // Initial fetch on server start
// fetchAndStoreCampaigns();
// // Fallback route for SPA
// // app.get("*", (req, res) => {
// //   console.log("Serving React app...");
// //   res.sendFile(path.join(__dirname, "build", "index.html"));
// // });

// app.listen(4003, "0.0.0.0", () => {
//   console.log("✅ Server running");
// });

import express from "express";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import he from "he";
import cron from "node-cron";
import https from "https";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4003;
const JWT_SECRET = "supersecret";

// ✅ CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://funslot.online",
      "https://admin.funslot.online",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.options("*", cors());
app.use(express.json());

// ================= DB =================
let db;

const initDB = async () => {
  try {
    db = await mysql.createConnection({
      host: "160.153.172.237",
      user: "clickorbits",
      password: "Clickorbits@123",
      database: "steptosale",
    });
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
};

// ================= RATE LIMIT =================
const botLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests. Try later.",
});
app.use("/check-bot", botLimiter);

// ================= ROUTES =================

// Health check
app.get("/api/hello", (req, res) => {
  res.json({ message: "API working 🚀" });
});

// Bot check
app.post("/check-bot", (req, res) => {
  const { checks, behavior } = req.body;

  let score = 0;
  const suspiciousUA = [/bot/i, /HeadlessChrome/i];
  const isGoogleBot = /Googlebot/i.test(checks.userAgent);
  const isMobile = checks.isMobile === true;

  if (!isGoogleBot) {
    if (checks.webdriver) score += 2;
    if (checks.pluginsLength === 0) score += 1;
    if (!checks.languages?.length) score += 1;
    if (suspiciousUA.some((r) => r.test(checks.userAgent))) score += 3;

    if (!isMobile) {
      if (!behavior.movedMouse) score += 2;
      if (!behavior.scrolled) score += 2;
    } else {
      if (!behavior.tapped && !behavior.scrolled) score += 1;
    }
  }

  const isBot = isGoogleBot || score >= 4;
  res.json({ isBot, isGoogleBot });
});

// ================= AUTH =================

app.post("/api/loginigaming", async (req, res) => {
  if (!db) return res.status(500).json({ message: "DB not connected" });

  try {
    const { username, password } = req.body;

    const [users] = await db.query(
      "SELECT * FROM admin_users WHERE username = ?",
      [username],
    );

    if (!users.length)
      return res.status(401).json({ message: "Invalid username" });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ================= CAMPAIGNS =================

const agent = new https.Agent({ rejectUnauthorized: false });

const initCampaignTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id INT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        currency VARCHAR(20),
        model VARCHAR(50),
        tracking_link TEXT,
        preview_url TEXT,
        bonus VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Campaign table ready");
  } catch (err) {
    console.error("❌ Table error:", err.message);
  }
};

const fetchAndStoreCampaigns = async () => {
  try {
    if (!db) return;

    const res = await axios.get(
      "https://api.clickorbits.in/v2/publisher/campaigns?apiKey=68c17ce546730d177aad86c703c68c17ce54677d",
      { httpsAgent: agent },
    );

    const campaigns = res.data?.data?.campaigns || [];

    for (const c of campaigns) {
      const bonus = c.payouts?.[0]?.payout
        ? `${c.payouts[0].payout} ${c.payouts[0].currency || ""}`
        : "N/A";

      await db.query(
        `REPLACE INTO campaigns VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          c.id,
          c.title,
          he.decode(c.description || ""),
          c.currency,
          c.model,
          c.tracking_link,
          c.preview_url || "",
          bonus,
        ],
      );
    }

    console.log("✅ Campaigns synced");
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
  }
};

// API
app.get("/api/campaigns", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM campaigns");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//  ^|^e Get Campaign Status
app.get("/api/campaign-status", async (req, res) => {
  if (!db) return res.status(500).json({ message: "Database not connected" });
  try {
    const [rows] = await db.query(
      "SELECT is_live FROM campaign_status WHERE id = 1",
    );
    res.json({ live: rows[0]?.is_live });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

//  ^|^e Toggle Campaign Status
app.post("/api/toggle-campaign", auth, async (req, res) => {
  if (!db) return res.status(500).json({ message: "Database not connected" });
  try {
    const { is_live } = req.body;
    await db.query("UPDATE campaign_status SET is_live=? WHERE id=1", [
      is_live,
    ]);
    res.json({ message: "Campaign status updated", live: is_live });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});
// ================= CRON =================
cron.schedule("*/15 * * * *", () => {
  if (db) fetchAndStoreCampaigns();
});

// ================= FRONTEND =================
app.use(express.static(path.join(__dirname, "build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ================= START =================
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  await initDB();
  await initCampaignTable();
  await fetchAndStoreCampaigns();
});
