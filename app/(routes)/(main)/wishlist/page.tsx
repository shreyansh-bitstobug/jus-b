"use client";
// Dependencies
import { useEffect, useState } from "react";

// Hooks for Store
import { useWishlistStore } from "@/hooks/use-store";

// Components
import ProductCard from "@/components/product/product-card";
import { Product } from "@/lib/schema";

export default function WishlistPage() {
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredArray, setFilteredArray] = useState<Product[]>([]);

  // Store Hooks
  const { wishlist } = useWishlistStore();
  const wishlistArray = Array.from(wishlist); // Convert the wishlist set to an array

  // Filter the products based on the wishlist array
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
      setFilteredArray(data.products.filter((product: Product) => wishlistArray.includes(product.id)));
    };
    fetchProducts();
  }, []);

  return (
    <main className="p-6 h-full">
      <h1 className="">Wishlist</h1>
      <div className="grid gap-4 mt-8 grid-cols-[repeat(auto-fit,minmax(308px,1fr))] justify-items-center">
        {filteredArray.map((item) => (
          <ProductCard key={item.id} {...item} image={item.images[0]} />
        ))}
      </div>
    </main>
  );
}
