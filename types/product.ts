export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  flashDeal?: boolean;
};

export type Category = {
  id: string;
  label: string;
  icon: string;
};
