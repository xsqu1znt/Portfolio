"use client";

import { useLenis } from "lenis/react";
import { createContext, useContext, useEffect, useState } from "react";
import Navbar from "../layout/Navbar";

const NavContext = createContext<{ setNavOpen: (open: boolean) => void; setNavDarkMode: (useDarkMode: boolean) => void }>({
    setNavOpen: () => {},
    setNavDarkMode: () => {}
});
export const useNavContext = () => useContext(NavContext);

export default function NavProvider({ children }: { children: React.ReactNode }) {
    const [isNavDarkMode, setNavDarkMode] = useState(false);
    const [isNavOpen, setNavOpen] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        if (isNavOpen) {
            lenis.stop();
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            lenis.start();
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
    }, [isNavOpen, lenis]);

    return (
        <>
            <Navbar dark={isNavDarkMode} setNavOpen={setNavOpen} />
            <NavContext.Provider value={{ setNavOpen, setNavDarkMode }}>
                <div className={isNavOpen ? "pointer-events-none touch-none overflow-hidden" : ""}>{children}</div>
            </NavContext.Provider>
        </>
    );
}
