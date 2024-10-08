import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { toast, useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import TooltipContext from "../tooltip-context";
import OrderCard from "./order-card";
import { Order } from "@/lib/schema";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

export default function OrderSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const [user, loading, error] = useAuthState(auth);

  const handleCopy = (e: React.MouseEvent, orderId: string) => () => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(orderId);
    toast({ title: "Order ID Copied", description: "The order has been copied to the clipboard" });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders/" + user?.uid);
      const data = await response.json();
      setOrders(data.userOrders || []);
    };

    if (!loading) {
      if (user && user.uid) fetchOrders();
    }
  }, [user, loading]);

  return (
    <section className="flex flex-wrap gap-4">
      {orders?.length === 0 ? (
        <div className="text-center w-full py-10 text-neutral-500">
          <p>No orders placed yet.</p>
          <Link href="/shop" className="underline hover:text-neutral-600">
            Continue Shopping
          </Link>
        </div>
      ) : (
        orders?.map((order) => (
          <>
            <OrderCard order={order} handleCopy={handleCopy} key={order.id} />
          </>
        ))
      )}
    </section>
  );
}
