import { useState, useEffect } from "react";

function getWindowDimensions() {
	let size;
	if (window.innerWidth < 800) {
		size = "sm";
	} else {
		size = "lg";
	}
	return size;
}

export default function useWindowWidth() {
	const [width, setWidth] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWidth(getWindowDimensions);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return width;
}
