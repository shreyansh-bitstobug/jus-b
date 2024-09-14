"use client";

// Dependencies
import { useState } from "react";

// CSS
import "./navbar.css";

// UI Components
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

export default function SearchButton() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = () => {
    setSearchOpen(true);
  };

  return (
    <>
      {/* Search Button */}
      <div className="text-black">
        <Button variant="ghost" size="icon" className="flip-in-ver-right-hover">
          <Search className="mx-auto" />
        </Button>
      </div>
    </>
  );
}
