export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string[];
  sizes: string[];
};

export type CartProductType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  imgUrl: string;
};
