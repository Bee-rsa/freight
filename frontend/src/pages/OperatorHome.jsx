import { Link } from "react-router-dom";
import { useAuthsStore } from "../store/authsStore"; // Adjust the path as needed
import Header from "../components/Header"; // Adjust the path as necessary
import Footer from "../components/Footer"; // Adjust the path as necessary

const OperatorHome = () => {
    // Get the logout function from the auth store
    const { operatorLogout } = useAuthsStore();

    // Dummy username for the welcome message
    const operatorname = "Operator"; // Replace with actual user data as needed

    const handleLogout = async () => {
        try {
            await operatorLogout(); // Call the logout function
            // Optionally, you can redirect or show a message after logging out
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Header /> {/* Add the Header component here */}

            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Welcome, {operatorname}!</h1>
                <p className="text-lg mb-8">This is your home page. Here’s what you can do:</p>
                
                <div className="space-y-4">
                    <Link
                        to="/profile"
                        className="block py-3 px-6 bg-green-600 rounded-lg text-center hover:bg-green-700 transition"
                    >
                        View Profile
                    </Link>
                    <Link
                        to="/dashboard"
                        className="block py-3 px-6 bg-blue-600 rounded-lg text-center hover:bg-blue-700 transition"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        to="/settings"
                        className="block py-3 px-6 bg-purple-600 rounded-lg text-center hover:bg-purple-700 transition"
                    >
                        Account Settings
                    </Link>
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="block py-3 px-6 bg-red-600 rounded-lg text-center hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <Footer /> {/* Add the Footer component here */}
        </div>
    );
};

export default OperatorHome;
