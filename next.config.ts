import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isProjectPage = process.env.GITHUB_ACTIONS === "true" && repositoryName && !repositoryName.endsWith(".github.io");
const basePath = isProjectPage ? `/${repositoryName}` : undefined;

const nextConfig: NextConfig = {
  assetPrefix: basePath,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? "",
  },
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
};

export default nextConfig;
