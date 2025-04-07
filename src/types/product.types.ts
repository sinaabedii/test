export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category?: string;
    subcategory?: string;
    brand?: string;
    rating?: number;
    reviews?: Review[];
    sizes: string[];
    colors: string[];
    inStock: boolean;
    stockCount?: number;
    features?: string[];
    material?: string;
    careInstructions?: string[];
    minOrderQuantity?: number;
    bulkDiscounts?: {
      quantity: number;
      discountPercentage: number;
    }[];
    relatedProducts?: string[];
    tags?: string[];
    createdAt: Date;
    updatedAt?: Date;
  }
  
  export interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: Date;
    isVerifiedPurchase?: boolean;
  }
  
  export interface ProductFilter {
    category?: string;
    subcategory?: string;
    priceRange?: [number, number];
    sizes?: string[];
    colors?: string[];
    brands?: string[];
    sortBy?: 'popular' | 'newest' | 'price-asc' | 'price-desc';
    inStock?: boolean;
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
    subcategories?: Subcategory[];
  }
  
  export interface Subcategory {
    id: string;
    name: string;
    slug: string;
    parentId: string;
  }