import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import he from "he";
import cron from "node-cron";
import https from "https";
const app = express();
const PORT = 5252;
const JWT_SECRET = "supersecret"; // change in production

//  ^|^e Middleware
//app.use(cors({ origin: "https://funslot.online", credentials: true }));
//  ^|^e Enable CORS for all origins (change if needed)
app.use(cors({
  origin: [
    "https://funslot.online",
    "https://admin.funslot.online",
    "http://localhost:5173"
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

//  ^}^l REMOVE THIS LINE
// app.options("*", cors());
app.use(express.json());

//  ^|^e Database connection wrapper
let db;
const initDB = async () => {
  try {
    db = await mysql.createConnection({
      host: "160.153.172.237",
      user: "clickorbits",
      password: "Clickorbits@123",
      database: "steptosale",
    });
    console.log(" ^|^e Database connected successfully");
  } catch (err) {
    console.error(" ^}^l Database connection failed:", err.message);
    // Don't crash the server, just log the error
  }
};

//  ^|^e Simple Hello API (works even if DB is down)
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World! API is working  ^=^n^i" });
});

//  ^|^e Login Endpoint
app.post("/api/loginigaming", async (req, res) => {
  if (!db) return res.status(500).json({ message: "Database not connected" });
  try {
    const { username, password } = req.body;
    const [users] = await db.query("SELECT * FROM admin_users WHERE username = ?", [username]);

    if (users.length === 0) return res.status(401).json({ message: "Invalid username" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//  ^|^e Auth Middleware
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

//  ^|^e Get Campaign Status
app.get("/api/campaign-status", async (req, res) => {
  if (!db) return res.status(500).json({ message: "Database not connected" });
  try {
    const [rows] = await db.query("SELECT is_live FROM campaign_status WHERE id = 1");
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
    await db.query("UPDATE campaign_status SET is_live=? WHERE id=1", [is_live]);
    res.json({ message: "Campaign status updated", live: is_live });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});
//igaming api code 

// SSL Agent
const agent = new https.Agent({
  rejectUnauthorized: false, // Ignore SSL check
});

// Create table if not exists
async function initDB1() {
  try {
    const createTable = `
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
    `;
    await db.query(createTable);
    console.log(" ^|^e Campaigns table ensured");
  } catch (err) {
    console.error(" ^}^l Error creating campaigns table:", err.message);
  }
}
initDB1();

// Function to fetch data & store in DB
async function fetchAndStoreCampaigns() {
  try {
    const response = await axios.get(
      "https://api.clickorbits.in/v2/publisher/campaigns?apiKey=68c17ce546730d177aad86c703c68c17ce54677d",
      { httpsAgent: agent }
    );

    const campaigns = response.data?.data?.campaigns || [];
    const apiCampaignIds = campaigns.map((c) => c.id);

    // Insert/Update campaigns
    for (let c of campaigns) {
      const bonus = c.payouts?.[0]?.payout
        ? `${c.payouts[0].payout} ${c.payouts[0].currency || ""}`
        : "N/A";

      const decodedDescription = he.decode(c.description || "");

      await db.query(
        `REPLACE INTO campaigns (id, title, description, currency, model, tracking_link, preview_url, bonus)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                 [
          c.id,
          c.title,
          decodedDescription,
          c.currency,
          c.model,
          c.tracking_link,
          c.preview_url || "",
          bonus,
        ]
      );
    }

    // Delete campaigns not in API
    if (apiCampaignIds.length > 0) {
      await db.query(`DELETE FROM campaigns WHERE id NOT IN (?)`, [
        apiCampaignIds,
      ]);
    } else {
      await db.query(`DELETE FROM campaigns`);
    }

    console.log(" ^|^e Campaigns synced with API");
  } catch (err) {
    console.error(" ^}^l Error fetching campaigns:", err.message);
  }
}

// API to get campaigns from DB
app.get("/api/campaigns", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM campaigns");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Run cron every 15 minutes
cron.schedule("*/15 * * * *", fetchAndStoreCampaigns);

// Initial fetch on server start
fetchAndStoreCampaigns();


//  ^|^e Start Server
app.listen(PORT, () => {
  console.log(` ^|^e Server running on http://localhost:${PORT}`);
  initDB(); // Connect to DB after server starts
});