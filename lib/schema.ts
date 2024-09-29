export interface Address {
  id: string;
  name: string;
  address: string[];
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string; // Firestore document ID
  orderId: string; // Order ID
  userId: string;
  status: "pending" | "completed" | "cancelled" | "shipped" | "confirmed";
  items: { id: string; details: Product[]; quantity: number }[];
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  shippingAddress: Address;
  billingAddress: Address;
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
}

export interface User {
  id: string;
  userId: string;
  firstName: string;
  lastName?: string;
  displayName: string;
  phoneNumber?: string;
  dob: Date | null;
  email: string;
  addresses?: Address[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  productId: string;
  name: string;
  price: number;
  description: {
    text: string;
    features: string[];
  };
  sizes: string[];
  category: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  userId: string;
  items: { productId: string; quantity: number }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: { productId: string }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
