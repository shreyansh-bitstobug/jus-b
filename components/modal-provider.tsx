"use client";

import { useShareModalStore } from "@/hooks/use-store";
import CheckoutModal from "./modals/checkout-modal";
import SearchModal from "./modals/search-modal";
import ShareModal from "./modals/share-modal";

export default function ModalProvider() {
  const { link, message } = useShareModalStore();

  return (
    <>
      <SearchModal />
      <CheckoutModal />
      <ShareModal link={link} message={message} />
    </>
  );
}
