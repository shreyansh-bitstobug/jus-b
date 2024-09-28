import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { getRepository } from "fireorm";
import { Product } from "@/lib/schema"; // Adjust your import path

// Get product by ID (GET /api/products/[productId])
export async function GET(req: Request, { params }: { params: { productId: string } }) {
  try {
    const { productId } = params;
    const productRepository = getRepository(Product);

    // Query product by ID
    const product = await productRepository.whereEqualTo("productId", productId).findOne();

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Product retrieved successfully",
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Failed to fetch product", error }, { status: 500 });
  }
}
