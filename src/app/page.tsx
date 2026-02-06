"use client";

import { useEffect, useRef } from "react";
import { useNavContext } from "@/components/provider/NavProvider";

import About from "@/components/sections/home/About";
import Contact from "@/components/sections/home/Contact";
import FAQs from "@/components/sections/home/FAQs";
import FeaturedWork from "@/components/sections/home/FeaturedWork";
import Hero from "@/components/sections/home/Hero";
import Services from "@/components/sections/home/Services";
import Testimonials from "@/components/sections/home/Testimonials";

export default function Home() {
    const { setNavDarkMode } = useNavContext();
    const lightGroupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = lightGroupRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // entry.isIntersecting is now based on a 1px trigger line
                setNavDarkMode(entry.isIntersecting);
            },
            {
                /* The Margin Magic:
               -80px top: Triggers when the section hits the bottom of an 80px navbar.
               0px right/left.
               -100% bottom: This "squishes" the detection zone into a 1px line at the top.
            */
                rootMargin: "-80px 0px -100% 0px",
                threshold: 0
            }
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [setNavDarkMode]);

    return (
        <main className="flex w-full flex-col">
            <Hero />
            <FeaturedWork />
            <Services />
            <Testimonials />

            {/* Grouped Light Sections */}
            <div ref={lightGroupRef} className="flex flex-col overflow-visible bg-white">
                <About />
                <FAQs />
            </div>

            <Contact />
        </main>
    );
}
