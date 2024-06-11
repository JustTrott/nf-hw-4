"use client";

import React, { useState } from "react";
import { axiosUploadInstance } from "../api/apiClient";
import { toast } from "react-toastify";

export default function FileUploader({
	setFileUrl,
}: {
	setFileUrl: (urls: string[]) => void;
}) {
	const [files, setFiles] = useState<FileList | null>(null);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState<number[]>([]); // Array for individual progress
	const [uploadError, setUploadError] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFiles(event.target.files);
	};

	const handleUpload = async () => {
		if (!files || files.length === 0) {
			return;
		}

		setUploading(true);
		setUploadProgress(Array(files.length).fill(0)); // Initialize progress array
		setUploadError(null);

		const uploadPromises = [];

		for (let i = 0; i < files.length; i++) {
			const formData = new FormData();
			formData.append("file", files[i]); // Append each file individually

			const promise = axiosUploadInstance
				.post("/files/upload", formData, {
					onUploadProgress: (progressEvent) => {
						if (progressEvent.total) {
							const progress = Math.round(
								(progressEvent.loaded * 100) /
									progressEvent.total
							);
							setUploadProgress((prevProgress) => {
								const newProgress = [...prevProgress];
								newProgress[i] = progress;
								return newProgress;
							});
						}
					},
				})
				.then((response) => response.data.location); // Extract location from response
			uploadPromises.push(promise);
		}

		try {
			const uploadedUrls = await Promise.all(uploadPromises);
			console.log("Uploaded URLs:", uploadedUrls);
			if (uploadedUrls.length > 1) {
				toast.success(
					"Multiple files uploaded successfully. Only the first file will be used."
				);
			}
			setFileUrl(uploadedUrls);
		} catch (error: any) {
			setUploadError(error.message);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="container mx-auto py-8">
			<div className="flex items-center mb-4">
				<input
					type="file"
					accept="image/*"
					multiple={true}
					onChange={handleFileChange}
					className="border rounded-lg p-2 mr-4"
				/>
				<button
					onClick={handleUpload}
					disabled={!files || uploading}
					className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
				>
					{uploading ? "Uploading..." : "Upload"}
				</button>
			</div>
			{uploadProgress.map((progress, index) => (
				<div key={index} className="mb-2">
					<div className="text-sm font-bold">
						File {index + 1} Progress:
					</div>
					<div className="bg-gray-200 h-4 rounded-lg">
						<div
							className="bg-blue-500 h-full rounded-lg"
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>
			))}

			{/* Error Message */}
			{uploadError && (
				<div className="text-red-500 text-sm mb-4">{uploadError}</div>
			)}
		</div>
	);
}
