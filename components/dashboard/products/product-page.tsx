"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AddProductForm from "./components/add-product-form";
import { Product } from "@/lib/schema";
import ProductCard from "./components/product-card";
import EditProductForm from "./components/edit-product-form";
import { RefreshCw } from "lucide-react";

export default function ProductPage() {
  const [productForm, setProductForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [change, setChange] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log(change);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, [change]);

  return (
    <main className="px-6 py-10 space-y-10">
      <AddProductForm productForm={productForm} change={change} setChange={setChange} setProductForm={setProductForm} />
      <EditProductForm
        productForm={editForm}
        change={change}
        editProduct={editProduct}
        setChange={setChange}
        setProductForm={setEditForm}
        setEditProduct={setEditProduct}
      />
      <div className=" flex justify-between w-full ">
        <h1 className="text-3xl font-bold uppercase flex gap-1 items-center">
          Products {"(" + products.length + ")"}{" "}
          <Button className="group">
            <RefreshCw
              onClick={() => setChange(!change)}
              className=" group-active:rotate-180 transition-rotate duration-300"
            />
          </Button>
        </h1>
        <Button onClick={() => setProductForm(true)}>Create Product</Button>
      </div>

      <div className="flex flex-col gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            change={change}
            setChange={setChange}
            setProduct={setEditProduct}
            setEditForm={setEditForm}
          />
        ))}
      </div>
    </main>
  );
}
