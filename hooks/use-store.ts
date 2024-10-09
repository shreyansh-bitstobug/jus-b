import { create } from "zustand";
import { User } from "firebase/auth"; // Import the User type from Firebase Auth
import { cartUpdate, getCart, wishlistUpdate } from "@/lib/functions";
import { Address } from "@/lib/schema";

// Type for the Home Page
type HomePage = {
  loaderOn: boolean;
  setLoaderOn: (loaderOn: boolean) => void;
  popupOn: boolean;
  setPopupOn: (popupOn: boolean) => void;
};

//  --------------------
//  Home Page Store
//  --------------------
const useHomePageStore = create<HomePage>((set) => ({
  loaderOn: true,
  setLoaderOn: (loaderOn) => set({ loaderOn }),
  popupOn: true,
  setPopupOn: (popupOn) => set({ popupOn }),
}));

// Type for the Categories store
type CategoriesStore = {
  categories: string[] | null;
  setCategories: (categories: string[]) => void;
};

//  --------------------
//  Categories Store
//  --------------------
const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories }),
}));

// Type for the Auth store
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
type ModalName = "checkout" | "search" | "share" | "addressForm" | "profile";

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
  closeModal: () => {
    useEditAddressStore.setState({ editAddress: null });
    console.log("Edit address", useEditAddressStore.getState().editAddress);
    return set({ isOpen: false, modalName: null });
  },
}));

// Type for the change store
type ChangeStore = {
  change: boolean;
  setChange: (change: boolean) => void;
};

//  --------------------
//  Change Store
//  --------------------
const useChangeStore = create<ChangeStore>((set) => ({
  change: false,
  setChange: (change) => set({ change }),
}));

// Type for the profile edit type
export type ProfileEditType = {
  firstName: string;
  lastName?: string;
  displayName: string;
  email: string;
  dob: Date | null;
  phoneNumber?: string;
};

// Type for the profile store
type ProfileStore = {
  profile: ProfileEditType | null;
  setProfile: (profile: ProfileEditType | null) => void;
};

//  --------------------
//  Profile Store
//  --------------------
const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));

// Type for the address store
type AddressStoreType = {
  editAddress: Address | null;
  setEditAddress: (editAddress: Address | null) => void;
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

// Type for the cart store
type cartStoreType = {
  cart: Record<string, CartItem>;
  addToCart: (id: string, size: string, userId?: string) => void;
  removeFromCart: (id: string, size: string, userId?: string) => void;
  deleteFromCart: (id: string, size: string, userId?: string) => void;
  clearCart: (userId?: string) => void;
};

// This function stores the cart locally when the user is not logged in
const storeLocally = (cart: Record<string, CartItem>) => {
  console.log("storing cart locally", cart);
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
  cart: useAuthStore.getState().user?.uid ? getCart(useAuthStore.getState().user?.uid || "") : getLocalCart(), // Get the cart from local storage when the user is not logged in with help of getLocalCart function

  // Add to cart function
  addToCart: (id, size, userId) =>
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
        userId ? cartUpdate(userId, newCart.cart) : storeLocally(newCart.cart);

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
        userId ? cartUpdate(userId, newCart.cart) : storeLocally(newCart.cart);

        // Return the updated cart
        return newCart;
      }
    }),

  // Reduce the quantity of the item in the cart
  removeFromCart: (id, size, userId) => {
    set((state) => {
      const key = generateCartKey(id, size);
      const newCart = { ...state.cart };
      const item = newCart[key];
      const newQuantity = item.quantity - 1; // Reduce the quantity by 1
      newQuantity > 0 ? (newCart[key] = { ...item, quantity: newQuantity }) : delete newCart[key]; // If quantity is greater than 0, update the quantity, else delete the item

      // Store the updated cart in localStorage
      userId ? cartUpdate(userId, newCart) : storeLocally(newCart);

      // Return the updated cart
      return { cart: newCart };
    });
  },

  // Completely remove the item from the cart
  deleteFromCart: (id, size, userId) =>
    set((state) => {
      const key = generateCartKey(id, size);
      const newCart = { ...state.cart };

      // If the item exists, delete it
      if (newCart[key]) {
        delete newCart[key];

        // Store the updated cart in localStorage
        userId ? cartUpdate(userId, newCart) : storeLocally(newCart);
      }

      // Return the updated cart
      return { cart: newCart };
    }),

  // Clear all items from the cart
  clearCart: (userId) =>
    set(() => {
      const newCart = {}; // Reset the cart to an empty object

      // Store the empty cart in localStorage or update the cart for the user
      userId ? cartUpdate(userId, newCart).then(() => storeLocally(newCart)) : storeLocally(newCart);

      // Return the updated cart (empty)
      return { cart: newCart };
    }),
}));

// Type for the wishlist store
type WishlistStore = {
  wishlist: Set<string>;
  addToWishlist: (item: string, userId?: string) => void;
  removeFromWishlist: (item: string, userId?: string) => void;
  isInWishlist: (item: string) => boolean;
};

//  --------------------
//  Wishlist Store
//  --------------------
const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: new Set<string>(), // Initialize the wishlist as a Set to avoid duplicates

  // Add item to the wishlist
  addToWishlist: (item, userId) =>
    set((state) => {
      const newWishlist = new Set(state.wishlist); // Create a new Set from the current wishlist state to avoid mutation
      newWishlist.add(item); // Add the item to the new wishlist Set

      wishlistUpdate(userId, newWishlist); // Update the wishlist in the database if the user is logged in, else store it locally
      return { wishlist: newWishlist }; // Return the new wishlist Set
    }),

  // Remove item from the wishlist
  removeFromWishlist: (item, userId) =>
    set((state) => {
      const newWishlist = new Set(state.wishlist); // Create a new Set from the current wishlist state to avoid mutation
      newWishlist.delete(item); // Remove the item from the new wishlist Set

      wishlistUpdate(userId, newWishlist); // Update the wishlist in the database if the user is logged in, else store it locally
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

// Function to store the currency locally
const storeLocallyCurrency = (currency: currency) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jusb_currency", currency);
  }
};

// Function to get the currency from local storage
const getLocalCurrency = (): currency => {
  if (typeof window === "undefined") return "inr"; // Return 'inr' as default during SSR

  console.log("Getting currency from local storage 1. type of window", typeof window); // Log the type of window

  const savedCurrency = localStorage.getItem("jusb_currency");

  console.log("Getting currency from local storage 2. currency", savedCurrency); // Log the currency retrieval

  // Return the saved currency if it's valid, otherwise default to 'inr'
  return savedCurrency ? (savedCurrency as currency) : "inr";
};

// Type for the currency
export type currency = "inr" | "usd" | "eur" | "gbp" | "aud" | "sgd" | "aed" | "cad"; // Define the currency type

// Type for the currency store
type CurrencyStore = {
  currency: currency;
  setCurrency: (currency: currency) => void;
};

// --------------------
// Currency Store
// --------------------
const useCurrencyStore = create<CurrencyStore>((set) => ({
  currency: getLocalCurrency(), // Initialize with local currency from local storage
  setCurrency: (currency: currency) => {
    console.log("Setting currency", currency); // Log the currency change

    storeLocallyCurrency(currency); // Store currency locally

    set({ currency }); // Update Zustand state
  },
}));

//  --------------------
//  Dash Currency Store
//  --------------------
const useDashCurrencyStore = create<CurrencyStore>((set) => ({
  currency: "inr",
  setCurrency: (currency) => set({ currency }),
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
  useCurrencyStore,
  useDashCurrencyStore,
  useProfileStore,
  useChangeStore,
  useCategoriesStore,
};
