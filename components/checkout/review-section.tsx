import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, PhoneIcon, Pencil, User, PackageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Address, Cart, Product } from "@/lib/schema";
import TooltipContext from "../tooltip-context";
import { CartProductType } from "@/lib/types";
import _ from "lodash";
import { useState } from "react";
import { Separator } from "@radix-ui/react-separator";

export default function ReviewSection({
  address,
  items,
  paymentMethod,
  fare,
}: {
  address: Address;
  items: { id: string; details: Product; quantity: number; size: string }[];
  paymentMethod: string;
  fare: { total: number; shipping?: number; discount?: number; amountPaid: number };
}) {
  const [products, setProducts] = useState<Product[]>([]);
  // const [fare, setFare] = useState({ total: 0, shipping: 0, discount: 0, amountPaid: 0 });

  const formatCurrency = (value: number) => `₹ ${value.toFixed(2)}`;

  const responsiveTruncate = (text: string) => {
    const screenWidth = window.innerWidth;
    let length;

    if (screenWidth < 600) {
      length = 20; // For small screens
    } else {
      length = 30; // For larger screens
    }

    return _.truncate(text, {
      length: length,
      separator: " ",
      omission: "...",
    });
  };

  return (
    <Card className="max-w-[500px] min-w-96 w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Order Details</CardTitle>
        <Separator orientation="horizontal" className="border-neutral-300 border-t-2" />
      </CardHeader>
      <CardContent className="flex flex-col gap-6 items-start justify-between px-6 ">
        <section className="w-full">
          <h3 className="text-xl font-semibold mb-2">Order Items</h3>
          {items?.length > 0 ? (
            <ul className="space-y-2">
              {items.map((item, index) => {
                const { id, details, quantity } = item;
                return (
                  <li key={id} className="flex justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <PackageIcon className="h-5 w-5 text-muted-foreground" />
                      <TooltipContext content={details.name}>
                        <span className="">{responsiveTruncate(details.name)}</span> x {quantity}
                      </TooltipContext>
                    </div>
                    <div>{formatCurrency(details.price * quantity)}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-muted-foreground">No items in this order.</p>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Delivery Address</h1>
          <div className="space-y-2 w-full">
            <div className="flex items-start space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col w-60">
                <span>{address.name}</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MapPinIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col w-60">
                <span>{address.address[0] + ", " + address.address[1] + ","}</span>
                <span>{address.city + ", " + address.state + ", " + address.country + " - " + address.postalCode}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-5 w-5 text-muted-foreground" />
              <span>{address.phoneNumber}</span>
            </div>
          </div>
        </section>

        <section className="space-y-4 w-full">
          <h3 className="text-lg font-semibold mb-2">Total Price</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(fare.total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{formatCurrency(fare.shipping ?? 0)}</span>
            </div>
            <div className="flex justify-between text-primary">
              <span>Discount:</span>
              <span>-{formatCurrency(fare.discount ?? 0)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(fare.amountPaid)}</span>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
