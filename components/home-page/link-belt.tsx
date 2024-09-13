"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/public/assets/data";
import _ from "lodash";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AnimatedLinkBelt() {
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => setActive(true), []); // Set active to true on mount to trigger animation

  useEffect(() => {
    const categories = products.reduce((acc: string[], product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, []);
    setCategories(categories);
  }, [products]);

  return (
    <div className="w-full overflow-hidden py-8 bg-snow border-b-2 border-penn-red">
      <div className={cn("flex whitespace-nowrap ", active ? "active" : "")}>
        {[...Array(4)].map((i, index) => (
          <div key={index} className="flex gap-4 belt">
            {categories.map((category) => (
              <Link
                key={category + index}
                href={`/shop/${_.kebabCase(category)}`}
                className="text-neutral-800 px-8 mr-8 hover:text-penn-red transition-all flex items-center gap-2"
              >
                <Image
                  className=""
                  src={`/assets/category/icons/${_.kebabCase(category)}.png`}
                  alt={category}
                  width={50}
                  height={50}
                />
                {category}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
