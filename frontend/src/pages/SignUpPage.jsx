import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [number, setNumber] = useState(""); // State for the number input
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name, number); // Pass number to signup function
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

	// Function to format phone number
	const formatPhoneNumber = (value) => {
		// Remove all non-digit characters
		const digits = value.replace(/\D/g, '');
		let formatted = '';

		if (digits.length > 0) {
			formatted += digits.slice(0, 3); // First 3 digits
		}
		if (digits.length > 3) {
			formatted += ' - ' + digits.slice(3, 6); // Next 3 digits
		}
		if (digits.length > 6) {
			formatted += ' - ' + digits.slice(6, 10); // Last 4 digits
		}
		return formatted.trim(); // Remove trailing spaces
	};

	const handleNumberChange = (e) => {
		const input = e.target.value;
		const formattedNumber = formatPhoneNumber(input);
		setNumber(formattedNumber);
	};

	const handleKeyDown = (e) => {
		// Allow Backspace and Delete keys for editing
		if (e.key === 'Backspace' || e.key === 'Delete') {
			e.preventDefault();
			const cursorPosition = e.target.selectionStart;
			const digits = number.replace(/\D/g, ''); // Get current digits only

			if (cursorPosition > 0) {
				const newDigits = digits.slice(0, cursorPosition - 1) + digits.slice(cursorPosition);
				setNumber(formatPhoneNumber(newDigits)); // Update state with new format
			}
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-4 sm:mx-auto' // Added mx-4 for mobile padding
		>
			<div className='p-6'> {/* Reduced padding */}
				<h2 className='text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-900 to-blue-600 text-transparent bg-clip-text'>
					Create Account
				</h2>

				<form onSubmit={handleSignUp}>
					<Input
						icon={User}
						type='text'
						placeholder='Full Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='text-sm' // Adjusted text size for input
					/>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='text-sm'
					/>
					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='text-sm'
					/>
					<Input
						icon={Phone} // Use Phone icon
						type='text' // Specify type as 'text' for better control
						placeholder='Phone Number'
						value={number}
						onChange={handleNumberChange} // Call the new handler for number formatting
						onKeyDown={handleKeyDown} // Call the key down handler for backspace/delete
						className='text-sm'
					/>
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					<PasswordStrengthMeter password={password} />

					<motion.button
						className='mt-4 w-full py-2 px-3 bg-gradient-to-r from-custom-blue to-blue-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-custom-blue
						hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
						focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className='animate-spin mx-auto' size={20} /> : "Sign Up"} {/* Reduced size */}
					</motion.button>
				</form>
			</div>
			<div className='px-6 py-3 bg-gray-900 bg-opacity-50 flex justify-center'> {/* Adjusted padding */}
				<p className='text-xs text-gray-400'> {/* Reduced font size */}
					Already have an account?{" "}
					<Link to={"/login"} className='text-blue-600 hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</motion.div>
	);
};

export default SignUpPage;
