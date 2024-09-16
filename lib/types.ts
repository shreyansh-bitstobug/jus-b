// This is the type for the product
export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string[];
  sizes: string[];
  category: string;
};

// This is the type for the cart product
export type CartProductType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  imgUrl: string;
};
