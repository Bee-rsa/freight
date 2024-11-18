import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:7000/api/auths" : "/api/auths";

axios.defaults.withCredentials = true;

export const useAuthsStore = create((set) => ({
    operator: JSON.parse(localStorage.getItem("operator")) || null,
    isAuthenticated: !!localStorage.getItem("operator"),
    error: null,
    isLoading: false,
    isCheckingAuths: true,
    message: null,

    operatorSignup: async (email, password, companyName, number) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/operator-signup`, { email, password, companyName, number });
            set({ operator: response.data.operator, isAuthenticated: true, isLoading: false });
            localStorage.setItem("operator", JSON.stringify(response.data.operator));  // Store operator in localStorage
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            console.error(error);
            throw error;
        }
    },

    operatorLogin: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/operator-login`, { email, password });
            set({
                isAuthenticated: true,
                operator: response.data.operator,
                error: null,
                isLoading: false,
            });
            localStorage.setItem("operator", JSON.stringify(response.data.operator));  // Store operator in localStorage
            return response.data.operator;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            console.error(error);
            throw error;
        }
    },

    operatorLogout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/operator-logout`);
            set({ operator: null, isAuthenticated: false, error: null, isLoading: false });
            localStorage.removeItem("operator");  // Remove operator from localStorage
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            console.error(error);
            throw error;
        }
    },

    operatorVerifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/operator-verify-email`, { code });
            set({ operator: response.data.operator, isAuthenticated: true, isLoading: false });
            localStorage.setItem("operator", JSON.stringify(response.data.operator));  // Store operator in localStorage
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
            console.error(error);
            throw error;
        }
    },

    checkAuths: async () => {
        set({ isCheckingAuths: true, error: null });
        try {
            const storedOperator = localStorage.getItem("operator");
            if (storedOperator) {
                set({ operator: JSON.parse(storedOperator), isAuthenticated: true, isCheckingAuths: false });
            } else {
                const response = await axios.get(`${API_URL}/check-auths`);
                set({ operator: response.data.operator, isAuthenticated: true, isCheckingAuths: false });
                localStorage.setItem("operator", JSON.stringify(response.data.operator));  // Store operator in localStorage
            }
        } catch (error) {
            set({ error: null, isCheckingAuths: false, isAuthenticated: false });
            localStorage.removeItem("operator");  // Ensure localStorage is cleared on failed check
            console.error(error);
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error sending reset password email",
            });
            console.error(error);
            throw error;
        }
    },

    resetPassword: async (tokens, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${tokens}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error resetting password",
            });
            console.error(error);
            throw error;
        }
    },
}));

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
