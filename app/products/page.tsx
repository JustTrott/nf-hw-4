"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";

import productsService from "../api/services/productsService";
import ProductCard from "../components/ProductCard";

interface Product {
	id: number;
	title: string;
	price: number; // Use number for price
	category: string;
	description: string;
	image: string;
}

export default function Products() {
	const {
		isLoading,
		error,
		data: products,
	} = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: productsService.getAllProducts,
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error fetching products: {error.message}</p>;
	if (!products) return <p>No products found</p>;

	return (
		<div className="container mx-auto py-8">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold mb-4">Our Products</h1>
				{/* // Add product button */}
				<Link href="/products/create">
					<button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4">
						Add Product
					</button>
				</Link>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
