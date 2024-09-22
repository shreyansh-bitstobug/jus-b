"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/direct-fonts";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

  const router = useRouter();

  const handleReset = async (e: any) => {
    e.preventDefault();
    const res = await sendPasswordResetEmail(email);
    if (res)
      toast({
        title: "Success",
        description: "Password reset email sent successfully.",
        action: (
          <ToastAction altText={"Sign in"}>
            <Link href="/sign-in">Sign in</Link>
          </ToastAction>
        ),
      });
    else if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <main className="flex gap-8 flex-col items-center justify-center w-full py-12">
      <Image src="/assets/logo.svg" alt="Jus-B Logo" width={100} height={100} />
      <h1 className={cn("text-3xl font-bold", syne.className)}>Reset Password</h1>
      <form className="flex  items-center">
        <Input
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          className="sm:w-96 w-64 rounded-r-none"
          disabled={sending}
        />
        <Button className="w-fit rounded-l-none gap-1" disabled={sending} onClick={(e) => handleReset(e)}>
          Reset <ChevronRight className="w-5 h-5" />
        </Button>
      </form>
      {error?.message.includes("auth/missing-email") && (
        <p className="text-red-500 max-w-96">Please enter valid email address</p>
      )}
    </main>
  );
}
