import { db } from "@/firebase/config";
import { Coupons } from "@/lib/schema";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { userId, orderId, placedAt, code } = body; // Get the coupon code from the request body

  console.log("code", code);

  const couponsRef = collection(db, "coupons"); // Get the coupons collection from Firestore
  const snapshot = await getDocs(couponsRef); // Get all the documents from the coupons collection

  const coupons = snapshot.docs.map((doc) => doc.data() as Coupons); // Map the documents to an array of coupon objects

  const coupon = coupons.find((coupon) => coupon.code === code && coupon.isActive); // Find the coupon with the matching code

  if (!coupon) {
    return NextResponse.json({ message: "Invalid coupon code" }, { status: 404 }); // Return an error if the coupon is not found
  }

  const updatedCoupon = {
    ...coupon,
    usedBy: [
      {
        userId,
        orderId,
        orderStatus: "placed",
        usedAt: placedAt,
      },
    ],
  };

  // Update the coupon in the database
  const couponRef = doc(db, "coupons", coupon.id);
  await updateDoc(couponRef, updatedCoupon);

  return NextResponse.json({ message: "Coupon applied successfully" }, { status: 200 }); // Return the total amount after applying the discount
}
