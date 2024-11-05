import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:7000/api/auths" : "/api/auths";

axios.defaults.withCredentials = true;

export const useAuthsStore = create((set) => ({
	operator: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuths: true,
	message: null,

	operatorSignup: async (email, password, companyName, number) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/operator-signup`, { email, password, companyName, number });
			set({ operator: response.data.operator, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			console.error(error); // Use the error variable here
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
            return response.data.operator; // Return user data
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
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			console.error(error); // Use the error variable here
			throw error;
		}
	},
	operatorVerifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/operator-verify-email`, { code });
			set({ operator: response.data.operator, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			console.error(error); // Use the error variable here
			throw error;
		}
	},
	checkAuths: async () => {
		set({ isCheckingAuths: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auths`);
			set({ user: response.data.operator, isAuthenticated: true, isCheckingAuths: false });
		} catch (error) {
			set({ error: null, isCheckingAuths: false, isAuthenticated: false });
			console.error(error); // Use the error variable here
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
				error: error.response.data.message || "Error sending reset password email",
			});
			console.error(error); // Use the error variable here
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
				error: error.response.data.message || "Error resetting password",
			});
			console.error(error); // Use the error variable here
			throw error;
		}
	},
}));
