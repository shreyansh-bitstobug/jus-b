"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WhatsappBtn() {
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
    <Link href={whatsappLink} target="_blank" className="fixed bottom-8 right-8 transition-all hover:scale-110 z-50">
      <Image src="/assets/whatsapp_logo.png" alt="whatsapp" width={60} height={60} />
    </Link>
  );
}
