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
import MobileProductCard from "../product/mobile-product-card";

export default function ShopPage() {
  const [sortedProducts, setSortedProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);
  const [shopBy, setShopBy] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
  
      // Sort products by `createdAt` in descending order (newest first)
      const sorted = data.products.sort((a: Product, b: Product) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  
      setSortedProducts(sorted);
      setLoading(false);
    };
  
    fetchProducts();
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
        <Tabs defaultValue={shopBy} className=" ">
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
            <div className="sm:px-24 px-8">
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
          </TabsContent>
          <TabsContent value="categorize">
            <CategorizePage />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
