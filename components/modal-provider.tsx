import CheckoutModal from "./modals/checkout-modal";
import SearchModal from "./modals/search-modal";

export default function ModalProvider() {
  return (
    <>
      <SearchModal />
      <CheckoutModal />
    </>
  );
}
