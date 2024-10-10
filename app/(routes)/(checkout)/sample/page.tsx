"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppInitializer from "@/hooks/cart";
import { useCartStore } from "@/hooks/use-cart-store";
import { useEffect, useState } from "react";

export default function SamplePage() {
  const { cart, addToCart, removeFromCart, clearCart, deleteFromCart } = useCartStore();
  const [id, setId] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className="flex  flex-col items-center gap-4 w-fit m-auto">
      <AppInitializer />
      <h1>Cart Test</h1>

      {cart.map((item) => (
        <li key={item.productId}>
          {item.productId} - {item.size} - {item.quantity}
        </li>
      ))}

      <Input placeholder="Enter ID" onChange={(e) => setId(e.target.value)} />
      <Input placeholder="Enter Size" onChange={(e) => setSize(e.target.value)} />
      <Input placeholder="Enter Quantity" onChange={(e) => setQuantity(e.target.valueAsNumber)} />

      <Button onClick={() => addToCart({ productId: id, size, quantity })}>Add to cart</Button>
      <Button onClick={() => removeFromCart({ productId: id, size, quantity })}>Remove from cart</Button>
      <Button onClick={() => deleteFromCart({ productId: id, size, quantity })}>Delete from cart</Button>
      <Button onClick={() => clearCart()}>Clear cart</Button>
    </div>
  );
}
