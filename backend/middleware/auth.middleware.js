import { verifyTokens } from './verifyTokens.js';  // Import the verifyTokens middleware
import Operator from '../models/operator.model.js';

// Protect route middleware that uses verifyTokens to check JWT validity first
export const protectRoute = async (req, res, next) => {
  // First, use the verifyTokens middleware to check the validity of the token
  verifyTokens(req, res, async () => {
    try {
      // After token is verified, fetch operator from the database
      const operator = await Operator.findById(req.operatorId).select("-password");

      // If operator is not found, return Unauthorized
      if (!operator) {
        return res.status(401).json({ message: "Operator not found" });
      }

      // Attach the operator to the request object
      req.operator = operator;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.log("Error in protectRoute", error.message);
      return res.status(500).json({ message: "Server error" });
    }
  });
};
