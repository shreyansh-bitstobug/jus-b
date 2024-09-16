// Dependencies
import { useEffect, useState } from "react";
import Image from "next/image";
import _ from "lodash";
import Link from "next/link";

// Utils and Hooks
import { cn } from "@/lib/utils";
import { CartItem, useCartStore, useWishlistStore } from "@/hooks/use-store";

// Icons
import { Heart } from "lucide-react";

// UI Components
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

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
  // State
  const [selectedSize, setSelectedSize] = useState(""); // State to store the selected size
  const [itemInCart, setItemInCart] = useState<CartItem>(); // State to store the item in the cart
  const [alert, setAlert] = useState(false); // State to show an alert if no size is selected

  // Hooks
  const { toast } = useToast(); // Get the toast function (for showing alerts)
  const [user] = useAuthState(auth); // Get the user (for checking if the user is logged in)

  // Store
  const { addToCart, cart, removeFromCart } = useCartStore(); // Get the cart and the add to cart function
  const { isInWishlist, removeFromWishlist, addToWishlist } = useWishlistStore(); // Get the wishlist and the add to wishlist function

  // Effect to check if the item is in the cart
  useEffect(() => {
    // Size is not selected yet (initial render)
    if (!selectedSize) {
      sizes.forEach((size) => {
        const foundCartItem = cart[`${id}-${size}`]; // Cart item with the id and size

        if (foundCartItem) {
          setItemInCart(foundCartItem); // Set the item in cart if it exists
          setSelectedSize(size); // Set the selected size to the size in the cart
          return;
        }
      });
    } else {
      // If size is selected
      const foundCartItem = cart[`${id}-${selectedSize}`];
      setItemInCart(foundCartItem);
    }
  }, [cart, id, sizes, selectedSize]); // Run the effect whenever the cart, id, sizes or selected size changes

  // Event handlers ( Add to wishlist, Add to cart, Remove from cart)
  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // If the item is in the wishlist, remove it, else add it
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

  // Reduce the quantity of the item in the cart by 1 (if it exists) or remove it from the cart if the quantity is 1
  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior
    removeFromCart(id, selectedSize); // Call the remove from cart function
    toast({
      title: "Removed from cart",
      description: "Your item has been removed from the cart",
    });
  };

  // Add the item to the cart if a size is selected, else show an alert
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior

    // If no size is selected, show an alert
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
      return; // Exit the function if no size is selected
    }

    addToCart(id, selectedSize); // Call the add to cart function
    toast({
      title: "Added to cart",
      description: "Your item has been added to the cart",
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg w-[308px] hover:scale-105 hover:shadow-xl transition-all">
      {/* Image with Link */}
      <Link href={`/shop/partywear/${id}`}>
        <Image
          alt={name}
          className="object-cover w-full h-80 transition-transform group-hover:scale-105 "
          height="300"
          src={`${image}`}
          width="300"
        />
      </Link>

      {/* Wishlist Button (Only if a user is logged In) */}
      {user && (
        <button
          className="bg-white p-2 absolute rounded-full top-3 right-3 active:animate-ping transition-all-50-ease-in-out"
          onClick={handleWishlist}
        >
          <Heart className={cn(isInWishlist(id) ? "text-red-700 fill-red-700" : "")} />
        </button>
      )}

      <div className="p-4 flex flex-col gap-1">
        {/* Product Name */}
        <Link href={`/shop/partywear/${id}`}>
          <h3 className="font-semibold min-h-12">{_.truncate(name, { length: 60, separator: " " })}</h3>
        </Link>

        <div className="flex justify-between items-center">
          {/* Price */}
          <p className=" font-bold text-lg">&#8377;{price}</p> {/* ₹ Indian Rupee symbol */}
          {/* Selector for size */}
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

        {/* If item present in the cart show - qty + */}
        {itemInCart && itemInCart.quantity > 0 ? (
          <div className="w-full flex items-center justify-between text-center text-lg font-bold border border-neutral-300 rounded-lg overflow-hidden max-h-9">
            <button
              className="text-black h-10 rounded-l-md items-center justify-center flex w-12 max-w-12 px-4 border border-neutral-300 font-bold text-xl bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-700 active:text-white"
              onClick={handleRemoveFromCart}
            >
              -
            </button>
            <div className="w-full h-10 content-center bg-neutral-200">{itemInCart.quantity}</div>
            <button
              className="text-black h-10 rounded-r-md items-center justify-center flex w-12 max-w-12 px-4 border border-neutral-300 font-bold text-xl bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-700 active:text-white"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        ) : (
          // else show add to cart button
          <Button size="sm" variant="action" onClick={handleAddToCart}>
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
}
