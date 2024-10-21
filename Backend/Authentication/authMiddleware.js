const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(400).send("Invalid token format.");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).send("Invalid token.");
  }
};

module.exports = auth;
