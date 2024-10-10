import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/schema";
import { FilterIcon } from "lucide-react";

export default function FilterButton({
  setFilteredProducts,
  products,
}: {
  setFilteredProducts: (products: Product[]) => void;
  products: Product[];
}) {
  const handleFilter = (category: string) => {
    const filtered = products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  const categories = products.reduce((acc: string[], product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="w-4 mr-1" /> Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Order Status */}
        <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
        <Separator />
        {categories.map((category, index) => (
          <DropdownMenuItem key={index} onClick={() => handleFilter(category)}>
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
