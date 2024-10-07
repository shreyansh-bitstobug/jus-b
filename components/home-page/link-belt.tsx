"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import _ from "lodash";
import Image from "next/image";
import ParallaxText from "../parallax-text";
import { getCategories } from "@/lib/functions";
import { useCategoriesStore } from "@/hooks/use-store";

const CategoryBelt = ({ categories }: { categories: string[] }) => {
  return (
    <div className="flex gap-4 belt">
      {categories.map((category) => (
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
  );
};

export default function AnimatedLinkBelt() {
  const { categories } = useCategoriesStore();

  getCategories();

  return (
    <ParallaxText baseVelocity={5}>
      <CategoryBelt categories={categories as string[]} />
    </ParallaxText>
  );
}
