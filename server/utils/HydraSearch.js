import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeDuckDuckGo(query) {
  try {
    const url = "https://html.duckduckgo.com/html/";

    const response = await axios.get(url, {
      params: { q: query },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://html.duckduckgo.com/",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
      },
    });

    const $ = cheerio.load(response.data);
    const results = [];

    $(".result").each((i, element) => {
      const title = $(element).find(".result__title .result__a").text().trim();
      const link = $(element).find(".result__title .result__a").attr("href");
      const snippet = $(element).find(".result__snippet").text().trim();

      if (title && link) {
        results.push({
          title,
          link,
          snippet,
        });
      }
    });

    return results.slice(0, 10);
  } catch (error) {
    console.error("Search Error:", error.message);
    return [];
  }
}
