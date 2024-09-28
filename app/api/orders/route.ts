import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { getRepository } from "fireorm";
import { Order } from "@/lib/schema"; // Adjust your import path accordingly

// Create a new order (POST /api/orders)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderRepository = getRepository(Order);

    // Extract data from the request body
    const {
      orderId,
      userId,
      status,
      items,
      paymentStatus,
      shippingAddress,
      billingAddress,
      fare,
      paymentMethod,
      trackingId,
    } = body;

    // Create the order object
    const newOrder = orderRepository.create({
      orderId,
      userId,
      status: status || "pending",
      items,
      paymentStatus: paymentStatus || "pending",
      shippingAddress,
      billingAddress,
      fare,
      placedAt: new Date(),
      deliveredAt: null,
      updatedAt: new Date(),
      trackingId,
      paymentMethod,
    });

    return NextResponse.json(
      {
        message: "Order created successfully",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        message: "Failed to create order",
        error,
      },
      { status: 500 }
    );
  }
}
