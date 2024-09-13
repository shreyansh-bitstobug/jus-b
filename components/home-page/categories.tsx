"use client";

import { useEffect, useState } from "react";

import { products } from "@/public/assets/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { syne } from "@/lib/direct-fonts";

export default function Categories() {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const categories = products.reduce((acc: string[], product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, []);
    categories.push("View All");
    setCategories(categories);
  }, [products]);

  return (
    <section className="container py-6 space-y-10">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl text-center text-penn-red">Discover Timeless Elegance</h1>
        <p className={cn("text-center text-5xl font-bold max-w-[900px] leading-snug text-neutral-800", syne.className)}>
          Because you deserve style that speaks Effortlessly!.
        </p>
      </div>

      <div className="flex justify-around flex-wrap gap-5">
        {categories.map((category, index) => (
          <Link key={index} href={category === "View All" ? "/shop/categories" : `/shop/${_.kebabCase(category)}`}>
            <div
              className={cn(
                index === 0
                  ? " rounded-ss-[25%]"
                  : index === 1
                  ? " rounded-ee-[25%]"
                  : index === 2
                  ? " rounded-se-[25%]"
                  : "rounded-es-[25%]",
                "overflow-hidden  h-[60vh] w-72"
              )}
            >
              <Image
                src={`/assets/category/${category}.png`}
                alt={category}
                width={800}
                height={900}
                className="object-cover h-[60vh] hover:scale-125 transition-all duration-1000"
              />
            </div>
            <p className=" text-xl font-medium md:pt-4 pt-1 text-center">{category}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
