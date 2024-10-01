import AuthProvider from "@/components/auth-provider";
import CheckoutPage from "@/components/checkout/checkout-page";

export default function Home() {
  return (
    <AuthProvider>
      <CheckoutPage />
    </AuthProvider>
  );
}
