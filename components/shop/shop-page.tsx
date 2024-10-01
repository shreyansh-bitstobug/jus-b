"use client";

// Next Components and Hooks
import Image from "next/image";

// Utils and Hooks
import { cn } from "@/lib/utils";

// Data
import { products, shopBanner } from "@/public/assets/data";

// UI Components
import ProductCard from "@/components/product/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryPage from "./categorize";
import SortingButton from "../sorting-button";
import { useState, useEffect } from "react";
import { Product } from "@/lib/schema";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>();
  const [sortedProducts, setSortedProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
      setSortedProducts(data.products);
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
            <div className="container py-4 flex flex-wrap gap-4">
              {sortedProducts?.map((product, index) => (
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
            <CategoryPage />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
