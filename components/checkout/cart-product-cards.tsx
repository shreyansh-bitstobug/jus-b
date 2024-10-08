// Dependencies
import _ from "lodash";

// Next Components and Hooks
import Image from "next/image";
import Link from "next/link";

// Icons
import { X } from "lucide-react";

// Store Hook
import { useCartStore, useCurrencyStore } from "@/hooks/use-store";

// UI Components
import { useToast } from "@/components/ui/use-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/functions";

// --------------------
// Cart Product Card Component
// --------------------
export default function CartProductCard({
  name, // Product name
  price, // Product price
  image, // Product image
  id, // Product id (for cart)
  size, // Product size (for cart)
  quantity, // Product quantity (for cart)
  category, // Product category
}: {
  name: string;
  price: number;
  image: string;
  id: string;
  size: string;
  quantity: number;
  category: string;
}) {
  // States
  const [currencyPrice, setCurrencyPrice] = useState<string>();

  // Hooks
  const { addToCart, removeFromCart, deleteFromCart } = useCartStore();
  const [user] = useAuthState(auth); // Get the current user
  const { currency } = useCurrencyStore();

  // Toast Hook for showing alerts
  const { toast } = useToast();

  // Reduce the quantity of the product in the cart by 1 or remove it if it's the last one
  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior

    removeFromCart(id, size, user?.uid); // Call the remove from cart function

    toast({
      title: "Removed from cart",
      description: "Your item has been removed from the cart",
    });
  };

  // Format the price of the product with the currency
  useEffect(() => {
    const formatPrice = async () => {
      const formattedPrice = await formatCurrency(price, currency);
      setCurrencyPrice(formattedPrice);
    };
    formatPrice();
  }, [price, currency]);

  // Delete the product from the cart (remove all quantities)
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior

    deleteFromCart(id, size, user?.uid); // Call the delete from cart function

    toast({
      title: "Deleted from cart",
      description: "Your item has been deleted from the cart",
    });
  };

  // Add the product to the cart (increase the quantity by 1)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior

    addToCart(id, size, user?.uid); // Call the add to cart function

    toast({
      title: "Added to cart",
      description: "Your item has been added to the cart",
    });
  };

  // --------------------
  // Return the Cart Product Card component
  // --------------------
  return (
    <div className="group p-4 bg-white shadow-lg relative  rounded-lg sm:w-[420px] w-96 hover:scale-105 hover:shadow-xl transition-all flex gap-4">
      <div className="flex flex-col justify-between gap-2">
        {/* Small Image of Product */}
        <Link href={`/shop/${category}/${id}`} className="h-32 w-32 overflow-hidden">
          <Image src={image} width={150} height={150} alt={name} />
        </Link>

        {/* Quantity Selector */}
        <div className=" h-8 flex items-center justify-between text-center text-lg font-bold border border-neutral-200 rounded-lg">
          <button
            className="text-black h-8 w-10 rounded-l-lg items-center justify-center flex  px-4 border border-neutral-200 font-bold text-xl bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 active:text-black"
            onClick={handleRemoveFromCart}
          >
            -
          </button>
          <div className=" w-12 h-8 content-center bg-neutral-100">{quantity}</div>
          <button
            className="text-black h-8 w-10 rounded-r-lg items-center justify-center flex  px-4 border border-neutral-200 font-bold text-xl bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 active:text-black"
            onClick={handleAddToCart}
          >
            +
          </button>
        </div>
      </div>

      {/* Deleting all quantities button */}
      <button
        className="bg-neutral-200 p-1 absolute rounded-full -top-1 -right-1 active:animate-ping transition-all-50-ease-in-out hover:bg-neutral-400"
        onClick={handleDelete}
      >
        <X className="  w-4 h-4" />
      </button>

      {/* Product Details */}
      <div className=" flex flex-col justify-between gap-4">
        {/* Name */}
        <Link href={`/shop/${category}/${id}`}>
          <h3 className="font-medium text-sm text-neutral-900 leading-snug group-hover:text-primary-600">{name}</h3>
        </Link>

        {/* Price */}
        <p className=" p-1 text-black font-bold text-2xl">{currencyPrice}</p>

        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            {/* Quantity */}
            <p className=" text-neutral-600 font-medium">
              <b>Quantity:</b> {quantity}
            </p>

            {/* Size selected for the product in the cart */}
            <p className=" text-neutral-600 font-medium">
              <b>Size:</b> {size}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
