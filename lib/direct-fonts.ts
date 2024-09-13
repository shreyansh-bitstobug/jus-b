import { Poppins } from "next/font/google";
import { Syne } from "next/font/google";

// --------------------
// Syne Font
// --------------------
export const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// --------------------
// Poppins Font
// --------------------
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
