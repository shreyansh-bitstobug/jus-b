import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { Order } from "@/lib/schema";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

// Get all orders (GET /api/orders)
export async function GET() {
  try {
    const ordersCollection = collection(db, "orders");

    const ordersSnapshot = await getDocs(ordersCollection);

    const orders: Order[] = ordersSnapshot.docs.map((doc) => doc.data() as Order);

    if (orders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "orders retrieved successfully",
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch orders",
        error,
      },
      { status: 500 }
    );
  }
}

// Create a new order (POST /api/orders)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      orderId,
      userId,
      status,
      items,
      paymentStatus,
      shippingAddress,
      billingAddress,
      fare,
      placedAt,
      deliveredAt,
      trackingId,
      paymentMethod,
    } = body;

    // Validate request body
    if (!orderId || !status || !paymentStatus || !shippingAddress || !billingAddress || !fare || !placedAt) {
      return NextResponse.json(
        { message: "Missing required fields: orderId, firstName, lastName, email" },
        { status: 400 }
      );
    }

    const newOrder: Order = {
      id: orderId,
      orderId: orderId,
      userId: userId,
      status: status,
      items: items,
      paymentStatus: paymentStatus,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      fare: fare,
      placedAt: new Date(placedAt),
      deliveredAt: deliveredAt ? new Date(deliveredAt) : null,
      trackingId: trackingId,
      paymentMethod: paymentMethod,
      updatedAt: new Date(),
    };

    await setDoc(doc(db, "orders", newOrder.id), newOrder);

    return NextResponse.json({ message: "Order created successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Failed to create order", error }, { status: 500 });
  }
}
