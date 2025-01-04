import { NextResponse } from "next/server";

export async function GET() {
  const robots = `
    User-agent: *
    Disallow:

    Sitemap: https://www.jus-b-fashion.com/api/sitemap
  `;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
