import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("https://", "") as string,
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ]
  }
};


export default nextConfig;
