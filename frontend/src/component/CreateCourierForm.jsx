import { useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useCourierStore } from "../store/authsStore";

const eta = ["Truckload", "Air Freight", "Courier Services", "Ocean Freight", "Rail Freight"];

const courierService = ["Motorcycle Courier", "Standard Courier", "Same-Day Delivery", "Document Courier", "Overnight Delivery", "Special Handling"];

const CreateCourierForm = () => {
  const [newCourier, setNewCourier] = useState({
    courierService: "",
    description: "",
    eta: "",
    image: "",
		localMaxKilometers: "", localRateKilometers: "", regionalMaxKilometers: "", regionalRateKilometers: "", nationalMaxKilometers: "", nationalRateKilometers: "", 
   localRateKilograms: "", localKilogramOverweightCharge: "", regionalRateKilograms: "", regionalKilogramOverweightCharge: "", nationalRateKilograms: "", nationalKilogramOverweightCharge: "",
    localBaseRate: "", localFuelSurcharge: "", regionalBaseRate: "", regionalFuelSurcharge: "", nationalBaseRate: "", nationalFuelSurcharge: "",
    localDimensionRate: "", localDimensionOverweightCharge: "", regionalDimensionRate: "", regionalDimensionOverweightCharge: "", nationalDimensionRate: "", nationalDimensionOverweightCharge: "",
    residentialDeliveryFee: "", signatureRequired: "", packageRedeliveryFee: "", dangerousGoodsHandlingFee: "", specialHandlingFee: "", saturdayDeliveryFee: "", holidayDeliveryFee: "", weekendPickupFee: "", nonStandardPickupFee: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { createCourier, loading } = useCourierStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple client-side validation for required fields
    if (!newCourier.courierService || !newCourier.description || !newCourier.eta || !newCourier.image) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      await createCourier(newCourier);
      setSuccessMessage("Courier created successfully!");
      setErrorMessage(""); // Clear any previous error messages
      setNewCourier({
        courierService: "",
        description: "",
        eta: "",
        image: "",
        localMaxKilometers: "", localRateKilometers: "", regionalMaxKilometers: "", regionalRateKilometers: "", nationalMaxKilometers: "", nationalRateKilometers: "", 
        localRateKilograms: "", localKilogramOverweightCharge: "", regionalRateKilograms: "", regionalKilogramOverweightCharge: "", nationalRateKilograms: "", nationalKilogramOverweightCharge: "",
        localBaseRate: "", localFuelSurcharge: "", regionalBaseRate: "", regionalFuelSurcharge: "", nationalBaseRate: "", nationalFuelSurcharge: "",
        localDimensionRate: "", localDimensionOverweightCharge: "", regionalDimensionRate: "", regionalDimensionOverweightCharge: "", nationalDimensionRate: "", nationalDimensionOverweightCharge: "",
        residentialDeliveryFee: "", signatureRequired: "", packageRedeliveryFee: "", dangerousGoodsHandlingFee: "", specialHandlingFee: "", saturdayDeliveryFee: "", holidayDeliveryFee: "", weekendPickupFee: "", nonStandardPickupFee: "",
      });
    } catch (error) {
      console.log("Error creating courier:", error);  // Log the error
      setErrorMessage("Error creating courier. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourier({ ...newCourier, image: reader.result });
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
      <h2 className="text-3xl font-poppins font-semibold mb-6 text-custom-blue text-center">Please Fill Out Courier Services Details:</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Display error or success message */}
        {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
        {successMessage && <div className="text-custom-blue text-sm">{successMessage}</div>}

        {/* Courier Service Dropdown */}
<div className="flex flex-col w-full space-y-2">
  <label htmlFor="courierService" className="text-sm font-medium text-gray-900 font-poppins">
    Courier Service Types
  </label>
  <select
    id="courierService"
    name="courierService"
    value={newCourier.courierService}
    onChange={(e) => setNewCourier({ ...newCourier, courierService: e.target.value })}
    className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
    required
  >
    <option value="">Select a Courier Type</option>
    {courierService.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>

{/* Description */}
<div>
          <label htmlFor="description" className="block text-sm text-gray-900 font-medium font-poppins text-300">
            Description Of Business
          </label>
          <textarea
            id="description"
            name="description"
            value={newCourier.description}
            onChange={(e) => setNewCourier({ ...newCourier, description: e.target.value })}
            className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
          />
        </div>

          <div className="flex space-x-4">
            {/* Estimated Time of Arrival Dropdown */}
            <div className="flex flex-col w-1/2">
              <label htmlFor="eta" className="block text-sm text-gray-900 font-medium font-poppins">
                Estimated Time of Arrival
              </label>
              <select
                id="eta"
                name="eta"
                value={newCourier.eta}
                onChange={(e) => setNewCourier({ ...newCourier, eta: e.target.value })}
                className="mt-1 block w-full bg-white border border-gray-400 rounded-md shadow-sm py-2 px-3 text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
                required
              >
                <option value="">Select a category</option>
                {eta.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

         {/* Distance Charge */}
<h2 className="text-2xl font-poppins font-semibold mb-6 text-custom-blue text-left">
  Distance Charge:
</h2>

<div className="overflow-x-auto shadow-lg font-poppins">
<table className="min-w-full table-auto border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white bg-custom-blue">Zone Codes</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white bg-custom-blue">Domestic Market</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white bg-custom-blue">Maximum Zone Kilometers</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white bg-custom-blue">Rate per Kilometer</th>
      </tr>
    </thead>
    <tbody className="text-sm">
      {/* Distance Zone 1 */}
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 border-t border-gray-200">Zone Code 1</td>
        <td className="px-6 py-4 border-t border-gray-200">Local</td>
        <td className="px-6 py-4 border-t border-gray-200">
          <input
            type="number"
            value={newCourier.localMaxKilometers}
            onChange={(e) => setNewCourier({ ...newCourier, localMaxKilometers: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue"
            placeholder="Enter Max Kilometers"
          />
        </td>
        <td className="px-6 py-4 border-t border-gray-200">
          <input
            type="number"
            value={newCourier.localRateKilometers}
            onChange={(e) => setNewCourier({ ...newCourier, localRateKilometers: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue"
            placeholder="Rate per Kilometer"
          />
        </td>
      </tr>
      {/* Distance Zone 2 */}
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 border-t border-gray-200">Zone Code 2</td>
        <td className="px-6 py-4 border-t border-gray-200">Regional</td>
        <td className="px-6 py-4 border-t border-gray-200">
          <input
            type="number"
            value={newCourier.regionalMaxKilometers}
            onChange={(e) => setNewCourier({ ...newCourier, regionalMaxKilometers: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue"
            placeholder="Enter Max Kilometers"
          />
        </td>
        <td className="px-6 py-4 border-t border-gray-200">
          <input
            type="number"
            value={newCourier.regionalRateKilometers}
            onChange={(e) => setNewCourier({ ...newCourier, regionalRateKilometers: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue"
            placeholder="Rate per Kilometer"
          />
        </td>
      </tr>
      {/* Distance Zone 3 */}
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 border-t border-gray-200">Zone Code 3</td>
        <td className="px-6 py-4 border-t border-gray-200">National</td>
        <td className="px-6 py-4 border-t border-gray-200">
          <input
            type="number"
            value={newCourier.nationalMaxKilometers}
            onChange={(e) => setNewCourier({ ...newCourier, nationalMaxKilometers: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue"
            placeholder="Enter Max Kilometers"
          />
        </td>
        <td className="px-6 py-4 border-t border-gray-200">
          <input
            type="number"
            value={newCourier.nationalRateKilometers}
            onChange={(e) => setNewCourier({ ...newCourier, nationalRateKilometers: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue"
            placeholder="Rate per Kilometer"
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>


{/* Base Rate and Fuel Surcharge */}
<h2 className="text-2xl font-poppins mt-16 font-semibold mb-6 text-custom-blue text-left">Base Rate and Fuel Surcharge:</h2>

<div className="overflow-x-auto">
  <table className="min-w-full table-auto font-poppins border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-custom-sage bg-custom-blue">Zone Codes</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-custom-sage bg-custom-blue">Domestic Market</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-custom-sage bg-custom-blue">Base Rate</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-custom-sage bg-custom-blue">Fuel Surcharge (%)</th>
      </tr>
    </thead>
    <tbody>
      {/* Base Rate and Fuel Surcharge Zone 1 */}
      <tr className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-600">Zone Code 1</td>
        <td className="px-6 py-4 text-gray-600">Local</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.localBaseRate}
            onChange={(e) => setNewCourier({ ...newCourier, localBaseRate: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Enter Base Rate"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.localFuelSurcharge}
            onChange={(e) => setNewCourier({ ...newCourier, localFuelSurcharge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Fuel Surcharge (%)"
          />
        </td>
      </tr>
      {/* Base Rate and Fuel Surcharge Zone 2 */}
      <tr className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-600">Zone Code 2</td>
        <td className="px-6 py-4 text-gray-600">Regional</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.regionalBaseRate}
            onChange={(e) => setNewCourier({ ...newCourier, regionalBaseRate: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Enter Base Rate"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.regionalFuelSurcharge}
            onChange={(e) => setNewCourier({ ...newCourier, regionalFuelSurcharge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Fuel Surcharge (%)"
          />
        </td>
      </tr>
      {/* Base Rate and Fuel Surcharge Zone 3 */}
      <tr className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-600">Zone Code 3</td>
        <td className="px-6 py-4 text-gray-600">National</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.nationalBaseRate}
            onChange={(e) => setNewCourier({ ...newCourier, nationalBaseRate: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Enter Base Rate"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.nationalFuelSurcharge}
            onChange={(e) => setNewCourier({ ...newCourier, nationalFuelSurcharge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Fuel Surcharge (%)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>




{/* Weight Charge */}
<h2 className="text-2xl font-poppins mt-16 font-semibold mb-6 text-custom-blue text-left">Weight Charge:</h2>

<div className="overflow-x-auto shadow-lg font-poppins">
  <table className="min-w-full table-auto border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white bg-custom-blue">Zone Codes</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white bg-custom-blue">Domestic Market</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white bg-custom-blue">Rates</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white bg-custom-blue">Overweight Charge</th>
      </tr>
    </thead>
    <tbody>
      {/* Weight Charge Zone 1 */}
      <tr className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-600">Zone Code 1</td>
        <td className="px-6 py-4 text-gray-600">Local</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.localRateKilograms}
            onChange={(e) => setNewCourier({ ...newCourier, localRateKilograms: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Rate per Kilogram"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.localKilogramOverweightCharge}
            onChange={(e) => setNewCourier({ ...newCourier, localKilogramOverweightCharge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Cost per kilogram Over"
          />
        </td>
      </tr>
      {/* Weight Charge Zone 2 */}
      <tr className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-600">Zone Code 2</td>
        <td className="px-6 py-4 text-gray-600">Regional</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.regionalRateKilograms}
            onChange={(e) => setNewCourier({ ...newCourier, regionalRateKilograms: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Rate per Kilogram"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.regionalKilogramOverweightCharge}
            onChange={(e) => setNewCourier({ ...newCourier, regionalKilogramOverweightCharge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Cost per kilogram Over"
          />
        </td>
      </tr>
      {/* Weight Charge Zone 3 */}
      <tr className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-600">Zone Code 3</td>
        <td className="px-6 py-4 text-gray-600">National</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.nationalRateKilograms}
            onChange={(e) => setNewCourier({ ...newCourier, nationalRateKilograms: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Rate per Kilogram"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.nationalKilogramOverweightCharge}
            onChange={(e) => setNewCourier({ ...newCourier, nationalKilogramOverweightCharge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Cost per kilogram Over"
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>

{/* Dimension Charge */}
<h2 className="text-2xl font-poppins font-semibold mb-6 text-custom-blue text-left">Dimension Charge:</h2>

<div className="overflow-x-auto shadow-lg font-poppins">
  <table className="min-w-full table-auto border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-custom-sage bg-custom-blue">Zone Codes</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-custom-sage bg-custom-blue">Domestic Market</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-custom-sage bg-custom-blue">Rates</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-custom-sage bg-custom-blue">Overweight Charge</th>
      </tr>
    </thead>
    <tbody>
      {/* Dimension Charge Zone 1 */}
      <tr className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-600">Zone Code 1</td>
        <td className="px-6 py-4 text-gray-600">Local</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.localDimensionRate}
            onChange={(e) => setNewCourier({ ...newCourier, localDimensionRate: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Rate per Kilogram"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.localDimensionOverweightCharge}
            onChange={(e) => setNewCourier({ ...newCourier, localDimensionOverweightCharge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Cost per kilogram Over"
          />
        </td>
      </tr>
      {/* Dimension Charge Zone 2 */}
      <tr className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-600">Zone Code 2</td>
        <td className="px-6 py-4 text-gray-600">Regional</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.regionalDimensionRate}
            onChange={(e) => setNewCourier({ ...newCourier, regionalDimensionRate: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Rate per Kilogram"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.regionalDimensionOverweightCharge}
            onChange={(e) => setNewCourier({ ...newCourier, regionalDimensionOverweightCharge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Cost per kilogram Over"
          />
        </td>
      </tr>
      {/* Dimension Charge Zone 3 */}
      <tr className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-600">Zone Code 3</td>
        <td className="px-6 py-4 text-gray-600">National</td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.nationalDimensionRate}
            onChange={(e) => setNewCourier({ ...newCourier, nationalDimensionRate: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Rate per Kilogram"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={newCourier.nationalDimensionOverweightCharge}
            onChange={(e) => setNewCourier({ ...newCourier, nationalDimensionOverweightCharge: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
            placeholder="Cost per kilogram Over"
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>

{/* Accessorial Charges */}
<h2 className="text-2xl font-poppins mt-16 font-semibold mb-6 text-custom-blue text-left">Accessorial Charges:</h2>

{/* Table for Accessorial Charges */}
<table className="min-w-full table-auto border-collapse border border-gray-300">
  <thead>
    <tr>
      <th className="px-6 py-1 text-left text-sm font-semibold text-white bg-custom-blue">Charge Type</th>
      <th className="px-6 py-1 text-left text-sm font-semibold text-white bg-custom-blue">Charge Amount</th>
    </tr>
  </thead>
  <tbody>
    {/* Charge Types and Input Fields */}
    <tr className="border-t border-gray-300">
      <td className="px-6 py-4 text-gray-600">Residential Delivery Fee</td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={newCourier.residentialDeliveryFee}
          onChange={(e) => setNewCourier({ ...newCourier, residentialDeliveryFee: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
          placeholder="Input Amount"
        />
      </td>
    </tr>
    <tr className="border-t border-gray-300">
      <td className="px-6 py-4 text-gray-600">Signature Required</td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={newCourier.signatureRequired}
          onChange={(e) => setNewCourier({ ...newCourier, signatureRequired: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
          placeholder="Input Amount"
        />
      </td>
    </tr>
    <tr className="border-t border-gray-300">
      <td className="px-6 py-4 text-gray-600">Package Re-Delivery Fee</td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={newCourier.packageRedeliveryFee}
          onChange={(e) => setNewCourier({ ...newCourier, packageRedeliveryFee: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
          placeholder="Input Amount"
        />
      </td>
    </tr>
    <tr className="border-t border-gray-300">
      <td className="px-6 py-4 text-gray-600">Dangerous Goods Handling Fee</td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={newCourier.dangerousGoodsHandlingFee}
          onChange={(e) => setNewCourier({ ...newCourier, dangerousGoodsHandlingFee: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
          placeholder="Input Amount"
        />
      </td>
    </tr>
    <tr className="border-t border-gray-300">
      <td className="px-6 py-4 text-gray-600">Special Handling Fee</td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={newCourier.specialHandlingFee}
          onChange={(e) => setNewCourier({ ...newCourier, specialHandlingFee: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
          placeholder="Input Amount"
        />
      </td>
    </tr>
    <tr className="border-t border-gray-300">
      <td className="px-6 py-4 text-gray-600">Saturday Delivery Fee</td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={newCourier.saturdayDeliveryFee}
          onChange={(e) => setNewCourier({ ...newCourier, saturdayDeliveryFee: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
          placeholder="Input Amount"
        />
      </td>
    </tr>
    <tr className="border-t border-gray-300">
      <td className="px-6 py-4 text-gray-600">Holiday Delivery Fee</td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={newCourier.holidayDeliveryFee}
          onChange={(e) => setNewCourier({ ...newCourier, holidayDeliveryFee: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
          placeholder="Input Amount"
        />
      </td>
    </tr>
    <tr className="border-t border-gray-300">
      <td className="px-6 py-4 text-gray-600">Weekend Pickup Fee</td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={newCourier.weekendPickupFee}
          onChange={(e) => setNewCourier({ ...newCourier, weekendPickupFee: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
          placeholder="Input Amount"
        />
      </td>
    </tr>
    <tr className="border-t border-gray-300">
      <td className="px-6 py-4 text-gray-600">Non-Standard Pickup Fee</td>
      <td className="px-6 py-4">
        <input
          type="number"
          value={newCourier.nonStandardPickupFee}
          onChange={(e) => setNewCourier({ ...newCourier, nonStandardPickupFee: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-custom-blue text-sm"
          placeholder="Input Amount"
        />
      </td>
    </tr>
  </tbody>
</table>





        <div>
          <label htmlFor="image" className="block text-sm font-medium font-poppins text-300">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-custom-blue"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-custom-blue text-white py-2 px-4 rounded-md text-sm font-semibold"
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : "Create Courier Service"}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateCourierForm;
