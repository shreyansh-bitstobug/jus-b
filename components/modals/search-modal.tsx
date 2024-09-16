"use client";

// Next Components
import Link from "next/link";

// UI Components
import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/hooks/use-store";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function SearchModal() {
  const { isOpen, modalName, closeModal } = useModalStore();

  const isModalOpen = modalName === "search" && isOpen;

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <Input placeholder="Search for products" className="w-full" />
        </DialogHeader>

        <p className="text-center">No results.</p>
      </DialogContent>
    </Dialog>
  );
}
