"use client";

// Next Components
import Link from "next/link";

// UI Components
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { currency, useCurrencyStore, useModalStore } from "@/hooks/use-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/lib/schema";
import { Skeleton } from "../ui/skeleton";
import { formatCurrency } from "@/lib/functions";

const SearchCard = ({ product, currency }: { product: Product; currency: any }) => {
  const [price, setPrice] = useState<string>();
  useEffect(() => {
    const currencyPrice = async () => {
      const price = await formatCurrency(product.price, currency);
      setPrice(price);
    };
    currencyPrice();
  }, [product, currency]);

  // const price = formatCurrency(product.price, currency);
  return (
    <Link href={`/products/${product.id}`} className="flex items-center space-x-2 p-2 border-b border-gray-200">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-lg"
      />
      <div>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-500">{price}</p>
      </div>
    </Link>
  );
};

export default function SearchModal() {
  // States
  const [searchQuery, setSearchQuery] = useState(""); // Search Query
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Search Results
  const [loading, setLoading] = useState(false); // Loading State

  // Hooks
  const { isOpen, modalName, closeModal } = useModalStore(); // Modal Store
  const { currency } = useCurrencyStore(); // Currency Store

  const isModalOpen = modalName === "search" && isOpen; // Check if the modal is open

  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();

      const products = data.products;
      console.log("Fetched products:", products);

      const searchedProducts = products.filter((product: Product) => {
        return (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      console.log("Searched products:", searchedProducts);
      setSearchResults(searchedProducts);
      setLoading(false);
    };

    if (searchQuery !== "") {
      searchProducts();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    closeModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="min-h-[80vh] max-h-screen flex flex-col">
        <DialogHeader className="mt-6">
          <DialogTitle></DialogTitle>
          <Input
            placeholder="Search for products"
            className="w-full"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              console.log("Search Query:", e.target.value);
            }}
          />
        </DialogHeader>

        {loading ? (
          <>
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </>
        ) : searchResults.length === 0 ? (
          <p className="text-center p-4 text-muted-foreground text-sm">No results.</p>
        ) : (
          <div className="min-h-[80vh] max-h-screen overflow-y-scroll">
            {searchResults.map((product) => (
              <SearchCard key={product.id} product={product} currency={currency} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
