"use client";

import { getStorage, ref, deleteObject } from "firebase/storage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDashCurrencyStore } from "@/hooks/use-store";
import { formatCurrency } from "@/lib/functions";
import { Product } from "@/lib/schema";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
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
} from "@/components/ui/alert-dialog";

export default function ProductCard({
  product,
  setProduct,
  setEditForm,
  change,
  setChange,
}: {
  product: Product;
  setProduct: (product: Product) => void;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
  setChange: (state: boolean) => void;
}) {
  const [currencyPrice, setCurrencyPrice] = useState<string>();
  const [video, setVideo] = useState<string | null>(null);
  const { name, price, images, productId, sizesAvailable, sizes, category, description } = product;
  const { currency } = useDashCurrencyStore();

  const handleEditProduct = () => {
    console.log("Edit product", product);
    setProduct(product);
    setEditForm(true);
  };

  const handleDeleteProduct = () => {
    console.log("productId:", productId);
    const deleteProduct = async () => {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      setChange(!change);
    };
    deleteProduct();
  };

  const deleteImageByUrl = async (fileUrl: string) => {
    try {
      const storage = getStorage();

      // Get the file path from the URL
      const pathStartIndex = fileUrl.indexOf("/o/") + 3;
      const pathEndIndex = fileUrl.indexOf("?alt=");
      const filePath = decodeURIComponent(fileUrl.substring(pathStartIndex, pathEndIndex));

      // Create a reference to the file to delete
      const fileRef = ref(storage, filePath);

      // Delete the file
      await deleteObject(fileRef);
      setChange(!change);

      const res = await fetch(`/api/products/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: images.filter((image) => image !== fileUrl) }),
      });

      console.log(`File deleted successfully: ${fileUrl}`);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  //   const [formSize, setFormSize] = useState<string>("");
  //   const [formQuantity, setFormQuantity] = useState<number>(0);

  useEffect(() => {
    const video = images.find((image) => image.includes(".mp4"));
    if (video) {
      setVideo(video);
    }
  }, [images]);

  useEffect(() => {
    const formatPrice = async () => {
      const formattedPrice = await formatCurrency(price, currency);
      setCurrencyPrice(formattedPrice);
    };
    formatPrice();
  }, [price, currency]);

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const updatedSizesAvailable = sizesAvailable
  //       ? sizesAvailable.some((object) => object.size === formSize) // Check if the size already exists
  //         ? sizesAvailable.map((object) => {
  //             if (object.size === formSize) {
  //               // Update the quantity for the existing size
  //               return {
  //                 size: object.size,
  //                 quantity: formQuantity,
  //               };
  //             } else {
  //               return object;
  //             }
  //           })
  //         : [...sizesAvailable, { size: formSize, quantity: formQuantity }] // Add new size if it doesn't exist
  //       : [{ size: formSize, quantity: formQuantity }]; // Initialize if sizesAvailable is undefined or empty

  //     const response = await fetch(`/api/products/${productId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ sizesAvailable: updatedSizesAvailable }),
  //     });
  //   };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{name}</span>
          <span>Price: {currencyPrice}</span>
        </CardTitle>
        <CardDescription>Product ID: {productId}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <Badge>{category}</Badge>
          <div className="flex gap-4">
            <Button onClick={handleEditProduct}>Edit</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                  <AlertDialogDescription>This action can not be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteProduct}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <p>
          <span className="font-semibold">Description Text: </span>
          {description.text}
        </p>
        <p className=" whitespace-pre-wrap">
          <span className="font-semibold">Sizes: </span>
          {sizes.map((size) => (
            <span className="uppercase" key={size}>
              {size},{" "}
            </span>
          ))}
        </p>
        <div className="flex gap-2">
          {images.length > 0 &&
            images.map((image, index) =>
              image === video ? (
                <video key={index} id="vid1" className="video-js h-[150px]" controls>
                  <source src={video} type="video/mp4" />
                </video>
              ) : (
                <div key={index} className="w-[100px] h-[150px] relative overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    width={100}
                    height={100}
                    className="w-[100px] h-[150px] object-contain"
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="absolute bottom-0 right-0 bg-red-500 text-white">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Image?</AlertDialogTitle>
                      <AlertDialogDescription>This action can not be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction asChild>
                        <Button variant="destructive" onClick={() => deleteImageByUrl(image)}>
                          Delete
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialog>
                </div>
              )
            )}
        </div>
      </CardContent>
      {/* <CardFooter className="flex flex-col items-start">
        <div className="flex flex-col gap-2">
          <h1>Sizes and quantity</h1>
          <div className="flex flex-wrap gap-2">
            {sizesAvailable &&
              sizesAvailable?.length > 0 &&
              sizesAvailable.map((object, index) => (
                <span key={index}>
                  {object.size}, {object.quantity}
                </span>
              ))}
          </div>
        </div>
        <form className="grid grid-cols-3 gap-3 " onSubmit={handleSubmit}>
          <Input placeholder="Size" value={formSize} onChange={(e) => setFormSize(_.upperCase(e.target.value))} />
          <Input
            type="number"
            placeholder="Quantity"
            onChange={(e) => setFormQuantity(e.target.valueAsNumber)}
            value={formQuantity}
          />
          <Button type="submit">Save</Button>
        </form>
      </CardFooter> */}
    </Card>
  );
}
