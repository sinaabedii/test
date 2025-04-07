import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  EyeIcon, 
  ArrowPathIcon,
  ShoppingBagIcon,
  FunnelIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

// تایپ سفارش‌های نمونه
interface Order {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled' | 'returned';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'online' | 'card' | 'credit' | 'cod';
  trackingCode?: string;
  totalItems: number;
  totalPrice: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ status: string; date: string }>({
    status: 'all',
    date: 'all',
  });

  // بارگذاری اطلاعات دمو برای سفارش‌ها
  useEffect(() => {
    setLoading(true);
    
    // شبیه‌سازی دریافت اطلاعات از سرور
    setTimeout(() => {
      const demoOrders: Order[] = [
        {
          id: '1000458',
          date: new Date(2023, 5, 15),
          status: 'delivered',
          paymentStatus: 'paid',
          paymentMethod: 'online',
          trackingCode: 'TRK123456789',
          totalItems: 5,
          totalPrice: 2450000,
        },
        {
          id: '1000459',
          date: new Date(2023, 6, 22),
          status: 'shipped',
          paymentStatus: 'paid',
          paymentMethod: 'card',
          trackingCode: 'TRK987654321',
          totalItems: 3,
          totalPrice: 1800000,
        },
        {
          id: '1000460',
          date: new Date(2023, 7, 5),
          status: 'processing',
          paymentStatus: 'paid',
          paymentMethod: 'online',
          totalItems: 8,
          totalPrice: 3200000,
        },
        {
          id: '1000461',
          date: new Date(2023, 7, 15),
          status: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'credit',
          totalItems: 2,
          totalPrice: 950000,
        },
        {
          id: '1000462',
          date: new Date(2023, 7, 28),
          status: 'canceled',
          paymentStatus: 'refunded',
          paymentMethod: 'online',
          totalItems: 4,
          totalPrice: 1600000,
        },
      ];
      
      setOrders(demoOrders);
      setLoading(false);
    }, 1000);
  }, []);

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

  // فیلتر کردن سفارش‌ها
  const getFilteredOrders = () => {
    return orders.filter((order) => {
      // فیلتر بر اساس وضعیت
      if (filter.status !== 'all' && order.status !== filter.status) {
        return false;
      }
      
      // فیلتر بر اساس تاریخ
      if (filter.date !== 'all') {
        const now = new Date();
        const orderDate = new Date(order.date);
        
        switch (filter.date) {
          case 'week':
            // سفارش‌های یک هفته اخیر
            const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
            if (orderDate < oneWeekAgo) return false;
            break;
          case 'month':
            // سفارش‌های یک ماه اخیر
            const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
            if (orderDate < oneMonthAgo) return false;
            break;
          case 'threeMonths':
            // سفارش‌های سه ماه اخیر
            const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
            if (orderDate < threeMonthsAgo) return false;
            break;
          case 'year':
            // سفارش‌های یک سال اخیر
            const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
            if (orderDate < oneYearAgo) return false;
            break;
        }
      }
      
      return true;
    });
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">سفارش‌های من</h1>
        
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
      
      {/* فیلترها */}
      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <FunnelIcon className="w-5 h-5 ml-2 text-neutral-500" />
          <h2 className="font-bold">فیلتر سفارش‌ها</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-neutral-700 mb-1">
              وضعیت سفارش
            </label>
            <div className="relative">
              <select
                id="status-filter"
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                className="input appearance-none pr-4 pl-10 w-full"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="pending">در انتظار تایید</option>
                <option value="processing">در حال پردازش</option>
                <option value="shipped">ارسال شده</option>
                <option value="delivered">تحویل داده شده</option>
                <option value="canceled">لغو شده</option>
                <option value="returned">مرجوع شده</option>
              </select>
              <ChevronDownIcon className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-neutral-700 mb-1">
              تاریخ سفارش
            </label>
            <div className="relative">
              <select
                id="date-filter"
                value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                className="input appearance-none pr-4 pl-10 w-full"
              >
                <option value="all">همه زمان‌ها</option>
                <option value="week">یک هفته اخیر</option>
                <option value="month">یک ماه اخیر</option>
                <option value="threeMonths">سه ماه اخیر</option>
                <option value="year">یک سال اخیر</option>
              </select>
              <ChevronDownIcon className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </Card>
      
      {/* لیست سفارش‌ها */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="spinner"></div>
          <span className="mr-3 text-neutral-600">در حال بارگذاری سفارش‌ها...</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card className="text-center py-12">
          <div className="mb-4">
            <ShoppingBagIcon className="w-16 h-16 mx-auto text-neutral-300" />
          </div>
          <h2 className="text-xl font-bold mb-2">سفارشی یافت نشد</h2>
          <p className="text-neutral-500 mb-6">
            {filter.status !== 'all' || filter.date !== 'all'
              ? 'با فیلترهای انتخاب شده سفارشی یافت نشد. لطفاً فیلترهای دیگری را امتحان کنید.'
              : 'شما هنوز هیچ سفارشی ثبت نکرده‌اید. برای خرید به فروشگاه مراجعه کنید.'}
          </p>
          {filter.status !== 'all' || filter.date !== 'all' ? (
            <Button
              variant="outline"
              onClick={() => setFilter({ status: 'all', date: 'all' })}
            >
              حذف فیلترها
            </Button>
          ) : (
            <Link to="/products" className="btn-primary inline-block px-4 py-2">
              مشاهده محصولات
            </Link>
          )}
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <div className="flex flex-wrap justify-between items-start border-b border-neutral-100 pb-4 mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="font-bold ml-2">شماره سفارش:</span>
                    <span>{order.id}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-neutral-500 ml-2">تاریخ سفارش:</span>
                    <span className="text-sm">{order.date.toLocaleDateString('fa-IR')}</span>
                  </div>
                </div>
                
                <div className="mt-2 sm:mt-0">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusText(order.status).color}`}>
                    {getStatusText(order.status).text}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm text-neutral-500 block mb-1">تعداد اقلام:</span>
                  <span className="font-medium">{order.totalItems} عدد</span>
                </div>
                
                <div>
                  <span className="text-sm text-neutral-500 block mb-1">مبلغ کل:</span>
                  <span className="font-medium">{order.totalPrice.toLocaleString()} تومان</span>
                </div>
                
                <div>
                  <span className="text-sm text-neutral-500 block mb-1">وضعیت پرداخت:</span>
                  <span className={`font-medium ${getPaymentStatusText(order.paymentStatus).color}`}>
                    {getPaymentStatusText(order.paymentStatus).text}
                  </span>
                </div>
                
                <div>
                  <span className="text-sm text-neutral-500 block mb-1">روش پرداخت:</span>
                  <span className="font-medium">
                    {order.paymentMethod === 'online' && 'پرداخت آنلاین'}
                    {order.paymentMethod === 'card' && 'کارت به کارت'}
                    {order.paymentMethod === 'credit' && 'خرید اعتباری'}
                    {order.paymentMethod === 'cod' && 'پرداخت در محل'}
                  </span>
                </div>
              </div>
              
              {order.trackingCode && (
                <div className="mb-4 p-3 bg-neutral-50 rounded-lg text-sm">
                  <span className="font-medium ml-2">کد پیگیری مرسوله:</span>
                  <span className="select-all">{order.trackingCode}</span>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                <Link 
                  to={`/dashboard/orders/${order.id}`} 
                  className="btn-primary inline-flex items-center text-sm"
                >
                  <EyeIcon className="w-4 h-4 ml-1" />
                  مشاهده جزئیات
                </Link>
                
                <a 
                  href={`/invoice/${order.id}`} 
                  target="_blank" 
                  className="btn-outline inline-flex items-center text-sm"
                >
                  <DocumentTextIcon className="w-4 h-4 ml-1" />
                  مشاهده فاکتور
                </a>
                
                {(order.status === 'pending' || order.status === 'processing') && (
                  <button className="btn-outline text-red-500 border-red-500 hover:bg-red-50 text-sm">
                    لغو سفارش
                  </button>
                )}
                
                {order.status === 'delivered' && (
                  <button className="btn-outline text-green-500 border-green-500 hover:bg-green-50 text-sm">
                    ثبت نظر
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;