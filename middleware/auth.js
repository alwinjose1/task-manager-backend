const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // Get token from header
  const token = req.header("Authorization")?.split(" ")[1]; // expects "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user id to request
    next(); // continue to the route
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
