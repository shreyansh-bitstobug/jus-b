"use client";
// Dependencies
import { useEffect, useState } from "react";
import _, { set } from "lodash";

// Next Components and Hooks
import { redirect, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Hooks and Utils
import { cn } from "@/lib/utils";
import { useCartStore, useModalStore } from "@/hooks/use-store";

// Icons
import { Heart, LogIn, LogOut, Search, ShoppingBag, User, UserPlus } from "lucide-react";
import { RiInstagramLine, RiWhatsappLine } from "react-icons/ri";
import { HiChevronDown, HiMenuAlt2 } from "react-icons/hi";

// Firebase
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

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
import { removeSlash } from "@/lib/functions";
import { Product } from "@/lib/schema";
import CurrencyButton from "../currency-button";

export default function Navbar1() {
  // State
  const [products, setProducts] = useState([]); // Products from the API
  const [cartCount, setCartCount] = useState(0); // Number of items in the cart
  const [categories, setCategories] = useState<string[]>([]); // Categories for the shop
  const [whatsappLink, setWhatsappLink] = useState("https://chat.whatsapp.com/BfPHIvJq0Gg4FJeohDBjry"); // WhatsApp group link
  const [page, setPage] = useState(""); // Current page

  // Hooks
  const router = useRouter();
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const url = usePathname();

  // Stores
  const { cart } = useCartStore(); // Get the cart from the store for number of items in the cart
  const { openModal } = useModalStore(); // Get the openModal function from the store to open the search modal

  // Get the WhatsApp link based on the user's device
  useEffect(() => {
    // Get the current page from the URL for active link
    const pathPart = url?.split("/")[1];
    const currentPage = pathPart?.split("#")[0] ? pathPart.split("#")[0] : pathPart;
    setPage(currentPage);

    const groupLink = "https://chat.whatsapp.com/BfPHIvJq0Gg4FJeohDBjry"; // WhatsApp group link
    const whatsappSchemeLink = "whatsapp://chat?code=BfPHIvJq0Gg4FJeohDBjry"; // Custom scheme to open app
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Detect if user is on Windows or Mobile
    if (navigator.userAgent.includes("Windows")) {
      if (navigator.userAgent.includes("WhatsApp")) {
        // If WhatsApp is installed on Windows, use the custom scheme
        setWhatsappLink(whatsappSchemeLink);
      } else {
        // Otherwise, open WhatsApp Web
        setWhatsappLink(groupLink);
      }
    } else if (isMobile) {
      // On mobile devices, use the custom scheme to open WhatsApp app
      setWhatsappLink(whatsappSchemeLink);
    } else {
      // Default fallback to WhatsApp Web
      setWhatsappLink(groupLink);
    }
  }, [url]);

  // Get the categories reduced from the products from API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
      const categories = await data.products?.reduce((acc: string[], product: Product) => {
        if (!acc.includes(product.category)) {
          acc.push(product.category);
        }
        return acc;
      }, []);
      setCategories(categories);
    };
    fetchProducts();
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear the local storage
    localStorage.clear();
    signOut(); // Sign out from firebase auth
    // Redirect to the home page
    redirect("/");
  };

  // Update the cart count when the cart changes in the store
  useEffect(() => {
    setCartCount(Object.keys(cart).length);
  }, [cart]);

  return (
    <header>
      <div className="md:p-6 p-2 md:px-10 grid md:grid-cols-3 grid-cols-2 items-center border-b-penn-red border-b-2">
        {/* ------------------------------- */}
        {/* Left Side (Social Media) */}
        {/* ------------------------------- */}
        <div className="hidden md:flex gap-6 px-2 justify-self-start">
          <Link href="https://www.instagram.com/jusb_jb">
            <RiInstagramLine className=" w-6 h-6 text-neutral-500 hover:text-neutral-400" />
          </Link>
          <Link href={whatsappLink}>
            <RiWhatsappLine className=" w-6 h-6 text-neutral-500 hover:text-neutral-400" />
          </Link>
        </div>

        {/* ------------------------------- */}
        {/* Logo */}
        {/* ------------------------------- */}
        <div className="flex gap-2 md:justify-self-center">
          {/* ---------------------- */}
          {/* Side Menu for Mobile */}
          {/* ---------------------- */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden rounded-sm p-2.5">
                <span className="sr-only">Open Menu</span>
                <HiMenuAlt2 className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="max-w-[240px] md:max-w-80 flex flex-col justify-between">
              <div className="flex flex-col justify-between h-screen">
                <nav className=" grid gap-6 font-medium ">
                  {/* Logo */}
                  <Link
                    href="/"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-md overflow-hidden gap-2 bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <SheetClose>
                      <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
                    </SheetClose>
                  </Link>

                  {/* Home Link */}
                  <Link
                    href="/"
                    className={cn(
                      " text-neutral-600 hover:text-black",
                      page != "" ? "text-neutral-600" : "text-black font-semibold"
                    )}
                  >
                    <SheetClose>Home</SheetClose>
                  </Link>

                  {/* Shop Link */}
                  <Link
                    href="/shop"
                    className={cn(
                      " text-neutral-600 hover:text-black",
                      page != "/shop" ? "text-neutral-600" : "text-black font-semibold"
                    )}
                  >
                    <SheetClose>Shop</SheetClose>
                  </Link>

                  {/* Contact Link */}
                  <Link
                    href="/contact"
                    className={cn(
                      " text-neutral-600 hover:text-black",
                      page != "/contact" ? "text-neutral-600" : "text-black font-semibold"
                    )}
                  >
                    <SheetClose>Contact us</SheetClose>
                  </Link>

                  {/* About Link */}
                  <Link
                    href="/about"
                    className={cn(
                      " text-neutral-600 hover:text-black",
                      page != "/about" ? "text-neutral-600" : "text-black font-semibold"
                    )}
                  >
                    <SheetClose>About us</SheetClose>
                  </Link>

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
            <Button variant="ghost" size="icon" onClick={() => openModal("search")} className="flip-in-ver-right-hover">
              <Search className="mx-auto" />
            </Button>

            <CurrencyButton />

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
                    <Link href={`/sign-in?redirect=${page}`} className="w-full flex items-center">
                      <LogIn className="w-5 mr-2" />
                      Sign In
                    </Link>
                  </DropdownMenuItem>

                  {/* Sign Up Button */}
                  <DropdownMenuItem className="hover:bg-neutral-300">
                    <Link href={`/sign-up?redirect=${page}`} className="w-full flex items-center">
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
                    <Link href="/wishlist" className="w-full flex items-center">
                      <Heart className="w-5 mr-2" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>

                  {/* ------------------------------------------------- */}
                  <DropdownMenuSeparator className=" bg-neutral-300" />
                  {/* Logout Button */}
                  <DropdownMenuItem className="p-0">
                    <Button onClick={handleLogout} variant="destructive" className="w-full flex items-center">
                      <LogOut className="w-5 mr-2 " />
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
              page != "shop" ? "text-neutral-600" : "text-black font-semibold"
            )}
          >
            Shop <HiChevronDown className="w-4 h-4 inline" />
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col w-fit gap-2 p-3 text-neutral-700">
            {categories?.map((category) => {
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
            page != "contact" ? "text-neutral-600" : "text-black font-semibold"
          )}
        >
          Contact us
        </Link>

        {/* About Link */}
        <Link
          href="/about"
          className={cn(
            " text-neutral-600 hover:text-black",
            page != "about" ? "text-neutral-600" : "text-black font-semibold"
          )}
        >
          About us
        </Link>
      </nav>
    </header>
  );
}
