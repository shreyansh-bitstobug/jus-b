"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/auth/user-auth-form";

export default function SignInPage() {
  return (
    <>
      <div className="container py-4 lg:py-0 relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "absolute border-neutral-800 left-4 top-4 md:left-8 md:top-8"
          )}
        >
          Sign up
        </Link>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center items-center">
              <Image src="/assets/logo.svg" width={100} height={100} alt="logo" className="  lg:hidden rounded-sm" />
              <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">Explore the latest chic designs crafted just for you.</p>
            </div>
            <UserAuthForm actionName="sign-in" />
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
        <div className="relative hidden lg:flex flex-col h-screen bg-muted p-10  text-white ">
          <div className="max-w-[50vw]  object-cover absolute inset-0 primary-gradient" />
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
                &ldquo;Welcome back to Jus-B! Continue exploring the latest chic and contemporary designs made just for
                you.&rdquo;
              </p>
              <footer className="text-sm">Fashion Lover</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
}
