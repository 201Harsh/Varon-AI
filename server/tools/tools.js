import BlackFire from "../utils/BlackFireNexus.js";
import BlackReplit from "../utils/BlackReplit.js";
import CobraAITool from "../utils/CobraAI.js";
import FluxAudit from "../utils/FluxAudit.js";
import { scrapeDuckDuckGo } from "../utils/HydraSearch.js";
import IronQuery from "../utils/IronQuery.js";
import NovaFlowTool from "../utils/NovaFlow.js";
import { scrapeWebPage } from "../utils/PhantomScraper.js";
import ViperStack from "../utils/ViperStack.js";

export const cobraAITool = {
  name: "CobraAI",

  config: {
    title: "Cobra AI — Frontend Code Generator and Teacher",
    description:
      "Generate complete frontend components, sections, UI layouts, pages, or full websites using Cobra AI's elite Next.js + React + Tailwind + GSAP + Framer Motion expertise. Cobra AI also teaches frontend engineering concepts, debugging, and best practices.",

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
          text: `🟡 **Cobra AI – Generated Code Successfully!**\n\n**Output:**\n${cobraOutput}`,
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
          .map(
            (r, i) =>
              `**${i + 1}. ${r.title}**\n🔗 [View HydraSearch Page](${
                r.link
              })\n📝${r.snippet}\n`
          )
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

export const viperCartTool = {
  name: "ViperCart",

  config: {
    title: "ViperCart — E-commerce Product Search",
    description:
      "Search for products on Amazon and other e-commerce sites using ViperCart. Returns top 10 product listings including clean titles, links, and descriptions. Bypasses blocking by using smart search proxies.",

    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "The product name to search for (e.g., 'iPhone 15 Case', 'Nike Shoes').",
        },
      },
      required: ["query"],
    },
  },

  execute: async ({ query }) => {
    try {
      const amazonQuery = `site:amazon.com  ${query}`;
      const results = await scrapeDuckDuckGo(amazonQuery);

      if (results.length === 0) {
        return {
          content: [{ type: "text", text: "No products found on Amazon." }],
          structuredContent: { query, results: [], status: "empty" },
        };
      }

      const cleanedResults = results.map((r) => {
        const cleanTitle = r.title
          .replace(/^Amazon\.com\s*[:|-]\s*/i, "")
          .replace(/\s*[:|-]\s*Amazon\.com$/i, "")
          .trim();

        return {
          ...r,
          title: cleanTitle,
        };
      });

      const formattedText =
        `🛒 **ViperCart — E-commerce Results for:** \`${query}\`\n\n` +
        cleanedResults
          .map(
            (r, i) =>
              `**${i + 1}. ${r.title}**\n🔗 [View Product](${r.link})\n📝 ${
                r.snippet
              }\n`
          )
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
          results: cleanedResults,
          count: cleanedResults.length,
          status: "success",
        },
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ ViperCart Error: Unable to fetch products for "${query}".`,
          },
        ],
        structuredContent: {
          query,
          results: [],
          error: error.message,
          status: "error",
        },
      };
    }
  },
};

export const novaFlowTool = {
  name: "NovaFlow",

  config: {
    title: "NovaFlow — Project Architecture & System Blueprinting",
    description:
      "Generate complete system blueprints, diagrams, workflows, and architecture plans using NovaFlow — the Master Architect of Varon AI.",

    parameters: {
      type: "object",
      properties: {
        plan: {
          type: "string",
          description:
            "Describe what NovaFlow should architect. A project idea, system concept, feature, product, or workflow.",
        },
      },
      required: ["plan"],
    },
  },

  execute: async ({ plan }) => {
    const blueprint = await NovaFlowTool({ plan });

    const output =
      `NovaFlow successfully generated an advanced multi-layer blueprint.\n\n` +
      `${blueprint}`;

    return {
      content: [
        {
          type: "text",
          text: `🧠 **NovaFlow – Architecture Blueprint Generated**\n\n${output}`,
        },
      ],
      structuredContent: {
        result: blueprint,
      },
    };
  },
};

export const IronQueryTool = {
  name: "IronQuery",

  config: {
    title: "IronQuery — Universal SQL & NoSQL Database Specialist",
    description:
      "IronQuery writes, analyzes, optimizes, explains, and teaches SQL & NoSQL queries. Supports MySQL, PostgreSQL, SQLite, MSSQL, MongoDB, Firebase, DynamoDB, Cassandra, and more. Ideal for query debugging, schema design, indexing strategies, and query-to-query translation.",

    parameters: {
      type: "object",
      properties: {
        task: {
          type: "string",
          enum: [
            "write_query",
            "optimize_query",
            "debug_query",
            "schema_design",
            "schema_optimize",
            "teach",
            "translate_sql_to_nosql",
            "translate_nosql_to_sql",
            "index_strategy",
            "comparison_sql_vs_nosql",
          ],
          description:
            "Type of task IronQuery should perform (query writing, debugging, schema design, teaching, etc.).",
        },

        database: {
          type: "string",
          enum: [
            "mysql",
            "postgresql",
            "sqlite",
            "mssql",
            "mongodb",
            "dynamodb",
            "cassandra",
            "firebase",
            "redis",
            "general",
          ],
          description:
            "Database type IronQuery should operate on. Defaults to 'general'.",
        },

        input: {
          type: "string",
          description:
            "The query, schema, description, or problem IronQuery should analyze or work on.",
        },

        context: {
          type: "string",
          description:
            "Optional additional details (tables, relationships, sample documents, error messages, etc.).",
        },
      },
      required: ["task", "input"],
    },
  },

  execute: async ({ task, database, input, context }) => {
    const result = await IronQuery({
      task,
      database,
      input,
      context,
    });

    const outputMessage = `IronQuery completed the task: ${task}\n\n${result}`;

    return {
      content: [
        {
          type: "text",
          text:
            `🟣 **IronQuery – Task Completed Successfully!**\n\n` +
            `**Task:** ${task}\n` +
            `**Database:** ${database || "general"}\n\n` +
            `**Output:**\n${outputMessage}`,
        },
      ],

      structuredContent: {
        result: outputMessage,
      },
    };
  },
};

export const fluxAuditTool = {
  name: "FluxAudit",

  config: {
    title: "FluxAudit — Enterprise-Grade Code Security Auditor",
    description:
      "FluxAudit analyzes, detects, explains, and fixes security vulnerabilities in any programming language. Supports JavaScript, TypeScript, Python, SQL, PHP, Java, C++, Rust, Go, Swift, and more. Ideal for full security audits, vulnerability detection, code hardening, and secure refactoring.",

    parameters: {
      type: "object",
      properties: {
        language: {
          type: "string",
          description:
            "The language of the code being analyzed. If unknown, FluxAudit will auto-detect.",
        },

        depth: {
          type: "string",
          enum: ["light", "medium", "full"],
          description:
            "How deeply FluxAudit should scan the code. Default is 'full'.",
        },

        code: {
          type: "string",
          description: "The code snippet or full file FluxAudit must audit.",
        },

        context: {
          type: "string",
          description:
            "Optional: Additional details about environment, frameworks, dependencies, or expected behavior.",
        },
      },
      required: ["code"],
    },
  },

  execute: async ({ code, language, depth, context }) => {
    const result = await FluxAudit({
      code,
      language,
      depth,
      context,
    });

    const outputMessage = `FluxAudit completed the audit.\n\n${result}`;

    return {
      content: [
        {
          type: "text",
          text:
            `🔻 **FluxAudit – Security Audit Complete**\n\n` +
            `**Language:** ${language || "auto"}\n` +
            `**Depth:** ${depth || "full"}\n\n` +
            `**Audit Output:**\n${outputMessage}`,
        },
      ],

      structuredContent: {
        result: outputMessage,
      },
    };
  },
};

export const blackReplitTool = {
  name: "BlackReplit",

  config: {
    title: "BlackReplit — Backend Systems Engineer",
    description:
      "BlackReplit builds, debugs, optimizes, and architects backend systems (Node.js, Express, FastAPI, Go, Rust, PHP, Java, microservices, APIs, authentication, security, deployments). Perfect for API creation, backend debugging, architecture planning, and teaching backend fundamentals.",

    parameters: {
      type: "object",
      properties: {
        task: {
          type: "string",
          description:
            "Type of backend work BlackReplit should perform (API creation, debugging, optimization, architecture, etc.).",
        },

        language: {
          type: "string",
          description:
            "Backend language/framework (Node.js, Express, FastAPI, Go, Rust, Laravel, Spring Boot, etc.).",
        },
      },
      required: ["task"],
    },
  },

  execute: async ({ task, language }) => {
    const result = await BlackReplit({
      task,
      language,
    });

    const outputMessage = `BlackReplit completed task: ${task}\n\n${result}`;

    return {
      content: [
        {
          type: "text",
          text:
            `🟦 **BlackReplit – Backend Task Completed Successfully!**\n\n` +
            `**Task:** ${task}\n` +
            `**Language:** ${language || "auto"}\n\n` +
            `**Output:**\n${outputMessage}`,
        },
      ],

      structuredContent: {
        result: outputMessage,
      },
    };
  },
};

export const phantomScraperTool = {
  name: "PhantomScraper",

  config: {
    title: "PhantomScraper — Stealth Web Reader",
    description:
      "Visit a specific URL using a Stealth Browser to bypass anti-bot protections and read content. Use this for scraping websites without being detected, or any protected site.",

    parameters: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description:
            "The full URL starting with http:// or https:// to scrape.",
        },
      },
      required: ["url"],
    },
  },

  execute: async ({ url }) => {
    try {
      if (!url.startsWith("http")) {
        return {
          content: [
            {
              type: "text",
              text: "❌ Error: URL must start with http:// or https://",
            },
          ],
        };
      }

      const pageContent = await scrapeWebPage(url);

      return {
        content: [
          {
            type: "text",
            text: pageContent,
          },
        ],
        structuredContent: {
          url,
          status: "success",
          length: pageContent.length,
        },
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ PhantomScraper Error: ${error.message}`,
          },
        ],
        structuredContent: {
          url,
          status: "error",
          error: error.message,
        },
      };
    }
  },
};

export const blackFireAITool = {
  name: "BlackFireAI",

  config: {
    title: "BlackFire AI — ML / DL / GenAI Master Instructor",
    description:
      "A dedicated teaching engine that explains, guides, and mentors users in Machine Learning, Deep Learning, and Generative AI. Provides structured lessons, concepts, architectures, code examples, intuitions, and step-by-step educational breakdowns.",

    parameters: {
      type: "object",
      properties: {
        input: {
          type: "string",
          description:
            "Raw ML content such as dataset samples, logs, architecture, metrics, training output, stack trace, or any ML-related data.",
        },
      },
      required: ["input"],
    },
  },

  execute: async ({ input }) => {
    try {
      const result = await BlackFire({ input });

      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
        structuredContent: {
          status: "success",
          length: result.length,
        },
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ BlackFireAI Error: ${error.message}`,
          },
        ],
        structuredContent: {
          status: "error",
          error: error.message,
        },
      };
    }
  },
};

export const viperStackTool = {
  name: "ViperStack",

  config: {
    title: "ViperStack — Python Systems Engineer & Automation Builder",
    description:
      "Write, debug, optimize, and teach Python scripts. Supports automation, APIs, backend functions, utilities, data processing, and step-by-step learning.",

    parameters: {
      type: "object",
      properties: {
        task: {
          type: "string",
          enum: [
            "write_script",
            "optimize_script",
            "debug_script",
            "explain_code",
            "teach_python",
            "convert_to_python",
            "build_api",
            "build_automation",
          ],
          description: "What ViperStack should do with Python.",
        },

        input: {
          type: "string",
          description:
            "The code, description, or problem you want ViperStack to work on.",
        },

        context: {
          type: "string",
          description:
            "Optional extra details such as goals, examples, or requirements.",
        },
      },
      required: ["task", "input"],
    },
  },

  execute: async ({ task, input, context }) => {
    const result = await ViperStack({
      task,
      input,
      context,
    });

    const outputText = `ViperStack completed the task: ${task}\n\n${result}`;

    return {
      content: [
        {
          type: "text",
          text:
            `🐍 **ViperStack – Task Completed Successfully!**\n\n` +
            `**Task:** ${task}\n\n` +
            `**Output:**\n${outputText}`,
        },
      ],
      structuredContent: {
        result: outputText,
      },
    };
  },
};
