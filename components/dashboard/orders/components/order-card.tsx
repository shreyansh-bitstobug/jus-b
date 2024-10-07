import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Copy, CreditCardIcon, PackageIcon, TruckIcon, UserIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import _ from "lodash";
import TooltipContext from "@/components/tooltip-context";
import { Order } from "@/lib/schema";
import { formatCurrency } from "@/lib/functions";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDashCurrencyStore } from "@/hooks/use-store";

export default function OrderCard({
  order,
  handleCopy,
}: {
  order: Order;
  handleCopy: (e: React.MouseEvent, orderId: string) => void;
}) {
  const {
    orderId,
    status,
    items,
    shippingAddress,
    fare,
    placedAt,
    deliveredAt,
    trackingId,
    paymentMethod,
    paymentStatus,
  } = order;

  const [amountPaid, setAmountPaid] = useState<string>(""); // Amount paid by the user
  const [currencyItems, setCurrencyItems] =
    useState<{ id: string; details: any; quantity: number; size: string; total: string }[]>();
  const [total, setTotal] = useState<string>(""); // Total amount of the order
  const [discount, setDiscount] = useState<string>(""); // Discount amount
  const [shipping, setShipping] = useState<string>(""); // Shipping cost
  const [orderStatus, setOrderStatus] = useState<string>(status);
  const [orderTrackingId, setOrderTrackingId] = useState<string>(trackingId);
  const [orderPaymentStatus, setOrderPaymentStatus] = useState<string>(paymentStatus);

  const { currency } = useDashCurrencyStore();

  const timestampToDate = (timestamp: any) => new Date(timestamp.seconds * 1000);

  const responsiveTruncate = (text: string) => {
    const screenWidth = window.innerWidth;
    let length;

    if (screenWidth < 600) {
      length = 20; // For small screens
    } else if (screenWidth >= 600 && screenWidth < 1200) {
      length = 40; // For medium screens
    } else {
      length = 60; // For larger screens
    }

    return _.truncate(text, {
      length: length,
      separator: " ",
      omission: "...",
    });
  };

  useEffect(() => {
    const handleCurrencies = async () => {
      const formattedItems = await Promise.all(
        items.map(async (product) => {
          const { details, quantity } = product;
          const total = await formatCurrency(details.price * quantity, currency);
          return { ...product, details: { ...details }, total };
        })
      );

      setCurrencyItems(formattedItems);

      setAmountPaid(await formatCurrency(fare.amountPaid, currency));
      setTotal(await formatCurrency(fare.total, currency));
      setDiscount(await formatCurrency(fare.discount, currency));
      setShipping(await formatCurrency(fare.shipping, currency));
    };
    handleCurrencies();
  }, [fare, items, currency]);

  // ----------------
  // Handlers
  // ----------------

  // Update tracking ID function
  const handleTrackingIdUpdate = async () => {
    console.log("Updating tracking ID for order ", orderId, " with tracking ID ", orderTrackingId);
    const response = await fetch(`/api/orders/order/${orderId}`, {
      method: "POST",
      body: JSON.stringify({ trackingId: orderTrackingId }),
    });
    const data = await response.json();
    console.log(data);
  };

  // Update order status function
  const handleOrderStatusUpdate = async () => {
    console.log("Updating order status for order ", orderId, " with status ", orderStatus);
    const response = await fetch(`/api/orders/order/${orderId}`, {
      method: "POST",
      body: JSON.stringify({ status: orderStatus }),
    });
    const data = await response.json();
    console.log(data);
  };

  // Update payment status function
  const handlePaymentStatusUpdate = async () => {
    console.log("Updating payment status for order ", orderId, " with status ", orderPaymentStatus);
    const response = await fetch(`/api/orders/order/${orderId}`, {
      method: "POST",
      body: JSON.stringify({ paymentStatus: orderPaymentStatus }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                Order #{orderId}
                <Copy
                  className="inline-flex w-4 h-4 ml-2 cursor-pointer hover:text-muted-foreground/70 text-muted-foreground "
                  onClick={(e) => handleCopy(e, orderId)}
                />
              </CardTitle>
              <CardDescription>Placed on {placedAt ? format(timestampToDate(placedAt), "PPp") : "N/A"}</CardDescription>
            </div>
            <Badge
              className={cn(
                "text-lg py-1 px-3 capitalize",
                status === "completed"
                  ? "bg-neutral-600 hover:bg-neutral-700"
                  : status === "pending"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : status === "cancelled"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              )}
            >
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <TruckIcon className="h-5 w-5 text-muted-foreground" />
              <span className="capitalize">
                {" "}
                {deliveredAt ? (
                  <span>
                    <span className="sm:inline-flex hidden">Delivered on </span> {format(deliveredAt, "PP")}
                  </span>
                ) : (
                  "Order " + status
                )}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
              <span>
                {paymentMethod}{" "}
                <span
                  className={cn(
                    "text-sm capitalize font-medium",
                    paymentStatus === "pending"
                      ? "text-orange-500"
                      : paymentStatus === "refunded"
                      ? "text-blue-700"
                      : paymentStatus === "failed"
                      ? "text-red-700"
                      : "text-green-700"
                  )}
                >
                  &#40;{paymentStatus}&#41;
                </span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              <span>{shippingAddress.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <span>
                <span className="hidden sm:inline-flex whitespace-pre-wrap">Ordered on </span>
                {/* {format(new Date(placedAt.seconds) * 1000, "PPp")} */}
              </span>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
            {items.length > 0 ? (
              <ul className="space-y-2">
                {currencyItems &&
                  currencyItems.map((item) => {
                    const { id, details, quantity, total } = item;
                    return (
                      <li key={id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <PackageIcon className="h-5 w-5 text-muted-foreground" />
                          <TooltipContext content={details.name}>
                            <span className="">{responsiveTruncate(details.name)}</span> x {quantity}
                          </TooltipContext>
                        </div>
                        <span>{total}</span>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <p className="text-muted-foreground">No items in this order.</p>
            )}
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shipping}</span>
            </div>
            <div className="flex justify-between text-primary">
              <span>Discount:</span>
              <span>-{discount}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{amountPaid}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button>Actions</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Order Actions</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="# Tracking ID"
                    onChange={(e) => setOrderTrackingId(e.target.value)}
                    value={trackingId || orderTrackingId}
                  />
                  <Button onClick={handleTrackingIdUpdate}>Update Tracking ID</Button>
                </div>

                {/* Order Status Select Button */}
                <div>
                  <Label>Order Status</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Select onValueChange={(value) => setOrderStatus(value)} defaultValue={order.status}>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Change order status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button onClick={handleOrderStatusUpdate}>Update order status</Button>
                  </div>
                </div>

                {/* Payment Status Select Button */}
                <div>
                  <Label>Payment Status</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Select onValueChange={(value) => setOrderPaymentStatus(value)} defaultValue={order.paymentStatus}>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Change payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handlePaymentStatusUpdate}>Update payment status</Button>
                  </div>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
