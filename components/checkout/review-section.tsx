import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, PhoneIcon, Pencil, User, PackageIcon } from "lucide-react";
import { Address, Product } from "@/lib/schema";
import TooltipContext from "../tooltip-context";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { formatCurrency } from "@/lib/functions";
import { useCurrencyStore } from "@/hooks/use-store";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function ReviewSection({
  address,
  items,
  paymentMethod,
  fare,
  applyCoupon,
  setCoupon,
  couponStatus,
  isCouponValidating,
  coupon,
}: {
  address: Address;
  items: { id: string; details: Product; quantity: number; size: string }[];
  paymentMethod: string;
  fare: { total: number; shipping?: number; discount?: number; amountPaid: number };
  applyCoupon: () => void;
  setCoupon: (value: string) => void;
  couponStatus: "success" | "error" | "idle";
  isCouponValidating: boolean;
  coupon: string;
}) {
  const [currencyFare, setCurrencyFare] = useState({ total: "", shipping: "", discount: "", amountPaid: "" });
  const { currency } = useCurrencyStore();
  const [currencyItems, setCurrencyItems] =
    useState<{ id: string; details: Product; quantity: number; size: string; total: string }[]>(); // Items with currency

  useEffect(() => {
    const currencyCalc = async () => {
      const formattedItems = await Promise.all(
        items.map(async (product) => {
          const { details, quantity } = product;
          const total = await formatCurrency(details.price * quantity, currency);
          return { ...product, details: { ...details }, total };
        })
      );

      setCurrencyItems(formattedItems);

      const total = await formatCurrency(fare.total ?? 0, currency);
      const shipping = await formatCurrency(fare.shipping ?? 0, currency);
      const discount = await formatCurrency(fare.discount ?? 0, currency);
      const amountPaid = await formatCurrency(fare.amountPaid, currency);
      setCurrencyFare({ total, shipping, discount, amountPaid });
    };
    currencyCalc();
  }, [fare, currency, items]);

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
    <div className="max-w-[500px] min-w-72 w-full mx-auto">
      <div
        className={cn(
          " border rounded-lg p-4 mb-2",
          couponStatus === "idle"
            ? "border-neutral-200"
            : couponStatus === "success"
            ? "border-green-200 bg-green-100"
            : "border-red-200 bg-red-100"
        )}
      >
        {couponStatus === "success" ? (
          <p className="text-green-700 text-center">
            <span className="font-semibold">{coupon}</span> coupon successfully applied!
          </p>
        ) : (
          <div className="flex gap-4">
            <Input
              disabled={isCouponValidating}
              placeholder="Apply Coupon Code"
              onChange={(e) => setCoupon(e.target.value)}
            />
            <Button
              disabled={isCouponValidating}
              className={cn(couponStatus === "error" ? "border-red-600" : "")}
              onClick={() => applyCoupon()}
            >
              Apply
            </Button>
          </div>
        )}
      </div>
      <Card className="max-w-[500px] min-w-72 w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Order Details</CardTitle>
          <Separator orientation="horizontal" className="border-neutral-300 border-t-2" />
        </CardHeader>
        <CardContent className="flex flex-col gap-6 items-start justify-between px-6 ">
          <section className="w-full">
            <h3 className="text-xl font-semibold mb-2">Order Items</h3>
            {currencyItems && currencyItems?.length > 0 ? (
              <ul className="space-y-2">
                {currencyItems.map((item) => {
                  const { id, details, quantity, total } = item;
                  return (
                    <li key={id} className="flex justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <PackageIcon className="h-5 w-5 text-muted-foreground" />
                        <TooltipContext content={details.name}>
                          <span>{responsiveTruncate(details.name)}</span> x {quantity}
                        </TooltipContext>
                      </div>
                      <div>{total}</div>
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
                  <span>{address.address && address.address[0] + ", " + address.address[1] + ","}</span>
                  <span>
                    {address.city + ", " + address.state + ", " + address.country + " - " + address.postalCode}
                  </span>
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
                <span>{currencyFare.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{currencyFare.shipping}</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>Discount:</span>
                <span>-{currencyFare.discount}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{currencyFare.amountPaid}</span>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
