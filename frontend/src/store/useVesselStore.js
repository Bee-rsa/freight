import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:7000/api/auths" : "/api";

axios.defaults.withCredentials = true;

export const useVesselStore = create((set) => ({
	vessels: [],
	loading: false,

	setProfiles: (vessels) => set({ vessels }),

	createVessel: async (vesselData) => {
		set({ loading: true });
		try {
			const res = await axios.post(`${API_URL}/vessels`, vesselData);
			set((prevState) => ({
				vessels: [...prevState.vessels, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to create vessels");
			set({ loading: false });
		}
	},

	deleteVessel: async (vesselId) => {
		set({ loading: true });
		try {
			await axios.delete(`${API_URL}/vessels/${vesselId}`);
			set((prevState) => ({
				vessels: prevState.vessels.filter((vessel) => vessel._id !== vesselId),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to delete vessel");
			set({ loading: false });
		}
	},

	toggleFeaturedVessel: async (vesselId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`${API_URL}/vessels/${vesselId}`);
			set((prevState) => ({
				vessels: prevState.vessels.map((vessel) =>
					vessel._id === vesselId ? { ...vessel, isFeatured: response.data.isFeatured } : vessel
				),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to update vessel");
			set({ loading: false });
		}
	},

	fetchFeaturedVessels: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/vessels/featured`);
			set({ vessels: response.data, loading: false });
		} catch (error) {
			console.error("Error occurred:", error); // Logs the entire error object for debugging.
			toast.error(error.response?.data?.error || "An error occurred");
			set({ loading: false });
		}
	},
}));
