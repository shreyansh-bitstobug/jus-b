"use client";
import { useState, useEffect } from "react";

import { Facebook, Instagram, Locate, Mail, MapPin, Phone, ShoppingBag, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/direct-fonts";
import { RiInstagramLine, RiWhatsappLine } from "react-icons/ri";

export default function Footer() {
  const [whatsappLink, setWhatsappLink] = useState("https://chat.whatsapp.com/BfPHIvJq0Gg4FJeohDBjry");

  useEffect(() => {
    const groupLink = "https://chat.whatsapp.com/BfPHIvJq0Gg4FJeohDBjry"; // WhatsApp group link
    const whatsappSchemeLink = "whatsapp://chat?code=BfPHIvJq0Gg4FJeohDBjry"; // Custom scheme to open app
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Detect if user is on Windows or Mobile
    if (navigator.userAgent.includes("Windows")) {
      if (navigator.userAgent.includes("WhatsApp")) {
        // If WhatsApp is installed on Windows, use the custom scheme
        setWhatsappLink(whatsappSchemeLink);
      } else {
        // Otherwise, open WhatsApp Web
        setWhatsappLink(groupLink);
      }
    } else if (isMobile) {
      // On mobile devices, use the custom scheme to open WhatsApp app
      setWhatsappLink(whatsappSchemeLink);
    } else {
      // Default fallback to WhatsApp Web
      setWhatsappLink(groupLink);
    }
  }, []);

  return (
    <footer className="border-t-2 text-neutral-800 border-penn-red ">
      <div className=" flex flex-col pt-8">
        {/* ----------------------------------------- */}
        {/* Top Part of the footer */}
        {/* ----------------------------------------- */}
        <div className="lg:px-10 md:px-8 sm:px-6 px-4 md:grid lg:grid-cols-4 md:grid-cols-3 space-y-16 py-10">
          {/* 1st Div of top part of footer */}
          <div className="flex flex-col gap-4 col-span-2 px-6">
            {/* Logo with name */}
            <Link href="/" className="mr-6 flex items-center space-x-2 w-fit">
              <Image src="/assets/logo.svg" alt="Jus-B Logo" width={60} height={60} />
              <span className="hidden text-2xl font-bold sm:flex sm:flex-col leading-4">
                Jus-B<span className=" font-medium text-base text-neutral-700">by JB</span>
              </span>
            </Link>

            {/* Footer About */}
            <p className=" text-muted-foreground max-w-xl">
              We celebrate the unique style of our customers, blending trends, sensuality, and glamour. Proudly
              presenting our luxurious Indo-Western fusion collection for every occasion.
            </p>

            {/* Social Links */}
            <div className="space-y-2">
              <h1 className={cn("text-2xl font-semibold", syne.className)}>Social Links</h1>
              <div className="flex items-center gap-4">
                <Link href="https://www.instagram.com/jusb_jb" className="text-muted-foreground hover:text-foreground">
                  <RiInstagramLine className="h-5 w-5" />
                </Link>
                <Link href={whatsappLink} className="text-muted-foreground hover:text-foreground">
                  <RiWhatsappLine className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2nd Part of top part of footer */}
          <div className="space-y-4 px-4">
            <h1 className={cn("text-2xl font-bold", syne.className)}>India</h1>
            <div className="flex flex-col gap-2">
              {/* Address */}
              <p className="flex gap-2">
                <span>
                  <MapPin className="h-5 w-5" />
                </span>
                WZ 1550 Nangal Raya, New Delhi 110046
              </p>

              {/* Contact */}
              <Link href="tel:+919953321989" className="flex gap-2 hover:text-muted-foreground w-fit">
                <span>
                  <Phone className="h-5 w-5" />
                </span>
                +91 99533 21989
              </Link>

              {/* Email */}
              <Link href="mailto:info@jus-b-fashion.com" className="flex gap-2 hover:text-muted-foreground w-fit">
                <span>
                  <Mail className="h-5 w-5" />
                </span>
                info@jus-b-fashion.com
              </Link>
            </div>
          </div>
        </div>

        {/* ------------------------------------- */}
        {/* Bottom Part of the footer */}
        {/* ------------------------------------- */}
        <div className=" lg:px-14 md:px-12 sm:px-10 px-8 py-10 border-t-2 space-y-4 border-penn-red ">
          <h1 className={cn("text-2xl font-bold", syne.className)}>Quick Links</h1>
          <nav className=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            <div className="flex flex-col gap-2">
              <Link href="#" className="hover:text-muted-foreground w-fit">
                Products
              </Link>
              <Link href="#" className="hover:text-muted-foreground w-fit">
                Return / Exchange Policy
              </Link>
              <Link href="#" className="hover:text-muted-foreground w-fit">
                Shipping Policy
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="#" className="hover:text-muted-foreground w-fit">
                About Us
              </Link>
              <Link href="#" className="hover:text-muted-foreground w-fit">
                Contact Us
              </Link>
            </div>
          </nav>
        </div>

        {/* ------------------------------------- */}
        {/* Bottom-most Part of the footer */}
        {/* ------------------------------------- */}
        <div className=" lg:px-14 md:px-12 sm:px-10 px-8 py-2 border-t-2 border-penn-red ">
          <p className="text-right">Copyright © 2024. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
