import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeftIcon, 
  XMarkIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { Product } from '../../types/product.types';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const CategoryProducts: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // فیلترها
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');
  
  // بارگذاری محصولات
  useEffect(() => {
    setLoading(true);
    
    // شبیه‌سازی API
    setTimeout(() => {
      // در اینجا باید درخواست به API ارسال شود و محصولات دسته‌بندی مورد نظر دریافت شود
      // برای مثال از داده‌های تستی استفاده می‌کنیم
      import('../../data/products').then(({ products: mockProducts }) => {
        // فیلتر محصولات بر اساس دسته‌بندی
        const filteredProducts = mockProducts.filter(product => 
          product.category.toLowerCase() === category?.toLowerCase() ||
          product.subcategory?.toLowerCase() === category?.toLowerCase()
        );
        
        setProducts(filteredProducts);
        setLoading(false);
      });
    }, 800);
  }, [category]);
  
  // فیلتر محصولات بر اساس تنظیمات فیلتر
  const filteredProducts = products.filter(product => {
    // فیلتر قیمت
    const price = product.price;
    if (price < priceRange[0] || price > priceRange[1]) return false;
    
    // فیلتر رنگ
    if (selectedColors.length > 0 && product.colors) {
      if (!product.colors.some(color => selectedColors.includes(color))) return false;
    }
    
    // فیلتر سایز
    if (selectedSizes.length > 0 && product.sizes) {
      if (!product.sizes.some(size => selectedSizes.includes(size))) return false;
    }
    
    return true;
  });
  
  // مرتب‌سازی محصولات
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
      case 'popular':
        return (b.soldCount || 0) - (a.soldCount || 0);
      default:
        return 0;
    }
  });
  
  // رنگ‌های منحصر به فرد
  const uniqueColors = Array.from(
    new Set(
      products
        .filter(p => p.colors)
        .flatMap(p => p.colors || [])
    )
  );
  
  // سایزهای منحصر به فرد
  const uniqueSizes = Array.from(
    new Set(
      products
        .filter(p => p.sizes)
        .flatMap(p => p.sizes || [])
    )
  );
  
  // تغییر حالت انتخاب رنگ
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };
  
  // تغییر حالت انتخاب سایز
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  // پاک کردن فیلترها
  const clearFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy('newest');
  };
  
  // نام فارسی دسته‌بندی
  const getCategoryName = () => {
    switch (category?.toLowerCase()) {
      case 'men':
        return 'پوشاک مردانه';
      case 'women':
        return 'پوشاک زنانه';
      case 'kids':
        return 'پوشاک کودک';
      case 'shirt':
        return 'پیراهن';
      case 'pants':
        return 'شلوار';
      case 'coat':
        return 'کت';
      case 'tshirt':
        return 'تی‌شرت';
      default:
        return category || 'محصولات';
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* هدر صفحه و نان‌بار */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600">خانه</Link>
          <ChevronLeftIcon className="h-4 w-4 mx-2" />
          <Link to="/products" className="hover:text-blue-600">محصولات</Link>
          <ChevronLeftIcon className="h-4 w-4 mx-2" />
          <span className="text-gray-900">{getCategoryName()}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">{getCategoryName()}</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* فیلترها - نسخه دسکتاپ */}
        <div className="hidden lg:block lg:w-1/4">
          <Card>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold">فیلترها</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                پاک کردن همه
              </button>
            </div>
            
            {/* فیلتر قیمت */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium mb-4">محدوده قیمت</h3>
              <div className="space-y-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {priceRange[0].toLocaleString('fa-IR')} تومان
                  </span>
                  <span className="text-sm text-gray-500">
                    {priceRange[1].toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={priceRange[0]}
                  onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* فیلتر رنگ */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium mb-4">رنگ</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueColors.map(color => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColors.includes(color) ? 'ring-2 ring-blue-500' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* فیلتر سایز */}
            <div className="p-4">
              <h3 className="font-medium mb-4">سایز</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedSizes.includes(size) 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* محتوای اصلی */}
        <div className="lg:w-3/4">
          {/* نوار ابزار بالا */}
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <div className="mb-4 lg:mb-0">
              <span className="text-gray-600">
                {sortedProducts.length} محصول یافت شد
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* دکمه نمایش فیلترها در موبایل */}
              <Button
                onClick={() => setShowFilters(true)}
                className="lg:hidden bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <FunnelIcon className="h-5 w-5 ml-1" />
                فیلترها
              </Button>
              
              {/* مرتب‌سازی */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">جدیدترین</option>
                <option value="popular">پرفروش‌ترین</option>
                <option value="priceAsc">قیمت: کم به زیاد</option>
                <option value="priceDesc">قیمت: زیاد به کم</option>
              </select>
            </div>
          </div>
          
          {/* لیست محصولات */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>در حال بارگذاری محصولات...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">متأسفانه محصولی با این مشخصات یافت نشد.</p>
              <Button 
                onClick={clearFilters}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                پاک کردن فیلترها
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* مودال فیلترها برای موبایل */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden overflow-auto">
          <div className="bg-white h-full w-80 max-w-full ml-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="font-semibold">فیلترها</h2>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between">
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  پاک کردن همه
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  اعمال فیلترها
                </button>
              </div>
            </div>
            
            {/* فیلتر قیمت */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium mb-4">محدوده قیمت</h3>
              <div className="space-y-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {priceRange[0].toLocaleString('fa-IR')} تومان
                  </span>
                  <span className="text-sm text-gray-500">
                    {priceRange[1].toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={priceRange[0]}
                  onChange={e => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* فیلتر رنگ */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium mb-4">رنگ</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueColors.map(color => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColors.includes(color) ? 'ring-2 ring-blue-500' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* فیلتر سایز */}
            <div className="p-4">
              <h3 className="font-medium mb-4">سایز</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedSizes.includes(size) 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;