"use client";

import CurrencyButton from "@/components/dashboard/currency-button-dash";
import OrderPage from "@/components/dashboard/orders/order-page";
import ProductPage from "@/components/dashboard/products/product-page";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function DashboardAdminPage() {
  const [section, setSection] = useState("Orders");
  const [user, loading, error] = useAuthState(auth); // useAuthState returns loading and error as well
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If not loading and no user, redirect to sign-in page
      if (!user) {
        router.push("/sign-in");
<<<<<<< HEAD
      } else if (user?.uid !== "jL1A2ij8iMU24NSZnkh0zigIUto2" && user?.uid !== "xemjmEcRf4OCWp3E4BWhZFtK4uV2") {
=======
      } else if (user?.uid !== "jL1A2ij8iMU24NSZnkh0zigIUto2"&& user?.uid !== "xemjmEcRf4OCWp3E4BWhZFtK4uV2") {
>>>>>>> 18ad49dee0629b9b043f681b25e8014a71a90f0f
        // If user is authenticated but not the admin, redirect to home
        router.push("/");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    // Show a loading state while checking the auth state
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  // If an error occurs with Firebase authentication, handle it
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Once loaded and the user is verified
  return (
    <main className="container py-10 grid grid-cols-5 gap-6">
      <section>
        <nav className="grid gap-4 col-span-1">
          <h1 className="text-2xl font-semibold text-center">Menu</h1>
          <Button onClick={() => setSection("Orders")}>Orders</Button>
          <Button onClick={() => setSection("Products")}>Products</Button>
          <CurrencyButton />
        </nav>
      </section>
      <section className="col-span-4">
        {section === "Orders" && <OrderPage />}
        {section === "Products" && <ProductPage />}
      </section>
    </main>
  );
}
