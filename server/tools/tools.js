export const addTool = {
  name: "add_numbers",
  config: {
    title: "Add Numbers",
    description: "Add two numbers together to calculate the sum.",
    parameters: {
      type: "object",
      properties: {
        a: {
          type: "number",
          description: "The first number to add",
        },
        b: {
          type: "number",
          description: "The second number to add",
        },
      },
      required: ["a", "b"],
    },
  },

  execute: async ({ a, b }) => {
    const sum = a + b;

    return {
      content: [
        { type: "text", text: `**The sum of ${a} and ${b} is ${sum} 🎉**` },
      ],
      structuredContent: { result: sum },
    };
  },
};
