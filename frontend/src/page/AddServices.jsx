import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import CreateProductForm from "../component/CreateProductForm";

import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AddServices = () => {
	const [activeTab, setActiveTab] = useState("create");

	return (
		<div className='min-h-screen flex flex-col sm:flex-row'>
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<div className='flex-1 relative overflow-hidden'>
				{/* Header */}
				<Header />

				<div className='relative z-10 container mx-auto px-4 py-8 sm:py-16'>
					<motion.h1
						className='text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-emerald-400 text-center'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						Admin Dashboard
					</motion.h1>

					{/* Tabs for navigation */}
					<div className='flex justify-center mb-6 sm:mb-8 space-x-2 sm:space-x-4 overflow-x-auto sm:overflow-hidden'>
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 whitespace-nowrap ${
									activeTab === tab.id
										? "bg-emerald-600 text-white"
										: "bg-gray-700 text-gray-300 hover:bg-gray-600"
								}`}
							>
								<tab.icon className='mr-2 h-5 w-5' />
								{tab.label}
							</button>
						))}
					</div>

					{/* Render Create Product Form */}
					{activeTab === "create" && <CreateProductForm />}
				</div>
			</div>
		</div>
	);
};

export default AddServices;
