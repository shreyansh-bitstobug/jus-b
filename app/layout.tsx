// Dependencies
import type { Metadata } from "next";

// Utils
import { cn } from "@/lib/utils";

// Fonts
import { Inter } from "next/font/google";

// CSS
import "./globals.css";

// Fonts
import { poppins } from "@/lib/direct-fonts";

// UI Components
import { Toaster } from "@/components/ui/toaster"; // For showing alerts

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Jus - b - Premium Fashion Store for Partywear & Western Dresses Online",
    template: "%s - Jus - b",
  },
  description:
    "Explore Jus-b, your ultimate online fashion store for premium styles. From partywear dresses to chic western dresses for women, find high-quality clothing designed for elegance and comfort.",
  keywords: [
    "partywear dress for women",
    "western dress",
    "western dress for women",
    "premium fashion",
    "online fashion store",
    "Jus-b fashion",
    "high-quality clothing",
  ],
  openGraph: {
    type: "website",
    url: "https://www.jus-b-fashion.com/",
    title: "Jus-b: Premium Fashion Store for Partywear & Western Dresses Online",
    description:
      "Explore Jus-b, your ultimate online fashion store for premium styles. From partywear dresses to chic western dresses for women, find high-quality clothing designed for elegance and comfort.",
    images: [
      {
        url: "/assets/hero4.jpg",
        width: 1200,
        height: 630,
        alt: "Jus-b Fashion Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jus-b: Premium Fashion Store for Partywear & Western Dresses Online",
    description:
      "Explore Jus-b, your ultimate online fashion store for premium styles. From partywear dresses to chic western dresses for women, find high-quality clothing designed for elegance and comfort.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "bg-snow flex flex-col min-h-screen")}>
        {/* <PageLoader /> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
