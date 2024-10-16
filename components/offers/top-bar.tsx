"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";

import Image from "next/image";

import { cn } from "@/lib/utils";

export default function TopBarOffer() {
  const [offerOn, setOfferOn] = useState(true);
  const [offer, setOffer] = useState("10% Off Your First Order! Don't miss it!");

  useEffect(() => {
    const fetchOffer = async () => {
      const response = await fetch("/api/offer");
      const data = await response.json();
      if (response.ok) {
        setOffer(data.offers[0].offer);
      } else {
        console.error("Error fetching offer:", data.error);
      }
    };

    fetchOffer();
  }, []);

  return (
    <div
      className={cn("p-2 flex justify-center text-snow bg-penn-red text-sm sticky top-0 z-40", offerOn ? "" : "hidden")}
    >
      <p className="flex items-center gap-2">
        <Image src="/assets/offer-icon.svg" className="fill-white" width={20} height={20} alt="Offer" /> {offer}
      </p>
      <X
        className="w-5 h-5 absolute right-2 top-2 cursor-pointer hover:rotate-90 transition-all duration-500"
        onClick={() => setOfferOn(false)}
      />
    </div>
  );
}
