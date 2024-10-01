// CSS
import ModalProvider from "@/components/modal-provider";
import "../../globals.css";
import AuthProvider from "@/components/auth-provider";

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
