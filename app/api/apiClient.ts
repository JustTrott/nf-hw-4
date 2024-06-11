import axios from "axios";

export const axiosProductsInstance = axios.create({
	baseURL: "https://fakestoreapi.com", // Your base API URL
});

export const axiosUploadInstance = axios.create({
	baseURL: "https://api.escuelajs.co/api/v1", // Your base API URL
});
