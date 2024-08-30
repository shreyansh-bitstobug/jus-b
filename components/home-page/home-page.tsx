"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import ProductCard from "../product/product-card";
import { products } from "@/public/assets/data";
import MidSection from "./mid-section";

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="w-full pt pb-8 lg:pb-16 xl:pb-20 bg-muted">
        <div className=" ">
          <div className="grid gap-6 lg:text-left text-justify lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <Image
              alt="Hero image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover md:w-full lg:order-last lg:aspect-square"
              height="550"
              src="/assets/hero1.jpg?height=550&width=550"
              width="550"
            />
            <div className=" px-8 flex flex-col justify-center lg:items-start items-center space-y-4">
              <div className="md:space-y-4 flex flex-col lg:items-start items-center">
                <h1 className="text-3xl min-h-[72px] font-bold uppercase tracking-tighter sm:text-5xl xl:text-6xl/none xl:min-h-[120px]">
                  <TypeAnimation
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "Trendy",
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      "Modern",
                      1000,
                      "Amazing",
                      1000,
                      "Stylist",
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="w-full"
                  />
                  <span className="font-normal text-penn-red">designer collection</span>
                </h1>
                <p className="max-w-[600px] sm:w-[calc(100vw-10%)]  text-muted-foreground md:text-lg">
                  <b className="text-black">Jus-B by JB</b> is a online fashion boutique that offers a modern and trendy
                  style for women. From chic dresses to stylish tops, their collection features the latest fashion
                  trends and contemporary designs that are perfect for any occasion. With a focus on quality and
                  affordability, Jus-B offers a unique shopping experience that caters to the modern woman’s fashion
                  needs.
                </p>
              </div>
              <div>
                <Link href="/shop">
                  <Button size="lg">Shop Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-neutral-400 w-11/12 mx-auto" />

      <MidSection />

      <hr className="border-neutral-400 w-11/12 mx-auto" />

      {/*  */}
      <section className="w-full py-6 md:py-12 lg:py-16">
        <div className="space-y-4 flex flex-col items-center">
          <h3 className=" font-bold  md:text-5xl text-3xl  text-center">Elegant Partywear Collection</h3>
          <p className="text-center md:text-lg text-neutral-600 max-w-[800px] p-4">
            Jus-B by JB&apos;s partywear collection is designed to make every woman shine at any event. With stunning
            designs and luxurious fabrics, our dresses ensure you stand out in style. Discover high-quality, affordable
            options that perfectly blend elegance and modern trends, making Jus-B your ultimate choice for unforgettable
            party outfits.
          </p>
        </div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 mt-8 grid-cols-[repeat(auto-fit,minmax(308px,1fr))] justify-items-center">
            {products.slice(0, 4).map(({ name, price, id, image, sizes }) => (
              <ProductCard name={name} price={price} key={id} id={id} image={image[0]} sizes={sizes} />
            ))}
          </div>
        </div>
        <div className="flex items-center flex-col mt-12 gap-4 px-4">
          <div className="text-center">
            <h3 className="font-bold text-2xl">Just-JB Partywear</h3>
            <p className="text-neutral-600">Shop the latest collection of high-quality fashion essentials</p>
          </div>
          <Link href="/shop">
            <Button>
              View All Products
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
