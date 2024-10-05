"use client";

import OrderPage from "@/components/dashboard/orders/order-page";
import ProductPage from "@/components/dashboard/products/product-page";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function DashboardAdminPage() {
  const [section, setSection] = useState("Orders");
  const [user] = useAuthState(auth);

  // if (user?.uid !== "jL1A2ij8iMU24NSZnkh0zigIUto2") return null;

  return (
    <main className="container py-10 grid grid-cols-5 gap-6">
      <section>
        <nav className="grid gap-4 col-span-1">
          <h1 className="text-2xl font-semibold text-center">Menu</h1>
          <Button onClick={() => setSection("Orders")}>Orders</Button>
          <Button onClick={() => setSection("Products")}>Products</Button>
        </nav>
      </section>
      <section className=" col-span-4 ">
        {/* Orders */}
        {section === "Orders" && <OrderPage />}
        {section === "Products" && <ProductPage />}
      </section>
    </main>
  );
}
