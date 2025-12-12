import axios from "axios";

export async function hydraSearch(query) {
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
    console.error(
      "HydraSearch Google Error:",
      err.response?.data || err.message
    );
    return [];
  }
}
