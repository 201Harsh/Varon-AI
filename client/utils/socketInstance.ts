import { io } from "socket.io-client";

let socket: any;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: false,
      auth: {
        token: localStorage?.getItem("token") || "no token",
      },
    });
  }
  return socket;
};
