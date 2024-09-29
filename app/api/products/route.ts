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
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        products,
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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, "products", productData.productId), productData);
    return NextResponse.json({ message: "Product created", product: productData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create product", error }, { status: 500 });
  }
}

// // Add a new product (POST /api/products)
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, price, description, sizes, category, images } = body;

//     // Validate request body
//     if (!name || !price || !description || !sizes || !category || !images) {
//       return NextResponse.json(
//         { message: "Missing required fields: name, price, description, sizes, category, images" },
//         { status: 400 }
//       );
//     }

//     const productRepository = getRepository(Product);
//     const newProduct = new Product();
//     newProduct.name = name;
//     newProduct.price = price;
//     newProduct.description = description;
//     newProduct.sizes = sizes;
//     newProduct.category = category;
//     newProduct.images = images;
//     newProduct.createdAt = new Date();
//     newProduct.updatedAt = new Date();

//     await productRepository.create(newProduct);

//     return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return NextResponse.json({ message: "Failed to add product", error }, { status: 500 });
//   }
// }
