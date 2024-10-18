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

export default function MobileProductCard({
  name,
  price,
  image,
  id,
  sizes,
  category,
  className,
}: {
  name: string;
  price: number;
  image: string;
  id: string;
  sizes: string[];
  category: string;
  className?: string;
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
    <div
      className={cn(
        "group relative overflow-hidden rounded-sm shadow-sm w-[174px] h-[240px] transition-all duration-300 bg-white",
        className
      )}
    >
      {/* Image Section of Card */}
      <Link href={`/shop/${_.kebabCase(category)}/${id}`} className="block relative">
        <Image
          alt={name}
          className="object-cover object-top w-full h-48 transition-all group-hover:scale-105"
          height="192"
          placeholder="blur"
          blurDataURL="/assets/placeholder.svg"
          src={`${image ?? "/assets/placeholder.svg"}`}
          width="192"
        />

        {/* Category Badge */}
        <Badge className="absolute top-1 left-1 scale-75 bg-white text-neutral-800 hover:bg-neutral-100">
          {category}
        </Badge>

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-1 right-1 rounded-full transition-opacity scale-75"
          onClick={handleWishlist}
        >
          <Heart className={cn("h-5 w-5", isInWishlist(id) ? "fill-red-500 text-red-500" : "")} />
        </Button>
      </Link>

      {/* Description of Card */}
      <div className="p-2 flex justify-between items-start">
        {/* Product Name and Price */}
        <div className="space-y-1">
          <h3 className="font-semibold leading-3 text-sm">{_.truncate(_.capitalize(name), { length: 15 })}</h3>
          <p className=" font-medium text-gray-400">{currencyPrice}</p>
        </div>

        {/* Cart Button */}
        <Link href={`/shop/${_.kebabCase(category)}/${id}`}>
          <BiCart className="w-6 h-6 hover:scale-110 transition-all" />
        </Link>
      </div>
    </div>
  );
}
