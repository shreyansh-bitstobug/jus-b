// hooks/use-store.ts

import { create } from "zustand";
import { auth, db } from "@/firebase/config"; // Ensure correct path
import { doc, getDoc, setDoc } from "firebase/firestore";

// Define CartItem and CartStore as before...

export type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};

export type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (item: CartItem) => Promise<void>;
  deleteFromCart: (item: CartItem) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  mergeCarts: (guestCart: CartItem[], userId: string) => Promise<void>;
};

// Helper functions for guest cart management
const LOCAL_STORAGE_CART_KEY = "Jusb_guest_cart";

export const getLocalCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

export const setLocalCart = (cart: CartItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
};

export const clearLocalCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  // Fetch cart from Firestore or localStorage
  fetchCart: async () => {
    const user = auth.currentUser;
    if (user) {
      clearLocalCart();
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        set({ cart: cartSnap.data().items as CartItem[] });
      } else {
        set({ cart: [] });
      }
    } else {
      // Handle guest cart
      set({ cart: getLocalCart() });
    }
  },

  // Add an item to the cart
  addToCart: async (item: CartItem) => {
    console.log("Adding to cart", item);
    const user = auth.currentUser;
    if (user) {
      // Authenticated user: update Firestore
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      let updatedCart: CartItem[] = [];

      if (cartSnap.exists()) {
        const currentCart = cartSnap.data().items as CartItem[];
        const itemIndex = currentCart.findIndex((ci) => ci.productId === item.productId && ci.size === item.size);

        if (itemIndex !== -1) {
          // Item exists, increment quantity
          currentCart[itemIndex].quantity += item.quantity;
          updatedCart = currentCart;
        } else {
          // New item, add to cart
          updatedCart = [...currentCart, item];
        }
      } else {
        // No cart exists, create new cart
        updatedCart = [item];
      }

      // Update Firestore
      await setDoc(cartRef, { items: updatedCart });

      // Update Zustand state
      set({ cart: updatedCart });
    } else {
      // Guest user: update localStorage
      const currentCart = get().cart;
      const itemIndex = currentCart.findIndex((ci) => ci.productId === item.productId && ci.size === item.size);

      let updatedCart: CartItem[] = [];

      if (itemIndex !== -1) {
        // Item exists, increment quantity
        const updatedItem = { ...currentCart[itemIndex], quantity: currentCart[itemIndex].quantity + item.quantity };
        updatedCart = [...currentCart.slice(0, itemIndex), updatedItem, ...currentCart.slice(itemIndex + 1)];
      } else {
        // New item, add to cart
        updatedCart = [...currentCart, item];
      }

      // Update localStorage
      setLocalCart(updatedCart);

      // Update Zustand state
      set({ cart: updatedCart });
    }
  },

  // Remove one quantity of an item from the cart
  removeFromCart: async (item: CartItem) => {
    const user = auth.currentUser;
    if (user) {
      // Authenticated user: update Firestore
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const currentCart = cartSnap.data().items as CartItem[];
        const itemIndex = currentCart.findIndex((ci) => ci.productId === item.productId && ci.size === item.size);

        if (itemIndex !== -1) {
          if (currentCart[itemIndex].quantity > 1) {
            currentCart[itemIndex].quantity -= 1;
          } else {
            // Remove item if quantity is 1
            currentCart.splice(itemIndex, 1);
          }

          // Update Firestore
          await setDoc(cartRef, { items: currentCart });

          // Update Zustand state
          set({ cart: currentCart });
        }
      }
    } else {
      // Guest user: update localStorage
      const currentCart = get().cart;
      const itemIndex = currentCart.findIndex((ci) => ci.productId === item.productId && ci.size === item.size);

      if (itemIndex !== -1) {
        let updatedCart: CartItem[] = [];

        if (currentCart[itemIndex].quantity > 1) {
          const updatedItem = { ...currentCart[itemIndex], quantity: currentCart[itemIndex].quantity - 1 };
          updatedCart = [...currentCart.slice(0, itemIndex), updatedItem, ...currentCart.slice(itemIndex + 1)];
        } else {
          // Remove item if quantity is 1
          updatedCart = [...currentCart.slice(0, itemIndex), ...currentCart.slice(itemIndex + 1)];
        }

        // Update localStorage
        setLocalCart(updatedCart);

        // Update Zustand state
        set({ cart: updatedCart });
      }
    }
  },

  // Delete an item entirely from the cart
  deleteFromCart: async (item: CartItem) => {
    const user = auth.currentUser;
    if (user) {
      // Authenticated user: update Firestore
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const currentCart = cartSnap.data().items as CartItem[];
        const updatedCart = currentCart.filter((ci) => !(ci.productId === item.productId && ci.size === item.size));

        // Update Firestore
        await setDoc(cartRef, { items: updatedCart });

        // Update Zustand state
        set({ cart: updatedCart });
      }
    } else {
      // Guest user: update localStorage
      const currentCart = get().cart;
      const updatedCart = currentCart.filter((ci) => !(ci.productId === item.productId && ci.size === item.size));

      // Update localStorage
      setLocalCart(updatedCart);

      // Update Zustand state
      set({ cart: updatedCart });
    }
  },

  // Clear the entire cart
  clearCart: async () => {
    const user = auth.currentUser;
    if (user) {
      // Authenticated user: clear Firestore cart
      const cartRef = doc(db, "carts", user.uid);

      // Delete the cart document from Firestore
      await setDoc(cartRef, { items: [] });

      // Update Zustand state
      set({ cart: [] });
    } else {
      // Guest user: clear localStorage cart
      clearLocalCart();

      // Update Zustand state
      set({ cart: [] });
    }
  }, // Merge guest cart with Firestore cart
  mergeCarts: async (guestCart: CartItem[], userId: string) => {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);
    let updatedCart: CartItem[] = [];

    if (cartSnap.exists()) {
      const currentCart = cartSnap.data().items as CartItem[];
      updatedCart = [...currentCart];

      guestCart.forEach((guestItem) => {
        const index = updatedCart.findIndex((ci) => ci.productId === guestItem.productId && ci.size === guestItem.size);
        if (index !== -1) {
          updatedCart[index].quantity += guestItem.quantity;
        } else {
          updatedCart.push(guestItem);
        }
      });
    } else {
      updatedCart = guestCart;
    }

    // Update Firestore
    await setDoc(cartRef, { items: updatedCart });

    // Clear guest cart
    clearLocalCart();

    // Update Zustand state
    set({ cart: updatedCart });
  },
}));
