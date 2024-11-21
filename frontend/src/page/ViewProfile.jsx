import { useEffect, useState } from "react";
import CreateCompanyProfile from "../component/CreateCompanyProfile";
import { useProfileStore } from "../store/authsStore.js";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";

const ViewProfile = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProfiles, updateProfile } = useProfileStore(); // Fetch and update profile functions from store
  const [formData, setFormData] = useState(null); // State to hold submitted data
  const [isFormLocked, setIsFormLocked] = useState(false); // Lock the form after submission

  useEffect(() => {
    fetchAllProfiles();
  }, [fetchAllProfiles]);

  // Function to handle form submission
  const handleFormSubmit = (data) => {
    setFormData(data); // Save form data after submission

    // Call the updateProfile function from your store to update profile
    updateProfile(data).then(() => {
      setIsFormLocked(true); // Lock the form to prevent further editing
      setActiveTab("create"); // Switch to "create" tab or keep the active tab
    }).catch((error) => {
      console.error("Error updating profile:", error);
      // Handle any error here if needed
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16">
          {/* Render content based on active tab */}
          {activeTab === "create" && (
            <CreateCompanyProfile
              initialData={formData} // Pass the form data to the form
              onSubmit={handleFormSubmit} // Handle form submission
              isFormLocked={isFormLocked} // Lock the form after submission
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
