import jwt from "jsonwebtoken";

export const generateTokensAndSetCookie = (res, operatorId) => {
	const tokens = jwt.sign({ operatorId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("tokens", tokens, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return tokens;
};
