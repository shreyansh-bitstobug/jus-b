import { db } from "@/firebase/config";
import { NextResponse } from "next/server";
import { getRepository } from "fireorm";
import { Product } from "@/lib/schema"; // Adjust your import path

// Get all products (GET /api/products)
export async function GET() {
  try {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();

    return NextResponse.json(
      {
        message: "Products retrieved successfully",
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products", error }, { status: 500 });
  }
}

// Add a new product (POST /api/products)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, description, sizes, category, images } = body;

    // Validate request body
    if (!name || !price || !description || !sizes || !category || !images) {
      return NextResponse.json(
        { message: "Missing required fields: name, price, description, sizes, category, images" },
        { status: 400 }
      );
    }

    const productRepository = getRepository(Product);
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.price = price;
    newProduct.description = description;
    newProduct.sizes = sizes;
    newProduct.category = category;
    newProduct.images = images;
    newProduct.createdAt = new Date();
    newProduct.updatedAt = new Date();

    await productRepository.create(newProduct);

    return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "Failed to add product", error }, { status: 500 });
  }
}
