import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { Coupons } from "@/lib/schema";
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";

export async function GET() {
  try {
    const couponsRef = collection(db, "coupons");
    const snapshot = await getDocs(couponsRef);

    const coupons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ coupons }, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json({ message: "Failed to fetch coupons", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Define the new coupon without specifying an id
    const newCoupon: Coupons = {
      id: "", // We'll update this after Firestore generates the id
      code: body.code,
      discountType: body.discountType,
      value: body.value,
      minOrderValue: body.minOrderValue,
      maxDiscount: body.maxDiscount,
      isActive: true, // Default to true
    };

    // Add the document to Firestore and let it generate a unique ID
    const couponRef = await addDoc(collection(db, "coupons"), newCoupon);

    // Update the coupon with the generated ID
    await setDoc(couponRef, { ...newCoupon, id: couponRef.id });

    return NextResponse.json({ message: `New coupon successfully created! ${newCoupon.code}` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create coupon", error }, { status: 500 });
  }
}
