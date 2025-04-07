import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FunnelIcon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useProductStore } from '../../store/productStore';
// import ProductCard from '../../components/product/ProductCard';
import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';
import { categories } from '../../data/products';

const ProductList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    products, 
    filteredProducts, 
    loading, 
    fetchProducts,
    setFilters,
    clearFilters,
    filters,
  } = useProductStore();

  // پارامترهای URL را به فیلترها تبدیل می‌کند
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlFilters: Record<string, any> = {};

    if (queryParams.has('category')) {
      urlFilters.category = queryParams.get('category');
    }

    if (queryParams.has('subcategory')) {
      urlFilters.subcategory = queryParams.get('subcategory');
    }

    if (queryParams.has('minPrice')) {
      urlFilters.minPrice = Number(queryParams.get('minPrice'));
    }

    if (queryParams.has('maxPrice')) {
      urlFilters.maxPrice = Number(queryParams.get('maxPrice'));
    }

    if (queryParams.has('inStock') && queryParams.get('inStock') === 'true') {
      urlFilters.inStock = true;
    }

    if (queryParams.has('sortBy')) {
      urlFilters.sortBy = queryParams.get('sortBy') as any;
    }

    if (queryParams.has('query')) {
      urlFilters.query = queryParams.get('query');
    }

    // به‌روزرسانی فیلترها بر اساس URL
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  }, [location.search, setFilters]);

  // دریافت محصولات در صورت نبودن
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // وضعیت‌های UI
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    brands: true,
    sizes: true,
    colors: true,
  });

  // رنج قیمت
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);

  // مقادیر انتخاب‌شده برای فیلترها
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState<string>('newest');

  // گزینه‌های موجود برای فیلترها
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44'];
  const availableColors = ['سفید', 'مشکی', 'آبی', 'قرمز', 'سبز', 'زرد', 'بنفش', 'نارنجی', 'قهوه‌ای', 'خاکستری'];
  const availableBrands = ['برند ایرانی', 'کوتون', 'اسپورت', 'هوم ور', 'پوشاک', 'کیدز'];

  // گزینه‌های مرتب‌سازی
  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'priceAsc', label: 'ارزان‌ترین' },
    { value: 'priceDesc', label: 'گران‌ترین' },
    { value: 'popular', label: 'محبوب‌ترین' },
  ];

  // تغییر وضعیت باز/بسته بودن بخش‌های فیلتر
  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // اعمال فیلترها
  const applyFilters = () => {
    const newFilters = {
      ...(searchQuery ? { query: searchQuery } : {}),
      ...(inStockOnly ? { inStock: true } : {}),
      ...(priceRange[0] > 0 ? { minPrice: priceRange[0] } : {}),
      ...(priceRange[1] < 2000000 ? { maxPrice: priceRange[1] } : {}),
      ...(selectedSizes.length > 0 ? { sizes: selectedSizes } : {}),
      ...(selectedColors.length > 0 ? { colors: selectedColors } : {}),
      ...(selectedBrands.length > 0 ? { brands: selectedBrands } : {}),
      ...(sortOption ? { sortBy: sortOption as any } : {}),
    };

    setFilters(newFilters);
    setMobileFiltersOpen(false);

    // به‌روزرسانی URL با فیلترهای جدید
    const queryParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v));
      } else if (value !== null && value !== undefined) {
        queryParams.set(key, String(value));
      }
    });

    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  // پاک کردن همه فیلترها
  const handleClearFilters = () => {
    setPriceRange([0, 2000000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSearchQuery('');
    setInStockOnly(false);
    setSortOption('newest');
    clearFilters();
    navigate('/products');
  };

  // جستجوی محصولات
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // تغییر نحوه نمایش محصولات (گرید یا لیست)
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <div className="container-custom">
      <h1 className="text-2xl font-bold mb-6">محصولات</h1>

      {/* نوار جستجو و فیلترها */}
      <div className="bg-white rounded-lg shadow-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* فرم جستجو */}
          <form onSubmit={handleSearch} className="flex flex-grow">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                className="input pr-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
              </div>
            </div>
            <button
              type="submit"
              className="hidden md:inline-flex btn-primary mr-2"
            >
              جستجو
            </button>
          </form>

          {/* کنترل‌های فیلتر و نمایش */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden"
            >
              <FunnelIcon className="h-5 w-5 ml-1" />
              فیلترها
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setTimeout(() => applyFilters(), 0);
                  }}
                  className="input appearance-none pr-10 pl-8"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-neutral-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
                <ChevronDownIcon className="h-4 w-4 text-neutral-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <button
                onClick={toggleViewMode}
                className="p-2 border border-neutral-200 rounded-md hover:bg-neutral-50"
              >
                {viewMode === 'grid' ? (
                  <ListBulletIcon className="h-5 w-5 text-neutral-500" />
                ) : (
                  <Squares2X2Icon className="h-5 w-5 text-neutral-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* فیلترهای کناری (دسکتاپ) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-card p-4 sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">فیلترها</h2>
              <button
                onClick={handleClearFilters}
                className="text-primary-600 text-sm hover:text-primary-800"
              >
                پاک کردن همه
              </button>
            </div>

            <hr className="my-3" />

            {/* بخش دسته‌بندی‌ها */}
            <div className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection('categories')}
              >
                <h3 className="font-medium">دسته‌بندی‌ها</h3>
                {expandedSections.categories ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </div>

              {expandedSections.categories && (
                <div className="mt-2 space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="mr-2">
                      <div className="font-medium text-neutral-800 mb-1">
                        {category.name}
                      </div>
                      <div className="mr-4 space-y-1">
                        {category.subcategories?.map((subcategory) => (
                          <div key={subcategory.id} className="flex items-center">
                            <a
                              href={`/products?category=${category.slug}&subcategory=${subcategory.slug}`}
                              className="text-sm text-neutral-600 hover:text-primary-600"
                            >
                              {subcategory.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr className="my-3" />

            {/* بخش قیمت */}
            <div className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection('price')}
              >
                <h3 className="font-medium">محدوده قیمت</h3>
                {expandedSections.price ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </div>

              {expandedSections.price && (
                <div className="mt-2">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-neutral-500">
                      {priceRange[0].toLocaleString()} تومان
                    </span>
                    <span className="text-sm text-neutral-500">
                      {priceRange[1].toLocaleString()} تومان
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="50000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <hr className="my-3" />

            {/* بخش برند */}
            <div className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection('brands')}
              >
                <h3 className="font-medium">برند</h3>
                {expandedSections.brands ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </div>

              {expandedSections.brands && (
                <div className="mt-2 space-y-2">
                  {availableBrands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                          }
                        }}
                        className="ml-2"
                      />
                      <label htmlFor={`brand-${brand}`} className="text-sm text-neutral-600">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr className="my-3" />

            {/* بخش سایز */}
            <div className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection('sizes')}
              >
                <h3 className="font-medium">سایز</h3>
                {expandedSections.sizes ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </div>

              {expandedSections.sizes && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 text-sm border rounded-md ${
                        selectedSizes.includes(size)
                          ? 'bg-primary-100 border-primary-500 text-primary-700'
                          : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50'
                      }`}
                      onClick={() => {
                        if (selectedSizes.includes(size)) {
                          setSelectedSizes(selectedSizes.filter((s) => s !== size));
                        } else {
                          setSelectedSizes([...selectedSizes, size]);
                        }
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <hr className="my-3" />

            {/* بخش رنگ */}
            <div className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection('colors')}
              >
                <h3 className="font-medium">رنگ</h3>
                {expandedSections.colors ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </div>

              {expandedSections.colors && (
                <div className="mt-2 space-y-2">
                  {availableColors.map((color) => (
                    <div key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedColors([...selectedColors, color]);
                          } else {
                            setSelectedColors(selectedColors.filter((c) => c !== color));
                          }
                        }}
                        className="ml-2"
                      />
                      <label htmlFor={`color-${color}`} className="text-sm text-neutral-600">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr className="my-3" />

            {/* بخش موجودی */}
            <div className="mb-4">
              <div className="flex items-center py-2">
                <input
                  type="checkbox"
                  id="instock"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="ml-2"
                />
                <label htmlFor="instock" className="font-medium">
                  فقط کالاهای موجود
                </label>
              </div>
            </div>

            <Button variant="primary" onClick={applyFilters} fullWidth>
              اعمال فیلترها
            </Button>
          </div>
        </aside>

        {/* فیلترهای موبایل */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-bold text-lg">فیلترها</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4">
                {/* محتوای فیلترها مشابه بخش دسکتاپ */}
                {/* ... */}
                {/* بخش دسته‌بندی‌ها */}
                <div className="mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection('categories')}
                  >
                    <h3 className="font-medium">دسته‌بندی‌ها</h3>
                    {expandedSections.categories ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>

                  {expandedSections.categories && (
                    <div className="mt-2 space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="mr-2">
                          <div className="font-medium text-neutral-800 mb-1">
                            {category.name}
                          </div>
                          <div className="mr-4 space-y-1">
                            {category.subcategories?.map((subcategory) => (
                              <div key={subcategory.id} className="flex items-center">
                                <a
                                  href={`/products?category=${category.slug}&subcategory=${subcategory.slug}`}
                                  className="text-sm text-neutral-600 hover:text-primary-600"
                                  onClick={() => setMobileFiltersOpen(false)}
                                >
                                  {subcategory.name}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="my-3" />

                {/* بخش قیمت */}
                <div className="mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection('price')}
                  >
                    <h3 className="font-medium">محدوده قیمت</h3>
                    {expandedSections.price ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>

                  {expandedSections.price && (
                    <div className="mt-2">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-neutral-500">
                          {priceRange[0].toLocaleString()} تومان
                        </span>
                        <span className="text-sm text-neutral-500">
                          {priceRange[1].toLocaleString()} تومان
                        </span>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="2000000"
                        step="50000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="2000000"
                        step="50000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                <hr className="my-3" />

                {/* بخش برند */}
                <div className="mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection('brands')}
                  >
                    <h3 className="font-medium">برند</h3>
                    {expandedSections.brands ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>

                  {expandedSections.brands && (
                    <div className="mt-2 space-y-2">
                      {availableBrands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBrands([...selectedBrands, brand]);
                              } else {
                                setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                              }
                            }}
                            className="ml-2"
                          />
                          <label htmlFor={`mobile-brand-${brand}`} className="text-sm text-neutral-600">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="my-3" />

                {/* بخش سایز */}
                <div className="mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection('sizes')}
                  >
                    <h3 className="font-medium">سایز</h3>
                    {expandedSections.sizes ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>

                  {expandedSections.sizes && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          className={`px-3 py-1 text-sm border rounded-md ${
                            selectedSizes.includes(size)
                              ? 'bg-primary-100 border-primary-500 text-primary-700'
                              : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50'
                          }`}
                          onClick={() => {
                            if (selectedSizes.includes(size)) {
                              setSelectedSizes(selectedSizes.filter((s) => s !== size));
                            } else {
                              setSelectedSizes([...selectedSizes, size]);
                            }
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="my-3" />

                {/* بخش رنگ */}
                <div className="mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer py-2"
                    onClick={() => toggleSection('colors')}
                  >
                    <h3 className="font-medium">رنگ</h3>
                    {expandedSections.colors ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>

                  {expandedSections.colors && (
                    <div className="mt-2 space-y-2">
                      {availableColors.map((color) => (
                        <div key={color} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-color-${color}`}
                            checked={selectedColors.includes(color)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedColors([...selectedColors, color]);
                              } else {
                                setSelectedColors(selectedColors.filter((c) => c !== color));
                              }
                            }}
                            className="ml-2"
                          />
                          <label htmlFor={`mobile-color-${color}`} className="text-sm text-neutral-600">
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="my-3" />

                {/* بخش موجودی */}
                <div className="mb-4">
                  <div className="flex items-center py-2">
                    <input
                      type="checkbox"
                      id="mobile-instock"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="ml-2"
                    />
                    <label htmlFor="mobile-instock" className="font-medium">
                      فقط کالاهای موجود
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t flex gap-2">
                <Button variant="outline" onClick={handleClearFilters} className="flex-1">
                  پاک کردن
                </Button>
                <Button variant="primary" onClick={applyFilters} className="flex-1">
                  اعمال فیلترها
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* لیست محصولات */}
        <div className="flex-grow">
          {/* فیلترهای انتخاب شده */}
          {(selectedSizes.length > 0 || 
             selectedColors.length > 0 || 
             selectedBrands.length > 0 || 
             inStockOnly || 
             priceRange[0] > 0 || 
             priceRange[1] < 2000000 ||
             searchQuery) && (
            <div className="bg-white rounded-lg shadow-card p-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-neutral-500">فیلترهای انتخاب شده:</span>
                
                {searchQuery && (
                  <span className="badge badge-primary flex items-center">
                    جستجو: {searchQuery}
                    <XMarkIcon 
                      className="h-4 w-4 ml-1 cursor-pointer" 
                      onClick={() => {
                        setSearchQuery('');
                        applyFilters();
                      }}
                    />
                  </span>
                )}
                
                {priceRange[0] > 0 && (
                  <span className="badge badge-primary flex items-center">
                    حداقل قیمت: {priceRange[0].toLocaleString()} تومان
                    <XMarkIcon 
                      className="h-4 w-4 ml-1 cursor-pointer" 
                      onClick={() => {
                        setPriceRange([0, priceRange[1]]);
                        applyFilters();
                      }}
                    />
                  </span>
                )}
                
                {priceRange[1] < 2000000 && (
                  <span className="badge badge-primary flex items-center">
                    حداکثر قیمت: {priceRange[1].toLocaleString()} تومان
                    <XMarkIcon 
                      className="h-4 w-4 ml-1 cursor-pointer" 
                      onClick={() => {
                        setPriceRange([priceRange[0], 2000000]);
                        applyFilters();
                      }}
                    />
                  </span>
                )}
                
                {selectedSizes.map((size) => (
                  <span key={size} className="badge badge-primary flex items-center">
                    سایز: {size}
                    <XMarkIcon 
                      className="h-4 w-4 ml-1 cursor-pointer" 
                      onClick={() => {
                        setSelectedSizes(selectedSizes.filter((s) => s !== size));
                        applyFilters();
                      }}
                    />
                  </span>
                ))}
                
                {selectedColors.map((color) => (
                  <span key={color} className="badge badge-primary flex items-center">
                    رنگ: {color}
                    <XMarkIcon 
                      className="h-4 w-4 ml-1 cursor-pointer" 
                      onClick={() => {
                        setSelectedColors(selectedColors.filter((c) => c !== color));
                        applyFilters();
                      }}
                    />
                  </span>
                ))}
                
                {selectedBrands.map((brand) => (
                  <span key={brand} className="badge badge-primary flex items-center">
                    برند: {brand}
                    <XMarkIcon 
                      className="h-4 w-4 ml-1 cursor-pointer" 
                      onClick={() => {
                        setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                        applyFilters();
                      }}
                    />
                  </span>
                ))}
                
                {inStockOnly && (
                  <span className="badge badge-primary flex items-center">
                    فقط کالاهای موجود
                    <XMarkIcon 
                      className="h-4 w-4 ml-1 cursor-pointer" 
                      onClick={() => {
                        setInStockOnly(false);
                        applyFilters();
                      }}
                    />
                  </span>
                )}
                
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-primary-600 hover:text-primary-800 mr-auto"
                >
                  پاک کردن همه
                </button>
              </div>
            </div>
          )}

          {/* نمایش محصولات */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
              <span className="mr-3 text-neutral-600">در حال بارگیری محصولات...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-card p-8 text-center">
              <div className="mb-4">
                <XMarkIcon className="h-12 w-12 text-neutral-400 mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2">محصولی یافت نشد</h3>
              <p className="text-neutral-600 mb-4">
                با معیارهای فیلتر فعلی هیچ محصولی وجود ندارد. لطفاً فیلترهای خود را تغییر دهید.
              </p>
              <Button variant="outline" onClick={handleClearFilters}>
                پاک کردن فیلترها
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-neutral-500">
                {filteredProducts.length} محصول یافت شد
              </div>
              
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))} */}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-card overflow-hidden flex">
                      <div className="w-1/3 sm:w-1/4">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-4 flex-grow">
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-neutral-600 text-sm mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {product.sizes.slice(0, 3).map((size) => (
                            <span key={size} className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
                              {size}
                            </span>
                          ))}
                          {product.sizes.length > 3 && (
                            <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
                              +{product.sizes.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-auto pt-2">
                          <div>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-neutral-400 line-through text-sm ml-2">
                                {product.originalPrice.toLocaleString()} تومان
                              </span>
                            )}
                            <span className="font-bold">
                              {product.price.toLocaleString()} تومان
                            </span>
                          </div>
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => {/* عملیات افزودن به سبد خرید */}}
                          >
                            مشاهده
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;