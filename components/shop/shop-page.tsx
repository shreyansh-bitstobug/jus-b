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
import CategoryPage from "./category-page";

export default function ShopPage() {
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
        <Tabs defaultValue="categorize" className=" ">
          <TabsList className=" block w-fit mx-auto scale-125 bg-black/10">
            <TabsTrigger value="all" className="">
              All
            </TabsTrigger>
            <TabsTrigger value="categorize" className="">
              Categorize
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {" "}
            {/* All Product Grid */}
            <div className="container py-4 flex flex-wrap gap-4">
              {products.map((product, index) => (
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
          </TabsContent>
          <TabsContent value="categorize">
            <CategoryPage />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
