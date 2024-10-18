"use client";

// Next Components and Hooks
import Link from "next/link";

// Icons
import { ChevronRight } from "lucide-react";

// UI Components
import ProductCard from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import MidSection from "@/components/home-page/mid-section";

// Components
import HeroSection from "@/components/home-page/hero-section";
import AnimatedLinkBelt from "@/components/home-page/old-link-belt";

// Data
import Popup from "../popup";
import CardStack from "@/components/home-page/scroll-section/scroll-based-div";
import { Product } from "@/lib/schema";
import { useEffect, useState } from "react";
import MobileProductCard from "../product/mobile-product-card";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex-1">
      <Popup />
      {/* Hero Section */}
      <HeroSection />

      {/* Animated Link Belt */}
      <AnimatedLinkBelt />

      <CardStack />

      {/* Luxe Section as 1 Large Image and 4 Product Cards */}
      <MidSection products={products} />

      {/* ---------------- */}
      <hr className="border-penn-red full mx-auto border-t-2" />

      {/* Partywear Section */}
      <section className="w-full py-6 md:py-12 lg:py-16">
        {/* Header Section */}
        <div className="space-y-4 flex flex-col items-center">
          <h3 className=" font-bold  md:text-5xl text-3xl  text-center">Elegant Partywear Collection</h3>
          <p className="text-center md:text-lg text-neutral-600 max-w-[800px] p-4">
            Jus-B by JB&apos;s partywear collection is designed to make every woman shine at any event. With stunning
            designs and luxurious fabrics, our dresses ensure you stand out in style. Discover high-quality, affordable
            options that perfectly blend elegance and modern trends, making Jus-B your ultimate choice for unforgettable
            party outfits.
          </p>
        </div>

        {/* Product Grid */}
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 mt-8 sm:grid-cols-[repeat(auto-fit,minmax(308px,1fr))] grid-cols-2 justify-items-center">
            {products
              ?.filter((product) => product.category === "Jus-B Partywear")
              .slice(0, 4)
              .map(({ name, price, id, images, sizes, category }) => (
                <>
                  <ProductCard
                    name={name}
                    price={price}
                    key={id}
                    id={id}
                    image={images[0]}
                    sizes={sizes}
                    category={category}
                    className="sm:block hidden"
                  />
                  <MobileProductCard
                    name={name}
                    price={price}
                    key={id}
                    id={id}
                    image={images[0]}
                    sizes={sizes}
                    category={category}
                    className="sm:hidden"
                  />
                </>
              ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center flex-col mt-12 gap-4 px-4">
          <div className="text-center">
            <h3 className="font-bold text-2xl">Just-JB Partywear</h3>
            <p className="text-neutral-600">Shop the latest collection of high-quality fashion essentials</p>
          </div>
          <Link href="/shop/jus-b-partywear">
            <Button>
              View All Products
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
