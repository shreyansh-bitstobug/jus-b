import { currency } from "@/hooks/use-store";
import { Cart, Product, Wishlist, Order, Address } from "@/lib/schema";
import { useCategoriesStore } from "@/hooks/use-store";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config"; // Firebase configuration

export const removeSlash = (str: string) => {
  return str.charAt(0) === "/" ? str.slice(1) : str;
};

export const getCategories = async () => {
  const { categories, setCategories } = useCategoriesStore.getState();

  if (!categories) {
    const res = await fetch("/api/products");
    const data = await res.json();
    const fetchedCategories = await data.products?.reduce((acc: string[], product: Product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, []);
    setCategories(fetchedCategories);
  }

  return categories;
};

export const wishlistUpdate = async (userId?: string, wishlist?: Set<string>) => {
  if (!userId) return;

  console.log("wishlistUpdate items", userId, wishlist);

  // Convert Set<string> to the required format: an array of { productId: string }
  const updatedWishlistItems = wishlist ? Array.from(wishlist).map((productId) => productId) : [];

  console.log(updatedWishlistItems);

  // Create the updated wishlist object
  const updatedWishlist: Wishlist = {
    id: userId, // Assuming userId is the same as the wishlist ID
    userId,
    items: updatedWishlistItems, // Pass the array of { productId }
    createdAt: new Date(), // Set createdAt to the current date
    updatedAt: new Date(), // Set updatedAt to the current date
  };

  console.log(updatedWishlist);

  // Send a POST request with the updated wishlist data
  const res = await fetch(`/api/wishlist/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedWishlist),
  });

  if (res.ok) {
    localStorage.clear();
  }

  // Handle the response and log the data
  const data = await res.json();
  console.log(data);

  return data;
};

// Function to calculate the total fare (excluding shipping)
const calculateFare = (
  items: {
    id: string;
    details: Product;
    quantity: number;
    size: string;
  }[]
): number => {
  return items?.reduce((total, item) => {
    const productPrice = item.details.price;
    return total + productPrice * item.quantity;
  }, 0);
};

const cartToItems = (cart: any[], products: Product[]) => {
  return cart
    ?.map((item) => {
      const product = products.find((product) => product.productId === item.productId);
      if (!product) return null;

      return {
        id: item.id,
        details: product,
        quantity: item.quantity,
        size: item.size,
      };
    })
    .filter((item) => item !== null);
};

// Function to generate a unique order ID
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(); // Current timestamp
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase(); // Random alphanumeric string
  return `ORD-${timestamp}-${randomString}`; // Example: ORD-1634567890123-ABC123
};

// Function to create an order
export const createOrder = (
  userId: string,
  cartItems: any[],
  shippingAddress: Address,
  billingAddress: Address,
  products: Product[]
): Order => {
  const orderId = generateOrderId(); // Generate a unique order ID

  console.log("Cart items in createOrder", cartItems);
  console.log("Products in createOrder", products);
  console.log("Shipping address in createOrder", shippingAddress);
  console.log("Billing address in createOrder", billingAddress);
  console.log("User ID in createOrder", userId);

  const itemsWithDetails = cartToItems(cartItems, products);
  const fareTotal = calculateFare(itemsWithDetails); // Calculate total amount for items
  const shippingCost = 50; // Example shipping cost, you can modify based on logic
  const discount = 0; // Default discount (modify if applicable)

  const order: Order = {
    id: orderId, // Will be for Firestore document ID
    orderId, // Generated order ID
    userId, // User placing the order
    status: "pending", // Initial status
    items: cartToItems(cartItems, products), // List of items in the order
    paymentStatus: "pending", // Initial payment status
    shippingAddress, // Shipping address provided
    billingAddress, // Billing address provided
    fare: {
      total: fareTotal, // Total fare calculation
      shipping: shippingCost,
      discount,
      amountPaid: fareTotal + shippingCost - discount, // Amount paid starts at 0 since it's COD
    },
    placedAt: new Date(), // Date the order is placed
    deliveredAt: null, // Delivered date will be set later
    updatedAt: new Date(), // Updated timestamp
    trackingId: "", // Tracking ID will be added when shipped
    paymentMethod: "COD", // Default to Cash on Delivery
  };

  return order;
};

export const formatCurrency = async (amount: number, currency: currency): Promise<string> => {
  const currencyCode = currency.toLowerCase(); // Convert currency to lowercase

  const api = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json"; // API endpoint to fetch currency data based on INR
  const res = await fetch(api);
  const data = await res.json();
  const exchangeRate = await data.inr[currencyCode]; // Get the exchange rate for the given currency code
  const convertedAmount = amount * exchangeRate; // Convert the amount to the given currency

  let currencySymbol = "₹"; // Initialize currency symbol

  if (currencyCode === "inr") {
    currencySymbol = "₹"; // Set currency symbol for INR
  } else if (currencyCode === "usd" || currencyCode === "cad" || currencyCode === "aud" || currencyCode === "sgd") {
    currencySymbol = "$"; // Default to $ for other currencies
  } else if (currencyCode === "eur") {
    currencySymbol = "€"; // Set currency symbol for EUR
  } else if (currencyCode === "gbp") {
    currencySymbol = "£"; // Set currency symbol for GBP
  } else if (currencyCode === "aed") {
    currencySymbol = "د.إ"; // Set currency symbol for JPY
  }

  // Return the converted amount with 2 decimal places
  return `${currencySymbol} ${convertedAmount.toFixed(2)}`; // Return the converted amount with 2 decimal places
};
