import React from "react";

interface Product {
	id: number;
	title: string;
	price: number; // Use number for price
	category: string;
	description: string;
	image: string;
}

export default function ProductCard({ product }: { product: Product }) {
	return (
		<div key={product.id} className="border rounded-lg shadow-md p-4">
			<img
				src={product.image}
				alt={product.title}
				className="w-full h-48 object-cover rounded-t-lg mb-2"
			/>
			<h2 className="text-lg font-medium mb-1">{product.title}</h2>
			<p className="text-gray-600 mb-1">{product.category}</p>
			<p className="text-green-600 font-semibold mb-2">
				{product.price}$
			</p>
			<p className="text-sm text-gray-700">{product.description}</p>
		</div>
	);
}
