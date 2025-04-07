import { create } from 'zustand';
import { Product } from '../types/product.types';
import { mockProducts } from '../data/products';

interface ProductFilter {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  brands?: string[];
  inStock?: boolean;
  sortBy?: 'newest' | 'priceAsc' | 'priceDesc' | 'popular';
  query?: string;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  currentProduct: Product | null;
  filters: ProductFilter;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  setFilters: (filters: Partial<ProductFilter>) => void;
  clearFilters: () => void;
  searchProducts: (query: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  currentProduct: null,
  filters: {},

  // دریافت همه محصولات
  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      
      // در محیط واقعی از api استفاده می‌شود
      // const { data } = await productService.getProducts();
      
      // استفاده از داده‌های ساختگی
      const data = mockProducts;
      
      set({
        products: data,
        filteredProducts: data,
        loading: false
      });
    } catch (error) {
      set({
        error: 'دریافت محصولات با مشکل مواجه شد',
        loading: false
      });
    }
  },

  // دریافت محصول با شناسه
  fetchProductById: async (id) => {
    try {
      set({ loading: true, error: null });
      
      // در محیط واقعی از api استفاده می‌شود
      // const { data } = await productService.getProductById(id);
      
      // استفاده از داده‌های ساختگی
      const product = mockProducts.find(p => p.id === id) || null;
      
      set({
        currentProduct: product,
        loading: false
      });
    } catch (error) {
      set({
        error: 'دریافت اطلاعات محصول با مشکل مواجه شد',
        loading: false
      });
    }
  },

  // دریافت محصولات یک دسته‌بندی
  fetchProductsByCategory: async (category) => {
    try {
      set({ loading: true, error: null });
      
      // در محیط واقعی از api استفاده می‌شود
      // const { data } = await productService.getProductsByCategory(category);
      
      // استفاده از داده‌های ساختگی
      const filteredProducts = mockProducts.filter(
        p => p.category?.toLowerCase() === category.toLowerCase()
      );
      
      set({
        products: filteredProducts,
        filteredProducts,
        loading: false
      });
    } catch (error) {
      set({
        error: 'دریافت محصولات دسته‌بندی با مشکل مواجه شد',
        loading: false
      });
    }
  },

  // تنظیم فیلترها
  setFilters: (filters) => {
    const currentFilters = get().filters;
    const newFilters = { ...currentFilters, ...filters };
    
    set({ filters: newFilters });
    
    // اعمال فیلترها روی محصولات
    const products = get().products;
    let filtered = [...products];
    
    // فیلتر بر اساس دسته‌بندی
    if (newFilters.category) {
      filtered = filtered.filter(
        p => p.category?.toLowerCase() === newFilters.category?.toLowerCase()
      );
    }
    
    // فیلتر بر اساس زیر دسته‌بندی
    if (newFilters.subcategory) {
      filtered = filtered.filter(
        p => p.subcategory?.toLowerCase() === newFilters.subcategory?.toLowerCase()
      );
    }
    
    // فیلتر بر اساس حداقل قیمت
    if (newFilters.minPrice) {
      filtered = filtered.filter(p => p.price >= newFilters.minPrice!);
    }
    
    // فیلتر بر اساس حداکثر قیمت
    if (newFilters.maxPrice) {
      filtered = filtered.filter(p => p.price <= newFilters.maxPrice!);
    }
    
    // فیلتر بر اساس سایزها
    if (newFilters.sizes && newFilters.sizes.length > 0) {
      filtered = filtered.filter(
        p => p.sizes.some(size => newFilters.sizes?.includes(size))
      );
    }
    
    // فیلتر بر اساس رنگ‌ها
    if (newFilters.colors && newFilters.colors.length > 0) {
      filtered = filtered.filter(
        p => p.colors.some(color => newFilters.colors?.includes(color))
      );
    }
    
    // فیلتر بر اساس برندها
    if (newFilters.brands && newFilters.brands.length > 0) {
      filtered = filtered.filter(
        p => newFilters.brands?.includes(p.brand || '')
      );
    }
    
    // فیلتر بر اساس موجودی
    if (newFilters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    // فیلتر بر اساس جستجو
    if (newFilters.query) {
      const query = newFilters.query.toLowerCase();
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.description?.toLowerCase().includes(query) ||
             p.brand?.toLowerCase().includes(query)
      );
    }
    
    // مرتب‌سازی
    if (newFilters.sortBy) {
      switch (newFilters.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'priceAsc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
      }
    }
    
    set({ filteredProducts: filtered });
  },

  // پاک کردن فیلترها
  clearFilters: () => {
    set({ 
      filters: {},
      filteredProducts: get().products
    });
  },

  // جستجوی محصولات
  searchProducts: (query) => {
    const newFilters = { ...get().filters, query };
    get().setFilters(newFilters);
  },
}));