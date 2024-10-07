"use client";

import AuthProvider from "@/components/auth-provider";
import CheckoutPage from "@/components/checkout/checkout-page";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (!user) {
    router.push("/sign-in?redirect=checkout");
  }

  return (
    <AuthProvider>
      <CheckoutPage />
    </AuthProvider>
  );
}
