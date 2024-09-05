import { Facebook, Instagram, ShoppingBag, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/assets/logo.svg" alt="Jus-B Logo" width={40} height={40} />
            <span className="hidden font-bold sm:flex sm:flex-col leading-4">
              Jus-B<span className="text-xs font-medium text-neutral-700">by JB</span>
            </span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              About
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Contact
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Terms
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <form className="flex items-center gap-2">
            <Input placeholder="Enter your email" type="email" />
            <Button type="submit">Subscribe</Button>
          </form>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
