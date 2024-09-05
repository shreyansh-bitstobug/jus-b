"use client";

// Dependencies
import { useState } from "react";

// CSS
import "./navbar.css";

// UI Components
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchButton() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = () => {
    setSearchOpen(true);
  };

  return (
    <>
      {/* Search Button */}
      <div className="search-box text-black ">
        <button className="btn-search flip-in-ver-right-hover">
          <Search className="mx-auto" />
        </button>
        <input type="text" className="input-search" placeholder="Type to Search..." />
      </div>
    </>
  );
}
