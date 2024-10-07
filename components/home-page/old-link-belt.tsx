"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import _ from "lodash";
import { getCategories } from "@/lib/functions";

export default function AnimatedLinkBelt() {
  const [categories, setCategories] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset + 1) % 100);
    }, 300);

    return () => clearInterval(animationInterval);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesFetched = await getCategories();
      setCategories(categoriesFetched ?? []);
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full overflow-hidden py-6 bg-snow border-b-2 border-penn-red">
      <div
        className="flex whitespace-nowrap"
        style={{
          transform: `translateX(-${offset}%)`,
          transition: "transform 0.4s linear",
        }}
      >
        {[...Array(10)].map((i, index) => (
          <div key={index} className="flex">
            {categories?.map((category) => (
              <Link
                key={category}
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
