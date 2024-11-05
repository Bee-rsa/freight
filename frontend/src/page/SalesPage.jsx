import { motion } from "framer-motion";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar"; // Adjust the import path as needed
import StatCard from "../component/common/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../component/sales/SalesOverviewChart";
import SalesByCategoryChart from "../component/sales/SalesByCategoryChart";
import DailySalesTrend from "../component/sales/DailySalesTrend";

const salesStats = {
	totalRevenue: "$1,234,567",
	averageOrderValue: "$78.90",
	conversionRate: "3.45%",
	salesGrowth: "12.3%",
};

const SalesPage = () => {
	return (
		<div className='flex flex-row h-screen w-full'>
			<Sidebar /> {/* Render the sidebar on the left */}
			<div className='flex-1 overflow-auto relative z-10 w-full'> {/* Allow the header and main content to take remaining space */}
				<Header title='Sales Dashboard' />

				<main className='max-w-7xl font-poppins mx-auto py-6 px-4 lg:px-8'>
					{/* SALES STATS */}
					<motion.div
						className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
					>
						<StatCard name='Total Revenue' icon={DollarSign} value={salesStats.totalRevenue} color='#6366F1' />
						<StatCard
							name='Avg. Order Value'
							icon={ShoppingCart}
							value={salesStats.averageOrderValue}
							color='#10B981'
						/>
						<StatCard
							name='Conversion Rate'
							icon={TrendingUp}
							value={salesStats.conversionRate}
							color='#F59E0B'
						/>
						<StatCard name='Sales Growth' icon={CreditCard} value={salesStats.salesGrowth} color='#EF4444' />
					</motion.div>

					<SalesOverviewChart />

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
						<SalesByCategoryChart />
						<DailySalesTrend />
					</div>
				</main>
			</div>
		</div>
	);
};
export default SalesPage;
