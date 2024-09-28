import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { getRepository } from "fireorm";
import { Cart } from "@/lib/schema"; // Adjust your import path

// Get cart by userId (GET /api/cart/[userId])
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;
    const cartRepository = getRepository(Cart);

    // Query cart by userId
    const cart = await cartRepository.whereEqualTo("userId", userId).findOne();

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Cart retrieved successfully",
        cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ message: "Failed to fetch cart", error }, { status: 500 });
  }
}
