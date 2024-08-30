import { useModalStore } from "@/hooks/use-store";
import { Dialog } from "@radix-ui/react-dialog";

export default function CartModal() {
  const { isOpen, modal, closeModal } = useModalStore();
  const isCartOpen = isOpen && modal === "Cart";

  return <Dialog open={isCartOpen} onOpenChange={closeModal}></Dialog>;
}
