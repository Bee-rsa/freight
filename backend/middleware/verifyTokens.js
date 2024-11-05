import jwt from "jsonwebtoken";

export const verifyTokens = (req, res, next) => {
	const tokens = req.cookies.tokens;
	if (!tokens) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(tokens, process.env.JWT_SECRET);

		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

		req.operatorId = decoded.operatorId;
		next();
	} catch (error) {
		console.log("Error in verifyTokens ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};
