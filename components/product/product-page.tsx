"use client";

// Dependencies
import { useEffect, useState } from "react";

// Icons
import { ChevronRight, Heart, Minus, PlayCircleIcon, Plus, Share2, ShoppingCart } from "lucide-react";

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
import { useCurrencyStore, useModalStore, useShareModalStore, useWishlistStore } from "@/hooks/use-store";
import { CartItem, useCartStore } from "@/hooks/use-cart-store";
import { usePathname } from "next/navigation";
import { formatCurrency, removeSlash } from "@/lib/functions";
import _ from "lodash";
import Link from "next/link";
import { Product } from "@/lib/schema";
import { Skeleton } from "../ui/skeleton";
import AppInitializer from "@/hooks/cart";

export default function ProductPage({ productId }: { productId: string }) {
  // States
  const [product, setProduct] = useState<Product>(); // Product state
  const [selectedSize, setSelectedSize] = useState(""); // Selected size state
  const [mainImage, setMainImage] = useState(""); // Main image state
  const [video, setVideo] = useState<string>(); // Videos state
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(); // Related products array state
  const [alert, setAlert] = useState(false); // Alert state for size selection
  const [loading, setLoading] = useState(true); // Loading state
  const [currencyPrice, setCurrencyPrice] = useState<string>(); // Currency price state
  const [cartQuantity, setCartQuantity] = useState<number>(0); // Cart quantity state

  // Hooks
  const { currency } = useCurrencyStore(); // Get the currency
  const url = removeSlash(usePathname()); // Get the current URL
  const [user] = useAuthState(auth); // Get the current user
  const { toast } = useToast(); // Get the toast function

  // Stores
  const { isInWishlist, removeFromWishlist, addToWishlist } = useWishlistStore();
  const { openModal } = useModalStore();
  const { setLink, setMessage } = useShareModalStore();
  const { cart, addToCart, removeFromCart } = useCartStore();

  // Format the price with the selected currency
  useEffect(() => {
    const formatPrice = async () => {
      const formattedPrice = await formatCurrency(product?.price || 0, currency);
      setCurrencyPrice(formattedPrice);
    };
    formatPrice();
  }, [product, currency]);

  // Get the cart quantity of the product
  useEffect(() => {
    const cartItem = cart.find((item: CartItem) => item.productId === productId && item.size === selectedSize);
    setCartQuantity(cartItem?.quantity || 0);
  }, [cart, productId, selectedSize]);

  // Fetch product and related products on mount
  useEffect(() => {
    let category: string;
    const fetchData = async () => {
      const response = await fetch("/api/products");
      const datas = await response.json();
      const products = datas.products;

      const res = await fetch("/api/products/" + productId);

      const data = await res.json();
      const chosenProduct = data.product;

      if (!chosenProduct) return;
      setProduct(chosenProduct);

      category = chosenProduct.category;
      const related = products.filter((product: Product) => product.category === category && product.id !== productId);

      const video = chosenProduct.images.find((imgUrl: string) => imgUrl.includes(".mp4"));
      setVideo(video);

      setRelatedProducts(related);
      setMainImage(chosenProduct?.images[0] || "/assets/placeholder.svg");
    };

    fetchData();
    setLoading(false);
  }, []); // eslint-disable-line

  // --------------------
  // Handlers
  // --------------------

  // Handle wishlist
  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isInWishlist(productId)) {
      removeFromWishlist(productId, user?.uid);
      toast({ title: "Removed from wishlist", description: "This item has been removed from your wishlist" });
    } else {
      addToWishlist(productId, user?.uid);
      toast({ title: "Added to wishlist", description: "This item has been added to your wishlist" });
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart({ productId: productId, size: selectedSize, quantity: 1 });
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
    addToCart({ productId: productId, size: selectedSize, quantity: 1 });
    toast({ title: "Added to cart", description: "Your item has been added to the cart" });
  };

  // Handle share
  const handleShare = () => {
    const link = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${url}`
      : `http://localhost:3000${url}`;
    setLink(link);
    setMessage(`Check out this amazing product: ${product?.name} \n Link: ${url}`);
    openModal("share");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <AppInitializer />
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-primary">
          Home
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href="/shop" className="text-muted-foreground hover:text-primary">
          Shop
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={`/shop/${_.kebabCase(product?.category)}`} className="text-muted-foreground hover:text-primary">
          {product?.category}
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-primary">{product?.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        {loading ? (
          <Skeleton className="h-[600px] w-full bg-muted-foreground/20" />
        ) : (
          <div className="space-y-4 relative">
            {video !== mainImage ? (
              <Image
                src={mainImage || "/assets/placeholder.svg"}
                alt={product?.name || "Product-Main Image"}
                width={2000}
                height={560}
                className="w-full h-[560px] object-contain rounded-lg"
              />
            ) : (
              <video id="vid1" className="video-js h-[560px] mx-auto" controls>
                <source src={video} type="video/mp4" />
              </video>
            )}
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
                  {isInWishlist(productId) ? "Remover from wishlist" : "Add to wishlist"}
                </span>
              </Button>
            )}
            <div className="flex space-x-4 overflow-x-scroll scrollbar-none">
              {product?.images.map((image, index) => {
                return image !== video ? (
                  <Image
                    key={index}
                    src={image || "/assets/placeholder.svg"}
                    alt={`${product?.name} ${index + 1}`}
                    className={cn(
                      "w-20 h-20 object-contain rounded-md cursor-pointer ",
                      image === mainImage && "border-2 border-primary border-neutral-200 "
                    )}
                    onClick={() => setMainImage(image)}
                    width={80}
                    height={80}
                  />
                ) : (
                  <div
                    onClick={() => setMainImage(image)}
                    key={index}
                    className="w-20 h-20 object-cover flex justify-center bg-neutral-100 items-center rounded-md cursor-pointer p-1 text-neutral-800"
                  >
                    <PlayCircleIcon className="w-14 h-14" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Product Details */}
        <div className="space-y-6 ">
          {loading ? (
            <Skeleton className="w-full h-16 bg-muted-foreground/20" />
          ) : (
            <h1 className="sm:text-3xl text-2xl font-bold">{product?.name}</h1>
          )}
          {loading ? (
            <Skeleton className="w-40 h-10 bg-muted-foreground/20" />
          ) : (
            <p className="text-2xl font-semibold">{currencyPrice}</p>
          )}
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="w-full h-6 bg-muted-foreground/20" />
              <Skeleton className="w-full h-6 bg-muted-foreground/20" />
              <Skeleton className="w-full h-6 bg-muted-foreground/20" />
            </div>
          ) : (
            <p className="text-muted-foreground text-[16px] leading-5">{product?.description.text}</p>
          )}

          <div className="grid grid-cols-2 text-[16px] gap-2 pb-4 ">
            {loading ? (
              <>
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
                <Skeleton className="w-full my-2 h-6 bg-muted-foreground/20" />
              </>
            ) : (
              product?.description.features.map((feature, index) => <li key={index}>{feature}</li>)
            )}
          </div>

          {/* Add to Cart and Share Buttons */}
          <div className="flex space-x-4">
            <div>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger
                  className={cn("w-fit min-w-14", alert ? "border-red-700 text-red-700" : "")}
                  id="size-select"
                >
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {product?.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedSize && cartQuantity && cartQuantity > 0 ? (
              <div className="flex items-center justify-between border rounded-md overflow-hidden">
                <Button size="icon" variant="ghost" onClick={handleRemoveFromCart} className="rounded-none">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold text-lg">{cartQuantity}</span>
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
          {loading ? (
            <>
              <Skeleton className="w-[308px] h-[396px] bg-muted-foreground/20" />
              <Skeleton className="w-[308px] h-[396px] bg-muted-foreground/20" />
              <Skeleton className="w-[308px] h-[396px] bg-muted-foreground/20" />
              <Skeleton className="w-[308px] h-[396px] bg-muted-foreground/20" />
              <Skeleton className="w-[308px] h-[396px] bg-muted-foreground/20" />
              <Skeleton className="w-[308px] h-[396px] bg-muted-foreground/20" />
            </>
          ) : (
            relatedProducts?.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} {...relatedProduct} image={relatedProduct.images[0]} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
