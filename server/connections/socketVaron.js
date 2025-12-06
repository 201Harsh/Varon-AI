import ModelVaronAI from "../logic/VaronAI.js";
import UserModel from "../models/user.model.js";

const socketVaron = async ({ io }) => {
  return io.on("connection", async (socket) => {
    const UserId = socket.user.id;

    const User = await UserModel.findById(UserId);
    if (!User) {
      console.log("User not found for socket connection", socket.id);
      return socket.disconnect();
    }

    console.log("a user connected", socket.id);

    const hour = new Date().getHours();
    let greet;

    if (hour < 12) greet = "Good Morning";
    else if (hour < 17) greet = "Good Afternoon";
    else if (hour < 21) greet = "Good Evening";
    else greet = "Good Night";

    socket.emit(
      "server-reply",
      `${greet}, **${User.name}!** 👋\n\n` +
        "Hello! I'm 👑 Varon AI — your smart multi-agent assistant.\n" +
        "I can help you with 🔍 research, 💻 coding, 📝 content, ⚙️ automation, 🎨 UI ideas, 🛒 product search, and much more 🤖.\n\n" +
        "Tell me — what can I do for you today? 🚀"
    );

    socket.on("client-message", async (msg) => {
      if (!socket.user) {
        console.log("User not Authneticated");
        return socket.emit(
          "server-reply",
          "Please login or register first for Live Chat with Varon AI."
        );
      }

      ModelVaronAI({ prompt: msg, socket, User }).then((res) => {
        socket.emit("server-reply", res);
      });
    });

    socket.on("disconnect", async () => {
      console.log("a user disconnected", socket.id);
    });
  });
};

export default socketVaron;
