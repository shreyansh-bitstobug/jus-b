import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useChangeStore, useEditAddressStore, useModalStore, useProfileStore } from "@/hooks/use-store";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

const addressFormSchema = z.object({
  fName: z.string().min(2).max(30),
  lName: z.string().min(2).max(30),
  displayName: z.string().min(2).max(30),
  email: z.string().email(),
  dob: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  phone: z.string().min(2).max(30),
});

export default function ProfileModal() {
  const [user] = useAuthState(auth);

  const { isOpen, closeModal, modalName } = useModalStore();
  const { profile, setProfile } = useProfileStore();
  const { change, setChange } = useChangeStore();

  const isModalOpen = isOpen && modalName === "profile";

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {},
  });

  const close = () => {
    closeModal();
    form.reset();
    setProfile(null);
  };

  useEffect(() => {
    if (profile) {
      form.reset();
      form.setValue("email", profile.email);
      form.setValue("displayName", profile.displayName);
      form.setValue("fName", profile.firstName);
      profile.lastName && form.setValue("lName", profile.lastName);
      profile.phoneNumber && form.setValue("phone", profile.phoneNumber);
      profile.dob && form.setValue("dob", profile.dob);
    }
  }, [isModalOpen]);

  async function onSubmit(values: z.infer<typeof addressFormSchema>) {
    if (!user) return;

    const res = await fetch(`/api/users/${user.uid}`, {
      method: "POST",
      body: JSON.stringify({
        firstName: values.fName,
        lastName: values.lName,
        email: values.email,
        phoneNumber: values.phone,
        displayName: values.displayName,
        dob: values.dob,
      }),
    });

    if (res.ok) {
      closeModal();
      setChange(!change);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* First name and last name */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Display Name <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Address */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" whitespace-pre-line">
                    Email address {""}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="yourname@domain.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <div className="flex justify-between gap-8">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of Birth <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      {/* @ts-ignore */}
                      <Input type="date" {...field} />
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
      </DialogContent>
    </Dialog>
  );
}
