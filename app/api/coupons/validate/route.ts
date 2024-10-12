import { db } from "@/firebase/config";
import { Coupons } from "@/lib/schema";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { code, subtotal, userId } = body; // Get the coupon code from the request body

  console.log("code", code);

  const couponsRef = collection(db, "coupons"); // Get the coupons collection from Firestore
  const snapshot = await getDocs(couponsRef); // Get all the documents from the coupons collection

  const coupons = snapshot.docs.map((doc) => doc.data() as Coupons); // Map the documents to an array of coupon objects

  const coupon = coupons.find((coupon) => coupon.code === code && coupon.isActive); // Find the coupon with the matching code

  const userCoupon = coupon?.usedBy?.find((usedCoupon) => usedCoupon.userId === userId);

  if (!coupon) {
    return NextResponse.json({ message: "Invalid coupon code" }, { status: 404 }); // Return an error if the coupon is not found
  }

  if (userCoupon) {
    return NextResponse.json({ message: "Coupon already used" }, { status: 400 });
  }

  let total; // Declare a variable to store the total amount after applying the discount
  let discount = 0;

  // Calculate the discount based on the coupon type
  if (coupon.discountType === "percentage") {
    coupon.value = (coupon.value / 100) * subtotal;
    discount = Math.min(coupon.value, coupon.maxDiscount);
  } else {
    discount = Math.min(coupon.value, coupon.maxDiscount);
  }

  // Apply the discount to the subtotal
  total = subtotal - discount;

  if (total < 0) {
    total = 0;
  } else {
    total = total;
  }

  return NextResponse.json({ message: "Coupon applied successfully", total, discount }, { status: 200 }); // Return the total amount after applying the discount
}
