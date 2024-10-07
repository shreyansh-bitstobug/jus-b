"use client";
// Dependencies
import { useEffect, useState } from "react";

// Hooks for Store
import { useWishlistStore } from "@/hooks/use-store";

// Components
import ProductCard from "@/components/product/product-card";
import { Product } from "@/lib/schema";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

export default function WishlistPage() {
  // State
  const [filteredArray, setFilteredArray] = useState<Product[]>([]);

  // Hooks
  const { wishlist } = useWishlistStore();
  const [user, loading, error] = useAuthState(auth);

  // Filter the products based on the wishlist array
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();

      let wishlistArray: string[] = [];

      if (!loading) {
        if (!user) {
          wishlistArray = Array.from(wishlist);
        } else {
          const response = await fetch("/api/wishlist/" + user?.uid);
          wishlistArray = await response.json().then((data) => data.wishlist.items);
        }
      }

      const wishlistItems = data.products.filter((product: Product) => wishlistArray.includes(product.id));
      setFilteredArray(wishlistItems);
    };
    fetchProducts();
  }, [wishlist, user, loading]);

  return (
    <main className="container py-6 h-full">
      <h1 className="text-3xl font-semibold">Wishlist</h1>
      <div className="grid gap-4 mt-8 grid-cols-[repeat(auto-fit,minmax(308px,1fr))] justify-items-center">
        {filteredArray.map((item) => (
          <ProductCard key={item.id} {...item} image={item.images[0]} />
        ))}
      </div>
    </main>
  );
}
