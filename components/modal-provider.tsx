"use client";

// Import modals
import CheckoutModal from "@/components/modals/checkout-modal";
import SearchModal from "@/components/modals/search-modal";
import ShareModal from "@/components/modals/share-modal";
import AddressModal from "@/components/modals/address-modal";
import ProfileModal from "@/components/modals/profile-modal";

// Hooks
import { useShareModalStore } from "@/hooks/use-store";

export default function ModalProvider() {
  const { link, message } = useShareModalStore();

  return (
    <>
      <SearchModal />
      <CheckoutModal />
      <AddressModal />
      <ShareModal link={link} message={message} />
      <ProfileModal />
    </>
  );
}
