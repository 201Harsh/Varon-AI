import puppeteer from "puppeteer-extra";
import { executablePath } from "puppeteer"; // <--- IMPORT THIS
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import * as cheerio from "cheerio";
import PhantomSummarizer from "./PhantomScrapeSummerizer.js";

puppeteer.use(StealthPlugin());

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight || totalHeight > 5000) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

async function scrapeSinglePage(browser, url) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    await autoScroll(page);

    const html = await page.content();
    const $ = cheerio.load(html);

    $(
      "script, style, nav, footer, header, aside, iframe, noscript, svg"
    ).remove();
    $(".ad, .ads, .advertisement, .cookie-banner, .popup").remove();

    let contentContainer = $("main");
    if (contentContainer.length === 0) contentContainer = $("article");
    if (contentContainer.length === 0) contentContainer = $("body");

    let textContent = "";
    const title = $("title").text().trim();
    textContent += `# ${title}\n\n`;

    contentContainer.find("h1, h2, h3, p, li").each((i, el) => {
      const text = $(el).text().trim();
      if (text) textContent += `${text}\n`;
    });

    // Extract Internal Links
    const domain = new URL(url).hostname;
    const links = new Set();
    $("a").each((i, el) => {
      const href = $(el).attr("href");
      if (href && (href.startsWith("/") || href.includes(domain))) {
        try {
          const absoluteUrl = new URL(href, url).href;
          links.add(absoluteUrl);
        } catch (e) {}
      }
    });

    return { text: textContent, links: Array.from(links) };
  } catch (e) {
    return { text: "", links: [] };
  } finally {
    // Ensure the page is closed even if errors occur to save memory
    if (page && !page.isClosed()) await page.close();
  }
}

/**
 * @param {string} startUrl
 * @returns {Promise<string>}
 */
async function scrapeWebPage(startUrl) {
  let browser;
  try {
    // 1. Detect Environment
    const isProduction = process.env.NODE_ENV === "production";

    // 2. Define Base Arguments (Safe for both)
    const launchArgs = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ];

    // 3. Add Linux-Specific Arguments (CRITICAL FIX)
    // We ONLY add '--single-process' if we are on Render.
    // Adding this on Windows is what caused your crash.
    if (isProduction) {
      launchArgs.push("--single-process");
    }

    browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      // Logic: Use system path on Render, auto-detect on Local
      executablePath: isProduction
        ? process.env.PUPPETEER_EXECUTABLE_PATH || executablePath()
        : executablePath(),
      args: launchArgs,
    });

    const MAX_PAGES = 5;
    const visited = new Set();
    const queue = [startUrl];
    let combinedContent = "";

    while (queue.length > 0 && visited.size < MAX_PAGES) {
      const currentUrl = queue.shift();

      if (visited.has(currentUrl)) continue;
      visited.add(currentUrl);

      const { text, links } = await scrapeSinglePage(browser, currentUrl);

      if (text) {
        combinedContent += `\n\n--- PAGE SOURCE: ${currentUrl} ---\n${text}`;
      }

      for (const link of links) {
        if (!visited.has(link)) queue.push(link);
      }
    }

    const safePayload = combinedContent;

    const PhantomSummarizerResult = await PhantomSummarizer({
      RawOutp: safePayload,
    });
    return PhantomSummarizerResult + safePayload;
  } catch (error) {
    console.error("Scraping failed:", error); // Added clearer logging
    throw new Error(`Browser Error: ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

export { scrapeWebPage };
