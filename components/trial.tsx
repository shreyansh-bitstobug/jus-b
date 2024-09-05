import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TrialPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-3 lg:items-center max-h-screen">
          {/* Left Image - Hidden on small and medium screens */}
          <div className=" shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=400"
              alt="Left decorative image"
              width={400}
              height={600}
              className="object-cover transition-all duration-1000 hover:scale-110"
            />
          </div>

          {/* Center Content */}
          <div className="text-center lg:block hidden lg:col-span-1">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Welcome to Our Store
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">Discover the latest trends in fashion and accessories.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg">Shop Now</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=400"
              alt="Right decorative image"
              width={400}
              height={600}
              className="object-cover transition-all duration-1000 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
