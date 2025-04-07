import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartPieIcon,
  CubeIcon,
  ShoppingCartIcon,
  UsersIcon,
  BanknotesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Card from '../../components/common/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// تایپ کارت آمار
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  link: string;
}

// کامپوننت کارت آمار
const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  iconBg, 
  iconColor,
  link
}) => {
  return (
    <Card className="flex">
      <div className={`${iconBg} ${iconColor} p-4 rounded-lg ml-4`}>
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-neutral-500 text-sm">{title}</h3>
        <div className="font-bold text-xl mt-1">{value}</div>
        {change !== undefined && (
          <div className="flex items-center mt-2 text-xs">
            {change >= 0 ? (
              <>
                <ArrowUpIcon className="w-3 h-3 text-green-500 ml-1" />
                <span className="text-green-600">{change}% افزایش</span>
              </>
            ) : (
              <>
                <ArrowDownIcon className="w-3 h-3 text-red-500 ml-1" />
                <span className="text-red-600">{Math.abs(change)}% کاهش</span>
              </>
            )}
            <span className="text-neutral-500 mr-1">نسبت به ماه قبل</span>
          </div>
        )}
        <Link to={link} className="text-primary-600 text-xs hover:text-primary-700 inline-block mt-2">
          مشاهده جزئیات
        </Link>
      </div>
    </Card>
  );
};

// تایپ سفارش اخیر
interface RecentOrder {
  id: string;
  customer: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  totalPrice: number;
  items: number;
}

// داده مصنوعی برای نمودار فروش
const salesData = [
  { name: 'فروردین', sales: 4000000 },
  { name: 'اردیبهشت', sales: 5200000 },
  { name: 'خرداد', sales: 4800000 },
  { name: 'تیر', sales: 5500000 },
  { name: 'مرداد', sales: 4900000 },
  { name: 'شهریور', sales: 6200000 },
];

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);

  // بارگذاری اطلاعات دمو
  useEffect(() => {
    // شبیه‌سازی دریافت اطلاعات از سرور
    setTimeout(() => {
      const orders: RecentOrder[] = [
        {
          id: '1000458',
          customer: 'علی محمدی',
          date: new Date(2023, 7, 30),
          status: 'pending',
          totalPrice: 2450000,
          items: 5,
        },
        {
          id: '1000457',
          customer: 'رضا حسینی',
          date: new Date(2023, 7, 29),
          status: 'processing',
          totalPrice: 1800000,
          items: 3,
        },
        {
          id: '1000456',
          customer: 'مریم کریمی',
          date: new Date(2023, 7, 28),
          status: 'shipped',
          totalPrice: 3200000,
          items: 8,
        },
        {
          id: '1000455',
          customer: 'سارا رضایی',
          date: new Date(2023, 7, 27),
          status: 'delivered',
          totalPrice: 950000,
          items: 2,
        },
        {
          id: '1000454',
          customer: 'محمد حسینی',
          date: new Date(2023, 7, 26),
          status: 'delivered',
          totalPrice: 1600000,
          items: 4,
        },
      ];
      
      const products = [
        {
          id: '1',
          name: 'پیراهن مردانه آستین بلند کلاسیک',
          stock: 5,
          category: 'مردانه',
          price: 380000,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: '2',
          name: 'تی‌شرت یقه گرد مردانه',
          stock: 3,
          category: 'مردانه',
          price: 180000,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: '6',
          name: 'پیراهن آستین کوتاه مردانه',
          stock: 8,
          category: 'مردانه',
          price: 280000,
          image: 'https://via.placeholder.com/50',
        },
      ];
      
      setRecentOrders(orders);
      setLowStockProducts(products);
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
      default:
        return { text: 'نامشخص', color: 'bg-neutral-100 text-neutral-800' };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
        <span className="mr-3 text-neutral-600">در حال بارگذاری اطلاعات...</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">داشبورد مدیریت</h1>
      
      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="سفارش‌های امروز"
          value="26"
          change={12}
          icon={<ShoppingCartIcon className="w-10 h-10" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-700"
          link="/admin/orders"
        />
        
        <StatCard 
          title="کل فروش ماه"
          value="۳۵,۸۰۰,۰۰۰ تومان"
          change={8}
          icon={<BanknotesIcon className="w-10 h-10" />}
          iconBg="bg-green-100"
          iconColor="text-green-700"
          link="/admin/reports"
        />
        
        <StatCard 
          title="محصولات"
          value="۱,۲۵۶"
          change={-3}
          icon={<CubeIcon className="w-10 h-10" />}
          iconBg="bg-amber-100"
          iconColor="text-amber-700"
          link="/admin/products"
        />
        
        <StatCard 
          title="مشتریان"
          value="۸۵۴"
          change={15}
          icon={<UsersIcon className="w-10 h-10" />}
          iconBg="bg-purple-100"
          iconColor="text-purple-700"
          link="/admin/customers"
        />
      </div>
      
      {/* نمودار و سفارش‌های اخیر */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* نمودار فروش */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="font-bold text-lg mb-6">آمار فروش ۶ ماه گذشته</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${Number(value).toLocaleString()} تومان`} />
                  <Bar dataKey="sales" fill="#3B82F6" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        {/* سفارش‌های اخیر */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">سفارش‌های اخیر</h2>
              <Link to="/admin/orders" className="text-primary-600 text-sm hover:text-primary-700">
                مشاهده همه
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-start border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                  <div className="bg-primary-50 rounded-full p-2 ml-3 flex-shrink-0">
                    <ClockIcon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-xs text-neutral-500">
                          {order.date.toLocaleDateString('fa-IR')} - {order.items} کالا
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium">
                        {order.totalPrice.toLocaleString()} تومان
                      </div>
                    </div>
                    
                    <div className="mt-1 flex justify-between items-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusText(order.status).color}`}>
                        {getStatusText(order.status).text}
                      </span>
                      
                      <Link to={`/admin/orders/${order.id}`} className="text-xs text-primary-600 hover:text-primary-700">
                        مشاهده جزئیات
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* محصولات با موجودی کم و جدول آمار */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* محصولات با موجودی کم */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-2 rounded-lg ml-3">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="font-bold text-lg">محصولات با موجودی کم</h2>
            </div>
            
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                  <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md ml-3" />
                  <div className="flex-grow">
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-neutral-500">{product.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{product.price.toLocaleString()} تومان</div>
                    <div className={`text-xs ${product.stock < 5 ? 'text-red-600' : 'text-amber-600'}`}>
                      موجودی: {product.stock} عدد
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
              <Link to="/admin/inventory" className="text-primary-600 text-sm hover:text-primary-700">
                مدیریت موجودی
              </Link>
            </div>
          </Card>
        </div>
        
        {/* آمار کلی */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="font-bold text-lg mb-6">آمار کلی فروشگاه</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">شاخص</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">امروز</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">هفته جاری</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">ماه جاری</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-neutral-600">کل</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 px-4 font-medium">تعداد سفارش</td>
                    <td className="py-3 px-4">26</td>
                    <td className="py-3 px-4">152</td>
                    <td className="py-3 px-4">483</td>
                    <td className="py-3 px-4">12,845</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 px-4 font-medium">تعداد محصول فروخته شده</td>
                    <td className="py-3 px-4">148</td>
                    <td className="py-3 px-4">926</td>
                    <td className="py-3 px-4">2,874</td>
                    <td className="py-3 px-4">75,642</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 px-4 font-medium">درآمد فروش</td>
                    <td className="py-3 px-4">۵,۲۰۰,۰۰۰ تومان</td>
                    <td className="py-3 px-4">۱۹,۵۰۰,۰۰۰ تومان</td>
                    <td className="py-3 px-4">۳۵,۸۰۰,۰۰۰ تومان</td>
                    <td className="py-3 px-4">۸۲۵,۴۰۰,۰۰۰ تومان</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 px-4 font-medium">میانگین ارزش سفارش</td>
                    <td className="py-3 px-4">۲۰۰,۰۰۰ تومان</td>
                    <td className="py-3 px-4">۱۲۸,۰۰۰ تومان</td>
                    <td className="py-3 px-4">۱۵۳,۰۰۰ تومان</td>
                    <td className="py-3 px-4">۱۴۵,۰۰۰ تومان</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 px-4 font-medium">مشتریان جدید</td>
                    <td className="py-3 px-4">8</td>
                    <td className="py-3 px-4">32</td>
                    <td className="py-3 px-4">95</td>
                    <td className="py-3 px-4">854</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
              <Link to="/admin/reports" className="text-primary-600 text-sm hover:text-primary-700">
                مشاهده گزارش‌های تفصیلی
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;