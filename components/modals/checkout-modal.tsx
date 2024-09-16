"use client";

import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useModalStore } from "@/hooks/use-store";

export default function CheckoutModal() {
  const { isOpen, modalName, closeModal } = useModalStore();

  const isModalOpen = modalName === "checkout" && isOpen;

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="flex items-center flex-col">
        <DialogHeader>
          <DialogTitle>Did not found the user</DialogTitle>
        </DialogHeader>
        <DialogClose>
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        </DialogClose>
        <DialogClose>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </DialogClose>
        <DialogClose>
          <Link href="/checkout" className="underline">
            Continue as Guest
          </Link>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
