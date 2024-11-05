import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users, LogOut } from "lucide-react"; 
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthsStore } from "../../store/authsStore.js"; // Adjust the import path as necessary

const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/overview",
	},
	{ name: "My Services", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
	{ name: "Users", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
	{ name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const { operatorLogout } = useAuthsStore(); // Get the logout function from the auth store

	const handleLogout = async () => {
		try {
			await operatorLogout(); // Call the logout function
			// Optionally, you can add navigation to the login page or show a message
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	return (
		<motion.div
			className={`relative z-10 transition-all text-white duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-custom-blue bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700 font-poppins'> {/* Add font-poppins class */}
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm  font-poppins text-white font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
				
				{/* Logout Button */}
				<motion.div 
					className='flex items-center p-4 text-sm font-poppins text-white font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer'
					onClick={handleLogout}
				>
					<LogOut size={20} style={{ color: "#FCA5A1", minWidth: "20px" }} />
					<AnimatePresence>
						{isSidebarOpen && (
							<motion.span
								className='ml-4 whitespace-nowrap'
								initial={{ opacity: 0, width: 0 }}
								animate={{ opacity: 1, width: "auto" }}
								exit={{ opacity: 0, width: 0 }}
								transition={{ duration: 0.2, delay: 0.3 }}
							>
								Logout
							</motion.span>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Sidebar;
