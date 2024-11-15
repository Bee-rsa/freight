import { useState } from 'react';
import Header from '../components/userHeader';

const TrackMyOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const handleTrackOrder = async () => {
    setIsTracking(true);
    // Simulate order tracking (replace with your actual tracking API logic)
    if (orderNumber === 'S241114004868') {
      setOrderStatus({
        status: 'Active',
        departure: 'New York',
        destination: 'Los Angeles',
        commodities: 'Box, 0.15 ㎥, 40.0 kg',
        logisticsProvider: 'Primorus Worldwide',
        email: 'jkadish@primorusworldwide.com',
        shipmentNumber: '#S241114004868',
        bookingPlaced: 'Nov 14, 2024 6:19 PM',
      });
    } else {
      setOrderStatus(null);  // Reset status if order not found
    }
    setIsTracking(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <Header />
      <div className="container mx-auto p-8 pt-20">
        <h1 className="text-4xl font-bold text-center mt-8 font-poppins text-800 mb-6">Track My Order</h1>
        <div className="flex justify-center mb-8 space-x-4">
          <input
            type="text"
            placeholder="Enter Shipment Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="p-4 w-96 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={handleTrackOrder}
            disabled={isTracking}
            className={`p-4 ${isTracking ? 'bg-blue-400' : 'bg-blue-600'} text-white rounded-r-md transition-all duration-200 transform hover:scale-105 ${isTracking ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isTracking ? 'Tracking...' : 'Track'}
          </button>
        </div>

        {orderStatus && (
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Order Details</h2>
            <div className="grid grid-cols-2 gap-6 text-gray-700">
              <div>
                <strong className="font-medium">Status:</strong> {orderStatus.status}
              </div>
              <div>
                <strong className="font-medium">Port Departure:</strong> {orderStatus.departure}
              </div>
              <div>
                <strong className="font-medium">Logistics Provider:</strong> {orderStatus.logisticsProvider}
              </div>
              <div>
                <strong className="font-medium">Seller Email:</strong> {orderStatus.email}
              </div>
              <div>
                <strong className="font-medium">Commodities:</strong> {orderStatus.commodities}
              </div>
              <div>
                <strong className="font-medium">Booking Placed:</strong> {orderStatus.bookingPlaced}
              </div>
            </div>
            <div className="mt-6 text-gray-700">
              <strong className="font-medium">Shipment Number:</strong> {orderStatus.shipmentNumber}
            </div>
          </div>
        )}

        {!orderStatus && orderNumber && (
          <div className="text-center text-red-600 mt-4">
            <p className="font-semibold">Order not found. Please check your shipment number.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackMyOrder;
