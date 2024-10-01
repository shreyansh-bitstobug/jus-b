import { CartItem } from "@/hooks/use-store";
import { Cart, Product, Wishlist } from "@/lib/schema";

export const removeSlash = (str: string) => {
  return str.charAt(0) === "/" ? str.slice(1) : str;
};

export const getCategories = async () => {
  const res = await fetch("/api/products");
  const data = await res.json();
  console.log(data);

  const categories = data.products.reduce((acc: string[], product: Product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  return categories;
};

export const getCart = async (userId: string) => {
  const res = await fetch(`/api/cart/${userId}`);
  const data = await res.json();
  console.log(data);
  return data.cart;
};

export const cartUpdate = async (userId?: string, cart?: Record<string, CartItem>) => {
  if (!userId) return;
  console.log("cartUpdate items", userId, cart);
  const updatedCartItems = cart
    ? Object.values(cart).map((item) => ({
        productId: item.id, // Map 'id' to 'productId'
        quantity: item.quantity,
        size: item.size,
      }))
    : [];
  const updatedCart: Cart = {
    id: userId,
    userId,
    items: updatedCartItems,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const res = await fetch(`/api/cart/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCart),
  });

  const data = await res.json();
  console.log(data);
  return data;
};

export const wishlistUpdate = async (userId?: string, wishlist?: Set<string>) => {
  if (!userId) return;

  // Convert Set<string> to the required format: an array of { productId: string }
  const updatedWishlistItems = wishlist
    ? Array.from(wishlist).map((productId) => ({
        productId,
      }))
    : [];

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
