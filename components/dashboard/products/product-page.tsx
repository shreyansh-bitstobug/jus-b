"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AddProductForm from "./components/add-product-form";
import { Product } from "@/lib/schema";
import ProductCard from "./components/product-card";
import EditProductForm from "./components/edit-product-form";
import { Plus, RefreshCw } from "lucide-react";
import FilterButton from "./components/filter-button";

export default function ProductPage() {
  const [productForm, setProductForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [change, setChange] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleStockUpdate = async (productId: string) => {
    const res = await fetch(`/api/products/${productId}`);
    const data = await res.json();
    const product = data.product;

    console.log("Product Stock before update:", product.stockUpdate);

    const stock = product.stockUpdate ? false : true;

    const updatedProduct: Product = {
      ...product,
      stockUpdate: stock,
    };

    console.log("Product Stock after update:", updatedProduct.stockUpdate);

    const res2 = await fetch(`/api/products/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (res2.ok) {
      setChange(!change);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products/dashboard");
      const data = await res.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
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
          Products {"(" + filteredProducts.length + ")"}{" "}
          <Button className="group">
            <RefreshCw
              onClick={() => setChange(!change)}
              className=" group-active:rotate-180 transition-rotate duration-300"
            />
          </Button>
        </h1>
        <div className="flex gap-2">
          <FilterButton setFilteredProducts={setFilteredProducts} products={products} />
          <Button onClick={() => setProductForm(true)}>
            <Plus className="mr-1 w-5" /> Add Product
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            change={change}
            setChange={setChange}
            setProduct={setEditProduct}
            setEditForm={setEditForm}
            handleStockUpdate={handleStockUpdate}
          />
        ))}
      </div>
    </main>
  );
}
