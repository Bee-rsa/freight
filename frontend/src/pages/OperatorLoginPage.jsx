import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthsStore } from "../store/authsStore";

const OperatorLoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate(); // Step 1: Get the navigate function

	const { operatorLogin, isLoading, error } = useAuthsStore();

	const handleOperatorLogin = async (e) => {
		e.preventDefault();
		const success = await operatorLogin(email, password);
		if (success) {
			navigate("/overview");
		} else {
			// Handle login failure, e.g., show an error message
		}
	};

	return (
		<div
		  className="min-h-screen w-full flex justify-center items-center"
		  style={{
			backgroundImage: "linear-gradient(135deg, #1B2E52 0%, #5185AB 100%)", // Gradient background
		  }}
		>
		  <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
		  >
			<div className="p-8 sm:p-6">
			  <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-700 to-blue-900 text-transparent bg-clip-text">
				Welcome Back
			  </h2>
	
			  <form onSubmit={handleOperatorLogin}>
				<Input
				  icon={Mail}
				  type="email"
				  placeholder="Email Address"
				  value={email}
				  onChange={(e) => setEmail(e.target.value)}
				/>
	
				<Input
				  icon={Lock}
				  type="password"
				  placeholder="Password"
				  value={password}
				  onChange={(e) => setPassword(e.target.value)}
				/>
	
				<div className="flex items-center mb-6">
				  <Link to="/forgot-password" className="text-sm text-blue-400 hover:underline">
					Forgot password?
				  </Link>
				</div>
				{error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
	
				<motion.button
				  whileHover={{ scale: 1.02 }}
				  whileTap={{ scale: 0.98 }}
				  className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-custom-blue text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-custom-blue focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
				  type="submit"
				  disabled={isLoading}
				>
				  {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
				</motion.button>
			  </form>
			</div>
			<div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
			  <p className="text-sm text-gray-400">
				Don&apos;t have an account?{" "}
				<Link to="/operator-signup" className="text-blue-400 hover:underline">
				  Sign up
				</Link>
			  </p>
			</div>
		  </motion.div>
		</div>
	  );
	};
	
	export default OperatorLoginPage;
	