/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // The root layout is under app/[lang]: an address that is not a page gets app/global-not-found.tsx,
    // with the site's header and footer (src/components/NotFoundPage.tsx).
    globalNotFound: true,
  },
};

export default nextConfig;
