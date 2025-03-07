// Dependencies
import { useEffect, useState } from "react";

// Components
import Link from "next/link";

// Icons
import { ChevronRight } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/product-card";

// Schema
import { Product } from "@/lib/schema";
import MobileProductCard from "../product/mobile-product-card";

export default function MidSection({ products }: { products: Product[] }) {
  const [luxeProducts, setLuxeProducts] = useState<Product[]>([]);

  // Get the luxe products
  useEffect(() => {
    const fetchProducts = () => {
      const luxe = products.filter((product: Product) => product.category === "Jus-B Luxe");
      setLuxeProducts(luxe);
    };

    fetchProducts();
  }, [products]);

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
      <div className="grid gap-6 lg:grid-cols-2 justify-items-center">
        {/* One Large Image */}
        <div className=" md:h-full h-[70vh] overflow-hidden lg:row-span-3">
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

        <div className="grid grid-cols-2 gap-4">
          {/* Four Product Cards */}
          {luxeProducts?.slice(0, 6).map(({ name, price, id, images, sizes, category }) => (
            <>
              <ProductCard
                key={id}
                name={name}
                price={price}
                image={images[0]}
                id={id}
                sizes={sizes}
                category={category}
                className="sm:block hidden"
              />

              <MobileProductCard
                key={id}
                name={name}
                price={price}
                image={images[0]}
                id={id}
                sizes={sizes}
                category={category}
                className="sm:hidden block"
              />
            </>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center flex-col mt-8 gap-4 px-4">
        <div className="text-center">
          <h3 className="font-bold text-2xl">Jus-B Luxe</h3>
          <p className="text-neutral-600">Shop the latest collection of high-quality luxurious fashion essentials</p>
        </div>
        <Link href="/shop/jus-b-luxe">
          <Button>
            View All Products
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
