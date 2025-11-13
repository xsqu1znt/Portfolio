import { ServiceCardProps } from "@/types/types";

export const MainServices: Omit<ServiceCardProps, "index">[] = [
    {
        title: "Landing Page",
        description: ["Clean, high-converting page.", "Designed to capture leads and drive sales."],
        subtext: "1-3 Day Delivery",
        price: { starting: "$1,000+" }
    },
    {
        title: "Custom Website",
        description: ["Fully featured, multi-page website.", "Tailored for your business and built to scale."],
        subtext: "7-14 Day Delivery",
        price: { starting: "$2,500+" }
    },
    {
        title: "UI/UX Design",
        description: ["Modern, functional interfaces.", "Designed with your users in mind."],
        subtext: "3-5 Day Delivery",
        price: { perPage: "$750" }
    }
];

export const AddonServices: Omit<ServiceCardProps, "index">[] = [
    {
        title: "Copy // Marketing",
        description: ["Words that move people. Refined.", "By my in-house brand and marketing specialist."],
        subtext: "Add-on OR standalone",
        price: { perPage: "$250" }
    },
    {
        title: "SEO-Optimization",
        description: ["Fully featured, multi-page website.", "Tailored for your business and built to scale."],
        subtext: "Add-on OR standalone",
        price: { starting: "$300+" }
    },
    {
        title: "Maintenance",
        description: ["Modern, functional interfaces.", "Designed with your users in mind."],
        subtext: "Add-on OR standalone",
        price: { monthly: "$250" }
    }
];
