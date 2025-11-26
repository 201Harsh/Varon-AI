import "./dotenv.js";
import app from "./app.js";
import http from "http";
import ConnectToDB from "./config/db.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectToDB();
});
