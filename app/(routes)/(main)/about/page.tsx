import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { shopBanner } from "@/public/assets/data";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-snow via-pink-50 to-snow">
      <div className="w-full overflow-hidden md:h-96 sm:h-72 h-52 flex items-center justify-center relative z-10">
        <Image src={shopBanner} fill alt="Product" className="object-cover brightness-[0.3] -z-10 w-screen" />
        <h1 className={cn("absolute text-center text-white lg:text-7xl md:text-5xl text-4xl px-4 font-bold")}>
          About Us
        </h1>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            Introducing Jus-B by JB, a women-led clothing brand that blends Western styles with beautiful Indian
            fabrics. We&#39;re here to meet the growing demand for trendy Indo-Western outfits, especially among young
            people. Our goal is to make fashion more personal by offering customized clothing. At Jus-B by JB, we
            believe in making every piece unique, so you can express your own style. Join us as we bring together the
            best of both worlds in fashion!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 justify-items-center items-center">
          <div className=" space-y-20">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Jolly Brar Vij</h2>
              <p className="text-gray-700">
                An independent and inspired fashion designer with an endless imagination. Jolly blends traditional
                Indian clothing with modern trendy styles. Her goal is to make an impact on the current fashion
                industry. Starting as a merchandiser / fashion designer, she has worked hard to make her dream a
                reality. Now settled in the UK, she continues to pursue her passion alongside her family.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Bharti Tanwar</h2>
              <p className="text-gray-700">
                A proud Delhite with a deep-seated love for fashion and clothing. After six years as an online retailer,
                Bharti is now establishing her own clothing brand alongside her lifelong friend, Jolly. Her vision is to
                dissolve the boundary between high fashion and affordability, making couture accessible to all. With
                unwavering dedication, she&#39;s poised to redefine the fashion landscape.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <Image
              src="/assets/founders/founder-1.jpg"
              alt="Bharti Tanwar"
              className="w-full h-screen object-cover rounded-lg shadow-md"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <Button variant="outline" className="rounded-full">
            <Instagram className="mr-2 h-4 w-4" /> Instagram
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              title: "Worldwide Shipping",
              description: "Experience the world in style - shop our collection and enjoy worldwide shipping.",
            },
            {
              title: "Best Quality",
              description: "Elevate your style with our premium quality clothing - where fashion meets perfection.",
            },
            {
              title: "Best Offers",
              description: "Don't miss out on our exclusive offers - shop now and save on your favorite styles!",
            },
            {
              title: "Secure Payments",
              description:
                "Shop with confidence - our secure payment options ensure your personal information is always protected.",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white/50 backdrop-blur-sm border-none shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
