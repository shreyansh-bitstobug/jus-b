"use client";

import ProductPage from "@/components/product/product-page";
import { usePathname } from "next/navigation";

export default function Product() {
  const url = usePathname();
  const parts = url.split("/");

  const category = parts[parts.length - 2]; // Cate
  const productId = parts[parts.length - 1];

  return (
    <main>
      <ProductPage productId={productId} />
    </main>
  );
}
