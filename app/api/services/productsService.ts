import axios from "axios";
import { axiosProductsInstance } from "../apiClient";

interface Product {
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
}

const productsService = {
	getAllProducts: () => {
		const res = axiosProductsInstance
			.get("/products")
			.then((response) => response.data);
		console.log("Fetching products");
		return res;
	},
	postProduct: (product: Product) =>
		axiosProductsInstance
			.post("/products", product)
			.then((response) => response.data),
};

export default productsService;
