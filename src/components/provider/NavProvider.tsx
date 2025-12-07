"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { motion } from "motion/react";
import { easings } from "@/config/motion";

const NavContext = createContext<{ setNavOpen: (open: boolean) => void; setNavDarkMode: (useDarkMode: boolean) => void }>({
    setNavOpen: () => {},
    setNavDarkMode: () => {}
});
export const useNavContext = () => useContext(NavContext);

export default function NavProvider({ children }: { children: React.ReactNode }) {
    const [isNavDarkMode, setNavDarkMode] = useState(false);
    const [isNavOpen, setNavOpen] = useState(false);

    return (
        <>
            <Navbar isDarkMode={isNavDarkMode} setNavOpen={setNavOpen} />
            <NavContext.Provider value={{ setNavOpen, setNavDarkMode }}>
                <motion.div
                    className="origin-top-left"
                    animate={{
                        opacity: isNavOpen ? 0 : 1,
                        rotate: isNavOpen ? 5 : 0,
                        translateY: isNavOpen ? "50vh" : 0
                    }}
                    transition={{ duration: 0.5, ease: easings.fluidInOut }}
                >
                    {children}
                </motion.div>
            </NavContext.Provider>
        </>
    );
}
