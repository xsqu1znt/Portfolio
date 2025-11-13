import { useEffect, useState } from "react";

interface ScrollData {
    scrollY: number;
    scrollYProgress: number;
}

export function useScroll(): ScrollData {
    const [scroll, setScroll] = useState<ScrollData>({ scrollY: 0, scrollYProgress: 0 });

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            const height = document.body.scrollHeight - window.innerHeight;
            const progress = height > 0 ? (y / height) * 100 : 0;

            setScroll({ scrollY: y, scrollYProgress: progress });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scroll;
}
