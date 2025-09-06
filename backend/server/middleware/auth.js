import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization); // Debugging the Authorization header

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No Authorization header provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("No token found in Authorization header");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debugging the decoded token
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
export default authenticateToken;