import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { mockProducts } from '../../data/products';
import toast from 'react-hot-toast';

// تایپ محصول برای این کامپوننت
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category?: string;
  brand?: string;
  inStock: boolean;
  stockCount?: number;
  images: string[];
  createdAt: Date;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  // پیجینیشن
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  
  // فیلتر وضعیت موجودی
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  
  // مرتب‌سازی
  const [sortBy, setSortBy] = useState<'newest' | 'priceAsc' | 'priceDesc' | 'name'>('newest');

  // بارگذاری محصولات
  useEffect(() => {
    setLoading(true);
    
    // شبیه‌سازی دریافت از API
    setTimeout(() => {
      const formattedProducts = mockProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        stockCount: product.stockCount,
        images: product.images,
        createdAt: product.createdAt
      }));
      
      setProducts(formattedProducts);
      setTotalPages(Math.ceil(formattedProducts.length / itemsPerPage));
      setLoading(false);
    }, 1000);
  }, []);

  // فیلتر محصولات
  const getFilteredProducts = () => {
    return products.filter(product => {
      // جستجو
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      
      // فیلتر دسته‌بندی
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      // فیلتر موجودی
      if (stockFilter === 'inStock' && !product.inStock) {
        return false;
      }
      
      if (stockFilter === 'outOfStock' && product.inStock) {
        return false;
      }
      
      return true;
    });
  };

  // مرتب‌سازی محصولات
  const getSortedProducts = (filteredProducts: Product[]) => {
    let sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'priceAsc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return sorted;
  };

  // محاسبه تعداد کل صفحات
  const calculateTotalPages = (filteredProducts: Product[]) => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  };

  // محصولات فیلتر شده و مرتب شده
  const filteredProducts = getFilteredProducts();
  const sortedProducts = getSortedProducts(filteredProducts);
  
  // به‌روزرسانی تعداد صفحات هر بار که فیلترها تغییر می‌کنند
  useEffect(() => {
    setTotalPages(calculateTotalPages(filteredProducts));
    setCurrentPage(1); // برگشت به صفحه اول با تغییر فیلترها
  }, [searchQuery, selectedCategory, stockFilter]);

  // محصولات صفحه فعلی
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // جستجوی محصولات
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // جستجو در زمان واقعی انجام می‌شود
  };

  // پیجینیشن
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // حذف محصول
  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    
    // در دنیای واقعی، درخواست حذف به API ارسال می‌شود
    const newProducts = products.filter(product => product.id !== productToDelete);
    setProducts(newProducts);
    
    toast.success('محصول با موفقیت حذف شد');
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // دسته‌بندی‌های منحصر به فرد
  const uniqueCategories = Array.from(
    new Set(products.map(product => product.category).filter(Boolean))
  );

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>
        
        <div className="flex items-center space-x-2 space-x-reverse mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="flex items-center"
          >
            <ArrowPathIcon className="w-4 h-4 ml-1" />
            بروزرسانی
          </Button>
          
          <Link to="/admin/products/new">
            <Button variant="primary" className="flex items-center">
              <PlusIcon className="w-5 h-5 ml-1" />
              افزودن محصول جدید
            </Button>
          </Link>
        </div>
      </div>
      
      {/* بخش فیلترها و جستجو */}
      <Card className="mb-6">
        <div className="flex flex-wrap justify-between gap-4">
          {/* جستجو */}
          <form onSubmit={handleSearch} className="flex-grow max-w-md">
            <div className="relative">
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
          </form>
          
          {/* فیلترها */}
          <div className="flex flex-wrap gap-2">
            {/* فیلتر دسته‌بندی */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="all">همه دسته‌بندی‌ها</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* فیلتر موجودی */}
            <div>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as 'all' | 'inStock' | 'outOfStock')}
                className="input"
              >
                <option value="all">همه وضعیت‌های موجودی</option>
                <option value="inStock">موجود</option>
                <option value="outOfStock">ناموجود</option>
              </select>
            </div>
            
            {/* مرتب‌سازی */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'priceAsc' | 'priceDesc' | 'name')}
                className="input"
              >
                <option value="newest">جدیدترین</option>
                <option value="priceAsc">قیمت (کم به زیاد)</option>
                <option value="priceDesc">قیمت (زیاد به کم)</option>
                <option value="name">نام محصول</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      {/* جدول محصولات */}
      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="spinner"></div>
            <span className="mr-3 text-neutral-600">در حال بارگذاری محصولات...</span>
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <FunnelIcon className="w-16 h-16 mx-auto text-neutral-300" />
            </div>
            <h2 className="text-xl font-bold mb-2">محصولی یافت نشد</h2>
            <p className="text-neutral-500 mb-6">
              {searchQuery || selectedCategory !== 'all' || stockFilter !== 'all'
                ? 'با فیلترهای انتخاب شده محصولی یافت نشد. لطفاً فیلترهای دیگری را امتحان کنید.'
                : 'هنوز محصولی ثبت نشده است. با کلیک بر روی دکمه "افزودن محصول جدید"، اولین محصول خود را اضافه کنید.'}
            </p>
            {searchQuery || selectedCategory !== 'all' || stockFilter !== 'all' ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setStockFilter('all');
                }}
              >
                حذف فیلترها
              </Button>
            ) : (
              <Link to="/admin/products/new">
                <Button variant="primary">
                  افزودن محصول جدید
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">تصویر</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">نام محصول</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">دسته‌بندی</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">قیمت (تومان)</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">موجودی</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{product.name}</div>
                        {product.brand && (
                          <div className="text-sm text-neutral-500">{product.brand}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {product.category || 'نامشخص'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{product.price.toLocaleString()}</div>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div className="text-sm text-neutral-400 line-through">
                            {product.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {product.inStock ? (
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>
                            <span className="text-green-600">
                              {product.stockCount ? `${product.stockCount} عدد` : 'موجود'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                            <span className="text-red-600">ناموجود</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Link
                            to={`/admin/products/${product.id}`}
                            className="p-1 text-neutral-500 hover:text-neutral-700 mr-1"
                            title="مشاهده"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </Link>
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="p-1 text-blue-500 hover:text-blue-700 mr-1"
                            title="ویرایش"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => {
                              setProductToDelete(product.id);
                              setDeleteModalOpen(true);
                            }}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="حذف"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* پیجینیشن */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-neutral-500">
                نمایش {(currentPage - 1) * itemsPerPage + 1} تا {Math.min(currentPage * itemsPerPage, filteredProducts.length)} از {filteredProducts.length} محصول
              </div>
              
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="ml-2"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </Button>
                
                <div className="flex items-center">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // نمایش 5 صفحه اطراف صفحه فعلی
                    let pageToShow;
                    if (totalPages <= 5) {
                      pageToShow = i + 1;
                    } else if (currentPage <= 3) {
                      pageToShow = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageToShow = totalPages - 4 + i;
                    } else {
                      pageToShow = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageToShow}
                        onClick={() => handlePageChange(pageToShow)}
                        className={`w-8 h-8 mx-1 rounded-md flex items-center justify-center ${
                          currentPage === pageToShow
                            ? 'bg-primary-500 text-white'
                            : 'bg-white text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        {pageToShow}
                      </button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="mr-2"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
      
      {/* مودال تایید حذف */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        title="حذف محصول"
        maxWidth="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <TrashIcon className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            آیا از حذف این محصول مطمئن هستید؟
          </h3>
          <p className="text-sm text-neutral-500 mb-6">
            این عملیات غیرقابل بازگشت است و پس از حذف، امکان بازیابی محصول وجود ندارد.
          </p>
          
          <div className="flex justify-center space-x-2 space-x-reverse">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteModalOpen(false);
                setProductToDelete(null);
              }}
              className="min-w-20"
            >
              انصراف
            </Button>
            
            <Button
              variant="danger"
              onClick={handleDeleteProduct}
              className="min-w-20"
            >
              حذف
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;