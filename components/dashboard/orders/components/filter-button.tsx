import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Order, Product } from "@/lib/schema";
import { FilterIcon } from "lucide-react";

export default function FilterButton({
  setFilteredOrders,
  orders,
}: {
  setFilteredOrders: (products: Order[]) => void;
  orders: Order[];
}) {
  const handleFilterByStatus = (status: string) => {
    const filtered = orders.filter((order) => order.status === status);
    setFilteredOrders(filtered);
  };

  const handleFilterByPaymentStatus = (paymentStatus: string) => {
    const filtered = orders.filter((order) => order.paymentStatus === paymentStatus);
    setFilteredOrders(filtered);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="w-4 mr-1" /> Filter By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Order Status */}
        <DropdownMenuLabel>Order status</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleFilterByStatus("pending")}>Pending</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilterByStatus("confirmed")}>Confirmed</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilterByStatus("shipped")}>Shipped</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilterByStatus("delivered")}>Delivered</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilterByStatus("cancelled")}>Cancelled</DropdownMenuItem>

        {/* Payment Status */}
        <DropdownMenuLabel>Payment status</DropdownMenuLabel>
        <Separator />
        <DropdownMenuItem onClick={() => handleFilterByPaymentStatus("pending")}>Pending</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilterByPaymentStatus("confirmed")}>Confirmed</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilterByPaymentStatus("failed")}>Failed</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleFilterByPaymentStatus("refunded")}>Refunded</DropdownMenuItem>

        {/* Clear All */}
        <Separator />
        <DropdownMenuItem onClick={() => setFilteredOrders(orders)}>Clear All</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
