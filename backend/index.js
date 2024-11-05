import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js"; // Assuming this connects to your MongoDB
import authRoutes from "./routes/auth.route.js"; // User auth routes
import operatorAuthsRoutes from "./routes/auths.route.js"; // Operator auth routes
import { operatorConnectDB } from "./db/operatorConnectDB.js"; // Connect to operator DB

dotenv.config();
console.log("MONGO_URI: ", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 7000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests: req.body
app.use(cookieParser()); // allows us to parse incoming cookies

// Set up user and operator authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/auths", operatorAuthsRoutes); // Added route for operator authentication

// Production settings for serving frontend files
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Connect to both databases
app.listen(PORT, () => {
	connectDB(); // Connect to the main database
	operatorConnectDB(); // Connect to the operator database
	console.log("Server is running on port: ", PORT);
});
