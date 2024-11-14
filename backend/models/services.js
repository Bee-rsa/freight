// Import mongoose
const mongoose = require('mongoose');

// Define schema for Booking
const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  kiloMeters: { type: Number, required: true },
  kiloGrams: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
});

// Define schema for Services
const servicesSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  businessName: { type: String, required: true },
  contactPersonsName: { type: String, required: true },
  fuelSurcharge: { type: Number, required: true},
  businessEmailAddress: { type: String, required: true },
  website: { type: String, required: false },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  kiloMeters: { type: Number, required: true },
  kiloGrams: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  totalCosts: { type: Number, required: true },
  AccessorialCharges: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [bookingSchema],
});

// Create model for Services
const Services = mongoose.model("Services", servicesSchema);

// Export Services model
module.exports = Services;