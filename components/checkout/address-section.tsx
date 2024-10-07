import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPinIcon, PhoneIcon, Pencil, User } from "lucide-react";
import { Button } from "../ui/button";
import { useEditAddressStore, useModalStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Address } from "@/lib/schema";
import { Skeleton } from "../ui/skeleton";

const AddressCard = ({
  address,
  handleEditAddress,
  selectAddress,
  selectedAddress,
}: {
  address: Address;
  handleEditAddress: (id: string) => void;
  selectAddress: (address: Address) => void;
  selectedAddress: Address | null;
}) => {
  return (
    <Card
      className={cn(
        "max-w-[500px] min-w-72 ",
        selectedAddress && address.id === selectedAddress.id ? "bg-blue-100" : ""
      )}
    >
      <CardContent className="flex flex-col md:flex-row items-start justify-between p-6 ">
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
              <span>{address.city + ", " + address.state + ", " + address.country + " - " + address.postalCode}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5 text-muted-foreground" />
            <span>{address.phoneNumber}</span>
          </div>
        </div>

        <div className=" flex md:flex-col flex-row-reverse md:items-end md:h-full justify-between items-end w-full gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => handleEditAddress(address.id)} className="">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter
        onClick={() => selectAddress(address)}
        className={cn(
          "p-1 text-center justify-center font-medium cursor-pointer",
          selectedAddress && address.id === selectedAddress.id ? "bg-blue-300 " : "bg-neutral-200"
        )}
      >
        {selectedAddress && address.id === selectedAddress.id ? "Selected" : "Select"}
      </CardFooter>
    </Card>
  );
};

export default function AddressSection({
  addresses,
  selectAddress,
  isLoading,
  selectedAddress,
}: {
  addresses: Address[];
  selectAddress: (address: Address) => void;
  isLoading: boolean;
  selectedAddress: Address | null;
}) {
  // Hooks
  const { openModal } = useModalStore(); // Modal store
  const { setEditAddress } = useEditAddressStore(); // Address store

  // Handlers
  const handleEditAddress = (id: string) => {
    setEditAddress(addresses.find((address) => address.id === id) as Address);
    openModal("addressForm");
  };

  console.log("selectedAddress", selectedAddress);

  return (
    <section className="flex flex-col gap-8 items-center justify-center">
      <h1 className="text-3xl font-semibold">Delivery Address</h1>
      {isLoading ? (
        <Skeleton className="w-72 sm:w-96 h-48" />
      ) : (
        addresses.map((address, index) => (
          <AddressCard
            key={index}
            address={address}
            handleEditAddress={handleEditAddress}
            selectAddress={selectAddress}
            selectedAddress={selectedAddress}
          />
        ))
      )}
      <Button onClick={() => openModal("addressForm")}>Add new address</Button>
    </section>
  );
}
