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
  title: "Jus-B",
  description: "Shop your heart out",
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
