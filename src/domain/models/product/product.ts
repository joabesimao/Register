export interface ProductModel {
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface LoadProductFilter {
  name?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  limit?: number;
  offset?: number;
}

export interface LoadProductResult {
  items: Product[];
  total: number;
}
