"use client";

import { easings } from "@/config/motion";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { ChevronRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { StaggerText } from "../ui/StaggerText";

function NavLink({
    label,
    sectionId,
    isDarkMode,
    toggleMenuOpen,
    className,
    ...props
}: ComponentProps<"a"> & {
    label: string;
    sectionId: string;
    isDarkMode?: boolean;
    toggleMenuOpen?: () => void;
    className?: string;
}) {
    const lenis = useLenis();

    const scrollTo = () => {
        toggleMenuOpen?.();
        lenis?.scrollTo(`#${sectionId}`, { duration: 2 });
    };

    return (
        <a {...props} className={cn("group relative inline-block cursor-pointer font-sans", className)} onClick={scrollTo}>
            <span className="transition-opacity duration-300 group-hover:opacity-75">{label}</span>
            <div
                className={cn(
                    "absolute bottom-1 left-1/2 h-[1.25px] w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full",
                    isDarkMode && "bg-black"
                )}
            />
        </a>
    );
}

function NavMenuToggle({ isMenuOpen, toggleMenuOpen }: { isMenuOpen: boolean; toggleMenuOpen: () => void }) {
    const [hovered, setHovered] = useState(false);
    const [tapped, setTapped] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleClick = () => {
        if (!tapped) {
            setTapped(true);
            setHovered(false);

            setTimeout(() => {
                setTapped(false);
                toggleMenuOpen();
            }, 200);
        }
    };

    return (
        <button
            className="group size-7 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div className={cn("relative h-full w-full *:absolute *:transition-all *:duration-200")}>
                <div
                    className={cn(
                        "bg-accent-secondary top-1.5 left-0 h-0.5 w-7",
                        tapped && !isMenuOpen && "top-1/2 -translate-y-1/2",
                        isMenuOpen && "top-1/2 -translate-y-1/2 -rotate-45 bg-red-400",
                        tapped && isMenuOpen && "rotate-0",
                        hovered && !isMenuOpen && "left-2 w-5"
                    )}
                />
                <div
                    className={cn(
                        "bg-accent-secondary right-0 bottom-1.5 h-0.5 w-5",
                        tapped && !isMenuOpen && "bottom-1/2 w-7 translate-y-1/2",
                        isMenuOpen && "bottom-1/2 w-7 translate-y-1/2 rotate-45 bg-red-400",
                        tapped && isMenuOpen && "rotate-0",
                        hovered && !isMenuOpen && "w-7"
                    )}
                />
            </div>
        </button>
    );
}

export default function Navbar({ dark, setNavOpen }: { dark?: boolean; setNavOpen: (prev: boolean) => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

    const { scrollY } = useScroll();
    const lenis = useLenis();

    useMotionValueEvent(scrollY, "change", latest => {
        const previous = scrollY.getPrevious() ?? 0;
        const direction = latest > previous ? "down" : "up";

        if (direction !== scrollDirection) {
            setScrollDirection(direction);
        }
    });

    const scrollTo = (target: string | number, toggleMenu?: boolean) => {
        if (toggleMenu) setIsMenuOpen(prev => !prev);
        lenis?.scrollTo(target, { duration: 2 });
    };

    const handleMenuOpenToggle = () => {
        setIsMenuOpen(prev => !prev);
    };

    const navLinks = [
        { label: "Work", sectionId: "work" },
        { label: "Services", sectionId: "services" },
        { label: "About", sectionId: "about" }
    ];

    return (
        <motion.div
            initial={{ padding: "1rem 2rem", borderColor: "transparent", color: "var(--white)" }}
            animate={{
                padding: scrollDirection === "down" ? "0.25rem 2rem" : `1rem 2rem`,
                borderColor: scrollDirection === "down" ? "oklab(1 0 0 / 0.05)" : "transparent",
                color: dark ? "var(--black)" : "var(--white)",
                transition: { type: "spring", stiffness: 250, damping: 20 }
            }}
            className="fixed top-0 left-0 z-50 w-full border-b"
        >
            {/* Progressive Blur */}
            <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backdropFilter: "blur(24px) hue-rotate(15deg)",
                    WebkitBackdropFilter: "blur(24px) hue-rotate(15deg)",
                    maskImage: "linear-gradient(to bottom, black, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, black, transparent)"
                }}
            />

            {/* Mobile Menu */}
            <div className={cn("light fixed top-0 left-0 h-dvh w-full", !isMenuOpen && "pointer-events-none")}>
                <motion.div
                    className="bg-background-primary h-full w-full overflow-x-hidden overflow-y-auto"
                    initial={{
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                    }}
                    animate={{
                        clipPath: isMenuOpen
                            ? "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)"
                            : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                    }}
                    transition={{ duration: 0.5, ease: easings.fluidInOut }}
                >
                    <div className={`flex min-h-full w-full flex-col justify-center gap-6 py-16 ${styles.padding.section}`}>
                        <ul className="flex flex-col gap-4 text-6xl">
                            {[
                                { label: "Work", sectionId: "work" },
                                { label: "Services", sectionId: "services" },
                                { label: "About", sectionId: "about" },
                                { label: "Contact", sectionId: "contact" }
                            ].map((link, idx) => (
                                <li key={idx} className="overflow-hidden">
                                    <motion.div
                                        animate={{
                                            opacity: isMenuOpen ? 1 : 0,
                                            translateY: isMenuOpen ? 0 : "100%"
                                        }}
                                        transition={{
                                            delay: isMenuOpen ? 0.1 + 0.05 * idx : 0,
                                            duration: 0.5,
                                            ease: easings.fluidInOut
                                        }}
                                    >
                                        <NavLink
                                            label={link.label}
                                            sectionId={link.sectionId}
                                            isDarkMode={true}
                                            toggleMenuOpen={handleMenuOpenToggle}
                                        />
                                    </motion.div>
                                </li>
                            ))}
                        </ul>

                        <ul className="text-foreground-dim flex flex-col gap-1 text-xl">
                            {[
                                {
                                    label: "Linkedin",
                                    href: "https://www.linkedin.com/in/guniqueg/"
                                },
                                {
                                    label: "Twitter / X",
                                    href: "https://x.com/bygunique"
                                },
                                {
                                    label: "Github",
                                    href: "https://github.com/xsqu1znt"
                                },
                                { label: "Octave Labs", href: "https://octavelabs.com", accent: true }
                            ].map((link, idx) => (
                                <li key={idx} className="overflow-hidden">
                                    <motion.div
                                        animate={{
                                            opacity: isMenuOpen ? 1 : 0,
                                            translateY: isMenuOpen ? 0 : "100%"
                                        }}
                                        transition={{
                                            delay: isMenuOpen ? 0.5 + 0.05 * idx : 0,
                                            duration: 0.5,
                                            ease: easings.fluidInOut
                                        }}
                                    >
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                "transition-opacity duration-200 hover:opacity-75",
                                                link.accent && "text-accent"
                                            )}
                                        >
                                            {link.label}
                                        </a>
                                    </motion.div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>

            {/* Navbar */}
            <motion.header
                initial={{ opacity: 0, translateY: "-200%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
                className="relative grid h-full w-full grid-cols-2 lg:grid-cols-3"
            >
                {/* Logo */}
                <StaggerText
                    $text="GG"
                    // $tappedVariant={{ color: "var(--accent)", transition: { duration: 0.1 } }}
                    $stagger={0.02}
                    $hoveredVariant={{ opacity: 0.75 }}
                    className="-my-2 cursor-pointer self-center py-2 font-sans text-2xl font-semibold"
                    onClick={() => scrollTo(0)}
                />

                {/* Links */}
                <div className="hidden items-center gap-6 place-self-center lg:flex">
                    {navLinks.map((link, i) => (
                        <StaggerText
                            key={i}
                            $text={link.label}
                            $hoveredVariant={{ opacity: 0.75 }}
                            $stagger={0.005}
                            className="-my-2 cursor-pointer py-2 font-sans text-lg font-medium"
                            onClick={() => scrollTo(`#${link.sectionId}`)}
                        />
                    ))}
                </div>

                {/* CTA/Contact */}
                <div className="hidden items-center justify-end lg:flex">
                    <motion.button
                        initial="initial"
                        whileHover="hovered"
                        whileTap="tapped"
                        className="flex w-fit cursor-pointer items-center rounded-md px-4 py-2 font-sans font-medium"
                        onClick={() => scrollTo("#contact")}
                    >
                        <motion.div
                            variants={{
                                initial: { opacity: 0, x: -7, scale: 0.75 },
                                hovered: {
                                    opacity: 1,
                                    x: 5,
                                    scale: 1,
                                    transition: { type: "spring", stiffness: 500, damping: 20 }
                                },
                                tapped: {
                                    x: 7,
                                    transition: { type: "spring", stiffness: 500, damping: 10 }
                                }
                            }}
                            className="-ml-4"
                        >
                            <ChevronRight className="size-5 stroke-[1.5px]" />
                        </motion.div>

                        <motion.div
                            variants={{
                                initial: {},
                                hovered: {
                                    x: 7,
                                    transition: { delay: 0.04, type: "spring", stiffness: 500, damping: 20 }
                                }
                            }}
                            className="mr-1"
                        >
                            CONTACT
                        </motion.div>
                    </motion.button>
                </div>

                {/* Hamburger Menu */}
                <div className="flex items-center justify-end lg:hidden">
                    <NavMenuToggle isMenuOpen={isMenuOpen} toggleMenuOpen={handleMenuOpenToggle} />
                </div>
            </motion.header>
        </motion.div>
    );
}
