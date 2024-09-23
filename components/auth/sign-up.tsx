"use client"; // Ensure this is present

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Use client-side hooks here
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function SignUpPage() {
  const [mounted, setMounted] = useState(false);
  const [redirect, setRedirect] = useState<string | undefined>(undefined);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Run once on the client to ensure this code is not running during SSR
  useEffect(() => {
    setMounted(true);
    const redirectParam = searchParams.get("redirect") || undefined;
    setRedirect(redirectParam);
  }, [searchParams]);

  useEffect(() => {
    if (user && mounted) {
      router.push(`/${redirect || ""}`);
    }
  }, [user, mounted, redirect, router]);

  if (!mounted) return null; // Prevents rendering on the server

  return (
    <div className="container py-4 lg:py-0 relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
      <Link
        href={`/sign-in?redirect=${redirect || ""}`}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute border-neutral-800 right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Sign in
      </Link>

      <div className="relative hidden lg:flex flex-col h-screen bg-muted p-10 text-white ">
        <div className="max-w-[50vw] object-cover absolute inset-0 primary-gradient" />
        <Image
          src="/assets/logo-jus_b.svg"
          width={640}
          height={400}
          alt="Authentication"
          className="z-20 max-w-96 mx-auto"
        />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Join Jus-B to discover trendy, affordable fashion designed for the modern woman. Sign up now to
              elevate your style!&rdquo;
            </p>
            <footer className="text-sm">Fashion Lover</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center items-center">
            <Image src="/assets/logo.svg" width={100} height={100} alt="logo" className="lg:hidden rounded-sm" />
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Sign up now to elevate your style!</p>
          </div>
          <UserAuthForm actionName="sign-up" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
