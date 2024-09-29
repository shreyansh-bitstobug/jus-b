"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { syne } from "@/lib/direct-fonts";
import { cn } from "@/lib/utils";

export default function MainLoader({ className }: { className?: string }) {
  return (
    <main
      className={cn(
        "fixed inset-0 w-screen h-screen z-50 flex flex-col justify-center bg-gradient-to-r from-black to-penn-red text-white items-center text-center"
      )}
    >
      <TextGenerateEffect className={cn("text-white", syne.className)} duration={10} filter={false} words="Just-JB" />
      <TextGenerateEffect className={cn("text-white", syne.className)} duration={10} filter={false} words="Fashion" />
    </main>
  );
}
