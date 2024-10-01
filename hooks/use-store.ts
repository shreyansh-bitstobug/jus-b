import { AddressType } from "@/lib/types";
import { create } from "zustand";
import { User } from "firebase/auth"; // Import the User type from Firebase Auth

type HomePage = {
  loaderOn: boolean;
  setLoaderOn: (loaderOn: boolean) => void;
};

//  --------------------
//  Home Page Store
//  --------------------
const useHomePageStore = create<HomePage>((set) => ({
  loaderOn: true,
  setLoaderOn: (loaderOn) => set({ loaderOn }),
}));

type AuthStoreType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create Zustand store for authentication
const useAuthStore = create<AuthStoreType>((set) => ({
  user: null, // Default to no user logged in
  setUser: (user) => set({ user }), // Function to update user
}));

// Type for ModalName
type ModalName = "checkout" | "search" | "share" | "addressForm";

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

type AddressStoreType = {
  editAddress: AddressType | null;
  setEditAddress: (editAddress: AddressType) => void;
};

//  --------------------
//  Address Store
//  --------------------
const useEditAddressStore = create<AddressStoreType>((set) => ({
  editAddress: null,
  setEditAddress: (editAddress) => set({ editAddress }),
}));

// Type for the cart item
export type CartItem = {
  id: string;
  quantity: number;
  size: string;
};

type CartStoreType = {
  cart: Record<string, CartItem>;
  addToCart: (id: string, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  deleteFromCart: (id: string, size: string) => void;
};

const storeLocally = (user: string | null, cart: Record<string, CartItem>) => {
  if (typeof window !== "undefined" && user) {
    localStorage.setItem(`jusb_cart_${user}`, JSON.stringify(cart)); // Store cart for a specific user
  }
};

const getLocalCart = (user: string | null) => {
  if (typeof window === "undefined" || !user) return {};
  const savedCart = localStorage.getItem(`jusb_cart_${user}`);
  return savedCart ? JSON.parse(savedCart) : {};
};

const generateCartKey = (id: string, size: string) => `${id}-${size}`;

//  --------------------
//  Cart Store
//  --------------------
const useCartStore = create<CartStoreType>((set) => ({
  cart: getLocalCart(useAuthStore.getState().user?.uid || null), // Get cart for logged-in user

  addToCart: (id, size) =>
    set((state) => {
      const user = useAuthStore.getState().user?.uid; // Get the current user
      if (!user) return state; // Ensure user is logged in before adding to cart

      const key = generateCartKey(id, size);
      const item = state.cart[key];

      if (item) {
        const newCart = {
          cart: {
            ...state.cart,
            [key]: {
              ...item,
              quantity: item.quantity + 1,
            },
          },
        };

        storeLocally(user, newCart.cart); // Store cart for this user
        return newCart;
      } else {
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

        storeLocally(user, newCart.cart); // Store cart for this user
        return newCart;
      }
    }),

  removeFromCart: (id, size) =>
    set((state) => {
      const user = useAuthStore.getState().user?.uid;
      if (!user) return state;

      const key = generateCartKey(id, size);
      const newCart = { ...state.cart };
      const item = newCart[key];
      const newQuantity = item.quantity - 1;
      newQuantity > 0 ? (newCart[key] = { ...item, quantity: newQuantity }) : delete newCart[key];

      storeLocally(user, newCart); // Store cart for this user
      return { cart: newCart };
    }),

  deleteFromCart: (id, size) =>
    set((state) => {
      const user = useAuthStore.getState().user?.uid;
      if (!user) return state;

      const key = generateCartKey(id, size);
      const newCart = { ...state.cart };
      delete newCart[key];

      storeLocally(user, newCart); // Store cart for this user
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
export {
  useCartStore,
  useWishlistStore,
  useModalStore,
  useShareModalStore,
  useEditAddressStore,
  useAuthStore,
  useHomePageStore,
};
