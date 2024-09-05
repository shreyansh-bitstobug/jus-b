"use client";

// Next Components and Hooks
import Image from "next/image";

// Utils and Hooks
import { cn } from "@/lib/utils";

// Data
import { products, shopBanner } from "@/public/assets/data";

// UI Components
import ProductCard from "../product/product-card";

export default function ShopPage() {
  return (
    <main className="flex-grow">
      {/* Image Hero */}
      <div className="w-full overflow-hidden md:h-96 sm:h-72 h-52 flex items-center justify-center relative">
        <Image src={shopBanner} fill alt="Product" className="object-cover brightness-[0.3] -z-10 w-screen" />
        <h1 className={cn("absolute text-center text-white lg:text-7xl md:text-5xl text-4xl px-4  font-bold")}>
          Shop your heart out
        </h1>
      </div>

      {/* Product Grid */}
      <div className="container py-4 flex flex-wrap gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            image={product.image[0]}
            id={product.id}
            sizes={product.sizes}
          />
        ))}
      </div>
    </main>
  );
}
