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
                setNavDarkMode(entry.isIntersecting);
            },
            { rootMargin: "-80px 0px -100% 0px", threshold: 0 }
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
