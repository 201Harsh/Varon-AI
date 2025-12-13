import axios from "axios";
import { getJson } from "serpapi";

export async function hydraSearchUsingGoogle(query) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/customsearch/v1",
      {
        params: {
          key: process.env.GOOGLE_SEARCH_API_KEY,
          cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
          q: query,
        },
      }
    );

    const items = response.data.items || [];

    const results = items.map((item) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet || "",
      displayLink: item.displayLink || "",
    }));

    return results.slice(0, 10);
  } catch (err) {
    return [];
  }
}

export async function hydraSearch(query) {
  try {
    const response = await getJson("google", {
      q: query,
      api_key: process.env.SERPAPI_KEY,
      hl: "en",
      gl: "in",
    });

    const results = [];

    if (response.organic_results) {
      response.organic_results.slice(0, 12).forEach((r) => {
        results.push({
          title: r.title,
          link: r.link,
          snippet: r.snippet || r.snippet_highlighted_words?.join(" ") || "",

          displayLink:
            r.displayed_link || (r.link ? new URL(r.link).hostname : ""),

          source: "google",
        });
      });
    }

    if (response.answer_box) {
      results.push({
        title: response.answer_box.title,
        snippet:
          response.answer_box.answer || response.answer_box.snippet || "",
        link: response.answer_box.link,
        displayLink: response.answer_box.link
          ? new URL(response.answer_box.link).hostname
          : "",
        source: "google-answer-box",
      });
    }

    if (response.related_questions) {
      response.related_questions.slice(0, 5).forEach((q) => {
        results.push({
          title: q.question,
          snippet: q.snippet || "",
          link: q.link || "",
          displayLink: q.link ? new URL(q.link).hostname : "Hydra Search",
          source: "google-related",
        });
      });
    }

    return results;
  } catch (err) {
    return [
      {
        title: "Search Failed",
        link: "",
        snippet: "HydraSearch could not fetch results. Error: " + err.message,
        displayLink: "",
      },
    ];
  }
}
