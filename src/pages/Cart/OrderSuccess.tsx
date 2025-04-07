import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircleIcon, ArrowDownTrayIcon, PrinterIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

// دیتای نمونه برای تست
const demoOrderDetail = {
  id: '',
  date: new Date(),
  status: 'pending',
  paymentStatus: 'paid',
  paymentMethod: 'online',
  trackingCode: 'TRK123456789',
  items: [
    {
      id: '1',
      name: 'پیراهن مردانه آستین بلند کلاسیک',
      quantity: 3,
      price: 380000,
      color: 'آبی روشن',
      size: 'XL',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: '2',
      name: 'تی‌شرت یقه گرد مردانه',
      quantity: 5,
      price: 180000,
      color: 'مشکی',
      size: 'L',
      image: 'https://via.placeholder.com/80',
    },
  ],
  shippingAddress: {
    fullName: 'کاربر تست',
    phone: '09123456789',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان ولیعصر، بالاتر از میدان ونک، پلاک 123',
    postalCode: '1234567890',
  },
  shippingMethod: 'پست پیشتاز',
  shippingCost: 100000,
  subtotal: 1790000,
  discount: 0,
  tax: 161100,
  totalPrice: 2051100,
};

const OrderSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [orderDetail, setOrderDetail] = useState(demoOrderDetail);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // در حالت واقعی، اینجا اطلاعات سفارش از API دریافت می‌شود
    // شبیه‌سازی دریافت اطلاعات
    setLoading(true);
    
    setTimeout(() => {
      setOrderDetail({
        ...demoOrderDetail,
        id: id || 'unknown',
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  // نمایش وضعیت پرداخت
  const renderPaymentStatus = () => {
    switch (orderDetail.paymentStatus) {
      case 'paid':
        return (
          <div className="flex items-center text-green-700 bg-green-50 p-3 rounded-lg">
            <CheckCircleIcon className="w-5 h-5 ml-2" />
            <span>پرداخت با موفقیت انجام شد</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-amber-700 bg-amber-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse ml-2"></span>
            <span>در انتظار پرداخت</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center text-red-700 bg-red-50 p-3 rounded-lg">
            <span className="w-2 h-2 bg-red-500 rounded-full ml-2"></span>
            <span>پرداخت ناموفق بود</span>
          </div>
        );
      default:
        return null;
    }
  };

  // نمایش روش پرداخت
  const getPaymentMethodText = () => {
    switch (orderDetail.paymentMethod) {
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-card p-8 text-center">
          <div className="spinner mx-auto"></div>
          <p className="mt-4 text-neutral-600">در حال بارگذاری اطلاعات سفارش...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <div className="text-center py-6 border-b border-neutral-100">
          <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">سفارش شما با موفقیت ثبت شد</h1>
          <p className="text-neutral-600">
            با تشکر از خرید شما، سفارش شما با موفقیت ثبت شد و در حال پردازش است.
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <span className="text-neutral-500 text-sm">شماره سفارش:</span>
              <span className="font-bold mr-2 text-lg">{orderDetail.id}</span>
            </div>
            <div>
              <span className="text-neutral-500 text-sm">تاریخ سفارش:</span>
              <span className="font-medium mr-2">
                {orderDetail.date.toLocaleDateString('fa-IR')}
              </span>
            </div>
          </div>

          {/* وضعیت پرداخت */}
          <div className="mb-6">
            {renderPaymentStatus()}
          </div>

          {/* جزئیات سفارش */}
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="bg-neutral-50 p-4 border-b">
              <h2 className="font-bold">جزئیات سفارش</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4 mb-6">
                {orderDetail.items.map((item) => (
                  <div key={item.id} className="flex items-start border-b border-neutral-100 pb-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mr-3 flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-sm text-neutral-500 mt-1">
                        {item.color && <span className="ml-2">رنگ: {item.color}</span>}
                        {item.size && <span className="ml-2">سایز: {item.size}</span>}
                        <span>تعداد: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{(item.price * item.quantity).toLocaleString()} تومان</div>
                      <div className="text-sm text-neutral-500">
                        {item.price.toLocaleString()} × {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">جمع کل:</span>
                  <span>{orderDetail.subtotal.toLocaleString()} تومان</span>
                </div>
                
                {orderDetail.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>تخفیف:</span>
                    <span>{orderDetail.discount.toLocaleString()} تومان-</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">مالیات (۹٪):</span>
                  <span>{orderDetail.tax.toLocaleString()} تومان</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">هزینه ارسال:</span>
                  <span>{orderDetail.shippingCost.toLocaleString()} تومان</span>
                </div>
                
                <div className="flex justify-between font-bold border-t border-neutral-200 pt-2 mt-2">
                  <span>مبلغ کل:</span>
                  <span>{orderDetail.totalPrice.toLocaleString()} تومان</span>
                </div>
              </div>
            </div>
          </div>

          {/* اطلاعات ارسال و پرداخت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* اطلاعات ارسال */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-neutral-50 p-4 border-b">
                <h2 className="font-bold">اطلاعات ارسال</h2>
              </div>
              <div className="p-4">
                <p className="font-medium">{orderDetail.shippingAddress.fullName}</p>
                <p className="text-neutral-600 text-sm mt-2">
                  {orderDetail.shippingAddress.province}، {orderDetail.shippingAddress.city}، {orderDetail.shippingAddress.address}
                </p>
                <p className="text-neutral-500 text-sm mt-1">
                  <span className="block">کد پستی: {orderDetail.shippingAddress.postalCode}</span>
                  <span className="block">شماره تماس: {orderDetail.shippingAddress.phone}</span>
                </p>
                
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-600">روش ارسال:</span>
                    <span>{orderDetail.shippingMethod}</span>
                  </div>
                  
                  {orderDetail.trackingCode && (
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-neutral-600">کد پیگیری:</span>
                      <span className="font-medium">{orderDetail.trackingCode}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* اطلاعات پرداخت */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-neutral-50 p-4 border-b">
                <h2 className="font-bold">اطلاعات پرداخت</h2>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600">روش پرداخت:</span>
                  <span>{getPaymentMethodText()}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-neutral-600">وضعیت پرداخت:</span>
                  <span className={`${
                    orderDetail.paymentStatus === 'paid' 
                      ? 'text-green-600' 
                      : orderDetail.paymentStatus === 'pending' 
                        ? 'text-amber-600' 
                        : 'text-red-600'
                  }`}>
                    {orderDetail.paymentStatus === 'paid' 
                      ? 'پرداخت شده' 
                      : orderDetail.paymentStatus === 'pending' 
                        ? 'در انتظار پرداخت' 
                        : 'پرداخت ناموفق'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-neutral-600">مبلغ کل:</span>
                  <span className="font-medium">{orderDetail.totalPrice.toLocaleString()} تومان</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <p className="text-sm text-neutral-600">
                    رسید پرداخت به ایمیل شما ارسال شده است و می‌توانید آن را از پنل کاربری نیز مشاهده کنید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه‌های عملیات */}
        <div className="p-6 border-t border-neutral-100 flex flex-wrap gap-3 justify-center">
          <Button
            variant="outline"
            as="a"
            href={`/invoice/${orderDetail.id}`}
            target="_blank"
            className="flex items-center"
          >
            <ArrowDownTrayIcon className="w-5 h-5 ml-2" />
            دانلود فاکتور
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => window.print()}
          >
            <PrinterIcon className="w-5 h-5 ml-2" />
            چاپ رسید
          </Button>
          
          <Button
            variant="primary"
            as={Link}
            to="/dashboard/orders"
            className="flex items-center"
          >
            <ShoppingBagIcon className="w-5 h-5 ml-2" />
            پیگیری سفارش
          </Button>
        </div>
      </Card>

      {/* پیشنهاد محصولات مشابه */}
      <div className="bg-white rounded-lg shadow-card p-6 text-center">
        <h2 className="font-bold text-lg mb-4">به خرید خود ادامه دهید</h2>
        <p className="text-neutral-600 mb-6">
          محصولات مشابه و پیشنهادی دیگر را مشاهده کنید
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Link key={i} to="/products" className="block">
              <div className="border border-neutral-200 rounded-lg overflow-hidden hover:border-primary-300 transition-colors">
                <div className="h-32 bg-neutral-100 flex items-center justify-center">
                  <img 
                    src={`https://via.placeholder.com/120`} 
                    alt={`محصول پیشنهادی ${i}`} 
                    className="max-h-full"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium truncate">محصول پیشنهادی {i}</h3>
                  <p className="text-primary-600 text-sm mt-1">مشاهده محصولات مشابه</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;