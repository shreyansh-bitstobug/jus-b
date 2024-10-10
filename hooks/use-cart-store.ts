import { create } from "zustand";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

export type cartItem = {
  productId: string;
  size: string;
  quantity: number;
};

export type CartStore = {
  cart: cartItem | [];
  addToCart: (item: cartItem, userId?: string) => void;
  removeFromCart: (item: cartItem, userId?: string) => void;
  deleteFromCart: (item: cartItem, userId?: string) => void;
  clearCart: (userId?: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: getCart(user?.uid || "") || [],
  addToCart: (item: cartItem, userId?: string) => {
    console.log("Adding to cart", item);
    // Add item to cart
  },
  removeFromCart: (item: cartItem, userId?: string) => {
    console.log("Removing from cart", item);
    // Remove item from cart
  },
  deleteFromCart: (item: cartItem, userId?: string) => {
    console.log("Deleting from cart", item);
    // Delete item from cart
  },
  clearCart: (userId?: string) => {
    console.log("Clearing cart");
    // Clear cart
  },
}));
