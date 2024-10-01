import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { Wishlist } from "@/lib/schema";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const wishlistRef = doc(db, "wishlists", userId);
    const wishlistSnap = await getDoc(wishlistRef);

    if (!wishlistSnap.exists()) {
      return NextResponse.json({ message: "wishlist not found" }, { status: 404 });
    }

    const wishlist = wishlistSnap.data() as Wishlist;
    return NextResponse.json({ wishlist }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch wishlist", error }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const body = await req.json();
    const wishlistData: Wishlist = {
      id: userId,
      userId: userId,
      items: body.items || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, "wishlists", userId), wishlistData);
    return NextResponse.json({ message: "wishlist updated", wishlist: wishlistData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update wishlist", error }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  try {
    const body = await req.json();
    const wishlistRef = doc(db, "wishlists", userId);
    const wishlistSnap = await getDoc(wishlistRef);

    if (!wishlistSnap.exists()) {
      return NextResponse.json({ message: "wishlist not found" }, { status: 404 });
    }

    const wishlist = wishlistSnap.data() as Wishlist;
    const updatedWishlist: Wishlist = {
      ...wishlist,
      items: body.items || wishlist.items,
      updatedAt: new Date(),
    };

    await setDoc(wishlistRef, updatedWishlist);
    return NextResponse.json({ message: "wishlist updated", wishlist: updatedWishlist }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update cart", error }, { status: 500 });
  }
}
