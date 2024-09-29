// schemas.ts
import { Collection } from "fireorm";
import { db } from "@/firebase/config";

export class Address {
  id!: string;
  name!: string;
  address!: string[];
  city!: string;
  state!: string;
  country!: string;
  phoneNumber!: string;
  postalCode!: string;
  isDefault!: boolean;
}

@Collection("orders")
export class Order {
  id!: string; // Firestore document ID
  orderId!: string; // Order ID
  userId!: string;
  status!: "pending" | "completed" | "cancelled" | "shipped" | "confirmed";
  items!: { id: string; details: Product[]; quantity: number }[];
  paymentStatus!: "pending" | "completed" | "failed" | "refunded";
  shippingAddress!: Address;
  billingAddress!: Address;
  fare!: {
    total: number;
    shipping: number;
    discount: number;
    amountPaid: number;
  };
  placedAt!: Date;
  deliveredAt!: Date | null;
  updatedAt!: Date;
  trackingId!: string;
  paymentMethod!: string;
}

@Collection("users")
export class User {
  id!: string;
  userId!: string;
  firstName!: string;
  lastName!: string | undefined;
  displayName!: string;
  phoneNumber!: string | undefined;
  dob!: Date | null;
  email!: string;
  addresses!: Address[] | undefined;
  createdAt!: Date;
  updatedAt!: Date;
}

@Collection("products")
export class Product {
  id!: string;
  productId!: string;
  name!: string;
  price!: number;
  description!: {
    text: string;
    features: string[];
  };
  sizes!: string[];
  category!: string;
  images!: string[];
  createdAt!: Date;
  updatedAt!: Date;
}

@Collection("cart")
export class Cart {
  id!: string;
  userId!: string;
  items!: { productId: string; quantity: number }[];
  createdAt!: Date;
  updatedAt!: Date;
}

@Collection("whishlist")
export class Whishlist {
  id!: string;
  userId!: string;
  items!: { productId: string }[];
  createdAt!: Date;
  updatedAt!: Date;
}

@Collection("blog")
export class Blog {
  id!: string;
  title!: string;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
