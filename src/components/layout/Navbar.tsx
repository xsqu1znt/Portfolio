"use client";

import { useScroll } from "@/hooks/useScroll";
import useViewportSize from "@/hooks/useViewportSize";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
    const lenis = useLenis();

    const [isFull, setIsFull] = useState(false);
    const [menuClicked, setMenuClicked] = useState(false);
    const [menuHovered, setMenuHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { viewportHeight } = useViewportSize();
    const { scrollY } = useScroll();

    useEffect(() => {
        if (!scrollY || !viewportHeight) return;
        setIsFull(scrollY >= viewportHeight);
    }, [scrollY, viewportHeight]);

    const handleMenuToggle = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleMenuMouseDown = () => {
        setMenuClicked(true);
    };

    const handleMenuMouseUp = () => {
        setMenuClicked(false);
        if (menuHovered) {
            setMenuHovered(false);
        }
    };

    const handleMenuMouseEnter = () => {
        if (!isMenuOpen) {
            setMenuHovered(true);
        }
    };

    const handleScrollContact = () => {
        lenis?.scrollTo("#contact");
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full">
            <header className="font-satoshi relative p-4">
                {/* Menu */}
                <div
                    className={cn(
                        "group absolute top-4 left-4 flex h-[50px] items-center justify-between rounded-md border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-xl transition-all duration-300",
                        isFull ? "w-[calc(100%-32px)]" : "w-48"
                    )}
                >
                    {/* Logo */}
                    <a href="/" className="-m-1 p-1 text-2xl font-semibold">
                        GG
                    </a>

                    <button
                        className={cn("flex h-[40px] items-center justify-end", isFull ? "w-[calc(100vw-32px)]" : "w-48")}
                        onClick={handleMenuToggle}
                        onMouseDown={handleMenuMouseDown}
                        onTouchStart={handleMenuMouseDown}
                        onMouseUp={handleMenuMouseUp}
                        onTouchEnd={handleMenuMouseUp}
                        onMouseLeave={handleMenuMouseUp}
                        onTouchCancel={handleMenuMouseUp}
                        onMouseEnter={handleMenuMouseEnter}
                        onTouchMove={handleMenuMouseEnter}
                    >
                        {/* Hamburger */}
                        <div className="-mx-1 px-1 py-3 hover:cursor-pointer">
                            <div
                                className={cn(
                                    "relative h-3.5 w-6 transition-all duration-300",
                                    isMenuOpen && "-translate-y-[2px]"
                                )}
                            >
                                <div
                                    className={cn(
                                        "bg-icon-active absolute right-0 h-0.5 w-6 origin-center transition-all duration-300",
                                        menuClicked ? "top-1/2 translate-y-1/2" : "top-0",
                                        isMenuOpen
                                            ? "top-1/2 z-[1] w-6 translate-[1px] -rotate-45 rounded-md bg-red-400 outline-2 outline-[#161616]"
                                            : "",
                                        menuClicked && isMenuOpen && "-rotate-15",
                                        menuHovered && "h-0.5 w-4"
                                    )}
                                />
                                <div
                                    className={cn(
                                        "bg-icon-active absolute right-0 bottom-0 h-0.5 w-4 origin-center rounded-md transition-all duration-300",
                                        menuClicked ? "bottom-1/2 translate-y-[3px]" : "bottom-0",
                                        isMenuOpen
                                            ? "bottom-1/2 w-6 translate-y-[3px] rotate-45 bg-red-400 outline-2 outline-[#161616]"
                                            : "",
                                        menuClicked && isMenuOpen && "rotate-15",
                                        menuHovered && "h-0.5 w-6"
                                    )}
                                />
                            </div>
                        </div>
                    </button>
                </div>

                {/* CTA/Contact */}
                <div className={"absolute top-4 right-4 z-[-1] overflow-y-hidden"}>
                    <button
                        className={cn(
                            "shade-3d flex h-[50px] items-center rounded-md border border-white/5 bg-white/5 px-4 py-2.5 backdrop-blur-xl transition-all duration-300 hover:cursor-pointer",
                            isFull && "-translate-y-16"
                        )}
                        onClick={handleScrollContact}
                    >
                        CONTACT
                        <ChevronRight className="-mr-2 ml-1 h-6 stroke-1" />
                    </button>
                </div>
            </header>
        </div>
    );
}
