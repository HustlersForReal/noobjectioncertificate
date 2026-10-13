export const dynamic = 'force-static';

import type { MetadataRoute } from "next";

const siteUrl = "https://noobjectioncertificate.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
