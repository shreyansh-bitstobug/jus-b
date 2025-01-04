import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.jus-b-fashion.com"; // Replace with your base URL or add in .env
  const staticPages = ["/about", "/contact", "/policy"]; // Add your static routes here
  const dynamicPages = [
    "/shop",
    "/blog",
    "/",
    "/checkout",
    "/cart",
    "/contact",
    "/profile",
    "/shop",
    "/wishlist",
    "/dashboard/admin",
    "/sign-in",
    "/sign-up",
    "/password-reset",
  ]; // Optionally fetch dynamic pages from your DB/API

  const pages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
