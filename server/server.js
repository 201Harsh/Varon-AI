import "./dotenv.js";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import ConnectToDB from "./config/db.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_SIDE_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("client-message", (msg) => {
    console.log("Client says:", msg);
    socket.emit("server-reply", `Varon AI received: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectToDB();
});
