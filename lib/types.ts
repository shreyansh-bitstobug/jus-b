// This is the type for the cart product
export type CartProductType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  imgUrl: string;
  category: string;
};

// ------------------------------------ //
// -----------Database types----------- //
// ------------------------------------ //

// This is the type for the product
export type ProductType = {
  id: string;
  productId?: string;
  name: string;
  price: number;
  description: {
    text: string;
    features: string[];
  };
  sizes: string[];
  category: string;
  image: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

// This is the type for the address
export type AddressType = {
  id: string; // Firestore document ID
  name: string;
  address: string[];
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  default: boolean;
};

// This is the type for the user
export type UserType = {
  id: string; // Firestore document ID
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  dob: Date;
  email: string;
  addresses: AddressType[];
  createdAt: Date;
  updatedAt: Date;
};

// This is the type for the orders
export type OrderType = {
  id: string; // Firestore document ID
  userId: string;
  orderId: string;
  status: "pending" | "completed" | "cancelled" | "shipped" | "confirmed";
  items: { id: string; details: ProductType; quantity: number }[];
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  shippingAddress: AddressType;
  billingAddress: AddressType;
  fare: {
    total: number;
    shipping: number;
    discount: number;
    amountPaid: number;
  };
  placedAt: Date;
  deliveredAt: Date | null;
  updatedAt: Date;
  trackingId: string;
  paymentMethod: string;
};

// This is the type for the cart items
export type CartType = {
  id: string;
  userId: string;
  items: { productId: string; quantity: number }[];
  createdAt: Date;
  updatedAt: Date;
};

// This is the type for the wishlist items
export type WishlistType = {
  id: string;
  userId: string;
  items: { productId: string }[];
  createdAt: Date;
  updatedAt: Date;
};

// This is the type for the blog posts
export type BlogType = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
