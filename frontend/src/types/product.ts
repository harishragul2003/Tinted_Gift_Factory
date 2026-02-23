export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  category_name?: string;
  stock: number;
  is_featured: boolean;
  created_at: string;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  stock: number;
  is_featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'newest';
}
