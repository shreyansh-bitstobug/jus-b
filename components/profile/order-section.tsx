import { orders } from "@/lib/data";
import { OrderType } from "@/lib/types";
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

export default function OrderSection() {
  const { toast } = useToast();

  const handleCopy = (e: React.MouseEvent, orderId: string) => () => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(orderId);
    toast({ title: "Order ID Copied", description: "The order has been copied to the clipboard" });
  };

  return (
    <section className="flex flex-wrap gap-4">
      {orders.map((order) => (
        <>
          <OrderCard order={order} handleCopy={handleCopy} key={order.id} />
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                <span className="text-lg font-semibold">Order ID:</span> {order.orderId}
                <TooltipContext content="Copy Order ID">
                  <Copy
                    className="inline-flex w-4 h-4 ml-2 cursor-pointer hover:text-muted-foreground/70 text-muted-foreground "
                    onClick={(e) => handleCopy(e, order.orderId)()}
                  />
                </TooltipContext>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Order Date:</span>
                  <span>{format(order.placedAt, "PP")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Total Items:</span>
                  <span>{order.items.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Total Amount:</span>
                  <span>${order.fare.amountPaid}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter
              className={cn(
                "text-center items-center font-medium justify-center text-white p-1 text-sm bg-neutral-200 cursor-pointer  capitalize rounded-b-lg",
                order.status === "completed"
                  ? "text-black"
                  : order.status === "cancelled"
                  ? "text-red-500"
                  : order.status === "pending"
                  ? " text-orange-700"
                  : " text-green-600"
              )}
            >
              {order.status}
            </CardFooter>
          </Card> */}
        </>
      ))}
    </section>
  );
}
