import { type ClassValue, clsx } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function useSafeMediaQuery(query: string, defaultValue = false) {
    const [match, setMatch] = useState(defaultValue);

    useEffect(() => {
        const mql = window.matchMedia(query);
        setMatch(mql.matches);

        const listener = (e: MediaQueryListEvent) => setMatch(e.matches);
        mql.addEventListener("change", listener);
        return () => mql.removeEventListener("change", listener);
    }, []);

    return match;
}

export function clampOverflow(n: number, max: number) {
    if (n < 0) return max;
    return n % max;
}

export function calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
}
