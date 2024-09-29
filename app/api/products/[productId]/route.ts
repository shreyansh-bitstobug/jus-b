import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { Product, User } from "@/lib/schema";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function GET(req: Request, { params }: { params: { productId: string } }) {
  try {
    const { productId } = params;

    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);
    if (!productSnap.exists()) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const product = productSnap.data() as Product;

    return NextResponse.json(
      {
        message: "Product retrieved successfully",
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch product",
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: { params: { productId: string } }) {
  try {
    const { productId } = params;

    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json({ message: "product not found" }, { status: 404 });
    }

    const product = productSnap.data() as Product;

    const { name, price, description, sizes, category, images } = product;

    // Validate request body
    if (!productId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newProduct: Product = {
      ...product,
      name: name,
      price: price,
      description: description,
      sizes: sizes || [],
      category: category,
      images: images || [],
      updatedAt: new Date(),
    };

    await setDoc(productRef, newProduct);

    return NextResponse.json({ message: "Product details updated successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Failed to update product", error }, { status: 500 });
  }
}
