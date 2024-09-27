import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  PackageIcon,
  PhoneIcon,
  MailIcon,
  UserIcon,
  CalendarDaysIcon,
  PencilIcon,
  Pencil,
} from "lucide-react";
import { AddressType } from "@/lib/types";
import { Button } from "../ui/button";
import { RiDeleteBinFill } from "react-icons/ri";
import { useEditAddressStore, useModalStore } from "@/hooks/use-store";

export default function AddressSection({ addresses }: { addresses: AddressType[] }) {
  // Hooks
  const { openModal } = useModalStore(); // Modal store
  const { setEditAddress } = useEditAddressStore(); // Address store

  // Handlers
  const handleEditAddress = (id: string) => {
    setEditAddress(addresses.find((address) => address.id === id) as AddressType);
    openModal("addressForm");
  };
  return (
    <section className="flex flex-wrap gap-10">
      {addresses.map((address, index) => (
        <Card key={index} className="w-[500px] h-">
          <CardContent className="flex flex-col md:flex-row items-start justify-between p-6 ">
            <div className="space-y-2 w-full">
              <div className="flex items-start space-x-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col w-60">
                  <span>{address.address[0] + ", " + address.address[1] + ","}</span>
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

            <div className=" flex md:flex-col flex-row-reverse md:items-end md:h-full justify-between items-end w-full gap-2">
              {address.default && <Badge className="h-fit my-[7.2px]">Default</Badge>}
              {!address.default && (
                <Button size="sm" variant="secondary">
                  Make as default
                </Button>
              )}
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEditAddress(address.id)} className="">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" className="">
                  <RiDeleteBinFill className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
