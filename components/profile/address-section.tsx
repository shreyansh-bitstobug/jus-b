import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon, PhoneIcon, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { RiDeleteBinFill } from "react-icons/ri";
import { useEditAddressStore, useModalStore } from "@/hooks/use-store";
import { Address } from "@/lib/schema";
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

const AddressCard = ({
  address,
  handleEditAddress,
  handleDeleteAddress,
}: {
  address: Address;
  handleEditAddress: (id: string) => void;
  handleDeleteAddress: (id: string) => void;
}) => {
  return (
    <Card className="w-[500px] h-">
      <CardContent className="flex flex-col gap-4 md:flex-row items-start justify-between p-6 ">
        <div className="space-y-2 w-full">
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="text-lg" size="icon">
                  <RiDeleteBinFill />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Address?</AlertDialogTitle>
                  <AlertDialogDescription>This action can not be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteAddress(address.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AddressSection({
  addresses,
  handleDeleteAddress,
}: {
  addresses: Address[];
  handleDeleteAddress: (id: string) => void;
}) {
  // Hooks
  const { openModal } = useModalStore(); // Modal store
  const { setEditAddress } = useEditAddressStore(); // Address store

  // Handlers
  const handleEditAddress = (id: string) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    if (addressToEdit) {
      setEditAddress(addressToEdit);
      openModal("addressForm");
    }
    openModal("addressForm");
  };

  return (
    <section className="flex flex-wrap gap-10">
      {addresses?.length === 0 ? (
        <div className="text-center w-full py-10 text-neutral-500">
          <p>No addresses added yet.</p>
        </div>
      ) : (
        addresses?.map((address, index) => (
          <AddressCard
            address={address}
            handleEditAddress={handleEditAddress}
            key={index}
            handleDeleteAddress={handleDeleteAddress}
          />
        ))
      )}
    </section>
  );
}
