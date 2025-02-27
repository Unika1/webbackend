import jwt from 'jsonwebtoken';
const { verify, decode } = jwt;

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(" ")[1]; // Remove "Bearer "
  
  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Decode without verifying (to check if the token is correct)
  const decodedData = decode(token, { complete: true });
  console.log("Decoded Token:", decodedData);

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    console.log("Token Verified:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Verification Failed:", error.message);
    res.status(400).json({ error: 'Invalid token.' });
  }
};
const isAdmin = (req, res, next) => {
  console.log("👤 User Data:", req.user); // Debugging line

  if (!req.user.role) {
    return res.status(403).json({ error: "Access denied. Role not found in token." });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  next();
};
export { authenticate, isAdmin };
