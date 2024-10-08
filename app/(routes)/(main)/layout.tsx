// CSS
import "../../globals.css";

// UI Components
import Footer from "@/components/footer";
import Navbar1 from "@/components/navbar/navbar-1";
import ModalProvider from "@/components/modal-provider";
import TopBarOffer from "@/components/offers/top-bar";
import WhatsappBtn from "@/components/whatsapp-btn";
import TopBtn from "@/components/top-btn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBtn />
      <WhatsappBtn />
      <TopBarOffer />
      <Navbar1 />
      <ModalProvider />
      {children}
      <Footer />
    </>
  );
}
