// Components
import Image from "next/image";
import Link from "next/link";

// Icons
import { ChevronRight } from "lucide-react";

// UI Components
import { Button } from "../ui/button";
import ProductCard from "../product/product-card";

// Data
import { products } from "@/public/assets/data";

export default function MidSection() {
  // Get the luxe products
  const luxeProducts = products.filter((product) => product.category === "Just-JB Luxe");

  return (
    <section className="py-6 md:py-12 lg:py-16">
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
        <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
          <Link href={`/shop/partywear/${luxeProducts[5].id}`} className="h-full w-full max-w-lg overflow-hidden">
            <Image
              src={luxeProducts[5].image[1]}
              alt="Luxe featured Product"
              className="md:h-full h-[70vh] w-full object-cover"
              width={1000}
              height={1000}
            />
          </Link>
        </div>

        {/* Four Product Cards */}
        {luxeProducts.slice(0, 4).map(({ name, price, id, image, sizes, category }) => (
          <ProductCard key={id} name={name} price={price} image={image[0]} id={id} sizes={sizes} category={category} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center flex-col mt-8 gap-4 px-4">
        <div className="text-center">
          <h3 className="font-bold text-2xl">Just-JB Luxe</h3>
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
