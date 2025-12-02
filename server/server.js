import "./dotenv.js";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import ConnectToDB from "./config/db.js";
import socketVaron from "./connections/socketVaron.js";
import { socketAuth } from "./middlewares/socketAuth.middleware.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addTool } from "./tools/tools.js";

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
    parameters: config.inputSchema || {},
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

VaronMcpServer.registerTool(
  addTool.name,
  {
    description: addTool.description,
    inputSchema: addTool.inputSchema,
  },
  addTool.execute
);

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_SIDE_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use(socketAuth);

socketVaron({ io });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Socket IO is Working ")
  console.log("MCP Server is Active")
  ConnectToDB();
});
