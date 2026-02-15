import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            // Business Card Concept
            {
                has: [{ type: "header", key: "x-forwarded-host", value: "concepts.guniqueg.com" }],
                source: "/business-card",
                destination: "guniqueg-concept-business-card.vercel.app"
            },
            {
                has: [{ type: "header", key: "x-forwarded-host", value: "concepts.guniqueg.com" }],
                source: "/business-card/:path*",
                destination: "guniqueg-concept-business-card.vercel.app/:path*"
            },

            // Avatar List Concept
            {
                has: [{ type: "header", key: "x-forwarded-host", value: "concepts.guniqueg.com" }],
                source: "/avatar-list",
                destination: "guniqueg-concept-avatar-list.vercel.app"
            },
            {
                has: [{ type: "header", key: "x-forwarded-host", value: "concepts.guniqueg.com" }],
                source: "/avatar-list/:path*",
                destination: "guniqueg-concept-avatar-list.vercel.app/:path*"
            }
        ];
    }
};

export default nextConfig;
