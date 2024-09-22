"use client";

import React, { useState, useEffect } from "react";

import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthError } from "firebase/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({
  className,
  actionName,
  ...props
}: { className?: string; actionName: "sign-up" | "sign-in" } & UserAuthFormProps) {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // Password visibility state
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false); // Confirm password visibility state
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false); // Password match state
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false); // Password validation state
  const [prevPageUrl, setPrevPageUrl] = useState<string>("/"); // Previous page URL

  // Form fields states
  const [email, setEmail] = useState<string>(""); // Email state
  const [password, setPassword] = useState<string>(""); // Password state
  const [confirm, setConfirm] = useState<string>(""); // Confirm password state
  const [name, setName] = useState<string>(""); // Full name state

  // Firebase hooks for sign up and sign in (Destructuring the hooks)
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  // Next hook to get the query parameters for the redirect URL
  const params = useSearchParams();
  const router = useRouter();

  // Function to validate the password
  function validatePassword(password: string): boolean {
    // Regular expression to check the password criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);
  }

  // UseEffect to get the previous page URL
  useEffect(() => {
    const prevUrl = params.get("redirect") || "/";
    if (prevUrl.charAt(0) !== "/") setPrevPageUrl("/" + prevUrl);
    else setPrevPageUrl(prevUrl);
  }, [params]);

  // UseEffect to check if the password and confirm password match
  useEffect(() => {
    if (password === confirm) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  }, [password, confirm]);

  // UseEffect to check if the password is valid
  useEffect(() => {
    if (validatePassword(password)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [password]);

  // Function to handle the sign up
  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log(res); // Debugging
      if (res) {
        // Redirect or handle successful sign-up
        console.log("User created successfully");
        router.push(prevPageUrl); // Redirect to the prev page
      }
    } catch (err) {
      const error = err as AuthError;

      if (error.code === "auth/email-already-in-use") {
        console.error("Error: This email is already in use");
        // Display an error message to the user
        alert("This email is already in use. Please use a different email.");
      } else {
        console.error("Error", error);
      }
    }
  };

  // Function to handle the sign in
  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) router.push(prevPageUrl); // Redirect to the prev page
      console.log(res); // Debugging
    } catch (err) {
      console.error("Error", err);
    }
  };

  // Function to handle the Google sign in
  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      if (res) router.push(prevPageUrl); // Redirect to the prev page
      console.log(res); // Debugging
    } catch (err) {
      console.error("Error", err);
    }
  };

  // Function to handle the form submission
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    actionName === "sign-up" && handleSignUp();
    actionName === "sign-in" && handleSignIn();

    actionName === "sign-up" ? handleSignUp() : console.log("Sign in");

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            {/* Input field for e-mail */}
            <div>
              <Label className="" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>

            {/* Password field for password */}
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="password"
                type={isPasswordVisible ? "text" : "password"}
                onChange={(event) => setPassword(event.target.value)}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute  right-0 top-6"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <RiEyeLine /> : <RiEyeCloseLine />}
              </Button>
            </div>

            {/* Password field for confirm password (Only SignUp Page) */}
            {actionName === "sign-up" && (
              <>
                {/* Confirm Password for sign up */}
                <div className="relative">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    placeholder="confirm password"
                    type={isConfirmVisible ? "text" : "password"}
                    onChange={(event) => setConfirm(event.target.value)}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute  right-0 top-6"
                    onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                  >
                    {isConfirmVisible ? <RiEyeLine /> : <RiEyeCloseLine />}
                  </Button>
                  {!isPasswordMatch && <p className={cn("text-red-700 text-sm")}>Password does not match</p>}
                </div>

                {/* Full name field for sign up */}
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    onChange={(event) => setName(event.target.value)}
                    autoCapitalize="words"
                    autoComplete="name"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}
            {actionName === "sign-in" && (
              <Link
                href="/password-reset"
                className={cn(" w-fit flex text-muted-foreground text-xs hover:text-black underline")}
              >
                Forgot password
              </Link>
            )}
          </div>

          {/* Submit Button */}
          <Button variant="action" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {actionName === "sign-up" ? "Sign Up with Email" : "Sign In with Email"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-400" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="border-neutral-800"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
        )}
        Google
      </Button>
    </div>
  );
}
