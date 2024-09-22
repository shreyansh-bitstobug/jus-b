"use client";

// Dependencies
import { useEffect, useState } from "react";

// Data
import { products } from "@/public/assets/data";

// Icons
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react";

// Next Components and Hooks
import Image from "next/image";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

// Utils
import { cn } from "@/lib/utils";

// UI Components
import ProductCard from "@/components/product/product-card";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Stores and store types
import { CartItem, useCartStore, useModalStore, useShareModalStore, useWishlistStore } from "@/hooks/use-store";
import { usePathname } from "next/navigation";
import { removeSlash } from "@/lib/functions";
import _ from "lodash";
import Link from "next/link";

export default function ProductPage({ productId }: { productId: string }) {
  // States
  const [product, setProduct] = useState(products[0]); // Product state
  const [selectedSize, setSelectedSize] = useState(""); // Selected size state
  const [quantity, setQuantity] = useState("1"); // Quantity state
  const [mainImage, setMainImage] = useState(""); // Main image state
  const [relatedProducts, setRelatedProducts] = useState(products); // Related products array state
  const [itemInCart, setItemInCart] = useState<CartItem>(); // Item in cart state
  const [alert, setAlert] = useState(false); // Alert state for size selection

  // Hooks
  const url = removeSlash(usePathname()); // Get the current URL
  const [user] = useAuthState(auth); // Get the current user
  const { toast } = useToast(); // Get the toast function

  // Stores
  const { isInWishlist, removeFromWishlist, addToWishlist } = useWishlistStore();
  const { addToCart, cart, removeFromCart } = useCartStore();
  const { openModal } = useModalStore();
  const { setLink, setMessage } = useShareModalStore();

  // Check if item is in cart and set the item in cart state
  useEffect(() => {
    if (!selectedSize) {
      product.sizes.forEach((size) => {
        const foundCartItem = cart[`${productId}-${size}`];
        if (foundCartItem) {
          setItemInCart(foundCartItem);
          setSelectedSize(size);
          return;
        }
      });
    } else {
      const foundCartItem = cart[`${productId}-${selectedSize}`];
      setItemInCart(foundCartItem);
    }
  }, [cart, product, selectedSize]);

  // Fetch product and related products on mount
  useEffect(() => {
    let category: string;
    const fetchData = async () => {
      const chosenProduct = products.find((product) => product.id === productId);
      if (!chosenProduct) return;
      setProduct(chosenProduct);

      category = chosenProduct.category;
      const related = products.filter((product) => product.category === category && product.id !== productId);
      setRelatedProducts(related);
      setMainImage(chosenProduct.image[0]);
    };

    fetchData();
  }, []);

  // --------------------
  // Handlers
  // --------------------

  // Handle wishlist
  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast({ title: "Removed from wishlist", description: "This item has been removed from your wishlist" });
    } else {
      addToWishlist(productId);
      toast({ title: "Added to wishlist", description: "This item has been added to your wishlist" });
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart(productId, selectedSize);
    toast({ title: "Removed from cart", description: "Your item has been removed from the cart" });
  };

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!selectedSize) {
      setAlert(true);
      setTimeout(() => setAlert(false), 5000);
      toast({
        title: "Item not added to cart",
        description: "Please select a size to add the item to the cart",
        variant: "destructive",
      });
      return;
    }
    addToCart(productId, selectedSize);
    toast({ title: "Added to cart", description: "Your item has been added to the cart" });
  };

  // Handle share
  const handleShare = () => {
    const link = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${url}`
      : `http://localhost:3000${url}`;
    setLink(link);
    setMessage(`Check out this amazing product: ${product.name} \n Link: ${url}`);
    openModal("share");
  };

  return (
    <div className="container mx-auto md:px-4 px-2 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-primary">
          Home
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href="/shop" className="text-muted-foreground hover:text-primary">
          Shop
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={`/shop/${_.kebabCase(product.category)}`} className="text-muted-foreground hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4 relative">
          <Image
            src={mainImage}
            alt={product.name}
            width={2000}
            height={560}
            className="w-full h-[560px] object-cover rounded-lg"
          />
          {user && (
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-6 rounded-full  transition-opacity"
              onClick={handleWishlist}
            >
              <Heart
                className={cn(
                  "h-5 w-5 active:animate-ping",
                  isInWishlist(productId) ? "fill-red-500 text-red-500" : ""
                )}
              />
              <span className=" sr-only">
                {isInWishlist(productId) ? "Remover from whishlist" : "Add to whishlist"}
              </span>
            </Button>
          )}
          <div className="flex space-x-4">
            {product.image.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md cursor-pointer"
                onClick={() => setMainImage(image)}
                width={80}
                height={80}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">&#8377;{product.price.toFixed(2)}</p>
          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex gap-4">
            {/* Size Selection */}
            <div>
              <label htmlFor="size-select" className="block text-sm font-medium mb-2">
                Size
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger
                  className={cn("w-fit min-w-14", alert ? "border-red-700 text-red-700" : "")}
                  id="size-select"
                >
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Selection */}
            <div>
              <label htmlFor="quantity-select" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <Select value={quantity} onValueChange={setQuantity}>
                <SelectTrigger className="w-fit min-w-14" id="quantity-select">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Add to Cart and Share Buttons */}
          <div className="flex space-x-4">
            {itemInCart && itemInCart.quantity > 0 ? (
              <div className="flex items-center justify-between border rounded-md overflow-hidden">
                <Button size="icon" variant="ghost" onClick={handleRemoveFromCart} className="rounded-none">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold text-lg">{itemInCart.quantity}</span>
                <Button size="icon" variant="ghost" onClick={handleAddToCart} className="rounded-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button className="w-full" variant="action" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
              </Button>
            )}

            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid sm:grid-cols-2 grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} {...relatedProduct} image={relatedProduct.image[0]} />
          ))}
        </div>
      </div>
    </div>
  );
}
