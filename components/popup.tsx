"use client";

import Image from "next/image";
import { Dialog, DialogClose, DialogContent } from "./ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="p-0 overflow-hidden">
        <div className="relative">
          <Image src="/assets/popup-offer.png" alt="Popup" width={1200} height={800} className="max-h-[70vh]" />
          <div className="w-2/5 absolute top-[65%] right-[6%] transform flex flex-col items-center gap-2">
            <Link href="/sign-up">
              <Button size="sm" className="px-8">
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
