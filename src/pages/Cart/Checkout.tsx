import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  ChevronRightIcon, 
  CreditCardIcon, 
  BanknotesIcon, 
  TruckIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

// تایپ اطلاعات ارسال
interface ShippingInfo {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  description?: string;
}

// تایپ روش پرداخت
type PaymentMethod = 'online' | 'card' | 'credit' | 'cod';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cartItems, getTotalPrice, getItemSubtotal, getDiscountPrice, clearCart } = useCartStore();
  
  // حالت‌ها
  const [selectedAddress, setSelectedAddress] = useState<'new' | 'existing'>('existing');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [loading, setLoading] = useState(false);
  
  // دیتای نمونه برای آدرس‌های ثبت شده
  const savedAddresses = [
    {
      id: '1',
      fullName: user?.name || 'کاربر',
      phone: '09123456789',
      province: 'تهران',
      city: 'تهران',
      address: 'خیابان ولیعصر، بالاتر از میدان ونک، پلاک 123',
      postalCode: '1234567890',
      isDefault: true,
    },
    {
      id: '2',
      fullName: user?.name || 'کاربر',
      phone: '09123456789',
      province: 'تهران',
      city: 'تهران',
      address: 'خیابان شریعتی، نرسیده به میدان قدس، پلاک 456',
      postalCode: '9876543210',
      isDefault: false,
    },
  ];
  
  // محاسبات مالی
  const subtotal = getTotalPrice();
  const bulkDiscount = cartItems.reduce(
    (total, item) => total + getDiscountPrice(item),
    0
  );
  
  // محاسبه مالیات (۹ درصد ارزش افزوده)
  const taxRate = 0.09;
  const taxAmount = (subtotal - bulkDiscount) * taxRate;
  
  // محاسبه هزینه ارسال
  const calculateShipping = () => {
    if (subtotal >= 5000000) return 0; // ارسال رایگان برای سفارش‌های بالای ۵ میلیون تومان
    
    // محاسبه هزینه ارسال بر اساس تعداد محصولات
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    if (totalItems <= 10) return 50000; // کمتر از ۱۰ عدد
    if (totalItems <= 50) return 100000; // کمتر از ۵۰ عدد
    if (totalItems <= 100) return 150000; // کمتر از ۱۰۰ عدد
    
    return 200000; // بیشتر از ۱۰۰ عدد
  };
  
  const shippingCost = calculateShipping();
  
  // محاسبه قیمت نهایی
  const totalPrice = subtotal - bulkDiscount + taxAmount + shippingCost;
  
  // فرم ثبت آدرس جدید
  const addressFormik = useFormik<ShippingInfo>({
    initialValues: {
      fullName: user?.name || '',
      phone: user?.phone || '',
      province: '',
      city: '',
      address: '',
      postalCode: '',
      description: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('نام و نام خانوادگی الزامی است'),
      phone: Yup.string()
        .matches(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
        .required('شماره موبایل الزامی است'),
      province: Yup.string().required('استان الزامی است'),
      city: Yup.string().required('شهر الزامی است'),
      address: Yup.string().required('آدرس الزامی است'),
      postalCode: Yup.string()
        .matches(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد')
        .required('کد پستی الزامی است'),
    }),
    onSubmit: (values) => {
      // در حالت واقعی اینجا آدرس جدید ذخیره می‌شود
      console.log('آدرس جدید:', values);
      handleSubmitOrder();
    },
  });
  
  // ثبت نهایی سفارش
  const handleSubmitOrder = () => {
    // اعتبارسنجی مقادیر موردنیاز
    if (selectedAddress === 'new' && !addressFormik.isValid) {
      toast.error('لطفاً تمام فیلدهای آدرس را تکمیل کنید');
      return;
    }
    
    setLoading(true);
    
    // شبیه‌سازی ارسال به سرور
    setTimeout(() => {
      // ساخت اطلاعات سفارش
      const orderData = {
        items: cartItems,
        shippingAddress: selectedAddress === 'new' 
          ? addressFormik.values 
          : savedAddresses.find(a => a.isDefault),
        paymentMethod,
        subtotal,
        bulkDiscount,
        tax: taxAmount,
        shippingCost,
        totalPrice,
        orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      };
      
      console.log('اطلاعات سفارش:', orderData);
      
      if (paymentMethod === 'online') {
        // در اینجا کاربر به درگاه پرداخت هدایت می‌شود
        toast.success('در حال انتقال به درگاه پرداخت...');
        
        // شبیه‌سازی پرداخت موفق
        setTimeout(() => {
          clearCart();
          navigate(`/order-success/${orderData.orderId}`);
        }, 2000);
      } else {
        // برای سایر روش‌های پرداخت
        clearCart();
        navigate(`/order-success/${orderData.orderId}`);
      }
      
      setLoading(false);
    }, 1500);
  };
  
  // اگر سبد خرید خالی باشد
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-card p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h1>
          <p className="text-neutral-600 mb-6">
            برای تکمیل فرایند خرید، ابتدا باید محصولاتی به سبد خرید خود اضافه کنید.
          </p>
          <Link to="/products" className="btn-primary inline-block px-6 py-3">
            مشاهده محصولات
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">تکمیل فرایند خرید</h1>
      
      {/* نان کرامب */}
      <div className="flex items-center text-sm text-neutral-500 mb-6">
        <Link to="/" className="hover:text-primary-600">خانه</Link>
        <ChevronRightIcon className="w-4 h-4 mx-1" />
        <Link to="/cart" className="hover:text-primary-600">سبد خرید</Link>
        <ChevronRightIcon className="w-4 h-4 mx-1" />
        <span className="text-neutral-800 font-medium">تکمیل خرید</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون راست - فرم پرداخت و ارسال */}
        <div className="lg:col-span-2">
          {/* اطلاعات ارسال */}
          <Card className="mb-6">
            <h2 className="font-bold text-lg mb-6 pb-4 border-b border-neutral-100">اطلاعات ارسال</h2>
            
            {/* انتخاب آدرس */}
            {savedAddresses.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="existing-address"
                    name="address-type"
                    checked={selectedAddress === 'existing'}
                    onChange={() => setSelectedAddress('existing')}
                    className="ml-2"
                  />
                  <label htmlFor="existing-address" className="font-medium">
                    انتخاب از آدرس‌های ثبت شده
                  </label>
                </div>
                
                {selectedAddress === 'existing' && (
                  <div className="space-y-4 mr-7">
                    {savedAddresses.map((address) => (
                      <div 
                        key={address.id} 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          address.isDefault 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-neutral-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            id={`address-${address.id}`}
                            name="selected-address"
                            checked={address.isDefault}
                            onChange={() => {
                              // در حالت واقعی، آدرس پیش‌فرض را تغییر می‌دهد
                            }}
                            className="mt-1 ml-3"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <span className="font-medium">{address.fullName}</span>
                              {address.isDefault && (
                                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                                  پیش‌فرض
                                </span>
                              )}
                            </div>
                            <p className="text-neutral-600 text-sm mt-2">
                              {address.province}، {address.city}، {address.address}
                            </p>
                            <p className="text-neutral-500 text-sm mt-1">
                              <span className="ml-2">کد پستی: {address.postalCode}</span>
                              <span>شماره تماس: {address.phone}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        as={Link}
                        to="/dashboard/addresses"
                      >
                        مدیریت آدرس‌ها
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* ثبت آدرس جدید */}
            <div>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="new-address"
                  name="address-type"
                  checked={selectedAddress === 'new'}
                  onChange={() => setSelectedAddress('new')}
                  className="ml-2"
                />
                <label htmlFor="new-address" className="font-medium">
                  ثبت آدرس جدید
                </label>
              </div>
              
              {selectedAddress === 'new' && (
                <form className="mr-7 space-y-4" onSubmit={addressFormik.handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="نام و نام خانوادگی گیرنده"
                      id="fullName"
                      name="fullName"
                      value={addressFormik.values.fullName}
                      onChange={addressFormik.handleChange}
                      onBlur={addressFormik.handleBlur}
                      error={
                        addressFormik.touched.fullName && addressFormik.errors.fullName
                          ? addressFormik.errors.fullName
                          : undefined
                      }
                    />
                    
                    <Input
                      label="شماره موبایل"
                      id="phone"
                      name="phone"
                      value={addressFormik.values.phone}
                      onChange={addressFormik.handleChange}
                      onBlur={addressFormik.handleBlur}
                      error={
                        addressFormik.touched.phone && addressFormik.errors.phone
                          ? addressFormik.errors.phone
                          : undefined
                      }
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="استان"
                      id="province"
                      name="province"
                      value={addressFormik.values.province}
                      onChange={addressFormik.handleChange}
                      onBlur={addressFormik.handleBlur}
                      error={
                        addressFormik.touched.province && addressFormik.errors.province
                          ? addressFormik.errors.province
                          : undefined
                      }
                    />
                    
                    <Input
                      label="شهر"
                      id="city"
                      name="city"
                      value={addressFormik.values.city}
                      onChange={addressFormik.handleChange}
                      onBlur={addressFormik.handleBlur}
                      error={
                        addressFormik.touched.city && addressFormik.errors.city
                          ? addressFormik.errors.city
                          : undefined
                      }
                    />
                  </div>
                  
                  <Input
                    label="آدرس پستی"
                    id="address"
                    name="address"
                    value={addressFormik.values.address}
                    onChange={addressFormik.handleChange}
                    onBlur={addressFormik.handleBlur}
                    error={
                      addressFormik.touched.address && addressFormik.errors.address
                        ? addressFormik.errors.address
                        : undefined
                    }
                  />
                  
                  <Input
                    label="کد پستی"
                    id="postalCode"
                    name="postalCode"
                    value={addressFormik.values.postalCode}
                    onChange={addressFormik.handleChange}
                    onBlur={addressFormik.handleBlur}
                    error={
                      addressFormik.touched.postalCode && addressFormik.errors.postalCode
                        ? addressFormik.errors.postalCode
                        : undefined
                    }
                  />
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                      توضیحات (اختیاری)
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="input resize-none w-full"
                      placeholder="توضیحات اضافی برای تحویل"
                      value={addressFormik.values.description}
                      onChange={addressFormik.handleChange}
                    />
                  </div>
                </form>
              )}
            </div>
          </Card>
          
          {/* روش پرداخت */}
          <Card>
            <h2 className="font-bold text-lg mb-6 pb-4 border-b border-neutral-100">انتخاب روش پرداخت</h2>
            
            <div className="space-y-4">
              {/* پرداخت آنلاین */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === 'online' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
                onClick={() => setPaymentMethod('online')}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="payment-online"
                    name="payment-method"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    className="mt-1 ml-3"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <CreditCardIcon className="w-5 h-5 ml-2 text-primary-600" />
                      <span className="font-medium">پرداخت آنلاین</span>
                    </div>
                    <p className="text-neutral-600 text-sm mt-2">
                      پرداخت آنلاین از طریق درگاه بانکی با تمامی کارت‌های بانکی عضو شتاب
                    </p>
                  </div>
                </div>
              </div>
              
              {/* پرداخت کارت به کارت */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === 'card' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="payment-card"
                    name="payment-method"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 ml-3"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <BanknotesIcon className="w-5 h-5 ml-2 text-green-600" />
                      <span className="font-medium">پرداخت کارت به کارت</span>
                    </div>
                    <p className="text-neutral-600 text-sm mt-2">
                      واریز وجه به شماره کارت و ارسال تصویر فیش واریزی
                    </p>
                  </div>
                </div>
              </div>
              
              {/* خرید اعتباری */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === 'credit' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
                onClick={() => setPaymentMethod('credit')}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="payment-credit"
                    name="payment-method"
                    checked={paymentMethod === 'credit'}
                    onChange={() => setPaymentMethod('credit')}
                    className="mt-1 ml-3"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <ShieldCheckIcon className="w-5 h-5 ml-2 text-blue-600" />
                      <span className="font-medium">خرید اعتباری</span>
                      <span className="mr-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        ویژه مشتریان دائمی
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm mt-2">
                      پرداخت به صورت اعتباری با فاصله زمانی ۳۰ روزه (نیاز به تایید مدیریت)
                    </p>
                  </div>
                </div>
              </div>
              
              {/* پرداخت در محل */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === 'cod' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-neutral-200 hover:border-primary-300'
                }`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="payment-cod"
                    name="payment-method"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 ml-3"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <TruckIcon className="w-5 h-5 ml-2 text-amber-600" />
                      <span className="font-medium">پرداخت در محل</span>
                    </div>
                    <p className="text-neutral-600 text-sm mt-2">
                      پرداخت هنگام تحویل کالا (فقط برای تهران و کرج)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <div className="flex items-center text-sm">
                <CheckCircleIcon className="w-5 h-5 ml-2 text-green-600" />
                <span className="text-green-700">تمامی تراکنش‌ها از طریق درگاه‌های معتبر و با رمزنگاری انجام می‌شوند.</span>
              </div>
            </div>
            
            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onClick={selectedAddress === 'new' ? addressFormik.submitForm : handleSubmitOrder}
              >
                {paymentMethod === 'online' ? 'پرداخت آنلاین' : 'ثبت سفارش'}
              </Button>
            </div>
          </Card>
        </div>
        
        {/* ستون چپ - خلاصه سفارش */}
        <div>
          <Card className="sticky top-20">
            <h2 className="font-bold text-lg mb-4 pb-3 border-b border-neutral-100">خلاصه سفارش</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-start">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mr-3 flex-grow">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <div className="text-xs text-neutral-500 mt-1">
                      {item.color && <span className="ml-2">رنگ: {item.color}</span>}
                      {item.size && <span>سایز: {item.size}</span>}
                      <span className="block">تعداد: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {getItemSubtotal(item).toLocaleString()} تومان
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-neutral-100 pt-4 mb-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">قیمت کالاها:</span>
                  <span>{subtotal.toLocaleString()} تومان</span>
                </div>
                
                {bulkDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>تخفیف عمده‌فروشی:</span>
                    <span>{bulkDiscount.toLocaleString()} تومان-</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">مالیات (۹٪):</span>
                  <span>{taxAmount.toLocaleString()} تومان</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">هزینه ارسال:</span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">رایگان</span>
                  ) : (
                    <span>{shippingCost.toLocaleString()} تومان</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="border-t border-neutral-100 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>مبلغ قابل پرداخت:</span>
                <span>{totalPrice.toLocaleString()} تومان</span>
              </div>
            </div>
            
            {bulkDiscount > 0 && (
              <div className="mt-4 bg-green-50 text-green-700 p-3 rounded-lg text-sm flex items-start">
                <InformationCircleIcon className="w-5 h-5 ml-2 mt-0.5" />
                <div>
                  <p>شما از تخفیف ویژه عمده‌فروشی بهره‌مند شده‌اید!</p>
                  <p className="font-bold mt-1">
                    میزان تخفیف: {bulkDiscount.toLocaleString()} تومان
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;