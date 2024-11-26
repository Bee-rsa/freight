import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../component/common/Header";
import StatCard from "../component/common/StatCard";
import SalesOverviewChart from "../component/overview/SalesOverviewChart";
import CategoryDistributionChart from "../component/overview/CategoryDistributionChart";
import SalesChannelChart from "../component/overview/SalesChannelChart";
import Sidebar from "../component/common/Sidebar"; // Import the Sidebar component
import { useEffect } from "react";
import { useAuthsStore } from "../store/authsStore.js"; // Adjust the path as necessary

const OverviewPage = () => {
  const { checkAuths, operator } = useAuthsStore();

  useEffect(() => {
    checkAuths();
  }, [checkAuths]);

  return (
    <div className='flex h-screen w-full overflow-hidden bg-white'>
      {/* Sidebar */}
      <Sidebar /> {/* Render the Sidebar on the left */}

      {/* Main content */}
      <div className='flex-1 flex flex-col overflow-y-auto'>
        <Header title='Overview' />
        <main className='max-w-7xl font-poppins mx-auto py-6 px-4 lg:px-8 w-full'>
          {/* Conditional rendering based on operator */}
          {operator && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Welcome, {operator.name}!</h2>
            </div>
          )}

          {/* STATS */}
          <motion.div
            className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard name='Total Sales' icon={Zap} value='$12,345' color='#6366F1' />
            <StatCard name='New Users' icon={Users} value='1,234' color='#8B5CF6' />
            <StatCard name='Total Products' icon={ShoppingBag} value='567' color='#EC4899' />
            <StatCard name='Conversion Rate' icon={BarChart2} value='12.5%' color='#10B981' />
          </motion.div>

          {/* CHARTS */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <SalesOverviewChart />
            <CategoryDistributionChart />
            <SalesChannelChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default OverviewPage;
