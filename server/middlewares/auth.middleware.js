import jwt from "jsonwebtoken";

const AuthUser = (req, res, next) => {
  try {
    const token =
      req.cookies.token_id_user || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized Access. Please Login First !",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export default AuthUser;
