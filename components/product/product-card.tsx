import { useEffect, useState } from "react";
import Image from "next/image";
import _ from "lodash";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CartItem, useCartStore, useWishlistStore } from "@/hooks/use-store";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { Badge } from "@/components/ui/badge";

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
  const [selectedSize, setSelectedSize] = useState("");
  const [itemInCart, setItemInCart] = useState<CartItem>();
  const [alert, setAlert] = useState(false);
  const { toast } = useToast();
  const [user] = useAuthState(auth);
  const { addToCart, cart, removeFromCart } = useCartStore();
  const { isInWishlist, removeFromWishlist, addToWishlist } = useWishlistStore();

  useEffect(() => {
    if (!selectedSize) {
      sizes.forEach((size) => {
        const foundCartItem = cart[`${id}-${size}`];
        if (foundCartItem) {
          setItemInCart(foundCartItem);
          setSelectedSize(size);
          return;
        }
      });
    } else {
      const foundCartItem = cart[`${id}-${selectedSize}`];
      setItemInCart(foundCartItem);
    }
  }, [cart, id, sizes, selectedSize]);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      toast({ title: "Removed from wishlist", description: "This item has been removed from your wishlist" });
    } else {
      addToWishlist(id);
      toast({ title: "Added to wishlist", description: "This item has been added to your wishlist" });
    }
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart(id, selectedSize);
    toast({ title: "Removed from cart", description: "Your item has been removed from the cart" });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!selectedSize) {
      setAlert(true);
      setTimeout(() => setAlert(false), 5000);
      toast({
        title: "Item not added to cart",
        description: "Please select a size to add the item to the cart",
        variant: "destructive",
      });
      return;
    }
    addToCart(id, selectedSize);
    toast({ title: "Added to cart", description: "Your item has been added to the cart" });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl w-[308px] transition-all duration-300 bg-white">
      <Link href={`/shop/partywear/${id}`} className="block relative">
        <Image
          alt={name}
          className="object-cover w-full h-80 transition-transform group-hover:scale-105"
          height="300"
          src={`${image}`}
          width="300"
        />
        <Badge className="absolute top-2 left-2 bg-neutral-50 text-neutral-800 hover:bg-primary">{category}</Badge>
        {user && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleWishlist}
          >
            <Heart className={cn("h-5 w-5", isInWishlist(id) ? "fill-red-500 text-red-500" : "")} />
          </Button>
        )}
      </Link>

      <div className="p-4 space-y-3">
        <Link href={`/shop/partywear/${id}`} className="block">
          <h3 className="font-semibold text-lg leading-tight min-h-[3rem]">
            {_.truncate(name, { length: 45, separator: " " })}
          </h3>
        </Link>

        <div className="flex justify-between items-center">
          <p className="font-bold text-xl text-primary">&#8377;{price.toLocaleString()}</p>
          <Select
            value={selectedSize}
            onValueChange={(size) => {
              setSelectedSize(size);
              setAlert(false);
            }}
          >
            <SelectTrigger
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className={cn(
                "w-24 bg-muted border-2",
                alert ? "border-destructive text-destructive" : "border-muted-foreground"
              )}
            >
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {itemInCart && itemInCart.quantity > 0 ? (
          <div className="flex items-center justify-between border rounded-md overflow-hidden">
            <Button size="icon" variant="ghost" onClick={handleRemoveFromCart} className="rounded-none">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-lg">{itemInCart.quantity}</span>
            <Button size="icon" variant="ghost" onClick={handleAddToCart} className="rounded-none">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button className="w-full" variant="action" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
          </Button>
        )}
      </div>
    </div>
  );
}
