import _ from "lodash";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { CartItem, useCartStore, useWishlistStore } from "@/hooks/use-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Heart } from "lucide-react";

export default function ProductCard({
  name,
  price,
  image,
  id,
  sizes,
}: {
  name: string;
  price: number;
  image: string;
  id: string;
  sizes: string[];
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const [itemInCart, setItemInCart] = useState<CartItem>();
  const [alert, setAlert] = useState(false);
  const { addToCart, cart, removeFromCart } = useCartStore();
  const { toast } = useToast();

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
      toast({
        title: "Removed from wishlist",
        description: "This item has been removed from your wishlist",
      });
    } else {
      addToWishlist(id);
      toast({
        title: "Added to wishlist",
        description: "This item has been added to your wishlist",
      });
    }
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior
    if (!selectedSize) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
      toast({
        title: "Item not removed from cart",
        description: "Please select a size to remove the item from the cart",
        variant: "destructive",
      });
      return;
    }
    removeFromCart(id, selectedSize); // Call the remove from cart function
    toast({
      title: "Removed from cart",
      description: "Your item has been removed from the cart",
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior
    if (!selectedSize) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
      toast({
        title: "Item not added to cart",
        description: "Please select a size to add the item to the cart",
        variant: "destructive",
      });
      return;
    }
    addToCart(id, selectedSize); // Call the add to cart function
    toast({
      title: "Added to cart",
      description: "Your item has been added to the cart",
    });
  };

  // const itemInCart = cart[`${id}-${selectedSize}`];

  return (
    <div className="group relative overflow-hidden rounded-lg w-[308px] hover:scale-105 hover:shadow-xl transition-all">
      <Link href={`/shop/partywear/${id}`}>
        <Image
          alt={name}
          className="object-cover w-full h-80 transition-transform group-hover:scale-105 "
          height="300"
          src={`${image}`}
          width="300"
        />
      </Link>

      <button
        className="bg-white p-2 absolute rounded-full top-3 right-3 active:animate-ping transition-all-50-ease-in-out"
        onClick={handleWishlist}
      >
        <Heart className={cn(isInWishlist(id) ? "text-red-700 fill-red-700" : "")} />
      </button>

      <div className="p-4 flex flex-col gap-1">
        <Link href={`/shop/partywear/${id}`}>
          <h3 className="font-semibold min-h-12">{_.truncate(name, { length: 60, separator: " " })}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <p className=" font-bold text-lg">&#8377;{price}</p> {/* ₹ Indian Rupee symbol */}
          <Select
            value={selectedSize}
            onValueChange={(size) => {
              setSelectedSize(size); // Update the selected size
              setAlert(false); // Clear the alert if a size is selected
            }}
          >
            <SelectTrigger
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className={cn(
                "w-[80px]  bg-neutral-200  border-2 border-neutral-300 text-black font-medium",
                alert ? "border-penn-red text-penn-red" : ""
              )}
            >
              <SelectValue placeholder="Sizes" />
            </SelectTrigger>
            <SelectContent className="w-[80px]">
              {sizes.map((size) => {
                return (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {itemInCart && itemInCart.quantity > 0 ? (
          <div className="w-full flex items-center justify-between text-center text-lg font-bold border border-neutral-300 rounded-lg">
            <button
              className="text-black h-10 rounded-l-lg items-center justify-center flex w-12 max-w-12 px-4 border border-neutral-300 font-bold text-xl bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-700 active:text-white"
              onClick={handleRemoveFromCart}
            >
              -
            </button>
            <div className="w-full h-10 content-center bg-neutral-200">{itemInCart.quantity}</div>
            <button
              className="text-black h-10 rounded-r-lg items-center justify-center flex w-12 max-w-12 px-4 border border-neutral-300 font-bold text-xl bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-700 active:text-white"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        ) : (
          <Button size="sm" variant="action" onClick={handleAddToCart}>
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
}
