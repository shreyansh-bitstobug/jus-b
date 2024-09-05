import Link from "next/link";
import { Button } from "../ui/button";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative border-b-2 border-penn-red md:pb-0 pb-5">
      <div className="container min-h-screen space-y-6">
        <div className="grid sm:grid-cols-2 gap-8 lg:grid-cols-3 lg:items-center">
          {/* Left Image - Hidden on small and medium screens */}
          <div className=" shadow-lg md:h-full h-[70vh] overflow-hidden">
            <Image
              src="/assets/hero1.jpg?height=600&width=500"
              alt="Left decorative image"
              width={500}
              height={600}
              className="object-cover transition-all duration-1000 hover:scale-110"
            />
          </div>

          {/* Center Content */}
          <div className=" hidden  px-8 md:flex md:flex-col justify-center items-center space-y-4">
            <div className="md:space-y-4 flex flex-col lg:items-start items-center">
              <h1 className="text-3xl min-h-[72px] text-center font-bold uppercase tracking-tighter sm:text-5xl xl:text-6xl/none xl:min-h-[120px]">
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    "Trendy",
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    "Modern",
                    1000,
                    "Amazing",
                    1000,
                    "Stylist",
                    1000,
                  ]}
                  wrapper="span"
                  speed={20}
                  repeat={Infinity}
                  className="w-full"
                />
                <span className="font-normal text-penn-red text-4xl">
                  <br />
                  designer collection
                </span>
              </h1>

              <p className="   text-muted-foreground text-center">
                <b className="text-black">Jus-B by JB</b> is an online fashion boutique offering trendy, modern styles
                for women. From chic dresses to stylish tops, their collection features the latest designs, blending
                quality and affordability for the modern woman&#x27;s wardrobe.
              </p>
            </div>

            {/* CTA */}
            <div className=" flex flex-col items-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="text-lg font-bold">
                  Shop Now
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg bg-snow hover:bg-neutral-300/20 border-2 border-black font-bold"
                >
                  Shop By Categories
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="shadow-lg md:h-full h-[70vh]  overflow-hidden">
            <Image
              src="/assets/hero2.jpg?height=600&width=500"
              alt="Right decorative image"
              width={500}
              height={600}
              className="object-cover transition-all duration-1000 hover:scale-110"
            />
          </div>
        </div>

        {/* Center Content (for medium screen sizes) */}
        <div className="md:hidden px-8 flex flex-col justify-center items-center space-y-4">
          <div className="md:space-y-4 flex flex-col lg:items-start items-center">
            <h1 className="text-3xl min-h-[72px] text-center font-bold uppercase tracking-tighter sm:text-5xl xl:text-6xl/none xl:min-h-[120px]">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Trendy",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "Modern",
                  1000,
                  "Amazing",
                  1000,
                  "Stylist",
                  1000,
                ]}
                wrapper="span"
                speed={20}
                repeat={Infinity}
                className="w-full"
              />
              <span className="font-normal text-penn-red text-4xl">
                <br />
                designer collection
              </span>
            </h1>

            <p className="   text-muted-foreground text-center">
              <b className="text-black">Jus-B by JB</b> is an online fashion boutique offering trendy, modern styles for
              women. From chic dresses to stylish tops, their collection features the latest designs, blending quality
              and affordability for the modern woman&#x27;s wardrobe.
            </p>
          </div>

          {/* CTA */}
          <div className=" flex flex-col items-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="text-lg font-bold">
                Shop Now
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                size="lg"
                variant="outline"
                className="text-lg bg-snow hover:bg-neutral-400/20 border-2 border-black font-bold"
              >
                Shop By Category
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
