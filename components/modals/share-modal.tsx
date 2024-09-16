"use client";

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

// UI Components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useModalStore } from "@/hooks/use-store";

export default function ShareModal({ link, message }: { link: string; message: string }) {
  const [linkCopySuccess, setLinkCopySuccess] = useState(false);
  const [messageCopySuccess, setMessageCopySuccess] = useState(false);

  const { closeModal, isOpen, modalName } = useModalStore();
  const isModalOpen = modalName === "share" && isOpen;

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => {
      setLinkCopySuccess(true);
      setTimeout(() => setLinkCopySuccess(false), 2000); // Reset copy success message after 2 seconds
    });
  };

  // Copy message to clipboard
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message).then(() => {
      setMessageCopySuccess(true);
      setTimeout(() => setMessageCopySuccess(false), 2000); // Reset copy success message after 2 seconds
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>Share it with your friends and family</DialogDescription>

          {/* Link input and copy button */}
          <div className="flex w-full">
            <Input value={link} type="text" className="rounded-r-none focus:outline-none focus:ring-0" readOnly />
            <Button size="icon" variant="outline" className="rounded-l-none" onClick={handleCopyLink}>
              {linkCopySuccess ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-neutral-700" />
              )}
            </Button>
          </div>

          {/* Social share buttons */}
          <div className="flex space-x-4 mt-4">
            {/* WhatsApp Share Button */}
            <WhatsappShareButton url={link} title={message}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            {/* Facebook Share Button */}
            <FacebookShareButton url={link}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            {/* Twitter Share Button */}
            <TwitterShareButton url={link} title={message}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            {/* Message copy button */}
            <Button className="flex gap-2" variant="outline" onClick={handleCopyMessage}>
              {messageCopySuccess ? (
                <>
                  Copy Message
                  <Check className="w-5 h-5 text-green-500" />
                </>
              ) : (
                <>
                  Copy Message
                  <Copy className="w-5 h-5 text-neutral-700" />
                </>
              )}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
