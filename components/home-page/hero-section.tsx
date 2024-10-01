import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { TypeAnimation } from "react-type-animation";

import Image from "next/image";

import "./home-page.css";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [show, setShow] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const divDirChange = () => {
      setShow(true);

      const timeoutId = setTimeout(() => {
        setShow(false);
      }, 1000);

      return timeoutId; // Return the timeout ID for cleanup
    };

    const imageChange = () => {
      const imgTimeoutId = setTimeout(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % 2); // Change the image index every 2 seconds
      }, 6000);

      return imgTimeoutId; // Return the timeout ID for cleanup
    };

    const imgTimeoutId = imageChange();
    const timeoutId = divDirChange();

    // Cleanup function to clear the timeouts when component unmounts or `imageIndex` changes
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(imgTimeoutId);
    };
  }, [imageIndex]);

  const CenterDiv = ({ className }: { className: string }) => {
    return (
      <>
        <div className={cn(" justify-center items-center gap-6", className)}>
          <div className="md:space-y-4 flex flex-col items-center">
            <h1 className="text-3xl min-h-[72px] text-center font-bold uppercase tracking-tighter sm:text-5xl xl:text-6xl/none xl:min-h-[120px]">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Trendy",
                  1000,
                  "Modern",
                  1000,
                  "Amazing",
                  1000,
                  "Stylist",
                  1000,
                ]}
                wrapper="span"
                speed={20}
                repeat={Infinity}
                className="w-full"
              />
              <span className="font-normal text-penn-red text-4xl">
                <br />
                designer collection
              </span>
            </h1>

            <p className="   text-muted-foreground text-center">
              <b className="text-black">Jus-B by JB</b> is an online fashion boutique offering trendy, modern styles for
              women. From chic dresses to stylish tops, their collection features the latest designs, blending quality
              and affordability for the modern woman&#x27;s wardrobe.
            </p>
          </div>

          {/* CTA */}
          <div className=" flex items-center gap-4 flex-wrap px-10 justify-center">
            <Link href="/shop">
              <Button size="lg" className="text-lg font-bold">
                Shop Now
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="text-lg bg-snow hover:bg-neutral-400/20 border-2 border-black font-bold"
              >
                Shop By Category
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <section className="relative border-b-2 border-penn-red md:pb-0 pb-5">
      <div className=" min-h-screen lg:space-y-0 space-y-6">
        {/* Center Content (for medium screen sizes) */}
        <CenterDiv className="lg:hidden space-y-4 py-8 flex flex-col px-8" />

        <div className="grid grid-cols-2 lg:gap-8 gap-4 lg:grid-cols-3 lg:items-center">
          {/* Left Image */}
          <div className="group md:h-screen h-[70vh] overflow-hidden relative lg:w-full">
            {/* -------- Empty Div --------- */}
            <div
              className={cn(
                "h-0 absolute transition-all bg-snow duration-1000 z-30 w-full",
                show ? "show" : "",
                imageIndex == 1 ? "top-0" : "bottom-0"
              )}
            />

            {/* -------- Image --------- */}
            <div
              className={cn(
                "overflow-hidden absolute top-0 z-10 transition-all duration-1000 ease-in",
                imageIndex == 0 ? "opacity-0" : ""
              )}
            >
              <Image
                src="/assets/hero1.jpg?height=600&width=500"
                alt="Left decorative image"
                width={500}
                height={600}
                className="object-cover transition-all duration-1000 group-hover:scale-110"
              />
            </div>

            <div
              className={cn(
                " overflow-hidden absolute top-0 z-10 transition-all duration-1000 ease-in",
                imageIndex == 1 ? "opacity-0" : ""
              )}
            >
              <Image
                src="/assets/hero2.jpg?height=600&width=500"
                alt="Left decorative image"
                width={500}
                height={600}
                className="object-cover transition-all duration-1000 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Center Content - Hidden on small and medium screens */}
          <CenterDiv className="hidden lg:flex lg:flex-col" />

          {/* Right Image */}
          <div className="group md:h-screen h-[70vh]  overflow-hidden relative">
            {/* -------- Empty Div --------- */}
            <div
              className={cn(
                "h-0 absolute transition-all bg-snow duration-1000 z-30 w-full",
                show ? "show" : "",
                imageIndex == 0 ? "top-0" : "bottom-0"
              )}
            />

            {/* -------- Image --------- */}
            <div
              className={cn(
                "overflow-hidden absolute top-0 z-10 transition-all duration-1000 ease-in",
                imageIndex == 0 ? "opacity-0" : ""
              )}
            >
              <Image
                src="/assets/hero3.jpg?height=600&width=500"
                alt="Left decorative image"
                width={500}
                height={600}
                className="object-cover transition-all duration-1000 group-hover:scale-110"
              />
            </div>

            <div
              className={cn(
                " overflow-hidden absolute top-0 z-10 transition-all duration-1000 ease-in",
                imageIndex == 1 ? "opacity-0" : ""
              )}
            >
              <Image
                src="/assets/hero4.jpg?height=600&width=500"
                alt="Left decorative image"
                width={500}
                height={600}
                className="object-cover transition-all duration-1000 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
