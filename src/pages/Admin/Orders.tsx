import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';

// تایپ سفارش
interface Order {
  id: string;
  customer: {
    id: string;
    name: string;
    phone: string;
    email?: string;
  };
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled' | 'returned';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'online' | 'card' | 'credit' | 'cod';
  items: number;
  totalPrice: number;
  trackingCode?: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [trackingCodeModal, setTrackingCodeModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState('');
  
  // پیجینیشن
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  
  // مرتب‌سازی
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priceDesc' | 'priceAsc'>('newest');

  // بارگذاری سفارش‌ها
  useEffect(() => {
    setLoading(true);
    
    // شبیه‌سازی دریافت از API
    setTimeout(() => {
      const demoOrders: Order[] = [
        {
          id: '1000458',
          customer: {
            id: '1',
            name: 'علی محمدی',
            phone: '09123456789',
            email: 'ali@example.com',
          },
          date: new Date(2023, 7, 30),
          status: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'credit',
          items: 5,
          totalPrice: 2450000,
        },
        {
          id: '1000457',
          customer: {
            id: '2',
            name: 'رضا حسینی',
            phone: '09123456788',
          },
          date: new Date(2023, 7, 29),
          status: 'processing',
          paymentStatus: 'paid',
          paymentMethod: 'online',
          items: 3,
          totalPrice: 1800000,
        },
        {
          id: '1000456',
          customer: {
            id: '3',
            name: 'مریم کریمی',
            phone: '09123456787',
            email: 'maryam@example.com',
          },
          date: new Date(2023, 7, 28),
          status: 'shipped',
          paymentStatus: 'paid',
          paymentMethod: 'card',
          items: 8,
          totalPrice: 3200000,
          trackingCode: 'TRK123456789',
        },
        {
          id: '1000455',
          customer: {
            id: '4',
            name: 'سارا رضایی',
            phone: '09123456786',
          },
          date: new Date(2023, 7, 27),
          status: 'delivered',
          paymentStatus: 'paid',
          paymentMethod: 'online',
          items: 2,
          totalPrice: 950000,
          trackingCode: 'TRK987654321',
        },
        {
          id: '1000454',
          customer: {
            id: '5',
            name: 'محمد حسینی',
            phone: '09123456785',
          },
          date: new Date(2023, 7, 26),
          status: 'canceled',
          paymentStatus: 'refunded',
          paymentMethod: 'online',
          items: 4,
          totalPrice: 1600000,
        },
        {
          id: '1000453',
          customer: {
            id: '6',
            name: 'زهرا امینی',
            phone: '09123456784',
            email: 'zahra@example.com',
          },
          date: new Date(2023, 7, 25),
          status: 'returned',
          paymentStatus: 'refunded',
          paymentMethod: 'card',
          items: 1,
          totalPrice: 540000,
        },
        {
          id: '1000452',
          customer: {
            id: '7',
            name: 'امیر صادقی',
            phone: '09123456783',
          },
          date: new Date(2023, 7, 24),
          status: 'delivered',
          paymentStatus: 'paid',
          paymentMethod: 'cod',
          items: 6,
          totalPrice: 2850000,
          trackingCode: 'TRK123987456',
        },
      ];
      
      setOrders(demoOrders);
      setTotalPages(Math.ceil(demoOrders.length / itemsPerPage));
      setLoading(false);
    }, 1000);
  }, []);

  // تغییر وضعیت سفارش
  const handleChangeStatus = (orderId: string, newStatus: string) => {
    // در دنیای واقعی، درخواست تغییر وضعیت به API ارسال می‌شود
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus as Order['status'],
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    toast.success(`وضعیت سفارش به "${getStatusText(newStatus).text}" تغییر یافت`);
  };

  // ثبت کد پیگیری
  const handleSubmitTrackingCode = () => {
    if (!selectedOrderId || !trackingCode.trim()) return;
    
    // در دنیای واقعی، درخواست ثبت کد پیگیری به API ارسال می‌شود
    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrderId) {
        return {
          ...order,
          trackingCode,
          // اگر سفارش در وضعیت پردازش است، به وضعیت ارسال شده تغییر می‌یابد
          status: order.status === 'processing' ? 'shipped' : order.status,
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    setTrackingCodeModal(false);
    setSelectedOrderId(null);
    setTrackingCode('');
    toast.success('کد پیگیری با موفقیت ثبت شد');
  };

  // متن وضعیت سفارش
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: 'در انتظار تایید', color: 'bg-yellow-100 text-yellow-800' };
      case 'processing':
        return { text: 'در حال پردازش', color: 'bg-blue-100 text-blue-800' };
      case 'shipped':
        return { text: 'ارسال شده', color: 'bg-indigo-100 text-indigo-800' };
      case 'delivered':
        return { text: 'تحویل داده شده', color: 'bg-green-100 text-green-800' };
      case 'canceled':
        return { text: 'لغو شده', color: 'bg-red-100 text-red-800' };
      case 'returned':
        return { text: 'مرجوع شده', color: 'bg-purple-100 text-purple-800' };
      default:
        return { text: 'نامشخص', color: 'bg-neutral-100 text-neutral-800' };
    }
  };

  // متن وضعیت پرداخت
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: 'در انتظار پرداخت', color: 'text-yellow-600' };
      case 'paid':
        return { text: 'پرداخت شده', color: 'text-green-600' };
      case 'failed':
        return { text: 'ناموفق', color: 'text-red-600' };
      case 'refunded':
        return { text: 'بازگشت وجه', color: 'text-purple-600' };
      default:
        return { text: 'نامشخص', color: 'text-neutral-600' };
    }
  };

  // متن روش پرداخت
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'online':
        return 'پرداخت آنلاین';
      case 'card':
        return 'کارت به کارت';
      case 'credit':
        return 'خرید اعتباری';
      case 'cod':
        return 'پرداخت در محل';
      default:
        return 'نامشخص';
    }
  };

  // فیلتر سفارش‌ها
  const getFilteredOrders = () => {
    return orders.filter(order => {
      // جستجو
      if (
        searchQuery &&
        !order.id.includes(searchQuery) &&
        !order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !order.customer.phone.includes(searchQuery) &&
        !(order.trackingCode && order.trackingCode.includes(searchQuery))
      ) {
        return false;
      }
      
      // فیلتر وضعیت سفارش
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }
      
      // فیلتر وضعیت پرداخت
      if (paymentStatusFilter !== 'all' && order.paymentStatus !== paymentStatusFilter) {
        return false;
      }
      
      // فیلتر تاریخ
      if (dateFilter !== 'all') {
        const now = new Date();
        const orderDate = new Date(order.date);
        
        switch (dateFilter) {
          case 'today':
            // سفارش‌های امروز
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            if (orderDate < today) return false;
            break;
          case 'week':
            // سفارش‌های یک هفته اخیر
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            if (orderDate < oneWeekAgo) return false;
            break;
          case 'month':
            // سفارش‌های یک ماه اخیر
            const oneMonthAgo = new Date(now);
            oneMonthAgo.setMonth(now.getMonth() - 1);
            if (orderDate < oneMonthAgo) return false;
            break;
        }
      }
      
      return true;
    });
  };

  // مرتب‌سازی سفارش‌ها
  const getSortedOrders = (filteredOrders: Order[]) => {
    let sorted = [...filteredOrders];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'priceDesc':
        sorted.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case 'priceAsc':
        sorted.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
    }
    
    return sorted;
  };

  // محاسبه تعداد کل صفحات
  const calculateTotalPages = (filteredOrders: Order[]) => {
    return Math.ceil(filteredOrders.length / itemsPerPage);
  };

  // سفارش‌های فیلتر شده و مرتب شده
  const filteredOrders = getFilteredOrders();
  const sortedOrders = getSortedOrders(filteredOrders);
  
  // به‌روزرسانی تعداد صفحات هر بار که فیلترها تغییر می‌کنند
  useEffect(() => {
    setTotalPages(calculateTotalPages(filteredOrders));
    setCurrentPage(1); // برگشت به صفحه اول با تغییر فیلترها
  }, [searchQuery, statusFilter, paymentStatusFilter, dateFilter, sortBy]);

  // سفارش‌های صفحه فعلی
  const currentOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // جستجوی سفارش‌ها
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
        <h1 className="text-2xl font-bold">مدیریت سفارش‌ها</h1>
        
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
      
      {/* بخش فیلترها و جستجو */}
      <Card className="mb-6">
        <div className="flex flex-wrap justify-between gap-4">
          {/* جستجو */}
          <form onSubmit={handleSearch} className="flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو براساس شماره سفارش، نام مشتری، موبایل یا کد پیگیری..."
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
            {/* فیلتر وضعیت سفارش */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="pending">در انتظار تایید</option>
                <option value="processing">در حال پردازش</option>
                <option value="shipped">ارسال شده</option>
                <option value="delivered">تحویل داده شده</option>
                <option value="canceled">لغو شده</option>
                <option value="returned">مرجوع شده</option>
              </select>
            </div>
            
            {/* فیلتر وضعیت پرداخت */}
            <div>
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="input"
              >
                <option value="all">همه وضعیت‌های پرداخت</option>
                <option value="pending">در انتظار پرداخت</option>
                <option value="paid">پرداخت شده</option>
                <option value="failed">پرداخت ناموفق</option>
                <option value="refunded">بازگشت وجه</option>
              </select>
            </div>
            
            {/* فیلتر تاریخ */}
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input"
              >
                <option value="all">همه زمان‌ها</option>
                <option value="today">امروز</option>
                <option value="week">هفته اخیر</option>
                <option value="month">ماه اخیر</option>
              </select>
            </div>
            
            {/* مرتب‌سازی */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'priceDesc' | 'priceAsc')}
                className="input"
              >
                <option value="newest">جدیدترین</option>
                <option value="oldest">قدیمی‌ترین</option>
                <option value="priceDesc">بیشترین مبلغ</option>
                <option value="priceAsc">کمترین مبلغ</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      {/* جدول سفارش‌ها */}
      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="spinner"></div>
            <span className="mr-3 text-neutral-600">در حال بارگذاری سفارش‌ها...</span>
          </div>
        ) : currentOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <FunnelIcon className="w-16 h-16 mx-auto text-neutral-300" />
            </div>
            <h2 className="text-xl font-bold mb-2">سفارشی یافت نشد</h2>
            <p className="text-neutral-500 mb-6">
              {searchQuery || statusFilter !== 'all' || paymentStatusFilter !== 'all' || dateFilter !== 'all'
                ? 'با فیلترهای انتخاب شده سفارشی یافت نشد. لطفاً فیلترهای دیگری را امتحان کنید.'
                : 'هنوز سفارشی ثبت نشده است.'}
            </p>
            {(searchQuery || statusFilter !== 'all' || paymentStatusFilter !== 'all' || dateFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPaymentStatusFilter('all');
                  setDateFilter('all');
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
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">شماره سفارش</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">مشتری</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">تاریخ</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">وضعیت</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">پرداخت</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">مبلغ کل (تومان)</th>
                    <th className="py-3 px-4 text-right font-medium text-sm text-neutral-600">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>{order.customer.name}</div>
                        <div className="text-xs text-neutral-500">{order.customer.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        {order.date.toLocaleDateString('fa-IR')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="relative">
                          <button
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusText(order.status).color}`}
                            onClick={(e) => {
                              e.currentTarget.nextElementSibling?.classList.toggle('hidden');
                            }}
                          >
                            {getStatusText(order.status).text}
                            <ChevronDownIcon className="w-4 h-4 mr-1" />
                          </button>
                          <div className="absolute hidden mt-1 left-0 bg-white border border-neutral-200 rounded-md shadow-lg z-10">
                            <div className="py-1">
                              {order.status !== 'pending' && (
                                <button
                                  className="block w-full text-right px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                  onClick={() => handleChangeStatus(order.id, 'pending')}
                                >
                                  در انتظار تایید
                                </button>
                              )}
                              {order.status !== 'processing' && (
                                <button
                                  className="block w-full text-right px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                  onClick={() => handleChangeStatus(order.id, 'processing')}
                                >
                                  در حال پردازش
                                </button>
                              )}
                              {order.status !== 'shipped' && (
                                <button
                                  className="block w-full text-right px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                  onClick={() => {
                                    if (order.trackingCode) {
                                      handleChangeStatus(order.id, 'shipped');
                                    } else {
                                      setSelectedOrderId(order.id);
                                      setTrackingCodeModal(true);
                                    }
                                  }}
                                >
                                  ارسال شده
                                </button>
                              )}
                              {order.status !== 'delivered' && (
                                <button
                                  className="block w-full text-right px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                  onClick={() => handleChangeStatus(order.id, 'delivered')}
                                >
                                  تحویل داده شده
                                </button>
                              )}
                              {order.status !== 'canceled' && (
                                <button
                                  className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-neutral-100"
                                  onClick={() => handleChangeStatus(order.id, 'canceled')}
                                >
                                  لغو شده
                                </button>
                              )}
                              {order.status !== 'returned' && (
                                <button
                                  className="block w-full text-right px-4 py-2 text-sm text-purple-600 hover:bg-neutral-100"
                                  onClick={() => handleChangeStatus(order.id, 'returned')}
                                >
                                  مرجوع شده
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        {order.trackingCode && (
                          <div className="text-xs text-neutral-500 mt-1">
                            کد پیگیری: {order.trackingCode}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className={`font-medium ${getPaymentStatusText(order.paymentStatus).color}`}>
                          {getPaymentStatusText(order.paymentStatus).text}
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                          {getPaymentMethodText(order.paymentMethod)}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {order.totalPrice.toLocaleString()}
                        <div className="text-xs text-neutral-500 mt-1">
                          {order.items} آیتم
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="p-1 text-neutral-500 hover:text-neutral-700 mr-1"
                            title="مشاهده جزئیات"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </Link>
                          <a
                            href={`/invoice/${order.id}`}
                            target="_blank"
                            className="p-1 text-neutral-500 hover:text-neutral-700 mr-1"
                            title="مشاهده فاکتور"
                          >
                            <DocumentTextIcon className="w-5 h-5" />
                          </a>
                          {!order.trackingCode && (order.status === 'processing' || order.status === 'shipped') && (
                            <button
                              onClick={() => {
                                setSelectedOrderId(order.id);
                                setTrackingCodeModal(true);
                              }}
                              className="p-1 text-blue-500 hover:text-blue-700"
                              title="ثبت کد پیگیری"
                            >
                              <span className="text-xs">ثبت کد پیگیری</span>
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
                نمایش {(currentPage - 1) * itemsPerPage + 1} تا {Math.min(currentPage * itemsPerPage, filteredOrders.length)} از {filteredOrders.length} سفارش
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
      
      {/* مودال ثبت کد پیگیری */}
      <Modal
        isOpen={trackingCodeModal}
        onClose={() => {
          setTrackingCodeModal(false);
          setSelectedOrderId(null);
          setTrackingCode('');
        }}
        title="ثبت کد پیگیری"
        maxWidth="sm"
      >
        <div>
          <p className="text-neutral-600 mb-4">
            لطفاً کد پیگیری مرسوله را وارد کنید. با ثبت کد پیگیری، وضعیت سفارش به «ارسال شده» تغییر خواهد کرد.
          </p>
          
          <Input
            label="کد پیگیری"
            id="trackingCode"
            name="trackingCode"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="کد پیگیری مرسوله را وارد کنید"
          />
          
          <div className="flex justify-end mt-6 space-x-2 space-x-reverse">
            <Button
              variant="outline"
              onClick={() => {
                setTrackingCodeModal(false);
                setSelectedOrderId(null);
                setTrackingCode('');
              }}
            >
              انصراف
            </Button>
            
            <Button
              variant="primary"
              onClick={handleSubmitTrackingCode}
              disabled={!trackingCode.trim()}
            >
              ثبت کد پیگیری
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminOrders;