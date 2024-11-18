import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.mode === "development" ? "http://localhost:7000/api/auths" : "/api",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;