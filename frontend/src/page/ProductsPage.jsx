import { useEffect } from "react"; // Import useEffect
import { Link } from "react-router-dom";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import { useCourierStore } from "../store/authsStore";
import ProductsList from "../component/ProductsList"; // Import ProductsList

const ProductsPage = () => {
  const { couriers, fetchAllCouriers } = useCourierStore(); // Get products from the store

  // Fetch products when the component mounts
  useEffect(() => {
    fetchAllCouriers();
  }, [fetchAllCouriers]);

  return (
    <div className="flex flex-row h-full w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10 w-full">
        <Header title="My Services" />

        <div className="max-w-7xl h-full mx-auto px-4 space-y-5 bg-white">
          <span className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-5xl font-bold text-center mb-12 mt-24 font-poppins text-custom-blue">
              My Services
            </h1>
            <Link
              to="/add-services"
              className="bg-custom-blue text-white text-lg mt-8 md:text-xl font-semibold p-3 rounded-md transition duration-300 hover:bg-blue-500"
            >
              Add Services
            </Link>
          </span>

          {/* Render the ProductsList component */}
          <ProductsList products={couriers} /> {/* Pass the fetched products to ProductsList */}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
