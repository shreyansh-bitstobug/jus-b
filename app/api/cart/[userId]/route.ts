import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { Cart } from "@/lib/schema";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      return NextResponse.json({ message: "cart not found" }, { status: 404 });
    }

    const cart = cartSnap.data() as Cart;
    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch cart", error }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const body = await req.json();
    const cartData: Cart = {
      id: userId,
      userId: userId,
      items: body.items || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, "carts", userId), cartData);
    return NextResponse.json({ message: "Cart updated", cart: cartData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update cart", error }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const body = await req.json();
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      return NextResponse.json({ message: "cart not found" }, { status: 404 });
    }

    const cart = cartSnap.data() as Cart;
    const updatedCart: Cart = {
      ...cart,
      items: body.items || cart.items,
      updatedAt: new Date(),
    };

    await setDoc(cartRef, updatedCart);
    return NextResponse.json({ message: "Cart updated", cart: updatedCart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update cart", error }, { status: 500 });
  }
}
