"use client";

import { syne } from "@/lib/direct-fonts";
import { Order } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Check, CopyIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Confirmation({ order }: { order: Order }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="text-center max-w-[500px] flex flex-col items-center mx-auto gap-4 py-4">
      <h1 className={cn("text-3xl font-semibold", syne.className)}>Congratulations</h1>
      <p>
        Thank you for your order. Your order has successfully been placed and will soon be confirmed by our team. <br />
        Your order number is{" "}
        <span
          className="hover:text-muted-foreground cursor-pointer whitespace-nowrap"
          onClick={() => handleCopy(order.orderId)}
        >
          {order.id} {!copied ? <CopyIcon className="h-4 w-4 inline" /> : <Check className="h-4 w-4 inline" />}
        </span>
      </p>
      <p>
        You can also connect with us for more information{" "}
        <Link href="/contact" className="text-blue-700 hover:underline">
          here
        </Link>
      </p>
    </div>
  );
}
