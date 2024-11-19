import { PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";


import CreateProductForm from "../component/CreateProductForm";
import ProductsList from "../component/ProductsList";
import { useProductStore } from "../store/authsStore.js";

import Header from "../component/common/Header"; // Import Header
import Sidebar from "../component/common/Sidebar"; // Import Sidebar

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className="flex h-screen w-full overflow-hidden bg-white">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-y-auto">
				{/* Header */}
				<Header />

				{/* Page Content */}
				<div className="relative z-10 container mx-auto px-4 py-8 sm:py-16">

					{/* Tabs for navigation */}
					<div className="flex justify-center mt-16 mb-6 sm:mb-8 space-x-2 items-center sm:space-x-4 overflow-x-auto sm:overflow-hidden">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
									activeTab === tab.id
										? "bg-emerald-600 text-white"
										: "bg-gray-700 text-gray-300 hover:bg-gray-600"
								}`}
							>
								<tab.icon className="mr-2 h-5 w-5" />
								{tab.label}
							</button>
						))}
					</div>

					{/* Render content based on active tab */}
					{activeTab === "create" && <CreateProductForm />}
					{activeTab === "products" && <ProductsList />}
				</div>
			</div>
		</div>
	);
};

export default AdminPage;
