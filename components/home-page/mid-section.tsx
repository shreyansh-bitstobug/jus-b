// Components
import Link from "next/link";

// Icons
import { ChevronRight } from "lucide-react";

// UI Components
import { Button } from "../ui/button";
import ProductCard from "../product/product-card";
import { Product } from "@/lib/schema";
import { useEffect, useState } from "react";

export default function MidSection() {
  const [luxeProducts, setLuxeProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      const luxe = await data.products.filter((product: Product) => product.category === "Jus-B Luxe");
      console.log("Luxe", luxe);
      setLuxeProducts(luxe);
    };

    fetchProducts();
  }, []);

  // Get the luxe products

  return (
    <section className="py-6 md:py-12 lg:py-16 px-6">
      {/* Header */}
      <div className="space-y-4 flex flex-col items-center px-6 pb-6">
        {/* Heading */}
        <h3 className=" font-bold  md:text-5xl text-3xl  text-center">Modern Women&apos;s Stylist</h3>

        {/* Subheading */}
        <p className="md:text-lg text-neutral-600 max-w-[800px] text-center">
          Jus-B by JB&apos;s collection empowers modern women to express their unique style and feel confident in every
          look. Offering high-quality fashion at affordable prices, Jus-B is the go-to destination for all women&apos;s
          fashion essentials.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_308px_308px] justify-items-center">
        {/* One Large Image */}
        <div className=" md:h-full h-[70vh]  overflow-hidden md:col-span-2 lg:col-span-2 lg:row-span-3">
          <div className="max-w-[700px] w-full md:h-full h-[70vh] overflow-hidden">
            <video
              src="./assets/products/13.mp4"
              className="w-full object-cover"
              width={1000}
              height={500}
              autoPlay
              loop
              muted
            />
          </div>
        </div>

        {/* Four Product Cards */}
        {luxeProducts.slice(0, 6).map(({ name, price, id, images, sizes, category }) => (
          <ProductCard key={id} name={name} price={price} image={images[0]} id={id} sizes={sizes} category={category} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center flex-col mt-8 gap-4 px-4">
        <div className="text-center">
          <h3 className="font-bold text-2xl">Jus-B Luxe</h3>
          <p className="text-neutral-600">Shop the latest collection of high-quality luxurious fashion essentials</p>
        </div>
        <Link href="/shop">
          <Button>
            View All Products
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
