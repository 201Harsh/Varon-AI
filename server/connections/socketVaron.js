import ModelVaronAI from "../logic/VaronAI.js";

const socketVaron = ({ io }) => {
  return io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.emit(
      "server-reply",
      "Hi! I'm 👑 Varon AI,\n" +
        "your personal AI assistant 👩🏻‍💻✨.\n\n" +
        "I can help you with real-world tasks like:\n" +
        "🔍 Researching anything you need\n" +
        "📝 Drafting content & generating ideas\n" +
        "📅 Planning projects & organizing workflows\n" +
        "💻 Solving coding problems & debugging\n" +
        "⚙️ Automating your daily tasks using my team of specialist AIs 🤝\n\n" +
        "Tell me — what would you like to do today? ❤️‍🔥"
    );

    socket.on("client-message", (msg) => {
      if (!socket.user) {
        console.log("User not Authneticated");
        return socket.emit(
          "server-reply",
          "Please login or register first for Live Chat with Varon AI."
        );
      }

      ModelVaronAI({ prompt: msg , socket }).then((res) => {
        socket.emit("server-reply", res);
      });
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
    });
  });
};

export default socketVaron;
