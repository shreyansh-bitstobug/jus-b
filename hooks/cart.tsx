import { useEffect } from "react";
import { useCartStore } from "@/hooks/use-cart-store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

const AppInitializer: React.FC = () => {
  const [user] = useAuthState(auth);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart, user]);

  return null; // This component doesn't render anything
};

export default AppInitializer;
