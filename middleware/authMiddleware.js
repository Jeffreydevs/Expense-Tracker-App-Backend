const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({
      message: "Access denied"
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error("Auth error: JWT_SECRET is not configured");
    return res.status(500).json({
      message: "Server authentication is not configured"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;
