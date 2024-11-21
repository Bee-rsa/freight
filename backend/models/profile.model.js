import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const profileSchema = new mongoose.Schema(
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
          category: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: [true, "Image is required"],
          },
          isFeatured: {
            type: Boolean,
            default: false,
          },
        },
        { timestamps: true }
      );


const Profile = mongoose.model("Profile", profileSchema);

export default Profile;