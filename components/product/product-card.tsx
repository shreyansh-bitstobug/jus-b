// Dependencies
import _ from "lodash";

// Next Components and Hooks
import Link from "next/link";
import Image from "next/image";

// Utilities
import { cn } from "@/lib/utils";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

// Hooks
import { useCurrencyStore, useWishlistStore } from "@/hooks/use-store";
import { useToast } from "@/components/ui/use-toast";

// Icons
import { Heart } from "lucide-react";
import { BiCart } from "react-icons/bi";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter } from "next/navigation";
import { formatCurrency, removeSlash } from "@/lib/functions";
import { useEffect, useState } from "react";

export default function ProductCard({
  name,
  price,
  image,
  id,
  sizes,
  category,
}: {
  name: string;
  price: number;
  image: string;
  id: string;
  sizes: string[];
  category: string;
}) {
  const [currencyPrice, setCurrencyPrice] = useState<string>();
  const { toast } = useToast();
  const [user] = useAuthState(auth);
  const { isInWishlist, removeFromWishlist, addToWishlist } = useWishlistStore();
  const url = removeSlash(usePathname());
  const router = useRouter();
  const { currency } = useCurrencyStore();

  useEffect(() => {
    const formatPrice = async () => {
      const formattedPrice = await formatCurrency(price, currency);
      setCurrencyPrice(formattedPrice);
    };
    formatPrice();
  }, [price, currency]);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      if (isInWishlist(id)) {
        removeFromWishlist(id, user?.uid);
        toast({ title: "Removed from wishlist", description: "This item has been removed from your wishlist" });
      } else {
        addToWishlist(id, user?.uid);
        toast({ title: "Added to wishlist", description: "This item has been added to your wishlist" });
      }
    } else {
      router.push(`/sign-in?redirect=${url}`);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-sm shadow-sm w-[308px] h-[396px] transition-all duration-300 bg-white">
      {/* Image Section of Card */}
      <Link href={`/shop/${_.kebabCase(category)}/${id}`} className="block relative">
        <Image
          alt={name}
          className="object-cover w-full h-80 transition-all group-hover:scale-105"
          height="320"
          placeholder="blur"
          blurDataURL="/assets/placeholder.svg"
          src={`${image ?? "/assets/placeholder.svg"}`}
          width="320"
        />

        {/* Category Badge */}
        <Badge className="absolute top-2 left-2 bg-white text-neutral-800 hover:bg-neutral-100">{category}</Badge>

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 rounded-full transition-opacity"
          onClick={handleWishlist}
        >
          <Heart className={cn("h-5 w-5", isInWishlist(id) ? "fill-red-500 text-red-500" : "")} />
        </Button>
      </Link>

      {/* Description of Card */}
      <div className="p-4 flex justify-between items-start">
        {/* Product Name and Price */}
        <div className="space-y-1">
          <h3 className="font-semibold leading-3">{_.truncate(name, { length: 25 })}</h3>
          <p className=" font-medium text-lg text-gray-400">&#8377;{currencyPrice}</p>
        </div>

        {/* Cart Button */}
        <Link href={`/shop/${_.kebabCase(category)}/${id}`}>
          <BiCart className="w-6 h-6 hover:scale-110 transition-all" />
        </Link>
      </div>
    </div>
  );
}
