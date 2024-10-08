import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form"; // Import useFieldArray
import { z } from "zod";
import ImageUpload from "./image-upload";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/schema";
import { useEffect } from "react";

const formSchema = z.object({
  productId: z.string().min(2),
  productName: z.string().min(2),
  price: z.number(),
  description: z.object({
    text: z.string().min(2),
    features: z.array(z.string().min(2)), // Features array
  }),
  category: z.string().min(2),
  images: z.array(z.string().min(2)),
});

export default function AddProductForm({
  productForm,
  setProductForm,
  editProduct,
  change,
  setChange,
}: {
  productForm: boolean;
  setProductForm: (state: boolean) => void;
  editProduct?: Product | null;
  change: boolean;
  setChange: (state: boolean) => void;
}) {
  // ---------------------------------------------
  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      productName: "",
      price: 0,
      category: "",
      images: [],
      description: {
        text: "",
        features: [""], // Initialize with one empty feature
      },
    },
  });

  useEffect(() => {
    console.log(editProduct);
    if (editProduct) {
      form.reset();
      form.setValue("productId", editProduct.productId);
      form.setValue("productName", editProduct.name);
      form.setValue("price", editProduct.price);
      form.setValue("category", editProduct.category);
      form.setValue("images", editProduct.images);
      form.setValue("description.text", editProduct.description.text);
      form.setValue("description.features", editProduct.description.features);
    }
  }, [editProduct, form]);

  const {
    fields: featureFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "description.features",
  });

  // ---------------------------------------------
  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const newProduct = {
      productId: values.productId,
      name: values.productName,
      price: values.price,
      category: values.category,
      images: values.images,
      description: {
        text: values.description.text,
        features: values.description.features,
      },
    };
    const addProducts = async () => {
      const res = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        setChange(!change);
        console.log("Product added successfully");
        handleClose();
      }
    };
    addProducts();
    console.log(values);
  }

  const handleClose = () => {
    setProductForm(false);
    form.reset();
  };

  return (
    <Dialog open={productForm} onOpenChange={handleClose}>
      <DialogContent className="h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Add details for the new product</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* -------------------------- */}
            {/* Product ID and Price */}
            {/* -------------------------- */}
            <div className="grid grid-cols-2 gap-4">
              {/* Product ID */}
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product ID</FormLabel>
                    <FormControl>
                      <Input placeholder="category-1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Unique ID for each product. No spaces allowed. Only single hyphen(-) allowed.
                      <br />
                      Example: luxe-1
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="₹ 0000"
                        {...field}
                        onChange={(e) => form.setValue("price", e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormDescription>
                      Currency is INR. Do not include the currency symbol.
                      <br />
                      Example: 999
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* -------------------------- */}
            {/* Name */}
            {/* -------------------------- */}
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* -------------------------- */}
            {/* Category Name */}
            {/* -------------------------- */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    If it already exists, make sure it matches from the other product&#39;s category names.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* -------------------------- */}
            {/* Description Text */}
            {/* -------------------------- */}
            <FormField
              control={form.control}
              name="description.text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description main text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* -------------------------- */}
            {/* Features Input */}
            {/* -------------------------- */}
            <div className="flex flex-col gap-2">
              <FormLabel>Features</FormLabel>
              {featureFields.map((field, index) => (
                <div key={field.id} className="flex items-center">
                  <FormField
                    control={form.control}
                    name={`description.features.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input placeholder={`Feature ${index + 1}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={() => remove(index)} className="ml-2">
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => append("")} className="">
                Add Feature
              </Button>
            </div>

            {/* -------------------------- */}
            {/* Image Upload */}
            {/* -------------------------- */}
            <FormField control={form.control} name="images" render={({ field }) => <ImageUpload field={field} />} />

            {/* -------------------------- */}
            {/* Submit Button */}
            {/* -------------------------- */}
            <Button type="submit" variant="action" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
