import { ServiceCardProps } from "@/types/shared";

// --- Main Services ---
export const MainServices: Omit<ServiceCardProps, "index" | "handleContact">[] = [
    {
        title: "Landing Page",
        description: ["Clean, high-converting page.", "Designed to capture leads and drive sales."],
        subtext: "1-3 Day Delivery",
        price: { starting: "$1,000+" },
        extraDetails: [
            "A Conversion-Focused Layout",
            "Speed Optimization (Lighthouse Score A)",
            "Integrated Lead Forms",
            "A/B Testing Ready Structure"
        ]
    },
    {
        title: "Custom Website",
        description: ["Fully featured, multi-page website.", "Tailored for your business and built to scale."],
        subtext: "7-14 Day Delivery",
        price: { starting: "$2,500+" },
        extraDetails: [
            "Scalable Architecture (React/Next.js)",
            "Custom CMS Integration (Headless)",
            "Advanced SEO Structure",
            "Comprehensive User Authentication"
        ]
    },
    {
        title: "UI/UX Design",
        description: ["Modern, functional interfaces.", "Designed with your users in mind."],
        subtext: "3-5 Day Delivery",
        price: { perPage: "$750" },
        extraDetails: [
            "User Research & Flow Mapping",
            "Interactive Prototypes (Figma)",
            "Comprehensive Design System",
            "Accessibility (WCAG) Auditing"
        ]
    }
];

// --- Add-on Services ---
export const AddonServices: Omit<ServiceCardProps, "index" | "handleContact">[] = [
    {
        title: "Copy // Marketing",
        description: ["Words that move people. Refined.", "By my in-house brand and marketing specialist."],
        subtext: "Add-on OR standalone",
        price: { perPage: "$250" },
        extraDetails: [
            "Targeted Tone of Voice Definition",
            "Conversion Rate Optimization (CRO) Copy",
            "Detailed Keyword Integration",
            "Full Brand Messaging Guide"
        ]
    },
    {
        title: "SEO-Optimization",
        description: ["Fully featured, multi-page website.", "Tailored for your business and built to scale."],
        subtext: "Add-on OR standalone",
        price: { starting: "$300+" },
        // Note: I corrected the description for SEO-Optimization as it was a copy-paste error.
        extraDetails: [
            "Technical SEO Audit & Fixes",
            "Structured Data Markup (Schema)",
            "On-Page Content Optimization",
            "Google Analytics & Search Console Setup"
        ]
    },
    {
        title: "Maintenance",
        description: ["Modern, functional interfaces.", "Designed with your users in mind."],
        subtext: "Add-on OR standalone",
        price: { monthly: "$250" },
        extraDetails: [
            "Weekly Security & Backup Checks",
            "System Dependency Updates",
            "Performance Monitoring & Reporting",
            "Priority Bug Fixes (48hr SLA)"
        ]
    }
];
