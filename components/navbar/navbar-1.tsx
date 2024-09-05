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
import { RiInstagramLine, RiWhatsappLine } from "react-icons/ri";
import { HiChevronDown, HiMenuAlt2 } from "react-icons/hi";

// UI Components
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import SearchButton from "./search-button";
import { products } from "@/public/assets/data";
import _ from "lodash";
import { useRouter } from "next/navigation";

export default function Navbar1() {
  // State
  const [cartCount, setCartCount] = useState(0); // Number of items in the cart
  const [categories, setCategories] = useState<string[]>([]); // Categories for the shop

  const router = useRouter();

  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);

  // Get the categories from the store
  useEffect(() => {
    const categories = products.reduce((acc: string[], product) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, []);
    setCategories(categories);
  }, [products]);

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

  return (
    <header>
      <div className="md:p-6 p-4 md:px-10 grid md:grid-cols-3 grid-cols-2 items-center border-b-penn-red border-b-2 ">
        {/* ------------------------------- */}
        {/* Left Side (Social Media) */}
        {/* ------------------------------- */}
        <div className="hidden md:flex gap-6 px-2 justify-self-start">
          <Link href="https://www.instagram.com/">
            <RiInstagramLine className=" w-6 h-6 hover:text-neutral-600" />
          </Link>
          <Link href="https://www.instagram.com/">
            <RiWhatsappLine className=" w-6 h-6 hover:text-neutral-600" />
          </Link>
        </div>

        {/* ------------------------------- */}
        {/* Logo */}
        {/* ------------------------------- */}
        <div className="flex gap-2 justify-self-center">
          {/* ---------------------- */}
          {/* Side Menu for Mobile */}
          {/* ---------------------- */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden rounded-full p-2.5 hover:bg-neutral-200">
                <span className="sr-only">Open Menu</span>
                <HiMenuAlt2 className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="max-w-[240px] md:max-w-80 flex flex-col justify-between">
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
                    <Link
                      href="/"
                      className={cn(
                        " text-neutral-600 hover:text-black",
                        page != "" ? "text-neutral-600" : "text-black font-semibold"
                      )}
                    >
                      Home
                    </Link>
                  </SheetClose>

                  {/* Shop Link */}
                  <SheetClose>
                    <Link
                      href="/shop"
                      className={cn(
                        " text-neutral-600 hover:text-black",
                        page != "/shop" ? "text-neutral-600" : "text-black font-semibold"
                      )}
                    >
                      Shop
                    </Link>
                  </SheetClose>

                  {/* Contact Link */}
                  <SheetClose>
                    <Link
                      href="/contact"
                      className={cn(
                        " text-neutral-600 hover:text-black",
                        page != "/contact" ? "text-neutral-600" : "text-black font-semibold"
                      )}
                    >
                      Contact us
                    </Link>
                  </SheetClose>

                  {/* About Link */}
                  <SheetClose>
                    <Link
                      href="/about"
                      className={cn(
                        " text-neutral-600 hover:text-black",
                        page != "/about" ? "text-neutral-600" : "text-black font-semibold"
                      )}
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
          <Link href="/" className="">
            <Image
              src="/assets/logo.svg"
              className=" object-cover md:w-16 md:h-16 h-12 w-12"
              width={70}
              height={70}
              alt="Logo.svg"
            />
          </Link>
        </div>

        {/* ------------------------------- */}
        {/* Right Side (Profile, Cart & Search Button) */}
        {/* ------------------------------- */}
        <div className="justify-self-end">
          <div className="flex items-center md:gap-4">
            {/* Search Button */}
            <SearchButton />

            {/* Cart Button */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="shrink-0 relative flip-in-ver-right-hover">
                <ShoppingBag className="h-5 w-5 " />
                <span className="absolute top-0 right-1 h-4 p-1 w-4 bg-penn-red text-snow rounded-full text-sm flex items-center justify-center">
                  {cartCount}
                </span>
                <span className="sr-only">Open cart</span>
              </Button>
            </Link>

            {/* Account Button as Dropdown for Profile, whishlist, Logout button */}
            <DropdownMenu>
              <DropdownMenuTrigger className=" rounded-lg shrink-0 flex justify-center items-center hover:bg-accent hover:text-accent-foreground h-10 w-10 flip-in-ver-right-hover">
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
          </div>
        </div>
      </div>

      <nav className="hidden md:flex border-b-2 border-penn-red py-4 gap-10 justify-center">
        {/* Home Link */}
        <Link
          href="/"
          className={cn(
            " text-neutral-600 hover:text-black",
            page != "" ? "text-neutral-600" : "text-black font-semibold"
          )}
        >
          Home
        </Link>

        {/* Shop Link */}
        <HoverCard openDelay={0}>
          <HoverCardTrigger
            onClick={() => {
              router.push("/shop");
            }}
            className={cn(
              " text-neutral-600 hover:text-black cursor-pointer ",
              page != "/shop" ? "text-neutral-600" : "text-black font-semibold"
            )}
          >
            Shop <HiChevronDown className="w-4 h-4 inline" />
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col w-fit gap-2 p-3 text-neutral-700">
            {categories.map((category) => {
              return (
                <Link key={category} href={`/shop/${_.kebabCase(category)}`} className="hover:text-black">
                  {category}
                </Link>
              );
            })}
          </HoverCardContent>
        </HoverCard>

        {/* Contact Link */}
        <Link
          href="/contact"
          className={cn(
            " text-neutral-600 hover:text-black",
            page != "/contact" ? "text-neutral-600" : "text-black font-semibold"
          )}
        >
          Contact us
        </Link>

        {/* About Link */}
        <Link
          href="/about"
          className={cn(
            " text-neutral-600 hover:text-black",
            page != "/about" ? "text-neutral-600" : "text-black font-semibold"
          )}
        >
          About us
        </Link>
      </nav>
    </header>
  );
}
