"use client";

import { products, shopBanner } from "@/public/assets/data";
import _ from "lodash";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import SortingButton from "@/components/sorting-button";
import ProductCard from "@/components/product/product-card";

export default function CategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [sortedProducts, setSortedProducts] = useState(products);

  const categories = products.map((product) => product.category);
  const uniqueCategories = Array.from(new Set(categories));
  const url = usePathname();

  useEffect(() => {
    const categoryInUrlArr = url.split("/");
    const categoryInUrl = categoryInUrlArr[categoryInUrlArr.length - 1];
    const name = uniqueCategories.find((category) => _.kebabCase(category) === categoryInUrl);

    const filteredProducts = products.filter((product) => product.category === name);
    filteredProducts.length > 0 && setSortedProducts(filteredProducts);

    name && setCategoryName(name);
  }, []);

  return (
    <main className="flex-grow">
      {/* Image Hero */}
      <section className="w-full overflow-hidden md:h-96 sm:h-72 h-52 flex items-center justify-center relative">
        <Image src={shopBanner} fill alt="Product" className="object-cover brightness-[0.3] -z-10 w-screen" />
        <h1 className={cn("absolute text-center text-white lg:text-7xl md:text-5xl text-4xl px-4  font-bold")}>
          {categoryName}
        </h1>
      </section>

      <section className="container flex flex-col items-end justify-center py-8 ">
        {/* All Product Grid */}
        <div className="px-14">
          <SortingButton products={sortedProducts} setSortedProducts={setSortedProducts} />
        </div>
        <div className=" py-4 grid sm:grid-cols-2 grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              image={product.image[0]}
              id={product.id}
              sizes={product.sizes}
              category={product.category}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
