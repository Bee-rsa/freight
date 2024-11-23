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
			console.log("Fetched Couriers:", response.data); // Log the fetched data to check its structure
			set({ couriers: response.data.couriers, loading: false });
		} catch (error) {
			console.error("Error fetching couriers:", error); // Log the error
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

export const useProfileStore = create((set) => ({
	profiles: [],
	loading: false,

	// Set profiles directly
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

	// Fetch all profiles
	fetchAllProfiles: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/profiles`);
			set({ profiles: response.data.profiles, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch profiles");
			set({ loading: false });
		}
	},

	// Delete a profile
	deleteProfile: async (profileId) => {
		set({ loading: true });
		try {
			const response = await fetch(`${API_URL}/profiles/${profileId}`, { method: "DELETE" });

			if (!response.ok) throw new Error("Failed to delete profile");

			set((prevState) => ({
				profiles: prevState.profiles.filter((profile) => profile._id !== profileId),
				loading: false,
			}));
			toast.success("Profile deleted successfully!");
		} catch (error) {
			toast.error(error.message || "Failed to delete profile");
			set({ loading: false });
		}
	},

	// Toggle profile's featured status
	toggleFeaturedProfile: async (profileId) => {
		set({ loading: true });
		try {
			const response = await fetch(`${API_URL}/profiles/${profileId}`, { method: "PATCH" });
			const data = await response.json();

			if (!response.ok) throw new Error(data.error || "Failed to update profile");

			set((prevState) => ({
				profiles: prevState.profiles.map((profile) =>
					profile._id === profileId ? { ...profile, isFeatured: data.isFeatured } : profile
				),
				loading: false,
			}));
			toast.success("Profile updated successfully!");
		} catch (error) {
			toast.error(error.message || "Failed to update profile");
			set({ loading: false });
		}
	},

	// Fetch featured profiles
	fetchFeaturedProfiles: async () => {
		set({ loading: true });
		try {
			const response = await fetch(`${API_URL}/profiles/featured`);
			const data = await response.json();

			if (!response.ok) throw new Error(data.error || "Failed to fetch featured profiles");

			set({ profiles: data, loading: false });
		} catch (error) {
			toast.error(error.message || "Failed to fetch featured profiles");
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

export const useTruckingStore = create((set) => ({
	truckings: [],
	loading: false,

	// Set profiles directly
	setTruckings: (truckings) => set({ truckings }),

	createTrucking: async (truckingData) => {
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

	// Fetch all profiles
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

	// Delete a profile
	deleteTrucking: async (truckingId) => {
		set({ loading: true });
		try {
			const response = await fetch(`${API_URL}/truckings/${truckingId}`, { method: "DELETE" });

			if (!response.ok) throw new Error("Failed to delete trucking");

			set((prevState) => ({
				truckings: prevState.truckings.filter((trucking) => trucking._id !== truckingId),
				loading: false,
			}));
			toast.success("Trucking deleted successfully!");
		} catch (error) {
			toast.error(error.message || "Failed to delete trucking");
			set({ loading: false });
		}
	},

	// Toggle profile's featured status
	toggleFeaturedTrucking: async (truckingId) => {
		set({ loading: true });
		try {
			const response = await fetch(`${API_URL}/truckings/${truckingId}`, { method: "PATCH" });
			const data = await response.json();

			if (!response.ok) throw new Error(data.error || "Failed to update trucking");

			set((prevState) => ({
				truckings: prevState.truckings.map((trucking) =>
					trucking._id === truckingId ? { ...trucking, isFeatured: data.isFeatured } : trucking
				),
				loading: false,
			}));
			toast.success("Trucking updated successfully!");
		} catch (error) {
			toast.error(error.message || "Failed to update trucking");
			set({ loading: false });
		}
	},

	// Fetch featured profiles
	fetchFeaturedTruckings: async () => {
		set({ loading: true });
		try {
			const response = await fetch(`${API_URL}/truckings/featured`);
			const data = await response.json();

			if (!response.ok) throw new Error(data.error || "Failed to fetch featured truckings");

			set({ truckings: data, loading: false });
		} catch (error) {
			toast.error(error.message || "Failed to fetch featured truckings");
			set({ loading: false });
		}
	},
}));

export const useVesselStore = create((set) => ({
	vessels: [],
	loading: false,

	// Set profiles directly
	setVessel: (vessels) => set({ vessels }),

	createVessel: async (vesselData) => {
		set({ loading: true });
		try {
			const res = await axios.post(`${API_URL}/vessels`, vesselData);
			set((prevState) => ({
				vessels: [...prevState.vessels, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to create vessel");
			set({ loading: false });
		}
	},

	// Fetch all profiles
	fetchAllVessels: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${API_URL}/vessels`);
			set({ vessels: response.data.vessels, loading: false });
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to fetch vessels");
			set({ loading: false });
		}
	},

	// Delete a profile
	deleteVessel: async (vesselId) => {
		set({ loading: true });
		try {
			const response = await fetch(`${API_URL}/vessels/${vesselId}`, { method: "DELETE" });

			if (!response.ok) throw new Error("Failed to delete vessel");

			set((prevState) => ({
				vessels: prevState.vessels.filter((vessel) => vessel._id !== vesselId),
				loading: false,
			}));
			toast.success("Vessel deleted successfully!");
		} catch (error) {
			toast.error(error.message || "Failed to delete Vessel");
			set({ loading: false });
		}
	},

	// Toggle profile's featured status
	toggleFeaturedVessel: async (vesselId) => {
		set({ loading: true });
		try {
			const response = await fetch(`${API_URL}/vessels/${vesselId}`, { method: "PATCH" });
			const data = await response.json();

			if (!response.ok) throw new Error(data.error || "Failed to update vessel");

			set((prevState) => ({
				vessels: prevState.vessels.map((vessel) =>
					vessel._id === vesselId ? { ...vessel, isFeatured: data.isFeatured } : vessel
				),
				loading: false,
			}));
			toast.success("Vessel updated successfully!");
		} catch (error) {
			toast.error(error.message || "Failed to update vessel");
			set({ loading: false });
		}
	},

	// Fetch featured profiles
	fetchFeaturedVessels: async () => {
		set({ loading: true });
		try {
			const response = await fetch(`${API_URL}/vessels/featured`);
			const data = await response.json();

			if (!response.ok) throw new Error(data.error || "Failed to fetch featured vessels");

			set({ vessels: data, loading: false });
		} catch (error) {
			toast.error(error.message || "Failed to fetch featured vessels");
			set({ loading: false });
		}
	},
}));