import type { Metadata, Viewport } from "next";
import { Nunito, Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ReactLenis from "lenis/react";

const workSans = Work_Sans({
    variable: "--font-work-sans",
    subsets: ["latin"],
    display: "swap"
});

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
    display: "swap"
});

const satoshi = localFont({
    variable: "--font-satoshi",
    src: "../../public/fonts/Satoshi-Variable.ttf",
    display: "swap"
});

export const metadata: Metadata = {
    title: "Gunique G. | Web Developer & Designer",
    description:
        "Modern, fast, and high-converting websites built for startups and business with clean design. I design and develop custom websites, landing pages, and UI/UX that help brands stand out.",
    keywords: [
        "Full Stack Developer",
        "Next.js Developer",
        "React.js Developer",
        "TypeScript Developer",
        "Web Designer",
        "Web Developer",
        "UI/UX Design",
        "Freelance Developer",
        "Website Design",
        "Landing Page",
        "SEO Optimization",
        "Custom Website",
        "Creative Marketing",
        "Copywriting"
    ],
    authors: [{ name: "Gunique G.", url: "https://guniqueg.vercel.app" }],
    creator: "Gunique G.",
    publisher: "Gunique G.",
    metadataBase: new URL("https://guniqueg.vercel.app"),
    openGraph: {
        title: "Gunique G. | Full Stack Web Developer & Designer",
        description:
            "Modern, fast, and high-converting websites built for startups and business with clean design. I design and develop custom websites, landing pages, and UI/UX that help brands stand out.",
        url: "https://guniqueg.vercel.app",
        siteName: "Gunique G. | Portfolio",
        images: [
            {
                url: "/og-image.jpg", // replace with your actual OG image
                width: 1200,
                height: 630,
                alt: "Gunique G. | Portfolio"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Gunique G. | Web Developer & Designer",
        description: "Modern websites, landing pages, and design systems — built with precision and performance.",
        images: ["/og-image.jpg"],
        creator: "@bygunique",
        site: "https://guniqueg.vercel.app"
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png"
    }
};

export const viewport: Viewport = {
    themeColor: "#000000"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={`${workSans.variable} ${nunito.variable} ${satoshi.variable}`} lang="en">
            <body className={`dark antialiased`}>
                <ReactLenis root options={{ lerp: 0.2 }} />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
