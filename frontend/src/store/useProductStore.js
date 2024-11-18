import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:7000/api/auths" : "/api";

axios.defaults.withCredentials = true;

export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),

	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post(`${API_URL}/products`, productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to create product");
			set({ loading: false });
		}
	},

	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/products`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch products");
			set({ loading: false });
		}
	},

	fetchProductsByCategory: async (category) => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch products");
			set({ loading: false });
		}
	},

	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`${API_URL}/products/${productId}`);
			set((prevState) => ({
				products: prevState.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to delete product");
			set({ loading: false });
		}
	},

	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`${API_URL}/products/${productId}`);
			set((prevState) => ({
				products: prevState.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to update product");
			set({ loading: false });
		}
	},

	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/products/featured`);
			set({ products: response.data, loading: false });
		} catch (error) {
			console.error("Error occurred:", error); // Logs the entire error object for debugging.
			toast.error(error.response?.data?.error || "An error occurred");
			set({ loading: false });
		}
	},
}));