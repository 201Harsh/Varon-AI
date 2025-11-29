const socketVaron = ({ io }) => {
  return io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("client-message", (msg) => {
      console.log("Client says:", msg);
      socket.emit("server-reply", `Varon AI received: ${msg}`);
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
    });
  });
};

export default socketVaron;
