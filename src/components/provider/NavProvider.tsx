"use client";

import { easings } from "@/config/motion";
import { motion } from "motion/react";
import { createContext, useContext, useState } from "react";
import Navbar from "../layout/Navbar";

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
            <Navbar dark={isNavDarkMode} setNavOpen={setNavOpen} />
            <NavContext.Provider value={{ setNavOpen, setNavDarkMode }}>
                <motion.div
                    className=""
                    animate={{
                        opacity: isNavOpen ? 0 : 1,
                        translateY: isNavOpen ? "10vh" : 0
                    }}
                    transition={{ duration: 0.6, ease: easings.fluidInOut }}
                >
                    {children}
                </motion.div>
            </NavContext.Provider>
        </>
    );
}
