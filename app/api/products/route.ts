import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { Product } from "@/lib/schema"; // Adjust your import path
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";

// Get all products (GET /api/products)
export async function GET() {
  try {
    const productRef = collection(db, "products");

    const productSnap = await getDocs(productRef);

    const products: Product[] = productSnap.docs.map((doc) => doc.data() as Product);

    if (products.length === 0) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }

    const filteredProducts = products.filter((product) => product.stockUpdate === true);

    return NextResponse.json(
      {
        message: "Products retrieved successfully",
        products: filteredProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const productData: Product = {
      id: body.productId,
      productId: body.productId,
      name: body.name,
      price: body.price,
      description: body.description,
      sizes: body.sizes || [],
      category: body.category,
      images: body.images || [],
      stockUpdate: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, "products", productData.productId), productData);
    return NextResponse.json({ message: "Product created", product: productData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create product", error }, { status: 500 });
  }
}
