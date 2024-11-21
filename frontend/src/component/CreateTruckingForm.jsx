import { useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useTruckingStore } from "../store/authsStore";

const categories = ["Truckload", "Flatbed", "Refrigerated", "Heavy Haul", "LTL (Less-than-Truckload)"];
const provinces = ["Gauteng", "Mpumalanga", "KwaZulu-Natal", "North West", "Limpopo", "Western Cape", "Free State", "Eastern Cape", "Northern Cape"];
const countries = ["South Africa", "Lesotho", "Namibia"];

const CreateTruckingForm = () => {
  const [newTrucking, setNewTrucking] = useState({
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
  const { createTrucking, loading } = useTruckingStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple client-side validation for required fields
    if (!newTrucking.companyName || !newTrucking.price || !newTrucking.category || !newTrucking.image) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      await createTrucking(newTrucking);
      setSuccessMessage("Trucking service created successfully!");
      setErrorMessage(""); // Clear any previous error messages
      setNewTrucking({
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
      console.log("Error creating trucking service:", error);
      setErrorMessage("Error creating trucking service. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTrucking({ ...newTrucking, image: reader.result });
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
      <h2 className="text-2xl font-semibold mb-6 text-300 text-center">Please Fill Out Trucking Service Details:</h2>

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
            value={newTrucking.companyName}
            onChange={(e) => setNewTrucking({ ...newTrucking, companyName: e.target.value })}
            className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
            required
          />
        </div>

        {/* Contact Name and Contact Number grouped side by side */}
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="contactName" className="block text-sm font-medium font-poppins text-300">
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={newTrucking.contactName}
              onChange={(e) => setNewTrucking({ ...newTrucking, contactName: e.target.value })}
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
              value={newTrucking.contactNumber}
              onChange={(e) => setNewTrucking({ ...newTrucking, contactNumber: e.target.value })}
              className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
              required
            />
          </div>
        </div>

        {/* Business Email and Website grouped side by side */}
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="businessEmail" className="block text-sm font-medium font-poppins text-300">
              Business Email
            </label>
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              value={newTrucking.businessEmail}
              onChange={(e) => setNewTrucking({ ...newTrucking, businessEmail: e.target.value })}
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
              value={newTrucking.website}
              onChange={(e) => setNewTrucking({ ...newTrucking, website: e.target.value })}
              className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
              required
            />
          </div>
        </div>

        {/* Province and Country grouped side by side */}
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="province" className="block text-sm font-medium font-poppins text-300">
              Province
            </label>
            <select
              id="province"
              name="province"
              value={newTrucking.province}
              onChange={(e) => setNewTrucking({ ...newTrucking, province: e.target.value })}
              className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
              required
            >
              <option value="">Select a province</option>
              {provinces.map((prov) => (
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
              value={newTrucking.country}
              onChange={(e) => setNewTrucking({ ...newTrucking, country: e.target.value })}
              className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
              required
            >
              <option value="">Select a country</option>
              {countries.map((cnt) => (
                <option key={cnt} value={cnt}>
                  {cnt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description and Rate per km */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium font-poppins text-300">
            Description of Services
          </label>
          <textarea
            id="description"
            name="description"
            value={newTrucking.description}
            onChange={(e) => setNewTrucking({ ...newTrucking, description: e.target.value })}
            className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
            rows="4"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium font-poppins text-300">
            Price (ZAR)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newTrucking.price}
            onChange={(e) => setNewTrucking({ ...newTrucking, price: e.target.value })}
            className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium font-poppins text-300">
            Service Category
          </label>
          <select
            id="category"
            name="category"
            value={newTrucking.category}
            onChange={(e) => setNewTrucking({ ...newTrucking, category: e.target.value })}
            className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
            required
          >
            <option value="">Select Category</option>
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
            Service Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-custom-blue text-white py-2 px-4 rounded-md text-lg"
        >
          {loading ? (
            <div className="flex justify-center">
              <Loader className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateTruckingForm;
