"use client";

import { useEffect, useState } from "react";
import OrderCard from "./components/order-card";
import { toast } from "@/components/ui/use-toast";
import { Order } from "@/lib/schema";
import FilterButton from "./components/filter-button";
import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]); // Original orders fetched from the API
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]); // Orders to display (filtered or sorted)
  const [change, setChange] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // State to track the sorting order

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders");
      const data = await response.json();
      data.orders.map((order: any) => {
        order.createdAt = new Date(order.createdAt).toLocaleString();
        order.updatedAt = new Date(order.updatedAt).toLocaleString();
        return order;
      });

      const sortedOrders = [...data.orders].sort((a, b) => {
        return b.placedAt.seconds - a.placedAt.seconds; // Descending
      });

      setFilteredOrders(sortedOrders);
      setOrders(sortedOrders);
    };
    fetchOrders();
  }, [change]);

  const timestampToDate = (timestamp: any) => new Date(timestamp.seconds * 1000);

  // Function to sort orders based on the `createdAt` date and `sortOrder`
  const sortOrders = () => {
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      const dateA = timestampToDate(a.placedAt);
      const dateB = timestampToDate(b.placedAt);

      if (sortOrder === "asc") {
        return dateA.getTime() - dateB.getTime(); // Ascending
      } else {
        return dateB.getTime() - dateA.getTime(); // Descending
      }
    });

    setFilteredOrders(sortedOrders); // Update the filteredOrders with sorted results
  };

  const handleSortClick = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"; // Toggle sorting order
    setSortOrder(newSortOrder);
    sortOrders(); // Sort orders based on the updated sortOrder
  };

  const handleCopy = (e: React.MouseEvent, orderId: string) => () => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(orderId);
    toast({
      title: "Order ID Copied",
      description: "The order has been copied to the clipboard",
    });
  };

  return (
    <main className="container py-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold uppercase">Orders</h1>
        <div className="flex gap-4">
          <Button onClick={handleSortClick} variant="outline">
            <ArrowDownUpIcon className="w-4 mr-1" />
            Sort by Placed Date
          </Button>
          <FilterButton setFilteredOrders={setFilteredOrders} orders={orders} />
        </div>
      </div>
      <div>
        {filteredOrders?.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            change={change}
            setChange={setChange}
            handleCopy={(e) => handleCopy(e, order.orderId)}
          />
        ))}
      </div>
    </main>
  );
}
