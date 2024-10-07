import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { Order } from "@/lib/schema";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

// Get all orders (GET /api/orders)
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;
    console.log("userId", userId);

    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const ordersCollection = collection(db, "orders");

    const ordersSnapshot = await getDocs(ordersCollection);

    const orders: Order[] = ordersSnapshot.docs.map((doc) => doc.data() as Order);

    const userOrders = orders.filter((order) => order.userId === userId);

    if (userOrders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "orders retrieved successfully",
        userOrders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user's orders:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch user's orders",
        error,
      },
      { status: 500 }
    );
  }
}
