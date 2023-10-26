export type IProductHome = {
  id?: string;
  name: string;
  price: number;
  img: string;
  count?: number;
};

export type IProductSell = {
  id: string;
  rawname: string;
  products: {
    id: string;
    img: string;
    price: number;
    name: string;
  }[];
};

export type IProductImage = {
  id: string;
  img: string;
  images: {
    img: string;
  }[];
};
