import { create } from "zustand";

// Type for ModalName
type ModalName = "checkout" | "search" | "share";

// Type for the Modal store
type ModalStore = {
  isOpen: boolean;
  modalName: ModalName | null;
  openModal: (name: ModalName) => void;
  closeModal: () => void;
};

//  --------------------
//  Modal Store
//  --------------------
const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalName: null,
  openModal: (name) => set({ isOpen: true, modalName: name }),
  closeModal: () => set({ isOpen: false, modalName: null }),
}));

// Type for the cart item
export type CartItem = {
  id: string;
  quantity: number;
  size: string;
};

// Type for the cart store
type cartStoreType = {
  cart: Record<string, CartItem>;
  addToCart: (id: string, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  deleteFromCart: (id: string, size: string) => void;
};

// This function stores the cart locally when the user is not logged in
const storeLocally = (cart: Record<string, CartItem>) => {
  if (typeof window !== "undefined") localStorage.setItem("jusb_cart", JSON.stringify(cart));
};

// This function retrieves the cart from local storage
const getLocalCart = () => {
  if (typeof window === "undefined") return;
  const savedCart = localStorage.getItem("jusb_cart");
  return savedCart ? JSON.parse(savedCart) : {};
};

// This function generates a key for the cart item with the id and size
const generateCartKey = (id: string, size: string) => `${id}-${size}`;

//  --------------------
//  Cart Store
//  --------------------
const useCartStore = create<cartStoreType>((set) => ({
  cart: getLocalCart(), // Get the cart from local storage when the user is not logged in with help of getLocalCart function

  // Add to cart function
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

        // Store the updated cart in localStorage
        storeLocally(newCart.cart);

        // Return the updated cart
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

        // Store the updated cart in localStorage
        storeLocally(newCart.cart);

        // Return the updated cart
        return newCart;
      }
    }),

  // Reduce the quantity of the item in the cart
  removeFromCart: (id, size) => {
    set((state) => {
      const key = generateCartKey(id, size);
      const newCart = { ...state.cart };
      const item = newCart[key];
      const newQuantity = item.quantity - 1; // Reduce the quantity by 1
      newQuantity > 0 ? (newCart[key] = { ...item, quantity: newQuantity }) : delete newCart[key]; // If quantity is greater than 0, update the quantity, else delete the item

      // Store the updated cart in localStorage
      storeLocally(newCart);

      // Return the updated cart
      return { cart: newCart };
    });
  },

  // Completely remove the item from the cart
  deleteFromCart: (id, size) =>
    set((state) => {
      const key = generateCartKey(id, size);
      const newCart = { ...state.cart };

      // If the item exists, delete it
      if (newCart[key]) {
        delete newCart[key];

        // Store the updated cart in localStorage
        storeLocally(newCart);
      }

      // Return the updated cart
      return { cart: newCart };
    }),
}));

// Type for the wishlist store
type WishlistStore = {
  wishlist: Set<string>;
  addToWishlist: (item: string) => void;
  removeFromWishlist: (item: string) => void;
  isInWishlist: (item: string) => boolean;
};

//  --------------------
//  Wishlist Store
//  --------------------
const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: new Set<string>(), // Initialize the wishlist as a Set to avoid duplicates

  // Add item to the wishlist
  addToWishlist: (item) =>
    set((state) => {
      const newWishlist = new Set(state.wishlist); // Create a new Set from the current wishlist state to avoid mutation
      newWishlist.add(item); // Add the item to the new wishlist Set
      return { wishlist: newWishlist }; // Return the new wishlist Set
    }),

  // Remove item from the wishlist
  removeFromWishlist: (item) =>
    set((state) => {
      const newWishlist = new Set(state.wishlist); // Create a new Set from the current wishlist state to avoid mutation
      newWishlist.delete(item); // Remove the item from the new wishlist Set
      return { wishlist: newWishlist }; // Return the new wishlist Set
    }),

  // Check if item is in the wishlist
  isInWishlist: (item) => get().wishlist.has(item),
}));

// Type for ShareModalStore
type ShareModalStore = {
  link: string;
  message: string;
  setLink: (link: string) => void;
  setMessage: (message: string) => void;
};

//  --------------------
//  Share Modal Store
//  --------------------
const useShareModalStore = create<ShareModalStore>((set) => ({
  link: "",
  message: "",
  setLink: (link) => set({ link }),
  setMessage: (message) => set({ message }),
}));

// Export the custom hooks
export { useCartStore, useWishlistStore, useModalStore, useShareModalStore };
