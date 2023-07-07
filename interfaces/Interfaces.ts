export interface Products {
  products: { id: string; title: string; description: string }[];
}

export interface Product {
  loadedProduct: {
    id: string;
    title: string;
    description: string;
  };
}
