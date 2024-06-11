"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/products"); // Replace current history entry
	}, [router]);

	return null; // No content to render on this page
}
