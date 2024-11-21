import { useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useProfileStore } from "../store/authsStore";

const categories = ["Truckload", "Air Freight", "Courier Services", "Ocean Freight", "Rail Freight"];
const province = ["Gauteng", "Mpumalanga", "KwaZulu-Natal", "North West", "Limpopo", "Western Cape", "Free State", "Eastern Cape", "Northern Cape",]; // Adjust to valid provinces
const country = ["South Africa", "Lesotho", "Namibia"]; // Adjust to valid countries

const CreateCompanyProfile = () => {
  const [newProfile, setNewProfile] = useState({
    companyName: "",
    description: "",
    price: "",
    category: "",
    image: "",
    contactName: "",
    contactNumber: "",
    businessEmail: "",
    website: "",
    province: "",
    country: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { createProfile, loading } = useProfileStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple client-side validation for required fields
    if (!newProfile.companyName || !newProfile.price || !newProfile.category || !newProfile.image) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      await createProfile(newProfile);
      setSuccessMessage("Product created successfully!");
      setErrorMessage(""); // Clear any previous error messages
      setNewProfile({
        companyName: "",
        description: "",
        price: "",
        category: "",
        image: "",
        contactName: "",
        contactNumber: "",
        businessEmail: "",
        website: "",
        province: "",
        country: "",
      });
    } catch (error) {
  console.log("Error creating profile:", error);  // Log the error
  setErrorMessage("Error creating profile. Please try again.");
}
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfile({ ...newProfile, image: reader.result });
      };
      reader.readAsDataURL(file); // base64
    }
  };

  return (
    <motion.div
      className="shadow-lg rounded-lg p-8 mb-8 max-w-md mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-300 text-center">Please Fill Out Company Details:</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Display error or success message */}
        {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
        {successMessage && <div className="text-custom-blue text-sm">{successMessage}</div>}

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium font-poppins text-300">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={newProfile.companyName}
            onChange={(e) => setNewProfile({ ...newProfile, companyName: e.target.value })}
            className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
            required
          />
        </div>

        {/* Contact Name and Contact Number grouped side by side in larger screens, stack in mobile */}
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="contactName" className="block text-sm font-medium font-poppins text-300">
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={newProfile.contactName}
              onChange={(e) => setNewProfile({ ...newProfile, contactName: e.target.value })}
              className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
              required
            />
          </div>

          <div className="flex-1">
            <label htmlFor="contactNumber" className="block text-sm font-medium font-poppins text-300">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={newProfile.contactNumber}
              onChange={(e) => setNewProfile({ ...newProfile, contactNumber: e.target.value })}
              className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
              required
            />
          </div>
        </div>

        {/* Group Business Email and Website side by side in larger screens, stack in mobile */}
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="businessEmail" className="block text-sm font-medium font-poppins text-300">
              Business Email
            </label>
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              value={newProfile.businessEmail}
              onChange={(e) => setNewProfile({ ...newProfile, businessEmail: e.target.value })}
              className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
              required
            />
          </div>

          <div className="flex-1">
            <label htmlFor="website" className="block text-sm font-medium font-poppins text-300">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={newProfile.website}
              onChange={(e) => setNewProfile({ ...newProfile, website: e.target.value })}
              className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
              required
            />
          </div>
        </div>

        {/* Group Province and Country side by side in larger screens, stack in mobile */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label htmlFor="province" className="block text-sm font-medium font-poppins text-300">
                Province
              </label>
              <select
                id="province"
                name="province"
                value={newProfile.province}
                onChange={(e) => setNewProfile({ ...newProfile, province: e.target.value })}
                className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
                required
              >
                <option value="">Select a province</option>
                {province.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="country" className="block text-sm font-medium font-poppins text-300">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={newProfile.country}
                onChange={(e) => setNewProfile({ ...newProfile, country: e.target.value })}
                className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
                required
              >
                <option value="">Select a country</option>
                {country.map((cnt) => (
                  <option key={cnt} value={cnt}>
                    {cnt}
                  </option>
                ))}
              </select>
            </div>
          </div>


        {/* Description and Price */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium font-poppins text-300">
            Description Of Business
          </label>
          <textarea
            id="description"
            name="description"
            value={newProfile.description}
            onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
            className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
            rows="3"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium font-poppins text-300">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProfile.price}
            onChange={(e) => setNewProfile({ ...newProfile, price: e.target.value })}
            className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium font-poppins text-300">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProfile.category}
            onChange={(e) => setNewProfile({ ...newProfile, category: e.target.value })}
            className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium font-poppins text-300">
            Upload Product Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full border-gray-300 text-black focus:ring-2 focus:ring-custom-blue"
          />
          {newProfile.image && (
            <div className="mt-2">
              <img src={newProfile.image} alt="Uploaded Preview" className="w-24 h-24 object-cover rounded-md" />
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-custom-blue text-white py-2 px-4 rounded-md"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin mx-auto text-white" />
            ) : (
              "Save Company Details"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateCompanyProfile;
