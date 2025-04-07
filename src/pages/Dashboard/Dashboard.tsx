import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  HeartIcon, 
  MapPinIcon, 
  ArrowRightIcon,
  BellIcon,
  ArchiveBoxIcon,
  BanknotesIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// تایپ سفارش‌های دمو
interface DemoOrder {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  totalPrice: number;
  items: number;
}

const UserDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [loading, setLoading] = useState(true);

  // بارگذاری اطلاعات دمو برای سفارش‌ها
  useEffect(() => {
    // شبیه‌سازی API
    setTimeout(() => {
      const demoOrders: DemoOrder[] = [
        {
          id: '1000458',
          date: new Date(2023, 5, 15),
          status: 'delivered',
          totalPrice: 2450000,
          items: 5,
        },
        {
          id: '1000459',
          date: new Date(2023, 6, 22),
          status: 'shipped',
          totalPrice: 1800000,
          items: 3,
        },
        {
          id: '1000460',
          date: new Date(2023, 7, 5),
          status: 'processing',
          totalPrice: 3200000,
          items: 8,
        },
      ];

      setOrders(demoOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // وضعیت سفارش به فارسی
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
      default:
        return { text: 'نامشخص', color: 'bg-neutral-100 text-neutral-800' };
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">داشبورد</h1>
        <div className="text-sm text-neutral-500">
          آخرین بروزرسانی: {new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* کارت‌های اطلاعات کاربر */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* اطلاعات کاربر */}
        <Card className="flex">
          <div className="bg-primary-100 text-primary-700 p-4 rounded-lg ml-4">
            <UserIcon className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-bold">{user?.name || 'کاربر عزیز'}</h3>
            <p className="text-sm text-neutral-500">{user?.email || ''}</p>
            <Link to="/dashboard/profile" className="text-xs text-primary-600 hover:text-primary-800 mt-2 inline-block">
              مشاهده و ویرایش پروفایل
            </Link>
          </div>
        </Card>

        {/* سفارش‌های اخیر */}
        <Card className="flex">
          <div className="bg-green-100 text-green-700 p-4 rounded-lg ml-4">
            <ShoppingBagIcon className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-bold">سفارش‌های اخیر</h3>
            <p className="text-sm text-neutral-500">{orders.length} سفارش در ۳ ماه اخیر</p>
            <Link to="/dashboard/orders" className="text-xs text-primary-600 hover:text-primary-800 mt-2 inline-block">
              مشاهده سفارش‌ها
            </Link>
          </div>
        </Card>

        {/* علاقمندی‌ها */}
        <Card className="flex">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg ml-4">
            <HeartIcon className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-bold">علاقمندی‌ها</h3>
            <p className="text-sm text-neutral-500">۷ محصول در لیست علاقمندی‌ها</p>
            <Link to="/dashboard/favorites" className="text-xs text-primary-600 hover:text-primary-800 mt-2 inline-block">
              مشاهده علاقمندی‌ها
            </Link>
          </div>
        </Card>

        {/* آدرس‌ها */}
        <Card className="flex">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg ml-4">
            <MapPinIcon className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-bold">آدرس‌ها</h3>
            <p className="text-sm text-neutral-500">۲ آدرس ثبت شده</p>
            <Link to="/dashboard/addresses" className="text-xs text-primary-600 hover:text-primary-800 mt-2 inline-block">
              مدیریت آدرس‌ها
            </Link>
          </div>
        </Card>
      </div>

      {/* سفارش‌های اخیر */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">سفارش‌های اخیر</h2>
              <Link to="/dashboard/orders" className="text-primary-600 hover:text-primary-800 text-sm">
                مشاهده همه
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="flex items-center">
                  <div className="spinner ml-2"></div>
                  <span>در حال بارگذاری...</span>
                </div>
              </div>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">
                        شماره سفارش
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">
                        تاریخ
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">
                        وضعیت
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">
                        مبلغ
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">
                        جزئیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">
                          {order.date.toLocaleDateString('fa-IR')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusText(order.status).color}`}>
                            {getStatusText(order.status).text}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {order.totalPrice.toLocaleString()} تومان
                        </td>
                        <td className="py-3 px-4">
                          <Link 
                            to={`/dashboard/orders/${order.id}`} 
                            className="text-primary-600 hover:text-primary-800"
                          >
                            مشاهده
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingBagIcon className="w-12 h-12 mx-auto text-neutral-400 mb-2" />
                <h3 className="font-bold mb-1">سفارشی ثبت نشده است</h3>
                <p className="text-neutral-500 text-sm mb-4">
                  شما هنوز هیچ سفارشی ثبت نکرده‌اید
                </p>
                <Link to="/products" className="btn-primary inline-block px-4 py-2">
                  مشاهده محصولات
                </Link>
              </div>
            )}
          </Card>
        </div>

        {/* بخش اطلاعات کاربری و اعلان‌ها */}
        <div className="lg:col-span-1">
          {/* اطلاعات حساب کاربری */}
          <Card className="mb-6">
            <h2 className="font-bold text-lg mb-4">اطلاعات حساب کاربری</h2>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm text-neutral-500 block mb-1">نام و نام خانوادگی:</span>
                <span className="font-medium">{user?.name || 'نامشخص'}</span>
              </div>
              
              <div>
                <span className="text-sm text-neutral-500 block mb-1">ایمیل:</span>
                <span className="font-medium">{user?.email || 'نامشخص'}</span>
              </div>
              
              <div>
                <span className="text-sm text-neutral-500 block mb-1">شماره موبایل:</span>
                <span className="font-medium">{user?.phone || 'نامشخص'}</span>
              </div>
              
              <div>
                <span className="text-sm text-neutral-500 block mb-1">تاریخ عضویت:</span>
                <span className="font-medium">
                  {user?.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString('fa-IR') 
                    : 'نامشخص'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center mt-4 pt-4 border-t border-neutral-100">
              <Button
                variant="outline"
                as={Link}
                to="/dashboard/profile"
                className="w-full"
              >
                ویرایش اطلاعات کاربری
              </Button>
            </div>
          </Card>

          {/* اعلان‌ها */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">اعلان‌ها</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {}}
                className="text-primary-600"
              >
                <ArrowPathIcon className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex p-3 bg-yellow-50 rounded-lg">
                <div className="bg-yellow-100 p-2 rounded-md ml-3">
                  <BellIcon className="w-5 h-5 text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-bold text-yellow-800">تخفیف ویژه عمده‌فروشان</h3>
                  <p className="text-sm text-yellow-700">
                    ۲۰٪ تخفیف برای سفارش‌های بالای ۲۰۰ عدد
                  </p>
                  <span className="text-xs text-yellow-600 mt-1 inline-block">۲ روز پیش</span>
                </div>
              </div>
              
              <div className="flex p-3 bg-green-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-md ml-3">
                  <ArchiveBoxIcon className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-bold text-green-800">سفارش شما ارسال شد</h3>
                  <p className="text-sm text-green-700">
                    سفارش #1000459 با موفقیت ارسال شد
                  </p>
                  <span className="text-xs text-green-600 mt-1 inline-block">۴ روز پیش</span>
                </div>
              </div>
              
              <div className="flex p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-md ml-3">
                  <BanknotesIcon className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-800">کد تخفیف جدید</h3>
                  <p className="text-sm text-blue-700">
                    استفاده از کد SUMMER10 برای ۱۰٪ تخفیف
                  </p>
                  <span className="text-xs text-blue-600 mt-1 inline-block">۱ هفته پیش</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
              <Link to="/dashboard/notifications" className="text-primary-600 hover:text-primary-800 text-sm inline-flex items-center">
                مشاهده همه اعلان‌ها
                <ArrowRightIcon className="w-4 h-4 mr-1" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;