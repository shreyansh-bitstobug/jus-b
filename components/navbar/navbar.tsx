"use client";
// Dependencies
import { useEffect, useState } from "react";

// Next Components and Hooks
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Hooks and Utils
import { cn } from "@/lib/utils";
import { useCartStore } from "@/hooks/use-store";

// Icons
import { Heart, LogIn, LogOut, Search, ShoppingBag, User, UserPlus } from "lucide-react";
import { HiMenuAlt3 } from "react-icons/hi";

// UI Components
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

// --------------------
// Navbar Component
// --------------------
export default function Navbar() {
  // State
  const [cartCount, setCartCount] = useState(0); // Number of items in the cart

  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);

  // Logout function
  const handleLogout = () => {
    // Clear the local storage
    localStorage.clear();
    signOut(); // Sign out from firebase auth
    // Redirect to the home page
    window.location.href = "/";
  };

  // Get the current page from the URL for active link
  const url = usePathname();
  const pathPart = url?.split("/")[1];
  const page = pathPart?.split("#")[0] ? pathPart.split("#")[0] : pathPart;

  // Get the cart from the store for number of items in the cart
  const { cart } = useCartStore();

  // Update the cart count when the cart changes in the store
  useEffect(() => {
    console.log(cart);
    setCartCount(Object.keys(cart).length);
  }, [cart]);

  // --------------------
  // Return the Navbar component
  // --------------------
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" px-4  flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/assets/logo.svg" alt="Jus-B Logo" width={40} height={40} />
          <span className="hidden font-bold sm:flex sm:flex-col leading-4 whitespace-nowrap">
            Jus-B<span className="text-xs font-medium text-neutral-700 whitespace-nowrap">by JB</span>
          </span>
        </Link>

        {/* Navigation Panel */}
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          {/* Home Link */}
          <Link
            href="/"
            className={cn("hidden md:block text-neutral-600", page != "" ? "text-neutral-600" : "text-black font-bold")}
          >
            Home
          </Link>

          {/* Shop Link */}
          <Link
            href="/shop"
            className={cn(
              "hidden md:block text-neutral-600",
              page != "shop" ? "text-neutral-600" : "text-black font-bold"
            )}
          >
            Shop
          </Link>

          {/* Contact Link */}
          <Link
            href="/contact"
            className={cn(
              "hidden md:block text-neutral-600",
              page != "contact" ? "text-neutral-600" : "text-black font-bold"
            )}
          >
            Contact us
          </Link>

          {/* About Link */}
          <Link
            href="/about"
            className={cn(
              "hidden md:block text-neutral-600",
              page != "about" ? "text-neutral-600" : "text-black font-bold"
            )}
          >
            About us
          </Link>
        </nav>

        {/* Search, Cart, and Account */}
        <div className="flex items-center md:gap-4">
          {/* Search Button */}
          <form className="">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] pl-8 sm:w-[300px] md:w-[180px] lg:w-[250px]"
              />
            </div>
          </form>

          {/* Cart Button */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="shrink-0 relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-0 right-1 h-4 p-1 w-4 bg-penn-red text-snow rounded-full text-sm flex items-center justify-center">
                {cartCount}
              </span>
              <span className="sr-only">Open cart</span>
            </Button>
          </Link>

          {/* Account Button as Dropdown for Profile, whishlist, Logout button */}
          <DropdownMenu>
            <DropdownMenuTrigger className=" rounded-lg shrink-0 flex justify-center items-center hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </DropdownMenuTrigger>
            {!user ? (
              <DropdownMenuContent align="end">
                {/* Sign In Button */}
                <DropdownMenuItem className="hover:bg-neutral-300">
                  <Link href="/sign-in" className="w-full flex items-center">
                    <LogIn className="w-5 mr-2" />
                    Sign In
                  </Link>
                </DropdownMenuItem>

                {/* Sign Up Button */}
                <DropdownMenuItem className="hover:bg-neutral-300">
                  <Link href="/sign-up" className="w-full flex items-center">
                    <UserPlus className="w-5 mr-2" />
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent align="end">
                {/* Profile Button */}
                <DropdownMenuItem className="hover:bg-neutral-300">
                  <Link href="/profile" className="w-full flex items-center">
                    <User className="w-5 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                {/* Whishlist Button */}
                <DropdownMenuItem className="hover:bg-neutral-300">
                  <Link href="/whishlist" className="w-full flex items-center">
                    <Heart className="w-5 mr-2" />
                    Whishlist
                  </Link>
                </DropdownMenuItem>

                {/* ------------------------------------------------- */}
                <DropdownMenuSeparator className=" bg-neutral-300" />
                {/* Logout Button */}
                <DropdownMenuItem>
                  <Button onClick={handleLogout} variant="destructive" className="w-full  flex items-center">
                    <LogOut className="w-5 mr-2" />
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden rounded-full p-2.5 hover:bg-neutral-200">
                <span className="sr-only">Open Menu</span>
                <HiMenuAlt3 className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="max-w-[240px] md:max-w-80 flex flex-col justify-between">
              <div className="flex flex-col justify-between h-screen">
                <nav className=" grid gap-6 font-medium ">
                  {/* Logo */}
                  <SheetClose>
                    <Link
                      href="/"
                      className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-md overflow-hidden gap-2 bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                      <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
                    </Link>
                  </SheetClose>

                  {/* Home Link */}
                  <SheetClose>
                    <Link href="/" className={cn(" text-neutral-600", page != "" ? "text-neutral-600" : "text-black")}>
                      Home
                    </Link>
                  </SheetClose>

                  {/* Shop Link */}
                  <SheetClose>
                    <Link
                      href="/shop"
                      className={cn(" text-neutral-600", page != "/shop" ? "text-neutral-600" : "text-black")}
                    >
                      Shop
                    </Link>
                  </SheetClose>

                  {/* Contact Link */}
                  <SheetClose>
                    <Link
                      href="/contact"
                      className={cn(" text-neutral-600", page != "/contact" ? "text-neutral-600" : "text-black")}
                    >
                      Contact us
                    </Link>
                  </SheetClose>

                  {/* About Link */}
                  <SheetClose>
                    <Link
                      href="/about"
                      className={cn(" text-neutral-600", page != "/about" ? "text-neutral-600" : "text-black")}
                    >
                      About us
                    </Link>
                  </SheetClose>

                  <hr />
                </nav>

                {/* Contact Us Button */}
                <Link href="/contact" className=" md:hidden w-full">
                  <SheetClose>
                    <Button className=" w-full">Contact Us</Button>
                  </SheetClose>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
