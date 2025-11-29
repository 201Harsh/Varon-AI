import jwt from "jsonwebtoken";

export function socketAuth(socket, next) {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("AUTH_REQUIRED"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error("INVALID_TOKEN"));
  }
}
