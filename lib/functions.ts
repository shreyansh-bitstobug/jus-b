import { Product } from "@/lib/schema";

export const removeSlash = (str: string) => {
  return str.charAt(0) === "/" ? str.slice(1) : str;
};

export const getCategories = async () => {
  const res = await fetch("/api/products");
  const data = await res.json();
  console.log(data);

  const categories = data.products.reduce((acc: string[], product: Product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  return categories;
};
