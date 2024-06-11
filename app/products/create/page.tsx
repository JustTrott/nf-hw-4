"use client"; // For Client Components in Next.js 13
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import FileUploader from "@/app/components/FileUploader";
import productsService from "@/app/api/services/productsService";
import ProductCard from "@/app/components/ProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

export default function CreateProductPage() {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [fileUrl, setFileUrl] = useState<string[]>([]);
	const [newProduct, setNewProduct] = useState(null);
	const queryClient = useQueryClient();

	const handleSubmit = async () => {
		const newProduct = {
			title,
			price,
			category,
			description,
			image: fileUrl[0],
		};

		try {
			const response = await productsService.postProduct(newProduct);
			console.log("Product created successfully:", response);
			setNewProduct(response);
			toast.success("Product created successfully!");
			queryClient.invalidateQueries({ queryKey: ["products"] });
			console.log("Invalidated products query");
		} catch (error) {
			console.error("Error creating product:", error);
			toast.error("Error creating product!");
			// Handle errors (e.g., display an error message to the user)
		}
	};

	return (
		<div className="text-gray-600 body-font relative">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
					<Link
						href="/products"
						className="w-full flex self-start items-center gap-1"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6 w-4 h-4 fill-current text-indigo-500"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
							/>
						</svg>
						<p className="font-medium text-indigo-500">
							Back to Products
						</p>
					</Link>
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
						Create Product
					</h1>
					<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
						Post your product here!
					</p>
				</div>
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<div className="flex flex-wrap -m-2">
						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="title"
									className="leading-7 text-sm text-gray-600"
								>
									Title
								</label>
								<input
									type="text"
									id="title"
									name="title"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
						</div>

						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="price"
									className="leading-7 text-sm text-gray-600"
								>
									Price
								</label>
								<input
									type="number"
									id="price"
									name="price"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									onChange={(e) =>
										setPrice(Number(e.target.value))
									}
								/>
							</div>
						</div>

						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="category"
									className="leading-7 text-sm text-gray-600"
								>
									Category
								</label>
								<input
									type="text"
									id="category"
									name="category"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									onChange={(e) =>
										setCategory(e.target.value)
									}
								/>
							</div>
						</div>

						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="image"
									className="leading-7 text-sm text-gray-600"
								>
									Image
								</label>
								<FileUploader setFileUrl={setFileUrl} />
							</div>
						</div>

						{/* Message Textarea */}
						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="message"
									className="leading-7 text-sm text-gray-600"
								>
									Description
								</label>
								<textarea
									id="message"
									name="message"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</div>
						</div>

						{/* Button */}
						<div className="p-2 w-full">
							<button
								className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
								onClick={handleSubmit}
							>
								Post Product
							</button>
						</div>
					</div>
					{newProduct && <ProductCard product={newProduct} />}
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
				theme="light"
			/>
		</div>
	);
}
