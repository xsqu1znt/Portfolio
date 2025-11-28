"use client";

import { easings } from "@/config/motion";
import { useScroll } from "@/hooks/useScroll";
import useViewportSize from "@/hooks/useViewportSize";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import Button from "../ui/Button";
import { styles } from "@/constants/styles";

function NavLink({ label, sectionId }: { label: string; sectionId: string }) {
    const lenis = useLenis();

    const scrollTo = () => {
        lenis?.scrollTo(`#${sectionId}`, { duration: 2, offset: -100 });
    };

    return (
        <a className="group relative inline-block cursor-pointer" onClick={scrollTo}>
            <span className="transition-opacity duration-300 group-hover:opacity-75">{label}</span>
            <div className="absolute bottom-1 left-1/2 h-[1.25px] w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full" />
        </a>
    );
}

function NavLinkList({ links }: { links: { label: string; sectionId: string }[] }) {
    return (
        <ul className="flex items-center gap-6 place-self-center font-sans text-lg font-medium">
            {links.map(link => (
                <li key={link.sectionId}>
                    <NavLink {...link} />
                </li>
            ))}
        </ul>
    );
}

export default function Navbar() {
    const lenis = useLenis();

    const [hidden, setHidden] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [menuClicked, setMenuClicked] = useState(false);
    const [menuHovered, setMenuHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { viewportHeight } = useViewportSize();
    const { scrollY } = useScroll();
    const lastScrollPositionY = useRef<number>(0);

    /* useEffect(() => {
        if (!scrollY || !viewportHeight) return;
        setIsFull(scrollY >= viewportHeight);

        if (!scrollY) {
            setHidden(false);
        } else {
            // Scrolling downwards
            if (scrollY > lastScrollPositionY.current) {
                if (!hidden) {
                    setTimeout(() => {
                        setHidden(true);
                    }, 250);
                }
            }
            // Scrolling upwards
            else {
                if (hidden) {
                    setHidden(false);
                }
            }
        }

        lastScrollPositionY.current = scrollY;
    }, [scrollY, viewportHeight]); */

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
        lenis?.scrollTo("#contact", { offset: -100, duration: 2 });
    };

    return (
        <div className={cn("fixed top-0 left-0 z-50 w-full transition-all duration-300", hidden && "-top-full")}>
            <motion.header
                className={`relative grid grid-cols-3 ${styles.padding.navbar}`}
                initial={{ opacity: 0, translateY: "-200%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
            >
                {/* Logo */}
                <a
                    href="/"
                    className="w-fit cursor-pointer place-content-center font-sans text-2xl font-semibold transition-all duration-300 hover:opacity-75"
                >
                    GG
                </a>

                {/* Links */}
                <NavLinkList
                    links={[
                        { label: "Work", sectionId: "work" },
                        { label: "Services", sectionId: "services" },
                        { label: "About", sectionId: "about" }
                    ]}
                />

                {/* <div
                    className={cn(
                        "group absolute top-4 left-4 flex h-[50px] items-center justify-between rounded-md border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-xl transition-all duration-300",
                        isFull ? "w-[calc(100%-32px)]" : "w-48"
                    )}
                >
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
                        <div className="-mx-1 cursor-pointer px-1 py-3">
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
                </div> */}

                {/* CTA/Contact */}
                <Button variant="transparent" label="CONTACT" className="place-self-end p-0" onClick={handleScrollContact}>
                    <ChevronRight className="size-5 stroke-[1.5px]" />
                </Button>

                {/* Progressive blur */}
                <div
                    className="absolute inset-0 -z-10 h-full w-full backdrop-blur-xl backdrop-hue-rotate-15"
                    style={{
                        maskImage: "linear-gradient(to bottom, black, transparent)",
                        WebkitMaskImage: "linear-gradient(to bottom, black, transparent)"
                    }}
                />
            </motion.header>
        </div>
    );
}
