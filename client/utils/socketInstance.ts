import { redirect } from "next/navigation";
import { io } from "socket.io-client";

let socket: any;

export const getSocket = (SocketToken: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: false,
      auth: {
        token: SocketToken,
      },
    });
  }

  socket.on("connect_error", (err: any) => {
    console.log("Connection failed:", err.message);

    if (err.message === "AUTH_REQUIRED") {
      redirect("/login");
    }
  });

  return socket;
};
