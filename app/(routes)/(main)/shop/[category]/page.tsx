import CategoryPage from "@/components/shop/category-page";
import { Metadata } from "next";

interface ShopProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: ShopProps): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.category)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase()); 
  return {
    title: {
      default: `${categoryName}`,
      template: "%s - Jus-b",
    },
    description: `Explore ${categoryName} styles at Jus-b. Discover premium dresses and high-quality fashion designed for elegance and comfort.`,
    keywords: [
      `${categoryName} dress`,
      `${categoryName} fashion`,
      `${categoryName} styles`,
      "Jus-b fashion",
      "premium fashion",
      "high-quality clothing",
    ],
    openGraph: {
      type: "website",
      url: `https://www.jus-b-fashion.com/${categoryName}`,
      title: `${categoryName} - Jus-b`,
      description: `Explore ${categoryName} styles at Jus-b. Discover premium dresses and high-quality fashion designed for elegance and comfort.`,
      images: [
        {
          url: "/assets/hero4.jpg",
          width: 1200,
          height: 630,
          alt: `Jus-b ${categoryName} Collection`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} - Jus-b`,
      description: `Explore ${categoryName} styles at Jus-b. Discover premium dresses and high-quality fashion designed for elegance and comfort.`,
    },
  };
}

export default function Shop() {
  return (
    <main className="flex-grow ">
      <CategoryPage />
    </main>
  );
}
