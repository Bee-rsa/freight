import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:7000/api/auths" : "/api";

axios.defaults.withCredentials = true;

export const useCourierStore = create((set) => ({
	couriers: [],
	loading: false,

	setCouriers: (couriers) => set({ couriers }),

	createCourier: async (courierData) => {
		set({ loading: true });
		try {
			const res = await axios.post(`${API_URL}/couriers`, courierData);
			set((prevState) => ({
				couriers: [...prevState.couriers, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to create courier");
			set({ loading: false });
		}
	},

	fetchAllCouriers: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/couriers`);
			set({ couriers: response.data.couriers, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch couriers");
			set({ loading: false });
		}
	},

	fetchCouriersByEta: async (eta) => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/couriers/eta/${eta}`);
			set({ couriers: response.data.couriers, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch couriers");
			set({ loading: false });
		}
	},

	deleteCourier: async (courierId) => {
		set({ loading: true });
		try {
			await axios.delete(`${API_URL}/couriers/${courierId}`);
			set((prevState) => ({
				couriers: prevState.couriers.filter((courier) => courier._id !== courierId),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to delete courier");
			set({ loading: false });
		}
	},

	toggleFeaturedCourier: async (courierId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`${API_URL}/couriers/${courierId}`);
			set((prevState) => ({
				couriers: prevState.couriers.map((courier) =>
					courier._id === courierId ? { ...courier, isFeatured: response.data.isFeatured } : courier
				),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to update courier");
			set({ loading: false });
		}
	},

	fetchFeaturedCouriers: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/couriers/featured`);
			set({ couriers: response.data, loading: false });
		} catch (error) {
			console.error("Error occurred:", error); // Logs the entire error object for debugging.
			toast.error(error.response?.data?.error || "An error occurred");
			set({ loading: false });
		}
	},
}));
