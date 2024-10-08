import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, PhoneIcon, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { RiDeleteBinFill } from "react-icons/ri";
import { useChangeStore, useEditAddressStore, useModalStore } from "@/hooks/use-store";
import { Address } from "@/lib/schema";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

const AddressCard = ({ address, handleEditAddress }: { address: Address; handleEditAddress: (id: string) => void }) => {
  const { setChange, change } = useChangeStore();
  const [user] = useAuthState(auth);

  const handleMakingDefault = () => {
    console.log("making default");
    const updateAddress = async () => {
      console.log("updating address");
      const response = await fetch(`/api/users/${user?.uid}`);
      const data = await response.json();
      const addresses = data.user.addresses;

      console.log("addresses", addresses);
      const updatedAddresses = addresses?.map((add: Address) => {
        if (add.id === address.id) {
          return { ...address, isDefault: true };
        }
        return address;
      });
      console.log("updatedAddresses", updatedAddresses);

      const res = await fetch(`/api/users/${user?.uid}`, {
        method: "POST",
        body: JSON.stringify({ address: updatedAddresses }),
      });

      console.log("res", res);

      if (res.ok) {
        setChange(!change);
      }
    };
    updateAddress();
  };
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
          {address.isDefault && <Badge className="h-fit my-[7.2px]">Default</Badge>}
          {!address.isDefault && (
            <Button size="sm" variant="secondary" onClick={handleMakingDefault}>
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
  );
};

export default function AddressSection({ addresses }: { addresses: Address[] }) {
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
          <AddressCard address={address} handleEditAddress={handleEditAddress} key={index} />
        ))
      )}
    </section>
  );
}
