// Dependencies
import _ from "lodash";

// Next Components and Hooks
import Image from "next/image";
import Link from "next/link";

// Icons
import { X } from "lucide-react";

// Store Hook
import { useCartStore } from "@/hooks/use-store";

// UI Components
import { useToast } from "@/components/ui/use-toast";

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
}: {
  name: string;
  price: number;
  image: string;
  id: string;
  size: string;
  quantity: number;
}) {
  // Store Hooks
  const { addToCart, removeFromCart, deleteFromCart } = useCartStore();

  // Toast Hook for showing alerts
  const { toast } = useToast();

  // Reduce the quantity of the product in the cart by 1 or remove it if it's the last one
  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior

    removeFromCart(id, size); // Call the remove from cart function

    toast({
      title: "Removed from cart",
      description: "Your item has been removed from the cart",
    });
  };

  // Delete the product from the cart (remove all quantities)
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior

    deleteFromCart(id, size); // Call the delete from cart function

    toast({
      title: "Deleted from cart",
      description: "Your item has been deleted from the cart",
    });
  };

  // Add the product to the cart (increase the quantity by 1)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click event from propagating to the Link
    e.preventDefault(); // Prevent the default link behavior

    addToCart(id, size); // Call the add to cart function

    toast({
      title: "Added to cart",
      description: "Your item has been added to the cart",
    });
  };

  // --------------------
  // Return the Cart Product Card component
  // --------------------
  return (
    <div className="group p-4 bg-neutral-200 relative rounded-lg w-[420px] hover:scale-105 hover:shadow-xl transition-all flex gap-4">
      <div className="flex flex-col justify-between gap-2">
        {/* Small Image of Product */}
        <Link href={`/shop/${id}`}>
          <Image src={image} width={150} height={150} alt={name} />
        </Link>

        {/* Quantity Selector */}
        <div className=" h-8 flex items-center justify-between text-center text-lg font-bold border border-neutral-300 rounded-lg">
          <button
            className="text-black h-8 w-8 rounded-l-lg items-center justify-center flex  px-4 border border-neutral-300 font-bold text-xl bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-700 active:text-white"
            onClick={handleRemoveFromCart}
          >
            -
          </button>
          <div className=" w-8 h-8 content-center bg-neutral-200">{quantity}</div>
          <button
            className="text-black h-8 w-8 rounded-r-lg items-center justify-center flex  px-4 border border-neutral-300 font-bold text-xl bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-700 active:text-white"
            onClick={handleAddToCart}
          >
            +
          </button>
        </div>
      </div>

      {/* Deleting all quantities button */}
      <button
        className="bg-neutral-300 p-1 absolute rounded-full -top-1 -right-1 active:animate-ping transition-all-50-ease-in-out hover:bg-neutral-400"
        onClick={handleDelete}
      >
        <X className="  w-4 h-4" />
      </button>

      {/* Product Details */}
      <div className=" flex flex-col justify-between gap-4">
        {/* Name */}
        <Link href={`/shop/${id}`}>
          <h3 className="font-medium text-sm text-neutral-900 leading-snug group-hover:text-primary-600">{name}</h3>
        </Link>

        {/* Price */}
        <p className=" p-1 text-black font-bold text-2xl ">&#8377;{price}</p>

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
