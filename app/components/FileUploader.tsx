"use client";

import React, { useState } from "react";
import { axiosUploadInstance } from "../api/apiClient";

export default function FileUploader({
	setFileUrl,
}: {
	setFileUrl: (url: string) => void;
}) {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploadError, setUploadError] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			setFile(files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) {
			return;
		}

		setUploading(true);
		setUploadProgress(0);
		setUploadError(null);

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await axiosUploadInstance.post(
				"/files/upload",
				formData,
				{
					onUploadProgress: (progressEvent) => {
						if (!progressEvent.total) return;
						const progress = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						setUploadProgress(progress);
					},
				}
			);
			console.log("Upload response:", response.data);
			setFileUrl(response.data.location);
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
					onChange={handleFileChange}
					className="border rounded-lg p-2 mr-4"
				/>
				<button
					onClick={handleUpload}
					disabled={!file || uploading}
					className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
				>
					{uploading ? "Uploading..." : "Upload"}
				</button>
			</div>
			{uploadProgress > 0 && (
				<div className="mb-4">
					<div className="text-sm font-bold">Upload Progress:</div>
					<div className="bg-gray-200 h-4 rounded-lg">
						<div
							className="bg-blue-500 h-full rounded-lg"
							style={{ width: `${uploadProgress}%` }}
						/>
					</div>
				</div>
			)}
			{uploadError && (
				<div className="text-red-500 text-sm mb-4">{uploadError}</div>
			)}
		</div>
	);
}
