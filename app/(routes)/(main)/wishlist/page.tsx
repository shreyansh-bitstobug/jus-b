"use client";
// Dependencies
import { useEffect, useState } from "react";

// Hooks for Store
import { useWishlistStore } from "@/hooks/use-store";

// Data
import { products } from "@/public/assets/data";

// Types
import { ProductType } from "@/lib/types";

// Components
import ProductCard from "@/components/product/product-card";

export default function WishlistPage() {
  // State
  const [filteredArray, setFilteredArray] = useState<ProductType[]>(products);

  // Store Hooks
  const { wishlist } = useWishlistStore();
  const wishlistArray = Array.from(wishlist); // Convert the wishlist set to an array

  // Filter the products based on the wishlist array
  useEffect(() => {
    setFilteredArray(products.filter((product) => wishlistArray.includes(product.id)));
  }, []);

  return (
    <main className="p-6 h-full">
      <h1 className="">Wishlist</h1>
      <div className="grid gap-4 mt-8 grid-cols-[repeat(auto-fit,minmax(308px,1fr))] justify-items-center">
        {filteredArray.map((item) => (
          <ProductCard key={item.id} {...item} image={item.image[0]} />
        ))}
      </div>
    </main>
  );
}
