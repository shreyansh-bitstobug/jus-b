import { create } from "zustand";

export type ModalType = "Search" | "Cart";

type ModalStore = {
  modal: ModalType | null;
  isOpen: boolean;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  isOpen: false,
  openModal: (modal) => set({ modal, isOpen: true }),
  closeModal: () => set({ modal: null, isOpen: false }),
}));

type Store = {
  cart: string[];
  addToCart: (item: string) => void;
};

const useStore = create<Store>()((set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
}));

export type CartItem = {
  id: string;
  quantity: number;
  size: string;
};

type cartStoreType = {
  cart: Record<string, CartItem>;
  addToCart: (id: string, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  deleteFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
};

const storeLocally = (cart: Record<string, CartItem>) => {
  if (typeof window !== "undefined") localStorage.setItem("jusb_cart", JSON.stringify(cart));
};

const getLocalCart = () => {
  if (typeof window === "undefined") return;
  const savedCart = localStorage.getItem("jusb_cart");
  return savedCart ? JSON.parse(savedCart) : {};
};

const generateCartKey = (id: string, size: string) => `${id}-${size}`;
const useCartStore = create<cartStoreType>((set) => ({
  cart: getLocalCart(),

  addToCart: (id, size) =>
    set((state) => {
      const key = generateCartKey(id, size);
      const item = state.cart[key];

      if (item) {
        // If item with the same size exists, update the quantity
        const newCart = {
          cart: {
            ...state.cart,
            [key]: {
              ...item,
              quantity: item.quantity + 1,
            },
          },
        };

        storeLocally(newCart.cart);

        return newCart;
      } else {
        // If item does not exist, add it to the cart
        const newCart = {
          cart: {
            ...state.cart,
            [key]: {
              id,
              quantity: 1,
              size,
            },
          },
        };
        storeLocally(newCart.cart);
        return newCart;
      }
    }),

  removeFromCart: (id, size) => {
    set((state) => {
      const key = generateCartKey(id, size);
      const newCart = { ...state.cart };
      const item = newCart[key];
      const newQuantity = item.quantity - 1;
      newQuantity > 0 ? (newCart[key] = { ...item, quantity: newQuantity }) : delete newCart[key];
      storeLocally(newCart);
      return { cart: newCart };
    });
  },

  deleteFromCart: (id, size) =>
    set((state) => {
      const key = generateCartKey(id, size);
      const newCart = { ...state.cart };

      console.log("Deleting key:", key); // Debugging line
      console.log("Cart before deletion:", newCart); // Debugging line

      if (newCart[key]) {
        delete newCart[key];

        // Store the updated cart in localStorage
        storeLocally(newCart);
      }

      console.log("Cart after deletion:", newCart); // Debugging line

      return { cart: newCart };
    }),

  updateQuantity: (id, size, quantity) =>
    set((state) => {
      const key = generateCartKey(id, size);
      const item = state.cart[key];

      if (item) {
        const updatedCart = {
          ...state.cart,
          [key]: {
            ...item,
            quantity: Math.max(quantity, 0), // Ensure quantity doesn't go below 0
          },
        };
        storeLocally(updatedCart);
        return { cart: updatedCart };
      }
      return state;
    }),
}));

type WishlistStore = {
  wishlist: Set<string>;
  addToWishlist: (item: string) => void;
  removeFromWishlist: (item: string) => void;
  isInWishlist: (item: string) => boolean;
};

const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: new Set<string>(),

  addToWishlist: (item) =>
    set((state) => {
      const newWishlist = new Set(state.wishlist);
      newWishlist.add(item);
      return { wishlist: newWishlist };
    }),

  removeFromWishlist: (item) =>
    set((state) => {
      const newWishlist = new Set(state.wishlist);
      newWishlist.delete(item);
      return { wishlist: newWishlist };
    }),

  isInWishlist: (item) => get().wishlist.has(item),
}));

export { useStore, useModalStore, useCartStore, useWishlistStore };
