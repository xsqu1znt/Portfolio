"use client";

import { createContext, useContext, useState } from "react";
import Navbar from "../layout/Navbar";

const NavContext = createContext<{ setNavDarkMode: (useDarkMode: boolean) => void }>({
    setNavDarkMode: () => {}
});
export const useNavContext = () => useContext(NavContext);

export default function NavProvider({ children }: { children: React.ReactNode }) {
    const [isNavDarkMode, setNavDarkMode] = useState(false);

    return (
        <>
            <Navbar isDarkMode={isNavDarkMode} />
            <NavContext.Provider value={{ setNavDarkMode }}>{children}</NavContext.Provider>
        </>
    );
}
