import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function SortingButton({ products, setSortedProducts }: { products: any[]; setSortedProducts: any }) {
  const sortProducts = (value: string) => {
    const [component, order] = value.split("-");

    const sorted = [...products].sort((a, b) => {
      if (a[component] < b[component]) {
        return order === "ascending" ? -1 : 1;
      }
      if (a[component] > b[component]) {
        return order === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setSortedProducts(sorted);
  };

  return (
    <Select
      name="sort"
      onValueChange={(value) => {
        sortProducts(value);
      }}
    >
      <SelectTrigger className="whitespace-pre-wrap w-fit">
        <span className="">Sort by </span>
        {/* <SelectValue placeholder="Select Sorting" className="font-semibold text-primary" /> */}
      </SelectTrigger>
      <SelectContent className="w-fit">
        <SelectItem value="price-ascending">Price (Low to High)</SelectItem>
        <SelectItem value="price-descending">Price (High to Low)</SelectItem>
        <SelectItem value="name-ascending">Name (Ascending)</SelectItem>
        <SelectItem value="name-descending">Name (Descending)</SelectItem>
      </SelectContent>
    </Select>
  );
}
