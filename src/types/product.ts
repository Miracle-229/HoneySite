export type IProductHome = {
  id: string;
  name: string;
  price: string;
  img: string;
};
export type IProductSell = {
  id: string;
  rawname: string;
  products: {
    id: string;
    img: string;
    price: string;
    name: string;
  }[];
};

export type IProductImage = {
  id: string;
  images: {
    img: string;
  }[];
};
