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
