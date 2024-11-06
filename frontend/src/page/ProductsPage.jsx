import { Link } from "react-router-dom";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel } from "react-icons/bi";

const servicesData = [
  {
    _id: "1",
    businessName: "Freight Services Co.",
    description: "Reliable freight services across regions.",
    city: "New York",
    country: "USA",
    contactPersonsName: "John Doe",
    type: "Trucking",
    adultCount: 300,
    childCount: 1000,
  },
  // Add more service items as needed
];

const ProductsPage = () => {
  return (
    <div className="flex flex-row h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10 w-full">
        <Header title="My Services" />

        <div className="max-w-7xl mx-auto px-4 space-y-5 bg-white">
          <span className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1
              className="text-5xl font-bold text-center mb-12 mt-24 font-poppins text-custom-blue"
            >
              My Services
            </h1>
            <Link
              to="/add-services"
              className="bg-custom-blue text-white text-lg mt-8 md:text-xl font-semibold p-3 rounded-md transition duration-300 hover:bg-blue-500"
            >
              Add Services
            </Link>
          </span>

          <div className="grid grid-cols-1 gap-8">
            {servicesData.map((services) => (
              <div
                key={services._id}
                data-testid="services-card"
                className="flex flex-col justify-between border border-slate-300 rounded-lg p-6 md:p-8 gap-5 shadow-md"
              >
                <h2 className="text-2xl font-bold text-gray-800">{services.businessName}</h2>
                <p className="text-lg text-gray-600">{services.description}</p>

                <div className="flex flex-col space-y-4 mt-4">
                  <div className="flex items-center border border-slate-300 rounded-sm p-3">
                    <BsMap className="mr-1 text-lg" />
                    {services.city}, {services.country}
                  </div>
                  <div className="flex items-center border border-slate-300 rounded-sm p-3">
                    <BsMap className="mr-1 text-lg" />
                    {services.contactPersonsName}
                  </div>
                  <div className="flex items-center border border-slate-300 rounded-sm p-3">
                    <BsBuilding className="mr-1 text-lg" />
                    {services.type}
                  </div>

                  <div className="flex items-center border border-slate-300 rounded-sm p-3">
                    <BiHotel className="mr-1 text-lg" />
                    {services.adultCount} Kilometers, {services.childCount} kilograms
                  </div>
                </div>
                <span className="flex justify-end mt-4">
                  <Link
                    to={`/edit-services/${services._id}`}
                    className="flex bg-custom-blue text-white text-lg md:text-xl font-semibold p-2 rounded-md transition duration-300 hover:bg-blue-500"
                  >
                    View Details
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;