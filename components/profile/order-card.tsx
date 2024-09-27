import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderType } from "@/lib/types";
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
} from "../ui/alert-dialog";
import Link from "next/link";
import _ from "lodash";
import TooltipContext from "../tooltip-context";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export default function OrderCard({
  order,
  handleCopy,
}: {
  order: OrderType;
  handleCopy: (e: React.MouseEvent, orderId: string) => void;
}) {
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  const {
    orderId,
    status,
    items,
    paymentStatus,
    shippingAddress,
    billingAddress,
    fare,
    placedAt,
    deliveredAt,
    updatedAt,
    trackingId,
    paymentMethod,
  } = order;

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
              <CardDescription>Placed on {format(placedAt, "PP")}</CardDescription>
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
                  " Order" + status
                )}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
              <span>{paymentMethod}</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              <span>{shippingAddress.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <span>
                <span className="hidden sm:inline-flex whitespace-pre-wrap">Ordered on </span>
                {format(placedAt, "PP")}
              </span>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
            {items.length > 0 ? (
              <ul className="space-y-2">
                {items.map((item, index) => {
                  const { id, details, quantity } = item;
                  return (
                    <li key={id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <PackageIcon className="h-5 w-5 text-muted-foreground" />
                        <TooltipContext content={details.name}>
                          <span className="">{responsiveTruncate(details.name)}</span> x {quantity}
                        </TooltipContext>
                      </div>
                      <span>{formatCurrency(details.price * item.quantity)}</span>
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
              <span>{formatCurrency(fare.total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{formatCurrency(fare.shipping)}</span>
            </div>
            <div className="flex justify-between text-primary">
              <span>Discount:</span>
              <span>-{formatCurrency(fare.discount)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(fare.amountPaid)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {/* <Button variant="outline">Print Receipt</Button> */}

          <AlertDialog>
            <AlertDialogTrigger>
              <Button>Track Order</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Track Order</AlertDialogTitle>
                <AlertDialogDescription>
                  Tracking ID: {trackingId}
                  <Copy className="inline-flex ml-2 w-4 h-4 cursor-pointer hover:text-muted-foreground/70 text-muted-foreground " />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <Link href={`/contact?orderId=${orderId}`}>
                  <AlertDialogAction>Contact us</AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
