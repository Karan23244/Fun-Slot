const express = require("express");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const he = require("he");
const cron = require("node-cron");
const https = require("https");
const axios = require("axios");
// __dirname fix (since you're replacing fileURLToPath usage
const app = express();
const PORT = 4003;
const JWT_SECRET = "supersecret";

//  ^|^e CORS
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

//app.options("/.*/", cors());
app.use(express.json());

// ================= DB =================
// ================= DB (FIXED) =================

const db = mysql.createPool({
  host: "160.153.172.237",
  user: "clickorbits",
  password: "Clickorbits@123",
  database: "steptosale",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("✅ DB Pool created");

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

  await initCampaignTable();
  await fetchAndStoreCampaigns();
});
