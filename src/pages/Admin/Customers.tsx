import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';

// تایپ مشتری
interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  company?: string;
  totalOrders: number;
  totalSpent: number;
  isWholesaler: boolean;
  isApproved: boolean;
  registeredAt: Date;
  lastOrderAt?: Date;
}

const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [customerTypeFilter, setCustomerTypeFilter] = useState<string>('all');
  const [wholesalerFilter, setWholesalerFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'a-z' | 'most-orders' | 'most-spent'>('newest');
  
  // پیجینیشن
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  
  // مودال تایید عمده‌فروش
  const [approvalModal, setApprovalModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>('');
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');

  // بارگذاری مشتریان
  useEffect(() => {
    setLoading(true);
    
    // شبیه‌سازی دریافت از API
    setTimeout(() => {
      const demoCustomers: Customer[] = [
        {
          id: '1',
          name: 'علی محمدی',
          email: 'ali@example.com',
          phone: '09123456789',
          company: 'فروشگاه لباس مردانه محمدی',
          totalOrders: 15,
          totalSpent: 12500000,
          isWholesaler: true,
          isApproved: true,
          registeredAt: new Date(2023, 1, 15),
          lastOrderAt: new Date(2023, 7, 28),
        },
        {
          id: '2',
          name: 'رضا حسینی',
          phone: '09123456788',
          totalOrders: 3,
          totalSpent: 1800000,
          isWholesaler: false,
          isApproved: false,
          registeredAt: new Date(2023, 2, 10),
          lastOrderAt: new Date(2023, 7, 5),
        },
        {
          id: '3',
          name: 'مریم کریمی',
          email: 'maryam@example.com',
          phone: '09123456787',
          company: 'بوتیک بانوان کریمی',
          totalOrders: 8,
          totalSpent: 7200000,
          isWholesaler: true,
          isApproved: false,
          registeredAt: new Date(2023, 3, 5),
          lastOrderAt: new Date(2023, 6, 20),
        },
        {
          id: '4',
          name: 'سارا رضایی',
          phone: '09123456786',
          totalOrders: 2,
          totalSpent: 950000,
          isWholesaler: false,
          isApproved: false,
          registeredAt: new Date(2023, 4, 12),
          lastOrderAt: new Date(2023, 6, 15),
        },
        {
          id: '5',
          name: 'محمد حسینی',
          email: 'mohammad@example.com',
          phone: '09123456785',
          company: 'پوشاک مردانه حسینی',
          totalOrders: 10,
          totalSpent: 9800000,
          isWholesaler: true,
          isApproved: true,
          registeredAt: new Date(2023, 2, 25),
          lastOrderAt: new Date(2023, 7, 10),
        },
        {
          id: '6',
          name: 'زهرا امینی',
          email: 'zahra@example.com',
          phone: '09123456784',
          totalOrders: 5,
          totalSpent: 2800000,
          isWholesaler: false,
          isApproved: false,
          registeredAt: new Date(2023, 5, 1),
          lastOrderAt: new Date(2023, 7, 1),
        },
        {
          id: '7',
          name: 'امیر صادقی',
          phone: '09123456783',
          company: 'فروشگاه زنجیره‌ای صادقی',
          totalOrders: 12,
          totalSpent: 15800000,
          isWholesaler: true,
          isApproved: true,
          registeredAt: new Date(2023, 1, 5),
          lastOrderAt: new Date(2023, 7, 15),
        },
      ];
      
      setCustomers(demoCustomers);
      setTotalPages(Math.ceil(demoCustomers.length / itemsPerPage));
      setLoading(false);
    }, 1000);
  }, []);

  // تایید یا رد عمده‌فروش
  const handleApprovalAction = () => {
    if (!selectedCustomerId) return;
    
    const isApproving = approvalAction === 'approve';
    
    // در دنیای واقعی، درخواست تایید/رد به API ارسال می‌شود
    const updatedCustomers = customers.map(customer => {
      if (customer.id === selectedCustomerId) {
        return {
          ...customer,
          isApproved: isApproving,
        };
      }
      return customer;
    });
    
    setCustomers(updatedCustomers);
    setApprovalModal(false);
    setSelectedCustomerId(null);
    setSelectedCustomerName('');
    
    toast.success(
      isApproving 
        ? `${selectedCustomerName} به عنوان عمده‌فروش تایید شد`
        : `درخواست عمده‌فروشی ${selectedCustomerName} رد شد`
    );
  };

  // فیلتر مشتریان
  const getFilteredCustomers = () => {
    return customers.filter(customer => {
      // جستجو
      if (
        searchQuery &&
        !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !(customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !customer.phone.includes(searchQuery) &&
        !(customer.company && customer.company.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      
      // فیلتر نوع مشتری
      if (customerTypeFilter === 'wholesale' && !customer.isWholesaler) {
        return false;
      }
      
      if (customerTypeFilter === 'retail' && customer.isWholesaler) {
        return false;
      }
      
      // فیلتر وضعیت تایید عمده‌فروش
      if (wholesalerFilter === 'approved' && (!customer.isWholesaler || !customer.isApproved)) {
        return false;
      }
      
      if (wholesalerFilter === 'pending' && (!customer.isWholesaler || customer.isApproved)) {
        return false;
      }
      
      return true;
    });
  };

  // مرتب‌سازی مشتریان
  const getSortedCustomers = (filteredCustomers: Customer[]) => {
    let sorted = [...filteredCustomers];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime());
        break;
      case 'a-z':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'most-orders':
        sorted.sort((a, b) => b.totalOrders - a.totalOrders);
        break;
      case 'most-spent':
        sorted.sort((a, b) => b.totalSpent - a.totalSpent);
        break;
    }
    
    return sorted;
  };

  // محاسبه تعداد کل صفحات
  const calculateTotalPages = (filteredCustomers: Customer[]) => {
    return Math.ceil(filteredCustomers.length / itemsPerPage);
  };

  // مشتریان فیلتر شده و مرتب شده
  const filteredCustomers = getFilteredCustomers();
  const sortedCustomers = getSortedCustomers(filteredCustomers);
  
  // به‌روزرسانی تعداد صفحات هر بار که فیلترها تغییر می‌کنند
  useEffect(() => {
    setTotalPages(calculateTotalPages(filteredCustomers));
    setCurrentPage(1); // برگشت به صفحه اول با تغییر فیلترها
  }, [searchQuery, customerTypeFilter, wholesalerFilter, sortBy]);

  // مشتریان صفحه فعلی
  const currentCustomers = sortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // جستجوی مشتریان
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // جستجو در زمان واقعی انجام می‌شود
  };

  // پیجینیشن
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">مدیریت مشتریان</h1>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="flex items-center"
        >
          <ArrowPathIcon className="w-4 h-4 ml-1" />
          بروزرسانی
        </Button>
      </div>
      
      {/* نمایش تعداد درخواست‌های در انتظار تایید */}
      {customers.filter(c => c.isWholesaler && !c.isApproved).length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center">
          <div className="bg-yellow-100 p-2 rounded-full ml-3">
            <XCircleIcon className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-bold text-yellow-800">درخواست‌های در انتظار تایید</h3>
            <p className="text-yellow-700 text-sm">
              {customers.filter(c => c.isWholesaler && !c.isApproved).length} درخواست عمده‌فروشی در انتظار تایید شما وجود دارد.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mr-auto border-yellow-500 text-yellow-700 hover:bg-yellow-100"
            onClick={() => {
              setCustomerTypeFilter('wholesale');
              setWholesalerFilter('pending');
            }}
          >
            مشاهده درخواست‌ها
          </Button>
        </div>
      )}
      
      {/* بخش فیلترها و جستجو */}
      <Card className="mb-6">
        <div className="flex flex-wrap justify-between gap-4">
          {/* جستجو */}
          <form onSubmit={handleSearch} className="flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو براساس نام، ایمیل، شماره تماس یا نام شرکت..."
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
            {/* فیلتر نوع مشتری */}
            <div>
              <select
                value={customerTypeFilter}
                onChange={(e) => setCustomerTypeFilter(e.target.value)}
                className="input"
              >
                <option value="all">همه مشتریان</option>
                <option value="wholesale">عمده‌فروش</option>
                <option value="retail">خرده‌فروش</option>
              </select>
            </div>
            
            {/* فیلتر وضعیت تایید عمده‌فروش */}
            <div>
              <select
                value={wholesalerFilter}
                onChange={(e) => setWholesalerFilter(e.target.value)}
                className="input"
                disabled={customerTypeFilter === 'retail'}
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="approved">تایید شده</option>
                <option value="pending">در انتظار تایید</option>
              </select>
            </div>
            
            {/* مرتب‌سازی */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input"
              >
                <option value="newest">جدیدترین</option>
                <option value="a-z">حروف الفبا (آ-ی)</option>
                <option value="most-orders">بیشترین سفارش</option>
                <option value="most-spent">بیشترین خرید</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      {/* جدول مشتریان */}
      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="spinner"></div>
            <span className="mr-3 text-neutral-600">در حال بارگذاری مشتریان...</span>
          </div>
        ) : currentCustomers.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <FunnelIcon className="w-16 h-16 mx-auto text-neutral-300" />
            </div>
            <h2 className="text-xl font-bold mb-2">مشتری‌ای یافت نشد</h2>
            <p className="text-neutral-500 mb-6">
              {searchQuery || customerTypeFilter !== 'all' || wholesalerFilter !== 'all'
                ? 'با فیلترهای انتخاب شده مشتری‌ای یافت نشد. لطفاً فیلترهای دیگری را امتحان کنید.'
                : 'هنوز مشتری‌ای ثبت نشده است.'}
            </p>
            {(searchQuery || customerTypeFilter !== 'all' || wholesalerFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setCustomerTypeFilter('all');
                  setWholesalerFilter('all');
                }}
              >
                حذف فیلترها
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">نام مشتری</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">اطلاعات تماس</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">نوع مشتری</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">تاریخ عضویت</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">آخرین سفارش</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">تعداد سفارش</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">مبلغ کل خرید</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{customer.name}</div>
                        {customer.company && (
                          <div className="text-xs text-neutral-500">{customer.company}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-sm">
                          <PhoneIcon className="w-4 h-4 ml-1 text-neutral-500" />
                          <span>{customer.phone}</span>
                        </div>
                        {customer.email && (
                          <div className="flex items-center text-sm mt-1">
                            <EnvelopeIcon className="w-4 h-4 ml-1 text-neutral-500" />
                            <span>{customer.email}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {customer.isWholesaler ? (
                          <div>
                            <span className="text-blue-600 font-medium">عمده‌فروش</span>
                            <div className="flex items-center mt-1">
                              {customer.isApproved ? (
                                <span className="flex items-center text-green-600 text-xs">
                                  <CheckCircleIcon className="w-4 h-4 ml-1" />
                                  تایید شده
                                </span>
                              ) : (
                                <span className="flex items-center text-yellow-600 text-xs">
                                  <XCircleIcon className="w-4 h-4 ml-1" />
                                  در انتظار تایید
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-neutral-600">خرده‌فروش</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {customer.registeredAt.toLocaleDateString('fa-IR')}
                      </td>
                      <td className="py-3 px-4">
                        {customer.lastOrderAt ? (
                          customer.lastOrderAt.toLocaleDateString('fa-IR')
                        ) : (
                          <span className="text-neutral-500 text-sm">بدون سفارش</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {customer.totalOrders} سفارش
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {customer.totalSpent.toLocaleString()} تومان
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Link
                            to={`/admin/customers/${customer.id}`}
                            className="p-1 text-neutral-500 hover:text-neutral-700 ml-1"
                            title="مشاهده جزئیات"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </Link>
                          
                          <Link
                            to={`/admin/orders?customer=${customer.id}`}
                            className="p-1 text-neutral-500 hover:text-neutral-700 ml-1"
                            title="مشاهده سفارش‌ها"
                          >
                            <ShoppingBagIcon className="w-5 h-5" />
                          </Link>
                          
                          {customer.isWholesaler && !customer.isApproved && (
                            <button
                              onClick={() => {
                                setSelectedCustomerId(customer.id);
                                setSelectedCustomerName(customer.name);
                                setApprovalAction('approve');
                                setApprovalModal(true);
                              }}
                              className="p-1 text-green-500 hover:text-green-700 ml-1"
                              title="تایید به عنوان عمده‌فروش"
                            >
                              <CheckCircleIcon className="w-5 h-5" />
                            </button>
                          )}
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
                نمایش {(currentPage - 1) * itemsPerPage + 1} تا {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} از {filteredCustomers.length} مشتری
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
      
      {/* مودال تایید عمده‌فروش */}
      <Modal
        isOpen={approvalModal}
        onClose={() => {
          setApprovalModal(false);
          setSelectedCustomerId(null);
          setSelectedCustomerName('');
        }}
        title={
          approvalAction === 'approve' 
            ? 'تایید درخواست عمده‌فروشی' 
            : 'رد درخواست عمده‌فروشی'
        }
        maxWidth="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            {approvalAction === 'approve' ? (
              <CheckCircleIcon className="h-6 w-6 text-blue-600" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-600" />
            )}
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            {approvalAction === 'approve'
              ? `آیا می‌خواهید ${selectedCustomerName} را به عنوان عمده‌فروش تایید کنید؟`
              : `آیا می‌خواهید درخواست عمده‌فروشی ${selectedCustomerName} را رد کنید؟`
            }
          </h3>
          <p className="text-sm text-neutral-500 mb-6">
            {approvalAction === 'approve'
              ? 'با تایید عمده‌فروشی، این مشتری می‌تواند از تخفیف‌های ویژه و امکانات مخصوص عمده‌فروشان استفاده کند.'
              : 'با رد درخواست، این مشتری به حالت خرده‌فروشی بازمی‌گردد و نمی‌تواند از امکانات ویژه عمده‌فروشان استفاده کند.'
            }
          </p>
          
          <div className="flex justify-center space-x-2 space-x-reverse">
            <Button
              variant="outline"
              onClick={() => {
                setApprovalModal(false);
                setSelectedCustomerId(null);
                setSelectedCustomerName('');
              }}
              className="min-w-20"
            >
              انصراف
            </Button>
            
            <Button
              variant={approvalAction === 'approve' ? 'primary' : 'danger'}
              onClick={handleApprovalAction}
              className="min-w-20"
            >
              {approvalAction === 'approve' ? 'تایید' : 'رد درخواست'}
            </Button>
          </div>
          
          {approvalAction === 'approve' && (
            <div className="mt-4 pt-4 border-t border-neutral-200 text-right">
              <button
                className="text-red-600 text-sm hover:text-red-800"
                onClick={() => setApprovalAction('reject')}
              >
                رد درخواست
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AdminCustomers;