"use client";

// Next Components
import Link from "next/link";

// UI Components
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/hooks/use-store";
import Image from "next/image";
import { ProductType } from "@/lib/types";
import { useEffect, useState } from "react";
import { products } from "@/public/assets/data";

const SearchCard = ({ product }: { product: ProductType }) => {
  return (
    <Link href={`/products/${product.id}`} className="flex items-center space-x-2 p-2 border-b border-gray-200">
      <Image
        src={product.image[0]}
        alt={product.name}
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-lg"
      />
      <div>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-500">{product.price}</p>
      </div>
    </Link>
  );
};

export default function SearchModal() {
  // States
  const [searchQuery, setSearchQuery] = useState(""); // Search Query
  const [searchResults, setSearchResults] = useState<ProductType[]>([]); // Search Results

  // Hooks
  const { isOpen, modalName, closeModal } = useModalStore(); // Modal Store

  const isModalOpen = modalName === "search" && isOpen; // Check if the modal is open

  useEffect(() => {
    const searchProducts = () => {
      const searchedProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      setSearchResults(searchedProducts as ProductType[]);
    };

    if (searchQuery != "") searchProducts();
    else setSearchResults([]);
  }, [searchQuery]);

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="min-h-[80vh] max-h-screen flex flex-col">
        <DialogHeader className=" mt-6">
          <DialogTitle></DialogTitle>
          <Input
            placeholder="Search for products"
            className="w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </DialogHeader>

        {searchResults.length === 0 ? (
          <p className="text-center p-4 text-muted-foreground text-sm">No results.</p>
        ) : (
          searchResults.map((product) => (
            <div key={product.id} className="min-h-[80vh]  max-h-screen overflow-y-scroll">
              <SearchCard product={product} />
            </div>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
}