import "./dotenv.js";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import ConnectToDB from "./config/db.js";
import socketVaron from "./connections/socketVaron.js";
import { socketAuth } from "./middlewares/socketAuth.middleware.js";
import { cobraAITool, hydraSearchTool, viperCartTool } from "./tools/tools.js";
import VaronMcpServer from "./connections/VaronMcpServer.js";

VaronMcpServer.registerTool(
  cobraAITool.name,
  cobraAITool.config,
  cobraAITool.execute
);

VaronMcpServer.registerTool(
  hydraSearchTool.name,
  hydraSearchTool.config,
  hydraSearchTool.execute
);

VaronMcpServer.registerTool(
  viperCartTool.name,
  viperCartTool.config,
  viperCartTool.execute
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
  console.log("Socket IO is Working ");
  console.log("MCP Server is Active");
  ConnectToDB();
});
