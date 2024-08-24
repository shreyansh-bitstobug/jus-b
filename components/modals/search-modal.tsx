"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/debounce";
import { useEffect, useState } from "react";
import { useModalStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "../ui/dialog";

export default function SearchModal() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    console.log(debouncedSearch);
  });

  const { isOpen, modal, closeModal } = useModalStore();

  const isSearchOpen = isOpen && modal === "Search";

  return (
    <Dialog onOpenChange={closeModal} open={isSearchOpen}>
      <DialogContent className={cn("md:h-[calc(100vh-10%)] h-screen bg-rosy-brown border-rosy-brown")}>
        <Input
          placeholder="Search for products"
          className={cn("w-10/12 mx-auto")}
          onChange={(e) => setSearch(e.target.value)}
        />
      </DialogContent>
    </Dialog>
  );
}
