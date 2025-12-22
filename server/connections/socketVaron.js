import ModelVaronAI from "../logic/VaronAI.js";
import UserModel from "../models/user.model.js";

const socketVaron = async ({ io }) => {
  return io.on("connection", async (socket) => {
    const UserId = socket.user.id;

    const User = await UserModel.findById(UserId);
    if (!User) {
      return socket.disconnect();
    }

    if (User.vtoken <= 0) {
      return socket.emit(
        "server-reply",
        "⚠️ **Token Limit Exceeded**\n\n" +
          "You've reached your current usage limit 💳.\n" +
          "Upgrade your plan to continue chatting with 👑 **Varon AI** without interruptions.\n\n" +
          "✨ Smarter. Faster. Unlimited."
      );
    }

    const hour = new Date().getHours();
    let greet;

    if (hour < 12) greet = "Good Morning!";
    else if (hour < 17) greet = "Good Afternoon!";
    else if (hour < 21) greet = "Good Evening!";
    else greet = "Batman Night!";

    socket.emit(
      "server-reply",
      `${greet}, **${User.name}!** 👋\n\n` +
        "Hello! I'm 👑 Varon AI — your smart multi-agent assistant.\n" +
        "I can help you with 🔍 research, 💻 coding, 📝 content, ⚙️ automation, 🎨 UI ideas, 🛒 product search, and much more 🤖.\n\n" +
        "Tell me — what can I do for you today? 🚀"
    );

    socket.on("client-message", async ({ inputMessage: msg, messages }) => {
      if (!socket.user) {
        return socket.emit(
          "server-reply",
          "Please login or register first for Live Chat with Varon AI."
        );
      }

      ModelVaronAI({ prompt: msg, socket, User, messages });
      User.vtoken -= 1;
      await User.save();
    });

    socket.on("disconnect", async () => {});
  });
};

export default socketVaron;
