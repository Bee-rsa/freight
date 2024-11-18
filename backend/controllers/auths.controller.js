import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokensAndSetCookie } from "../utils/generateTokensAndSetCookie.js";
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	sendVerificationEmails,
	sendWelcomeEmail,
} from "../mailtrap/email.js";
import { Operator } from "../models/operator.model.js";

export const operatorSignup = async (req, res) => {
	const { email, password, companyName, number } = req.body;

	try {
		if (!email || !password || !companyName || !number) {
			throw new Error("All fields are required");
		}

		const operatorAlreadyExists = await Operator.findOne({ email });
		console.log("operatorAlreadyExists", operatorAlreadyExists);

		if (operatorAlreadyExists) {
			return res.status(400).json({ success: false, message: "Operator already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationTokens = Math.floor(100000 + Math.random() * 900000).toString();

		const operator = new Operator({
			email,
			password: hashedPassword,
			companyName,
			number,
			verificationTokens,
			verificationTokensExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await operator.save();

		// jwt
		generateTokensAndSetCookie(res, operator._id);

		await sendVerificationEmails(operator.email, verificationTokens);

		res.status(201).json({
			success: true,
			message: "Operator created successfully",
			operator: {
				...operator._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const operatorVerifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const operator = await Operator.findOne({
			verificationTokens: code,
			verificationTokensExpiresAt: { $gt: Date.now() },
		});

		if (!operator) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		operator.isVerified = true;
		operator.verificationTokens = undefined;
		operator.verificationTokensExpiresAt = undefined;
		await operator.save();

		await sendWelcomeEmail(operator.email, operator.name);

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			operator: {
				...operator._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const operatorLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const operator = await Operator.findOne({ email });
		if (!operator) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, operator.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokensAndSetCookie(res, operator._id);

		operator.lastLogin = new Date();
		await operator.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			operator: {
				...operator._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const operatorLogout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const operator = await Operator.findOne({ email });

		if (!operator) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetTokens = crypto.randomBytes(20).toString("hex");
		const resetTokensExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		operator.resetPasswordTokens = resetTokens;
		operator.resetPasswordExpiresAt = resetTokensExpiresAt;

		await operator.save();

		// send email
		await sendPasswordResetEmail(operator.email, `${process.env.CLIENT_URL}/reset-password/${resetTokens}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { tokens } = req.params;
		const { password } = req.body;

		const operator = await Operator.findOne({
			resetPasswordTokens: tokens,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!operator) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		operator.password = hashedPassword;
		operator.resetPasswordTokens = undefined;
		operator.resetPasswordExpiresAt = undefined;
		await operator.save();

		await sendResetSuccessEmail(operator.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuths = async (req, res) => {
	try {
		const operator = await Operator.findById(req.operatorId).select("-password");
		if (!operator) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, operator });
	} catch (error) {
		console.log("Error in checkAuths ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

