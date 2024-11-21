import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:7000/api/auths" : "/api";

axios.defaults.withCredentials = true;

export const useTruckingStore = create((set) => ({
	truckings: [],
	loading: false,

	setProducts: (truckings) => set({ truckings }),

	createProduct: async (truckingData) => {
		set({ loading: true });
		try {
			const res = await axios.post(`${API_URL}/truckings`, truckingData);
			set((prevState) => ({
				truckings: [...prevState.truckings, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to create trucking");
			set({ loading: false });
		}
	},

	fetchAllTruckings: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/truckings`);
			set({ truckings: response.data.truckings, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch truckings");
			set({ loading: false });
		}
	},

	fetchTruckingsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/truckings/category/${category}`);
			set({ truckings: response.data.truckings, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch truckings");
			set({ loading: false });
		}
	},

	deleteProduct: async (truckingId) => {
		set({ loading: true });
		try {
			await axios.delete(`${API_URL}/truckings/${truckingId}`);
			set((prevState) => ({
				truckings: prevState.truckings.filter((trucking) => trucking._id !== truckingId),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to delete trucking");
			set({ loading: false });
		}
	},

	toggleFeaturedTrucking: async (truckingId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`${API_URL}/truckings/${truckingId}`);
			set((prevState) => ({
				truckings: prevState.truckings.map((trucking) =>
					trucking._id === truckingId ? { ...trucking, isFeatured: response.data.isFeatured } : trucking
				),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to update trucking");
			set({ loading: false });
		}
	},

	fetchFeaturedTruckings: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/truckings/featured`);
			set({ truckings: response.data, loading: false });
		} catch (error) {
			console.error("Error occurred:", error); // Logs the entire error object for debugging.
			toast.error(error.response?.data?.error || "An error occurred");
			set({ loading: false });
		}
	},
}));
