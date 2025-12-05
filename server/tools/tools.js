import CobraAITool from "../utils/CobraAI.js";
import { scrapeDuckDuckGo } from "../utils/HydraSearch.js";

export const cobraAITool = {
  name: "CobraAI_Website_Builder",

  config: {
    title: "Cobra AI Frontend Builder",
    description:
      "Generate complete frontend components, sections, UI layouts, pages, or full websites using Cobra AI's elite Next.js + React + Tailwind + GSAP + Framer Motion expertise.",

    parameters: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description:
            "Describe the frontend you want Cobra AI to build (UI, animations, components, layout, full website, section, etc.).",
        },
        framework: {
          type: "string",
          enum: ["nextjs", "react"],
          description:
            "Choose the framework Cobra AI should build in. Defaults to Next.js.",
        },
        animation: {
          type: "string",
          enum: ["gsap", "framer-motion", "none"],
          description:
            "Select animation style Cobra AI should use. Defaults to Framer Motion.",
        },
        colorTheme: {
          type: "string",
          description:
            "Optional: Describe a color palette or theme (neon, premium, pastel, gradient, dark mode, etc.).",
        },
      },
      required: ["prompt"],
    },
  },

  execute: async ({ prompt }) => {
    const CObraAI = await CobraAITool({ prompt });

    const cobraOutput = `Cobra AI successfully generated Code ${CObraAI} `;

    return {
      content: [
        {
          type: "text",
          text: `🟡 **Cobra AI – Generated Code Successfully!\n\n**Output:**\n${cobraOutput}`,
        },
      ],

      structuredContent: {
        result: cobraOutput,
      },
    };
  },
};

export const hydraSearchTool = {
  name: "HydraSearch",

  config: {
    title: "HydraSearch — Web Research Engine",
    description:
      "Perform fast and reliable web research using Hydra Search Created for Varon AI. Returns top 10 results including title, link, and snippet.",

    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query HydraSearch should research.",
        },
      },
      required: ["query"],
    },
  },

  execute: async ({ query }) => {
    try {
      const results = await scrapeDuckDuckGo(query);

      const formattedText =
        `🟣 **HydraSearch — Results for:** \`${query}\`\n\n` +
        results
          .map((r, i) => `**${i + 1}. ${r.title}**\n${r.link}\n${r.snippet}\n`)
          .join("\n");

      return {
        content: [
          {
            type: "text",
            text: formattedText,
          },
        ],

        structuredContent: {
          query,
          results,
        },
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ HydraSearch Error: Unable to fetch results for "${query}".`,
          },
        ],
        structuredContent: {
          query,
          results: [],
          error: error.message,
        },
      };
    }
  },
};
