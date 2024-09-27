"use client";
import { HiChevronUp } from "react-icons/hi";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function TopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle the scroll event
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "rounded-full fixed bottom-8 right-[50%] transition-all bg-penn-red/30 backdrop-blur-sm text-neutral-700 hover:scale-110 z-50",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <HiChevronUp className="w-8 h-8" />
    </button>
  );
}
