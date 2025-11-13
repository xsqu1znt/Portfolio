import { useState, useEffect } from "react";

export default function useViewportSize() {
    const hasWindow = typeof window !== "undefined";

    function getViewportDimensions() {
        const viewportHeight = hasWindow ? window.innerHeight : null;
        const viewportWidth = hasWindow ? window.innerWidth : null; // You might want width too
        return { viewportHeight, viewportWidth };
    }

    const [viewportSize, setViewportSize] = useState(getViewportDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setViewportSize(getViewportDimensions());
            }

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [hasWindow]);

    return viewportSize;
}
