"use client";

import { shopBanner } from "@/public/assets/data";
import _ from "lodash";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import SortingButton from "@/components/sorting-button";
import ProductCard from "@/components/product/product-card";
import { Product } from "@/lib/schema";
import { Skeleton } from "@/components/ui/skeleton";
import MobileProductCard from "../product/mobile-product-card";

export default function CategoryPage() {
  const [sortedProducts, setSortedProducts] = useState<Product[]>();
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const url = usePathname();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      const products = data.products;

      // Get unique categories
      const filteredCategories = products?.map((product: Product) => product.category);
      const uniqueCategories = Array.from(new Set(filteredCategories));

      // Get category name from URL
      const categoryInUrlArr = url.split("/");
      const categoryInUrl = categoryInUrlArr[categoryInUrlArr.length - 1];

      // Find category name from unique categories
      const name = uniqueCategories.find((category) => _.kebabCase(category as string) === categoryInUrl);

      // Filter products by category
      const filteredProducts = products?.filter((product: Product) => product.category === name);

      // Set products if there are any
      filteredProducts && filteredProducts.length > 0 && setSortedProducts(filteredProducts);

      console.log("filteredProducts", filteredProducts);
      console.log("name", name);

      name && setCategoryName(name as string);
    };

    // Fetch products from API and set them to state on component mount
    fetchProducts();
    setLoading(false);
  }, [url]);

  return (
    <main className="flex-grow">
      {/* Image Hero */}
      <section className="w-full overflow-hidden md:h-96 sm:h-72 h-52 flex items-center justify-center relative">
        <Image src={shopBanner} fill alt="Product" className="object-cover brightness-[0.3] -z-10 w-screen" />
        <h1 className={cn("absolute text-center text-white lg:text-7xl md:text-5xl text-4xl px-4  font-bold")}>
          {categoryName}
        </h1>
      </section>

      <section className="flex flex-col sm:items-end justify-center py-8 ">
        {/* All Product Grid */}
        <div className="sm:px-14 px-8">
          <SortingButton products={sortedProducts || []} setSortedProducts={setSortedProducts} />
        </div>
        <div className="sm:container px-4 py-4 grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2  gap-4 justify-center justify-items-center">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i_, index) => (
                <Skeleton
                  key={index}
                  className="sm:w-[308px] sm:h-[396px] w-[174px] h-[240px] bg-muted-foreground/20"
                />
              ))
            : sortedProducts?.map((product, index) => (
                <>
                  <ProductCard
                    key={index}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    id={product.id}
                    sizes={product.sizes}
                    category={product.category}
                    className="sm:block hidden"
                  />
                  <MobileProductCard
                    key={index}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    id={product.id}
                    sizes={product.sizes}
                    category={product.category}
                    className="sm:hidden"
                  />
                </>
              ))}
        </div>
      </section>
    </main>
  );
}
