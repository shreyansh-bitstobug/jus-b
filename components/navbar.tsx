"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/hooks/use-store";

import { Heart, LogOut, Search, ShoppingBag, User } from "lucide-react";
import { HiMenuAlt3 } from "react-icons/hi";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const url = usePathname();
  const pathPart = url?.split("/")[1];
  const page = pathPart?.split("#")[0] ? pathPart.split("#")[0] : pathPart;

  const { cart } = useCartStore();

  useEffect(() => {
    console.log(cart);
    setCartCount(Object.keys(cart).length);
  }, [cart]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" px-4  flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/assets/logo.webp" alt="Jus-B Logo" width={40} height={40} />
          <span className="hidden font-bold sm:flex sm:flex-col leading-4 whitespace-nowrap">
            Jus-B<span className="text-xs font-medium text-neutral-700 whitespace-nowrap">by JB</span>
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link
            href="/"
            className={cn("hidden md:block text-neutral-600", page != "" ? "text-neutral-600" : "text-black font-bold")}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={cn(
              "hidden md:block text-neutral-600",
              page != "/shop" ? "text-neutral-600" : "text-black font-bold"
            )}
          >
            Shop
          </Link>
          <Link
            href="/contact"
            className={cn(
              "hidden md:block text-neutral-600",
              page != "/contact" ? "text-neutral-600" : "text-black font-bold"
            )}
          >
            Contact us
          </Link>
          <Link
            href="/about"
            className={cn(
              "hidden md:block text-neutral-600",
              page != "/about" ? "text-neutral-600" : "text-black font-bold"
            )}
          >
            About us
          </Link>
        </nav>
        <div className="flex items-center md:gap-4">
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
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="shrink-0 relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-0 right-1 h-4 p-1 w-4 bg-penn-red text-snow rounded-full text-sm flex items-center justify-center">
                {cartCount}
              </span>
              <span className="sr-only">Open cart</span>
            </Button>
          </Link>
          {/* <Button variant="ghost" size="icon" className="shrink-0"> */}
          <DropdownMenu>
            <DropdownMenuTrigger className=" rounded-lg shrink-0 flex justify-center items-center hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="hover:bg-neutral-300">
                <Link href="/profile" className="w-full flex items-center">
                  <User className="w-5 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-neutral-300">
                <Link href="/whishlist" className="w-full flex items-center">
                  <Heart className="w-5 mr-2" />
                  Whishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className=" bg-neutral-300" />
              <DropdownMenuItem className=" bg-red-500 hover:bg-red-600 active:bg-red-700 focus:bg-red-600 focus:text-white active:text-white hover:text-white  text-white">
                <Link href="/log-out" className="w-full  flex items-center">
                  <LogOut className="w-5 mr-2" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* </Button> */}
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
                  <Link
                    href="/"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-md overflow-hidden gap-2 bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <SheetClose>
                      <Image src="/assets/logo.webp" alt="logo" width={40} height={40} />
                    </SheetClose>
                  </Link>

                  <Link href="/" className={cn(" text-neutral-600", page != "" ? "text-neutral-600" : "text-black")}>
                    <SheetClose>Home</SheetClose>
                  </Link>
                  <Link
                    href="/shop"
                    className={cn(" text-neutral-600", page != "/shop" ? "text-neutral-600" : "text-black")}
                  >
                    <SheetClose>Shop</SheetClose>
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(" text-neutral-600", page != "/contact" ? "text-neutral-600" : "text-black")}
                  >
                    <SheetClose>Contact us</SheetClose>
                  </Link>
                  <Link
                    href="/about"
                    className={cn(" text-neutral-600", page != "/about" ? "text-neutral-600" : "text-black")}
                  >
                    <SheetClose>About us</SheetClose>
                  </Link>

                  <hr />
                </nav>

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
