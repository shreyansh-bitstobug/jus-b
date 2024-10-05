// CSS
import ModalProvider from "@/components/modal-provider";
import "../../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ModalProvider />
      {children}
    </>
  );
}
