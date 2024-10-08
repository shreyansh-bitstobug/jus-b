"use client";

import { useEffect, useState } from "react";
import OrderCard from "./components/order-card";
import { toast } from "@/components/ui/use-toast";
import { Order } from "@/lib/schema";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders");
      const data = await response.json();
      data.orders.map((order: any) => {
        order.createdAt = new Date(order.createdAt).toLocaleString();
        order.updatedAt = new Date(order.updatedAt).toLocaleString();
        return order;
      });
      console.log(change);
      setOrders(data.orders);
    };
    fetchOrders();
  }, [change]);

  const handleCopy = (e: React.MouseEvent, orderId: string) => () => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(orderId);
    toast({ title: "Order ID Copied", description: "The order has been copied to the clipboard" });
  };

  return (
    <main className="container py-10 ">
      {orders?.map((order) => (
        <OrderCard
          key={order.orderId}
          order={order}
          change={change}
          setChange={setChange}
          handleCopy={(e) => handleCopy(e, order.orderId)}
        />
      ))}
    </main>
  );
}
