"use client";

// Dependencies
import { useState, useEffect } from "react";

// Next Components and Hooks
import Image from "next/image";

// Utils and Hooks
import { cn } from "@/lib/utils";

// Data
import { shopBanner } from "@/public/assets/data";
import { Product } from "@/lib/schema";

// UI Components
import ProductCard from "@/components/product/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SortingButton from "@/components/sorting-button";
import { Skeleton } from "@/components/ui/skeleton";
import CategorizePage from "./categorize";

export default function ShopPage() {
  const [sortedProducts, setSortedProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setSortedProducts(data.products);
    };

    fetchProducts();
    setLoading(false);
  }, []);

  return (
    <main className="flex-grow">
      {/* Image Hero */}
      <section className="w-full overflow-hidden md:h-96 sm:h-72 h-52 flex items-center justify-center relative">
        <Image src={shopBanner} fill alt="Product" className="object-cover brightness-[0.3] -z-10 w-screen" />
        <h1 className={cn("absolute text-center text-white lg:text-7xl md:text-5xl text-4xl px-4  font-bold")}>
          Shop your heart out
        </h1>
      </section>

      <section className="flex items-center justify-center py-8 ">
        <Tabs defaultValue="all" className=" ">
          <TabsList className=" block w-fit mx-auto scale-125 bg-black/10">
            <TabsTrigger value="all" className="">
              All
            </TabsTrigger>
            <TabsTrigger value="categorize" className="">
              Categorize
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="flex flex-col items-end">
            {/* All Product Grid */}
            <div className="px-24">
              <SortingButton products={sortedProducts || []} setSortedProducts={setSortedProducts} />
            </div>
            <div className="container py-4 flex flex-wrap gap-4 justify-center">
              {loading
                ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i_, index) => (
                    <Skeleton key={index} className="w-[308px] h-[396px] bg-muted-foreground/20" />
                  ))
                : sortedProducts?.map((product, index) => (
                    <ProductCard
                      key={index}
                      name={product.name}
                      price={product.price}
                      image={product.images[0]}
                      id={product.id}
                      sizes={product.sizes}
                      category={product.category}
                    />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="categorize">
            <CategorizePage />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
