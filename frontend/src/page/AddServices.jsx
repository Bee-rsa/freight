import { Box, Truck, Ship } from "lucide-react";
import { useEffect, useState } from "react";

import CreateCourierForm from "../component/CreateCourierForm.jsx";
import CreateTruckingForm from "../component/CreateTruckingForm";
import CreateVesselForm from "../component/CreateVesselForm";
import { useCourierStore } from "../store/authsStore.js";

import Header from "../component/common/Header"; // Import Header
import Sidebar from "../component/common/Sidebar"; // Import Sidebar

const tabs = [
  { id: "courier", label: "Courier Services", icon: Box },
  { id: "trucking", label: "Trucking Freight", icon: Truck },
  { id: "vessel", label: "Vessel Freight", icon: Ship },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllCouriers } = useCourierStore();

  useEffect(() => {
    fetchAllCouriers();
  }, [fetchAllCouriers]);

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
          <div className="flex flex-col sm:flex-row justify-center mt-16 mb-6 sm:mb-8 sm:space-x-4 items-center space-y-4 sm:space-y-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center w-48 sm:w-48 px-4 py-2 rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-custom-blue text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Render content based on active tab */}
          <div>
            {activeTab === "courier" && <CreateCourierForm />}
            {activeTab === "trucking" && <CreateTruckingForm />}
            {activeTab === "vessel" && <CreateVesselForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
