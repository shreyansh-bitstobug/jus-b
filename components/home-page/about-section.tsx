import { syne } from "@/lib/direct-fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-10 relative flex flex-col items-center lg:flex-row justify-between">
      {/* Belt in the background */}
      <div
        className={cn(
          "flex absolute -z-10 top-20 lg:text-7xl md:text-6xl text-4xl gap-24 font-black text-stroke  w-full overflow-hidden",
          syne.className
        )}
      >
        <h1 className="belt">Redefine Your Style!</h1>
        <h1 className="belt">Redefine Your Style!</h1>
        <h1 className="belt">Redefine Your Style!</h1>
      </div>

      {/* Left Side */}
      <div className="lg:mt-96 mt-36 ml-10 flex gap-8 items-center flex-wrap justify-center">
        <Image src="/assets/about-floating_image-1.png" alt="About Section" width={500} height={500} />
        <div className=" max-w-md space-y-2">
          <h4 className="text-penn-red text-xl uppercase">Shop Our Best Collections</h4>
          <h2 className={cn("text-5xl font-semibold", syne.className)}>Curated Fashion, Tailored For You</h2>
          <p className="">Explore our handpicked selections for a perfect blend of elegance and uniqueness.</p>

          <Link href="/products" className=" flex items-center gap-1 text-penn-red group text-sm w-fit">
            <span className="border-t-2 w-4 border-penn-red transition-all duration-700 group-hover:w-8" /> Explore more
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative mr-10 rounded-full h-[550px] w-[350px] lg:scale-100 scale-75">
        {/* Floating Image */}
        <div className="rounded-full overflow-hidden h-[550px] w-[350px]">
          <Image
            src="/assets/about-floating_image.png"
            alt="Floating Image"
            className="object-cover h-[600px] w-[400px]"
            width={1000}
            height={2000}
          />
        </div>

        {/* Floating Logo Animation */}
        <Image
          src="/assets/round-jus-b-logo.png"
          className="z-40 absolute top-1/2 -left-20 custom-spin"
          alt="Floating Logo Animation"
          width={170}
          height={170}
        />
      </div>
    </section>
  );
}
