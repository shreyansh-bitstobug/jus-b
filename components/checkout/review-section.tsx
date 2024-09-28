import { AddressType, ProductType } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, PhoneIcon, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ReviewSection({
  address,
  items,
  paymentMethod,
}: {
  address: AddressType;
  items?: ProductType[];
  paymentMethod?: string;
}) {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Review Order Details</CardTitle>
      </CardHeader>
      <Card className={cn(" ")}>
        <CardContent className="flex flex-col md:flex-row items-start justify-between p-6 ">
          <div className="space-y-2 w-full">
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
        </CardContent>
      </Card>
    </Card>
  );
}
