import { motion } from "framer-motion";
import Input from "../components/Input";
import { Mail, User, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BusinessHubSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      console.log("Sign Up data:", { firstName, lastName, email, phone, company, message, consent });
      navigate("/operator-verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex items-center justify-center"
    >
      <div className="max-w-sm w-full bg-gray-800 backdrop-filter backdrop-blur-xl rounded-xl mx-4">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-3 text-center bg-gradient-to-r from-blue-900 to-blue-600 text-transparent bg-clip-text">
            Create Business Account
          </h2>

          <form onSubmit={handleSignUp}>
            <Input
              icon={User}
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-sm"
            />

            <Input
              icon={User}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="text-sm"
            />

            <Input
              icon={Mail}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm"
            />

            <Input
              icon={Phone}
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-sm"
            />

            <Input
              icon={User}
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="text-sm"
            />

            <textarea
              placeholder="Enter your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-2 h-40 p-2 text-black border border-gray-300 rounded-md text-sm"
            />

            <div className="mt-3 flex items-center">
              <input
                type="checkbox"
                checked={consent}
                onChange={() => setConsent(!consent)}
                className="mr-2"
              />
              <label className="text-xs text-gray-400">
                I consent for Cargo Connect to maintain this information to handle my contact request and to inform me about industry updates.
              </label>
            </div>

            <motion.button
              className="mt-4 w-full py-2 px-3 bg-gradient-to-r from-custom-blue to-blue-600 text-white 
                font-bold rounded-md shadow-md hover:from-custom-blue hover:to-blue-700 focus:outline-none
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
              Sign Up
            </motion.button>
          </form>
        </div>
        <div className="px-4 py-2 bg-gray-900 bg-opacity-50 text-center">
          <p className="text-xs text-gray-400">
            Already have an account?{" "}
            <Link to={"/operator-login"} className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessHubSignUp;
