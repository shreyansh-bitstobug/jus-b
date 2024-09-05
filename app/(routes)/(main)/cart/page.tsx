"use client";

// Dependencies
import { useEffect, useState } from "react";
import { products } from "@/public/assets/data";
import { useCartStore } from "@/hooks/use-store";

// Types
import { CartProductType } from "@/lib/types";

// Components
import CartProductCard from "@/components/checkout/cart-product-cards";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart } = useCartStore();
  let cartItems: any[];
  if (cart) {
    cartItems = Object.values(cart);
  }
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);

  useEffect(() => {
    const updatedCartProducts: CartProductType[] = [];
    let total = 0;
    let itemTotal = 0;

    // Loop through each cart item and find the product
    cartItems.forEach((cartItem) => {
      const productIdParts = cartItem.id.split("-");
      const productId = `${productIdParts[0]}-${productIdParts[1]}`;
      const foundProduct = products.find((product) => product.id === productId);

      // If product is found, add it to the updated cart products
      if (foundProduct) {
        const existingProductIndex = updatedCartProducts.findIndex(
          (item) => item.id === foundProduct.id && item.size === cartItem.size
        );

        // Check if product already exists in the cart
        if (existingProductIndex > -1) {
          // Product already exists, update quantity
          updatedCartProducts[existingProductIndex].quantity += cartItem.quantity;
        } else {
          // Product doesn't exist, add it
          updatedCartProducts.push({
            name: foundProduct.name,
            price: foundProduct.price,
            imgUrl: foundProduct.image[0],
            id: foundProduct.id,
            size: cartItem.size,
            quantity: cartItem.quantity,
          });
        }

        // Calculate total price
        total += foundProduct.price * cartItem.quantity;
        itemTotal += cartItem.quantity;
      }
    });

    // Update state
    setCartProducts(updatedCartProducts); // Update cart products
    setItemTotal(itemTotal); // Update item total
    setCartTotal(total); // Update cart amount total
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <main className="container flex-grow flex flex-col gap-6 py-4">
      <div className=" flex justify-between items-center sm:flex-row flex-col gap-2">
        <h1 className=" md:text-2xl text-xl items-end">
          <span>Subtotal &#40;{itemTotal} items&#41;:</span> <span className="font-bold">&#8377; {cartTotal}</span>
        </h1>
        <Button className="md:text-lg text-base md:w-72 sm:w-60 md:h-11 w-full max-w-72 rounded-full md:px-8 px-6">
          Proceed to buy {itemTotal} items
        </Button>
      </div>
      <div className="flex flex-wrap lg:justify-start justify-center gap-8">
        {cartProducts.map(({ name, quantity, size, price, id, imgUrl }) => (
          <CartProductCard
            key={`${id}-${size}`} // Use id and size as key to ensure uniqueness
            name={name}
            price={price}
            image={imgUrl}
            id={id}
            size={size}
            quantity={quantity}
          />
        ))}
      </div>
    </main>
  );
}
