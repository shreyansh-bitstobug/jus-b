import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Coupons } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditCouponFormSchema = z.object({
  code: z.string(),
  value: z.number(),
  maxDiscount: z.number(),
  isActive: z.boolean(),
});

export default function EditCouponsForm({
  isOpen,
  coupon,
  setIsOpen,
}: {
  isOpen: boolean;
  coupon: Coupons;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const form = useForm<z.infer<typeof EditCouponFormSchema>>({
    resolver: zodResolver(EditCouponFormSchema),
    defaultValues: {
      code: "",
      value: 0,
      maxDiscount: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof EditCouponFormSchema>) => {
    let editedCoupon;
    if (coupon.discountType === "fixed") {
      editedCoupon = {
        ...data,
        maxDiscount: data.value,
      };
    } else {
      editedCoupon = data;
    }
    const response = await fetch(`/api/coupons/${coupon.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCoupon),
    });

    const result = await response.json();

    if (response.ok) {
      toast({
        title: "Coupon updated successfully",
        description: `Coupon ${coupon.code} updated successfully`,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to update coupon",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    form.reset(coupon);
  }, [coupon]);

  const handleClose = () => {
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Coupon</DialogTitle>
          <DialogDescription>Edit the details for coupon code {coupon.code}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Coupon Code */}
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Code *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type the coupon code"
                      {...field}
                      onChange={(e) => form.setValue("code", e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Coupon's Discount Value */}
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Value *</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={(e) => form.setValue("value", e.target.valueAsNumber)} />
                  </FormControl>
                  <FormDescription>
                    The default discount type is{" "}
                    <span className="capitalize font-medium">&#34;{coupon.discountType}&#34;</span> which cannot be
                    changed. Fill the form accordingly.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Coupon's Maximum Discount (Only visible when discount type is percentage) */}
            {coupon.discountType === "percentage" && (
              <FormField
                name="maxDiscount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Discount *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => form.setValue("maxDiscount", e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the Maximum Discount the user can avail using this coupon code.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
