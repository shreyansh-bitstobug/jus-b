import { db } from "@/firebase/config";
import { Coupons } from "@/lib/schema";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const couponsRef = collection(db, "coupons");
    const snapshot = await getDocs(couponsRef);

    const coupon = snapshot.docs.find((doc) => doc.id === params.id)?.data() as Coupons;

    return NextResponse.json({ coupon }, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json({ message: "Failed to fetch coupons", error }, { status: 500 });
  }
}

// Toggle the isActive field of a coupon document in Firestore
export async function POST(req: Request, { params }: { params: { id: string } }) {
  // ID of the coupon document
  const { id } = params;

  const body = await req.json();
  const { maxDiscount, isActive, value, code } = body;

  // Reference to the coupon document in Firestore
  const couponRef = doc(db, "coupons", id);

  // Get the coupon document from Firestore
  const couponSnap = await getDoc(couponRef);

  // Check if the coupon document exists
  if (!couponSnap.exists()) {
    return NextResponse.json({ message: "order not found" }, { status: 404 });
  }

  // Get the coupon data from the document
  const coupon = couponSnap.data() as Coupons;

  const updates = {
    ...coupon,
    code: code,
    value: value,
    maxDiscount: maxDiscount,
    isActive: isActive,
  };

  // Update the isActive field of the coupon document
  await updateDoc(couponRef, updates); // Toggle the isActive field

  // Return a success message
  return NextResponse.json(
    { message: `Coupon ${coupon.code} is now ${!coupon.isActive ? "active" : "inactive"}` },
    { status: 200 }
  );
}
