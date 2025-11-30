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

  return socket;
};
