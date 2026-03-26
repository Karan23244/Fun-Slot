// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });

//   await new Promise(resolve => setTimeout(resolve, 3000));

//   const url = page.url();
//   console.log("Redirected to:", url);

//   await browser.close();
// })();

// File: test-googlebot.js
// File: test-advanced-googlebot.js
// File: test-advanced-googlebot.js
// File: test-advanced-googlebot.js
// File: test-advanced-googlebot.js
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Spoof Googlebot UA
  await page.setUserAgent(
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
  );

  // Fake out navigator properties
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    window.chrome = { runtime: {} };
    Object.defineProperty(navigator, "plugins", { get: () => [1, 2, 3] });
    Object.defineProperty(navigator, "languages", { get: () => ["en-US", "en"] });
  });

  // Go to your site
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });

  // Simulate human interaction _during_ the 3 sec window
  page.mouse.move(50, 50, { steps: 5 });
  page.mouse.move(200, 150, { steps: 8 });
  await page.evaluate(() => window.scrollBy(0, window.innerHeight / 2));

  // ← Replace waitForTimeout:
  await new Promise((resolve) => setTimeout(resolve, 4000));

  console.log("Redirected to:", page.url());
  await browser.close();
})();
