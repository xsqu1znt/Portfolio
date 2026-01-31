import Footer from "@/components/layout/Footer";
import Grain from "@/components/layout/Grain";
import NavProvider from "@/components/provider/NavProvider";
import ReactLenis from "lenis/react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "./animations.css";
import "./clipping.css";
import "./globals.css";

const font_sans = localFont({
    variable: "--font-sans",
    src: "../../public/fonts/Satoshi-Variable.ttf",
    display: "swap"
});

const font_serif = localFont({
    variable: "--font-serif",
    src: "../../public/fonts/Hind-Variable.ttf",
    display: "swap"
});

const font_special = localFont({
    variable: "--font-special",
    src: "../../public/fonts/ClashDisplay-Variable.ttf",
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
    authors: [{ name: "Gunique G.", url: "https://guniqueg.com" }],
    creator: "Gunique G.",
    publisher: "Gunique G.",
    metadataBase: new URL("https://guniqueg.com"),
    openGraph: {
        title: "Gunique G. | Portfolio",
        description:
            "Modern, functional, high-converting websites built for startups and creators. I design and develop custom websites, landing pages, and UI/UX that help brands stand out.",
        url: "https://guniqueg.com",
        siteName: "Gunique G. | Web Developer & Designer",
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: "Gunique G. | Web Developer & Designer"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Gunique G. | Portfolio",
        description:
            "Modern, functional, high-converting websites built for startups and creators. I design and develop custom websites, landing pages, and UI/UX that help brands stand out.",
        images: ["/twitter.png"],
        creator: "@bygunique",
        site: "https://guniqueg.com"
    },
    icons: {
        icon: "/icon.png",
        shortcut: "/icon.png",
        apple: "/icon-apple.png"
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
        <html lang="en">
            <body
                className={`no-scrollbar relative overflow-x-hidden antialiased ${font_sans.variable} ${font_serif.variable} ${font_special.variable}`}
            >
                <ReactLenis root options={{ overscroll: false, lerp: 0.15, allowNestedScroll: true }} />
                <NavProvider>{children}</NavProvider>
                <Footer />
                <Grain />
                <ToastContainer position="bottom-right" theme="dark" />
            </body>

            <Script src="https://scripts.simpleanalyticscdn.com/latest.js" data-collect-dnt="true" />
        </html>
    );
}
