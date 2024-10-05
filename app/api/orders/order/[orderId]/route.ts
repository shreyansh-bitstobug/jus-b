import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { Order, User } from "@/lib/schema";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params;

    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);
    if (!orderSnap.exists()) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const order = orderSnap.data() as Order;

    return NextResponse.json(
      {
        message: "Order retrieved successfully",
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch order",
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params;

    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);

    const body = await req.json();

    if (!orderSnap.exists()) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }

    const order = orderSnap.data() as Order;

    // Validate request body
    if (!orderId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newOrder: Order = {
      ...order,
      status: body.status || order.status,
      paymentMethod: body.paymentMethod || order.paymentMethod,
      paymentStatus: body.paymentStatus || order.paymentStatus,
      trackingId: body.trackingId || order.trackingId,
      deliveredAt: body.deliveredAt ? new Date(body.deliveredAt) : order.deliveredAt || null,
      fare: body.fare || order.fare,
      shippingAddress: body.shippingAddress || order.shippingAddress,
      billingAddress: body.billingAddress || order.billingAddress,
      updatedAt: new Date(),
    };

    await setDoc(orderRef, newOrder);

    return NextResponse.json({ message: "Order details updated successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ message: "Failed to update order", error }, { status: 500 });
  }
}
