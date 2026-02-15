import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                has: [{ type: "header", key: "x-forwarded-host", value: "concepts.guniqueg.com" }],
                source: "/business-card",
                destination: "guniqueg-concept-business-card-52s0u3zvc-xsqu1znts-projects.vercel.app"
            },
            {
                has: [{ type: "header", key: "x-forwarded-host", value: "concepts.guniqueg.com" }],
                source: "/avatar-list",
                destination: "snippet-fluid-morphing-avatar-list-gqbyfjnja-xsqu1znts-projects.vercel.app"
            }
        ];
    }
};

export default nextConfig;
