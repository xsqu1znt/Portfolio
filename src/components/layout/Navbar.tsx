"use client";

import { easings } from "@/config/motion";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ComponentProps, useEffect, useState } from "react";
import Button from "../ui/Button";

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

function NavLinkList({
    links,
    isDarkMode,
    className
}: {
    links: { label: string; sectionId: string }[];
    isDarkMode?: boolean;
    className?: string;
}) {
    return (
        <ul className={cn("flex items-center gap-6 place-self-center font-sans text-lg font-medium", className)}>
            {links.map(link => (
                <li key={link.sectionId}>
                    <NavLink {...link} isDarkMode={isDarkMode} />
                </li>
            ))}
        </ul>
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

export default function Navbar({ isDarkMode, setNavOpen }: { isDarkMode?: boolean; setNavOpen: (prev: boolean) => void }) {
    const lenis = useLenis();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        setNavOpen(isMenuOpen);

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const scrollToTop = () => {
        lenis?.scrollTo(0, { duration: 2 });
    };

    const scrollToContact = () => {
        lenis?.scrollTo("#contact", { duration: 2 });
    };

    const handleMenuOpenToggle = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <div className={cn("fixed top-0 left-0 z-50 w-full transition-colors duration-300", isDarkMode && "text-black")}>
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
                className={`relative grid grid-cols-2 lg:grid-cols-3 ${styles.padding.navbar}`}
                initial={{ opacity: 0, translateY: "-200%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
            >
                {/* Logo */}
                <button
                    className={cn(
                        "w-fit cursor-pointer place-content-center font-sans text-2xl font-semibold transition-opacity duration-300 hover:opacity-75",
                        isMenuOpen && "text-black"
                    )}
                    onClick={scrollToTop}
                >
                    <div className="flex flex-col overflow-hidden relative">
                        <span className={cn("inline-block text-white transition-transform duration-300 ease-in-out leading-5", (isDarkMode || isMenuOpen) && "-translate-y-full")}>GG</span>
                        <span className={cn("inline-block absolute text-black transition-transform duration-300 ease-in-out leading-5", !(isDarkMode || isMenuOpen) && "translate-y-full")}>GG</span>
                    </div>
                </button>

                {/* Links */}
                <NavLinkList
                    className="hidden lg:flex"
                    links={[
                        { label: "Work", sectionId: "work" },
                        { label: "Services", sectionId: "services" },
                        { label: "About", sectionId: "about" }
                    ]}
                    isDarkMode={isDarkMode}
                />

                {/* CTA/Contact */}
                <div className="hidden items-center justify-end lg:flex">
                    <Button variant="transparent" label="CONTACT" className="p-0" onClick={scrollToContact}>
                        <ChevronRight className="size-5 stroke-[1.5px]" />
                    </Button>
                </div>

                {/* Hamburger Menu */}
                <div className="flex items-center justify-end lg:hidden">
                    <NavMenuToggle isMenuOpen={isMenuOpen} toggleMenuOpen={handleMenuOpenToggle} />
                </div>

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
