import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const VaronMcpServer = new McpServer({
  name: "Varon_AI_Server",
  version: "1.0.0",
});

VaronMcpServer._registeredTools = [];
VaronMcpServer._toolExecutors = new Map();

const originalRegisterTool = VaronMcpServer.registerTool.bind(VaronMcpServer);

VaronMcpServer.registerTool = function (name, config, execute) {
  this._registeredTools.push({
    name,
    description: config.description || "",
    parameters: config.parameters || {},
  });

  this._toolExecutors.set(name, execute);

  return originalRegisterTool(name, config, execute);
};

VaronMcpServer.getVaronRegisteredTools = function () {
  return this._registeredTools;
};

VaronMcpServer.getExecutor = function (name) {
  return this._toolExecutors.get(name);
};

export default VaronMcpServer;
