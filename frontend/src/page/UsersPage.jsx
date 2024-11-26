import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../component/common/Header";
import StatCard from "../component/common/StatCard";
import UsersTable from "../component/users/UsersTable";
import UserGrowthChart from "../component/users/UserGrowthChart";
import UserActivityHeatmap from "../component/users/UserActivityHeatmap";
import UserDemographicsChart from "../component/users/UserDemographicsChart";
import Sidebar from "../component/common/Sidebar"; // Import the Sidebar component

const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};

const UsersPage = () => {
	return (
		<div className='flex h-screen w-full overflow-hidden bg-white'>
			{/* Sidebar */}
			<Sidebar /> {/* Add Sidebar component here */}

			<div className='flex-1 flex flex-col overflow-y-auto'>
				{/* Header */}
				<Header title='Users' />

				<main className='max-w-7xl font-poppins mx-auto py-6 px-4 lg:px-8'>
					{/* STATS */}
					<motion.div
						className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1 }}
					>
						<StatCard
							name='Total Users'
							icon={UsersIcon}
							value={userStats.totalUsers.toLocaleString()}
							color='#6366F1'
						/>
						<StatCard name='New Users Today' icon={UserPlus} value={userStats.newUsersToday} color='#10B981' />
						<StatCard
							name='Active Users'
							icon={UserCheck}
							value={userStats.activeUsers.toLocaleString()}
							color='#F59E0B'
						/>
						<StatCard name='Churn Rate' icon={UserX} value={userStats.churnRate} color='#EF4444' />
					</motion.div>

					<UsersTable />

					{/* USER CHARTS */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
						<UserGrowthChart />
						<UserActivityHeatmap />
						<UserDemographicsChart />
					</div>
				</main>
			</div>
		</div>
	);
};
export default UsersPage;
