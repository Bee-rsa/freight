import jwt from 'jsonwebtoken';

// Token verification middleware
const verifyTokens = (req, res, next) => {
  const tokens = req.cookies.tokens;
  
  // Check if the token exists in cookies
  if (!tokens) {
    return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(tokens, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }

    // Attach operatorId from the decoded token to the request object
    req.operatorId = decoded.operatorId;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log("Error in verifyTokens", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { verifyTokens };
