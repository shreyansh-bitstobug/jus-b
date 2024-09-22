// Dependencies
import type { Metadata } from "next";

// CSS
import "../../globals.css";

// UI Components
import Footer from "@/components/footer";
import Navbar1 from "@/components/navbar/navbar-1";
import ModalProvider from "@/components/modal-provider";
import TopBarOffer from "@/components/offers/top-bar";
import WhatsappBtn from "@/components/whatsapp-btn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WhatsappBtn />
      <TopBarOffer />
      <Navbar1 />
      <ModalProvider />
      {children}
      <Footer />
    </>
  );
}
