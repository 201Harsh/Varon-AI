import ModelVaronAI from "../logic/VaronAI.js";

const socketVaron = ({ io }) => {
  return io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("client-message", (msg) => {
      console.log("Client says:", msg);
      ModelVaronAI({ prompt: msg }).then((res) => {
        socket.emit("server-reply", res);
      });
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
    });
  });
};

export default socketVaron;
