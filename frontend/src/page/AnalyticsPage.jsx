import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";  // Import the Sidebar component

import OverviewCards from "../component/analytics/OverviewCards";
import RevenueChart from "../component/analytics/RevenueChart";
import ChannelPerformance from "../component/analytics/ChannelPerformance";
import ProductPerformance from "../component/analytics/ProductPerformance";
import UserRetention from "../component/analytics/UserRetention";
import CustomerSegmentation from "../component/analytics/CustomerSegmentation";
import AIPoweredInsights from "../component/analytics/AIPoweredInsights";

const AnalyticsPage = () => {
	return (
		<div className='flex h-screen w-full overflow-hidden bg-white'>
			{/* Sidebar */}
			<Sidebar />  {/* Sidebar component placed here */}

			<div className='flex-1 overflow-auto font-poppins relative z-10 w-full'>
				{/* Header */}
				<Header title={"Analytics Dashboard"} />

				{/* Main content */}
				<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
					<OverviewCards />
					<RevenueChart />

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
						<ChannelPerformance />
						<ProductPerformance />
						<UserRetention />
						<CustomerSegmentation />
					</div>

					<AIPoweredInsights />
				</main>
			</div>
		</div>
	);
};

export default AnalyticsPage;
