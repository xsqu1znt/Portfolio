"use client";

import { easings } from "@/config/motion";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { ChevronRight } from "lucide-react";
import { motion, stagger, Transition, useMotionValueEvent, useScroll, Variants } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { StaggerText } from "../ui/StaggerText";

const SPRING_TRANSITION: Transition = { type: "spring", stiffness: 250, damping: 20 };
const SPRING2_TRANSITION: Transition = { type: "spring", stiffness: 200, damping: 10 };
const STAGGER_LINK = 0.05;
const DELAY_LINK = 0.3;

const MENU_VARIANTS: Variants = {
    closed: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        transition: { duration: 0.5, ease: easings.fluidInOut }
    },
    open: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
        transition: {
            duration: 0.7,
            ease: easings.fluidInOut,
            delayChildren: stagger(STAGGER_LINK, { startDelay: DELAY_LINK })
        }
    }
};

const LINK_VARIANTS: Variants = {
    closed: { opacity: 0, y: 10, transition: SPRING2_TRANSITION },
    open: { opacity: 1, y: 0, transition: SPRING2_TRANSITION }
};

const NAV_LINKS = [
    { label: "Work", sectionId: "work" },
    { label: "Services", sectionId: "services" },
    { label: "About", sectionId: "about" },
    { hidden: true, label: "Contact", sectionId: "contact" },
    { hidden: true, label: "Linkedin", href: "https://www.linkedin.com/in/guniqueg/" },
    { hidden: true, label: "Twitter / X", href: "https://x.com/bygunique" },
    { hidden: true, label: "Github", href: "https://github.com/xsqu1znt" },
    { hidden: true, label: "Octave Labs", href: "https://octavelabs.io", accent: true }
];

export default function Navbar({ dark, setNavOpen }: { dark?: boolean; setNavOpen: (prev: boolean) => void }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

    const { scrollY } = useScroll();
    const lenis = useLenis();

    useMotionValueEvent(scrollY, "change", latest => {
        const previous = scrollY.getPrevious() ?? 0;
        const direction = latest > previous ? "down" : "up";
        if (direction !== scrollDirection) setScrollDirection(direction);
    });

    useEffect(() => {
        setNavOpen(menuOpen);
    }, [menuOpen]);

    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => {
            const next = !prev;
            // setNavOpen(next); // Keep parent in sync
            return next;
        });
    }, [setNavOpen]);

    const scrollTo = (target: string | number, shouldCloseMenu = false) => {
        if (shouldCloseMenu) toggleMenu();
        lenis?.scrollTo(target, { duration: 2 });
    };

    const isScrolled = scrollDirection === "down" && !menuOpen;

    return (
        <motion.div
            initial={false}
            animate={{
                padding: isScrolled ? "0.25rem 2rem" : `1rem 2rem`,
                borderColor: isScrolled ? "oklab(1 0 0 / 0.05)" : "transparent",
                color: dark || menuOpen ? "var(--black)" : "var(--white)"
            }}
            transition={SPRING_TRANSITION}
            className="isolation-isolate fixed top-0 left-0 z-50 w-full border-b"
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

            {/* Mobile Menu Overlay */}
            <div className={cn("fixed inset-0 h-dvh w-full", !menuOpen && "pointer-events-none")}>
                <motion.div
                    variants={MENU_VARIANTS}
                    initial="closed"
                    animate={menuOpen ? "open" : "closed"}
                    className="bg-background-primary light h-full w-full flex-col place-content-center overflow-x-hidden overflow-y-auto px-4 py-16 md:px-8"
                >
                    {/* Main Section Links */}
                    <ul className="flex flex-col gap-6">
                        {NAV_LINKS.filter(l => !l.href).map(l => (
                            <motion.li key={l.sectionId} variants={LINK_VARIANTS}>
                                <StaggerText
                                    $text={l.label}
                                    $hoveredVariant={{ opacity: 0.7 }}
                                    $lineHeight="3rem"
                                    $initialDelay={0}
                                    className="cursor-pointer font-sans text-6xl"
                                    onClick={() => scrollTo(`#${l.sectionId}`, true)}
                                />
                            </motion.li>
                        ))}
                    </ul>

                    {/* Social/Accent Links */}
                    <ul
                        className={cn(
                            "mt-8 flex flex-col gap-3 border-t pt-8 transition-[border-color] delay-500 duration-500",
                            menuOpen ? "border-black/25" : "border-transparent"
                        )}
                    >
                        {NAV_LINKS.filter(l => l.href).map(l => (
                            <motion.li key={l.label} variants={LINK_VARIANTS}>
                                <a href={l.href} target="_blank" rel="noopener noreferrer">
                                    <StaggerText
                                        $text={l.label}
                                        $lineHeight={"1.5rem"}
                                        $initialDelay={0}
                                        className={cn("cursor-pointer font-sans text-3xl", l.accent && "text-accent")}
                                    />
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Navbar */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
                className={cn("relative grid w-full items-center", menuOpen ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3")}
            >
                {/* Logo */}
                <StaggerText
                    $text="GG"
                    $stagger={0.02}
                    $hoveredVariant={{ opacity: 0.75 }}
                    className="-my-2 cursor-pointer self-center py-2 font-sans text-2xl font-semibold"
                    onClick={() => scrollTo(0)}
                />

                {/* Links */}
                {!menuOpen && (
                    <ul className="hidden items-center gap-8 justify-self-center md:flex">
                        {NAV_LINKS.filter(l => !l.hidden).map(l => (
                            <li key={l.sectionId}>
                                <StaggerText
                                    $text={l.label}
                                    $hoveredVariant={{ opacity: 0.75 }}
                                    $stagger={0.005}
                                    className="-my-2 cursor-pointer py-2 font-sans text-lg font-medium"
                                    onClick={() => scrollTo(`#${l.sectionId}`)}
                                />
                            </li>
                        ))}
                    </ul>
                )}

                {/* CTA/Contact */}
                <div className="flex items-center gap-6 justify-self-end">
                    {!menuOpen && (
                        <motion.button
                            initial="initial"
                            whileHover="hovered"
                            whileTap="tapped"
                            className="flex w-fit cursor-pointer items-center rounded-md py-2 font-sans font-medium"
                            onClick={() => scrollTo("#contact")}
                        >
                            <motion.span
                                variants={{
                                    initial: { opacity: 0, x: -7, scale: 0.75 },
                                    hovered: {
                                        opacity: 0.75,
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
                            </motion.span>
                            <motion.span
                                variants={{
                                    initial: {},
                                    hovered: {
                                        opacity: 0.75,
                                        x: 7,
                                        transition: { delay: 0.04, type: "spring", stiffness: 500, damping: 20 }
                                    }
                                }}
                                className="mr-1"
                            >
                                CONTACT
                            </motion.span>
                        </motion.button>
                    )}

                    {/* Hamburger Icon */}
                    <motion.button
                        initial="initial"
                        whileHover="hovered"
                        whileTap="tapped"
                        className="relative z-50 size-7 cursor-pointer md:hidden"
                        onClick={toggleMenu}
                    >
                        <motion.div className="relative h-full w-full">
                            <motion.div
                                variants={{
                                    initial: { y: -7 },
                                    hovered: { y: menuOpen ? 0 : -5, rotate: menuOpen ? "35deg" : 0 }
                                }}
                                animate={{
                                    backgroundColor: menuOpen ? "var(--color-red-400)" : "var(--accent-secondary)",
                                    y: menuOpen ? 0 : undefined,
                                    rotate: menuOpen ? "45deg" : 0
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                className="bg-accent-secondary absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2"
                            />
                            <motion.div
                                variants={{
                                    initial: { width: "60%", y: 7 },
                                    hovered: { y: menuOpen ? 0 : 5, rotate: menuOpen ? "-35deg" : 0 }
                                }}
                                animate={{
                                    backgroundColor: menuOpen ? "var(--color-red-400)" : "var(--accent-secondary)",
                                    width: menuOpen ? "100%" : "60%",
                                    y: menuOpen ? 0 : undefined,
                                    rotate: menuOpen ? "-45deg" : 0
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                className="bg-accent-secondary absolute top-1/2 right-0 h-0.5 -translate-y-1/2"
                            />
                        </motion.div>
                    </motion.button>
                </div>
            </motion.header>
        </motion.div>
    );
}
