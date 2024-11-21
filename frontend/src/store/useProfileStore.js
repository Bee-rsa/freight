import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import useAuthsStore from "../store/authsStore"

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:7000/api/auths" : "/api";

axios.defaults.withCredentials = true;

export const useProfileStore = create((set) => ({
	profiles: [],
	loading: false,

	setProfiles: (profiles) => set({ profiles }),

	createProfile: async (profileData) => {
		set({ loading: true });
		try {
			const res = await axios.post(`${API_URL}/profiles`, profileData);
			set((prevState) => ({
				profiles: [...prevState.profiles, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to create profile");
			set({ loading: false });
		}
	},

	deleteProfile: async (profileId) => {
		set({ loading: true });
		try {
			await axios.delete(`${API_URL}/profiles/${profileId}`);
			set((prevState) => ({
				profiles: prevState.profiles.filter((profile) => profile._id !== profileId),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to delete profile");
			set({ loading: false });
		}
	},

	toggleFeaturedProfile: async (profileId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`${API_URL}/profiles/${profileId}`);
			set((prevState) => ({
				profiles: prevState.profiles.map((profile) =>
					profile._id === profileId ? { ...profile, isFeatured: response.data.isFeatured } : profile
				),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to update profile");
			set({ loading: false });
		}
	},

	fetchFeaturedProfiles: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/profiles/featured`);
			set({ profiles: response.data, loading: false });
		} catch (error) {
			console.error("Error occurred:", error); // Logs the entire error object for debugging.
			toast.error(error.response?.data?.error || "An error occurred");
			set({ loading: false });
		}
	},

    updateProfile: async (data) => {
		try {
			set({ loading: true });
			const res = await axios.get("/profiles", data);
			useAuthsStore.getState().setAuthUser(res.data.user);
			toast.success("Profile updated successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
}));

	
