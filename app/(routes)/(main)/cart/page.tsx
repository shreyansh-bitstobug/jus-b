"use client";

// Dependencies
import { useEffect, useState } from "react";
import { useCurrencyStore, useModalStore } from "@/hooks/use-store";

// Types
import { CartProductType } from "@/lib/types";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

// Next Components & Hooks
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/hooks/use-cart-store";

// Components
import CartProductCard from "@/components/checkout/cart-product-cards";
import { Button } from "@/components/ui/button";
import { Cart, Product } from "@/lib/schema";
import { formatCurrency } from "@/lib/functions";
import { Skeleton } from "@/components/ui/skeleton";
import AppInitializer from "@/hooks/cart";

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([]); // Products from API
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [cartTotal, setCartTotal] = useState("0");
  const [itemTotal, setItemTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(false);

  // Get user from firebase
  const [user] = useAuthState(auth);

  // Stores
  const { cart } = useCartStore(); // Cart store
  const { openModal } = useModalStore(); // Get onOpen function from store
  const { currency } = useCurrencyStore(); // Get currency from store

  // Router
  const router = useRouter();

  // Handle checkout
  const handleCheckout = () => {
    if (!user) {
      openModal("checkout");
    } else {
      router.push("/checkout");
    }
  };

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
    };

    if (cart != undefined && cart?.length > 0) {
      fetchProducts(); // Fetch products only if there are cart items
    }
  }, [cart]); // Fetch products when cart items change

  // Update cart products when cart items or products change
  useEffect(() => {
    console.log("Cart and products changed", cart);
    // Why the cart length is 0? when the cart is not empty and there is 1 item in the cart
    const calculateTotal = async () => {
      setLoading(true); // Set loading to true
      let total = 0;

      if (cart?.length === 0) {
        setCartProducts([]); // Reset cart products
        setCartTotal("0"); // Reset cart total
        setItemTotal(0); // Reset item total
        setLoading(false); // Set loading to false
        return;
      }

      if (cart?.length > 0 && products?.length > 0) {
        const updatedCartProducts: CartProductType[] = [];
        let itemTotal = 0;

        // Loop through each cart item and find the product
        cart.forEach((cartItem) => {
          const productId = cartItem.productId;
          const foundProduct = products.find((product) => product.id === productId);

          if (foundProduct) {
            updatedCartProducts.push({
              name: foundProduct.name,
              price: foundProduct.price,
              imgUrl: foundProduct.images[0],
              id: foundProduct.id,
              size: cartItem.size,
              quantity: cartItem.quantity,
              category: foundProduct.category,
            });

            // Calculate total price
            total += foundProduct.price * cartItem.quantity;
            itemTotal += cartItem.quantity;
          }
        });

        setCartProducts(updatedCartProducts); // Update cart products
        setItemTotal(itemTotal); // Update item quantity total
        setLoading(false); // Set loading to false
      }
      const cartTotalCurrency = await formatCurrency(total, currency);
      setCartTotal(cartTotalCurrency); // Update cart amount total
    };
    setLoading(false); // Set loading to true
    calculateTotal();
  }, [cart, products, currency, check]); // Wait for both cart and products to be fetched ( Refresh when they change and currency changes)

  return (
    <main className="container flex-grow flex flex-col gap-6 py-6 pb-14">
      <AppInitializer />
      <div className=" flex justify-between items-center sm:flex-row flex-col gap-2">
        <h1 className=" md:text-2xl text-xl items-end">
          <span>Subtotal &#40;{itemTotal} items&#41;:</span> <span className="font-bold">{cartTotal}</span>
        </h1>
        <Button
          className="md:text-lg text-base md:w-72 sm:w-60 md:h-11 w-full max-w-72 rounded-full md:px-8 px-6"
          onClick={handleCheckout}
          disabled={cartProducts.length === 0 || loading}
        >
          Proceed to buy {itemTotal} items
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-wrap lg:justify-start justify-center gap-8">
          <Skeleton className="sm:w-[420px] w-96 h-[200px] rounded-lg bg-muted-foreground/20" />
          <Skeleton className="sm:w-[420px] w-96 h-[200px] rounded-lg bg-muted-foreground/20" />
          <Skeleton className="sm:w-[420px] w-96 h-[200px] rounded-lg bg-muted-foreground/20" />
        </div>
      ) : cartProducts.length === 0 ? (
        <div className="flex flex-col gap-10 p-20 h-[50vh] justify-center items-center">
          No items added to cart
          <Link href="/shop" className="text-lg underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap lg:justify-start justify-center gap-8">
          {cartProducts.map(({ name, quantity, size, price, id, imgUrl, category }) => (
            <CartProductCard
              key={`${id}-${size}`} // Use id and size as key to ensure uniqueness
              name={name}
              price={price}
              image={imgUrl}
              id={id}
              size={size}
              quantity={quantity}
              category={category}
              setCheck={setCheck}
              check={check}
            />
          ))}
        </div>
      )}
    </main>
  );
}
