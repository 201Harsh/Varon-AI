import "./dotenv.js";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import ConnectToDB from "./config/db.js";
import socketVaron from "./connections/socketVaron.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_SIDE_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketVaron({ io });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectToDB();
});
