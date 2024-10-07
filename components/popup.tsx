"use client";

import Image from "next/image";
import { Dialog, DialogClose, DialogContent } from "./ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useHomePageStore } from "@/hooks/use-store";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const { setPopupOn, popupOn } = useHomePageStore();

  const handleClose = () => {
    setPopupOn(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen && popupOn} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "p-0 overflow-hidden grid grid-cols-2 scale-100 lg:scale-150 transition-all duration-1000",
          !isOpen && "scale-0"
        )}
      >
        <Image src="/assets/popup-image.png" width={300} height={300} alt="Popup Image" />

        <div className="py-10  flex flex-col">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl text-center uppercase font-light tracking-tight">Want to get a discount?</h1>
              <p className="text-center text-muted-foreground text-sm">Join Jus-B Fashion</p>
              <p className="text-center text-muted-foreground text-xs">
                Enjoy a 10% discount on your first purchase when you sign up!
              </p>
            </div>
            <Link href="/sign-up">
              <Button size="sm" className="px-8 scale-75">
                Sign Up
              </Button>
            </Link>
            <DialogClose className="underline text-muted-foreground">No thanks</DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
