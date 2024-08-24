"use client";

// Dependencies
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ruthie } from "next/font/google";

// Hooks & Utils
import { cn } from "@/lib/utils";
import { useModalStore } from "@/hooks/use-store";

// Icons
import { HandHelping, Home, PanelRight, Phone, Search, ShoppingCart, User, Users } from "lucide-react";
import { HiMenuAlt1, HiShoppingCart, HiUser } from "react-icons/hi";
import { BsCart4 } from "react-icons/bs";
import { FaRegUser, FaUser } from "react-icons/fa6";

// UI Components
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { TbUserFilled } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi2";

// Font for the logo
const ruthie = Ruthie({ weight: "400", subsets: ["latin"] });

export const Navbar = () => {
  const url = usePathname();
  const pathPart = url?.split("/")[1];
  const page = pathPart?.split("#")[0] ? pathPart.split("#")[0] : pathPart;

  const { openModal } = useModalStore();

  return (
    <nav className="side-padding-1 flex justify-between items-center bg-rosy-brown font-base py-3 border-b-2 sticky top-0 ">
      {/* Left */}
      <div className="flex gap-6 py-3">
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden rounded-full p-2.5 hover:bg-neutral-200">
              <HiMenuAlt1 className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs flex flex-col justify-between">
            <div className="flex flex-col justify-between h-screen">
              <nav className=" grid gap-6 text-lg font-medium ">
                {/* Logo */}
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-md overflow-hidden gap-2 bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <SheetClose>
                    <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
                  </SheetClose>
                </Link>

                <Link
                  href="/"
                  className={cn(
                    " px-2.5 hover:text-foreground",
                    page === "" ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <SheetClose className="flex items-center gap-4">
                    <Home />
                    Home
                  </SheetClose>
                </Link>

                <Link
                  href="/shop"
                  className={cn(
                    "hover:text-foreground px-2.5",
                    page === "shop" ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <SheetClose className="flex items-center gap-4">
                    <HandHelping />
                    Shop
                  </SheetClose>
                </Link>

                <Link
                  href="/about"
                  className={cn(
                    "px-2.5 hover:text-foreground",
                    page === "about" ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <SheetClose className="flex items-center gap-4">
                    <Users />
                    About us
                  </SheetClose>
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

        {/* Logo */}
        <Link href="/" className="pr-6">
          <Image src="/assets/logo.webp" alt="logo" width={45} height={45} />
        </Link>

        {/* Menu */}
        <ul className="md:flex hidden gap-6 items-center text-white">
          <li
            className={cn(
              "hover:text-neutral-100 transition-all hover:underline underline-offset-4 underline-thick decoration-penn-red",
              page === "" && "text-snow font-semibold underline "
            )}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={cn(
              "hover:text-neutral-200 transition-all hover:underline underline-offset-4 underline-thick decoration-penn-red",
              page === "shop" && "text-snow font-semibold underline "
            )}
          >
            <Link href="/shop">Shop</Link>
          </li>
          <li
            className={cn(
              "hover:text-neutral-200 transition-all hover:underline underline-offset-4 underline-thick decoration-penn-red",
              page === "about" && "text-snow font-semibold underline "
            )}
          >
            <Link href="/about">About us</Link>
          </li>
          <li
            className={cn(
              "hover:text-neutral-200 transition-all hover:underline underline-offset-4 underline-thick decoration-penn-red",
              page === "contact" && "text-snow font-semibold underline "
            )}
          >
            <Link href="/contact">Contact us</Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="flex gap-6 items-center py-3">
        {/* Search Button */}
        <button
          className="p-2 md:p-0 transition-all md:rounded-sm rounded-full hover:bg-snow "
          onClick={() => openModal("Search")}
        >
          <span className="py-1 px-2 gap-2 rounded-sm bg-snow text-sm md:flex items-center hidden">
            Search for your product
            <Search className="w-5 h-5" />
          </span>
          <Search className="md:hidden" />
        </button>

        {/* Cart Button */}
        <button className="p-1 text-snow hover:text-neutral-100 flex items-center font-semibold gap-2">
          <HiOutlineShoppingCart className="w-6 h-6" /> Cart
        </button>

        {/* User Account Button */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="rounded-full font-semibold p-1 hover:text-neutral-100  text-snow flex items-center gap-2">
              <CgProfile className="w-6 h-6" /> Account
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className="">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/profile" className="flex gap-2 items-center">
                  <CgProfile className="w-4 h-4" /> My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button className="flex gap-1 items-center">
                  <IoLogOutOutline className="w-5 h-5" />
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
