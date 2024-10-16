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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  discountType: z.enum(["percentage", "fixed"]),
});

export default function AddCouponsForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const form = useForm<z.infer<typeof EditCouponFormSchema>>({
    resolver: zodResolver(EditCouponFormSchema),
    defaultValues: {
      code: "",
      value: 0,
      maxDiscount: 0,
      discountType: "fixed",
    },
  });

  const onSubmit = async (data: z.infer<typeof EditCouponFormSchema>) => {
    const response = await fetch(`/api/coupons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      toast({
        title: "Coupon added successfully",
        description: `Coupon ${data.code} added successfully`,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "Failed to add coupon",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Coupon</DialogTitle>
          <DialogDescription>Add the details the new coupon</DialogDescription>
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
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault(); // Prevent space input
                        }
                      }}
                      onChange={(e) => {
                        const valueWithoutSpaces = e.target.value.replace(/\s+/g, ""); // Remove spaces
                        form.setValue("code", valueWithoutSpaces.toUpperCase()); // Convert to uppercase
                      }}
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
                    <Input
                      {...field}
                      className={
                        form.getValues("discountType") === "percentage" && form.getValues("value") > 60
                          ? "bg-red-100"
                          : ""
                      }
                      type="number"
                      onChange={(e) => form.setValue("value", e.target.valueAsNumber)}
                    />
                  </FormControl>
                  {form.getValues("discountType") === "percentage" && form.getValues("value") > 60 && (
                    <p className="text-red-700">
                      The discount value is set to be percentage and is too high. Please check again.
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Coupon's Discount Type */}
            <FormField
              name="discountType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="percentage" />
                        </FormControl>
                        <FormLabel className="font-normal">Percentage</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="fixed" />
                        </FormControl>
                        <FormLabel className="font-normal">Fixed</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Please select the discount type for the coupon code. If you select percentage, you will need to
                    enter the maximum discount value as well. This cannot be changed later.
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Coupon's Maximum Discount (Only visible when discount type is percentage) */}
            {form.getValues("discountType") === "percentage" && (
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
