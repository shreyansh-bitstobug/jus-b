export interface Address {
  id: string;
  name: string;
  address: string[];
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string; // Firestore document ID
  orderId: string; // Order ID
  userId: string;
  status: "pending" | "completed" | "cancelled" | "shipped" | "confirmed";
  items: { id: string; details: Product; quantity: number; size: string }[];
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
  sizesAvailable?: { size: string; quantity: number }[];
  category: string;
  images: string[];
  stockUpdate?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  userId: string;
  items: { productId: string; quantity: number; size: string }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  content: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupons {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  value: number;
  maxDiscount: number;
  isActive: boolean;
  usedBy?: [
    {
      userId: string;
      orderId: string;
      orderStatus: string;
      usedAt: Date;
    }
  ];
}

export interface Offer {
  id: string;
  offer: string;
}
