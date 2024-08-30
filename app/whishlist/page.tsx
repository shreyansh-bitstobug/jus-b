"use client";
import ProductCard from "@/components/product/product-card";
import { useWishlistStore } from "@/hooks/use-store";
import { products } from "@/public/assets/data";
import { useEffect, useState } from "react";
import { ProductType } from "@/lib/types";

export default function WishlistPage() {
  const [filteredArray, setFilteredArray] = useState<ProductType[]>(products);
  const { wishlist } = useWishlistStore();
  const wishlistArray = Array.from(wishlist);

  useEffect(() => {
    setFilteredArray(products.filter((product) => wishlistArray.includes(product.id)));
  }, []);

  return (
    <main className="p-6 h-full">
      <h1>Wishlist</h1>
      <div className="grid gap-4 mt-8 grid-cols-[repeat(auto-fit,minmax(308px,1fr))] justify-items-center">
        {filteredArray.map((item) => (
          <ProductCard key={item.id} {...item} image={item.image[0]} />
        ))}
      </div>
    </main>
  );
}
