import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useChangeStore, useEditAddressStore, useModalStore } from "@/hooks/use-store";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { Address } from "@/lib/schema";

const addressFormSchema = z.object({
  name: z.string().min(2).max(30),
  address1: z.string().min(2).max(100),
  address2: z.string().min(2).max(100).optional(),
  city: z.string().min(2).max(30),
  state: z.string().min(2).max(30),
  postalCode: z.string().min(2).max(30),
  country: z.string().min(2).max(30),
  phone: z.string().min(2).max(30),
});

export default function AddressModal() {
  const { isOpen, closeModal, modalName } = useModalStore();
  const { editAddress, setEditAddress } = useEditAddressStore();
  const [user] = useAuthState(auth);
  const { change, setChange } = useChangeStore();

  const isModalOpen = isOpen && modalName === "addressForm";

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {},
  });

  const close = () => {
    closeModal();
    form.reset();
    setEditAddress(null);
  };

  useEffect(() => {
    if (editAddress) {
      form.reset(editAddress);
      form.setValue("phone", editAddress.phoneNumber);
      form.setValue("address1", editAddress.address[0]);
      form.setValue("address2", editAddress.address[1]);
    }
  }, [isModalOpen]);

  async function onSubmit(values: z.infer<typeof addressFormSchema>) {
    if (!user) return;

    console.log("values", values);

    const response = await fetch(`/api/users/${user.uid}`);
    const data = await response.json();
    const addresses = data.user.addresses;
    const updatedAddresses = editAddress
      ? addresses.map((address: Address) => (address.id === editAddress.id ? { ...address, ...values } : address))
      : [...addresses, values];

    console.log("updatedAddresses", updatedAddresses);

    const res = await fetch(`/api/users/${user.uid}`, {
      method: "POST",
      body: JSON.stringify({ addresses: updatedAddresses }),
    });

    if (res.ok) {
      closeModal();
      form.reset();
      setChange(!change);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add address</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">This name is for address only.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" whitespace-pre-line">
                      Address Line 1 {""}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Flat, House no., Building, Company, Apartment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="whitespace-pre-wrap">
                      Address Line 2 <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Area, Street, Sector, Village" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-8">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        City <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="City" className="w-40" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>
                        State <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between gap-8">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Postal Code <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Postal Code" className="w-40" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>
                        Contact Number <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number with extension" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 justify-end">
                <Button type="button" variant="outline">
                  <DialogClose>Cancel</DialogClose>
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
