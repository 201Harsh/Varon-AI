import { z } from "zod";

export const addTool = {
  name: "add_numbers",
  config: {
    title: "Add Numbers",
    description: "Add two numbers together to calculate the sum.",
    inputSchema: {
      a: z.number().describe("The first number"),
      b: z.number().describe("The second number"),
    },
    outputSchema: {
      result: z.number().describe("The calculated sum"),
    },
  },

  execute: async ({ a, b }) => {
    const sum = a + b;

    return {
      content: [{ type: "text", text: `The sum of ${a} and ${b} is ${sum}` }],
      structuredContent: { result: sum },
    };
  },
};
