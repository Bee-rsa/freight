import mongoose from "mongoose";

const vesselSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,  // Phone number as a String to allow different formats
      required: true,
    },
    contactName: {
      type: String, // Store the contact person's name
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    website: {
    type: String,
    required: true,
  },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Vessel = mongoose.model("Vessel", vesselSchema);

export default Vessel;
