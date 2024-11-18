import mongoose from "mongoose";

const operatorSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		companyName: {
			type: String,
			required: true,
		},
		number: {
			type: String,
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordTokens: String,
		resetPasswordExpiresAt: Date,
		verificationTokens: String,
		verificationTokensExpiresAt: Date,
	},
	{ timestamps: true }
);

export const Operator = mongoose.model("Operator", operatorSchema);

export default Operator;