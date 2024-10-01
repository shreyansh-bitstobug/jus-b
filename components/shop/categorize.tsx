"use client";

import { useEffect, useState } from "react";
import ProductCard from "../product/product-card";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import _ from "lodash";
import { Product } from "@/lib/schema";

export default function CategoryPage() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const categories = products?.map((product) => product.category);
  const uniqueCategories = Array.from(new Set(categories));

  return (
    <section className="flex flex-col gap-8 py-8">
      {uniqueCategories.map((category) => (
        <div key={category} className="container">
          <div className="flex justify-between items-center bg-neutral-400/10 rounded-lg px-4 py-2 mb-4">
            <h1 className="text-2xl font-bold text-penn-red ">{category}</h1>
            <Link href={`/shop/${_.kebabCase(category)}`}>
              <Button variant="outline" className="font-semibold">
                View all <ArrowRightIcon size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className=" flex flex-wrap gap-4">
            {products
              ?.filter((product) => product.category === category)
              .map((product, index) =>
                index < 4 ? (
                  <ProductCard
                    key={index}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    id={product.id}
                    sizes={product.sizes}
                    category={product.category}
                  />
                ) : null
              )}
          </div>
        </div>
      ))}
    </section>
  );
}
