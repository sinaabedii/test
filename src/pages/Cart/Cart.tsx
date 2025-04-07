import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  // محاسبات کلی سبد خرید
  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const calculateDiscount = () => {
    // محاسبه تخفیف بر اساس تعداد محصولات در سبد خرید
    const subtotal = calculateSubtotal();
    
    // تخفیف پلکانی بر اساس تعداد
    let discountRate = 0;
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalQuantity >= 50) {
      discountRate = 0.15; // 15% تخفیف برای سفارش بیش از 50 عدد
    } else if (totalQuantity >= 20) {
      discountRate = 0.10; // 10% تخفیف برای سفارش بیش از 20 عدد
    } else if (totalQuantity >= 10) {
      discountRate = 0.05; // 5% تخفیف برای سفارش بیش از 10 عدد
    }
    
    return subtotal * discountRate;
  };
  
  const calculateShipping = () => {
    // محاسبه هزینه ارسال بر اساس تعداد محصولات
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalQuantity > 30) {
      return 0; // ارسال رایگان برای سفارش‌های بزرگ
    }
    
    return 50000; // هزینه ارسال پایه
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateShipping();
  };

  // افزایش تعداد محصول
  const handleIncreaseQuantity = (itemId: string) => {
    const item = cart.find(item => item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };
  
  // کاهش تعداد محصول
  const handleDecreaseQuantity = (itemId: string) => {
    const item = cart.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeFromCart(itemId);
    }
  };
  
  // حذف محصول
  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
    toast.success('محصول از سبد خرید حذف شد');
  };
  
  // خالی کردن سبد خرید
  const handleClearCart = () => {
    if (window.confirm('آیا از خالی کردن سبد خرید اطمینان دارید؟')) {
      clearCart();
      toast.success('سبد خرید خالی شد');
    }
  };
  
  // پرداخت
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('برای ادامه فرایند خرید، لطفا وارد حساب کاربری خود شوید');
      navigate('/auth/login');
      return;
    }
    
    if (cart.length === 0) {
      toast.error('سبد خرید شما خالی است');
      return;
    }
    
    navigate('/checkout');
  };

  // تبدیل اعداد به فرمت پول ایران
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">سبد خرید</h1>
      
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">سبد خرید شما خالی است</h2>
          <p className="text-gray-600 mb-6">
            برای مشاهده محصولات و افزودن به سبد خرید، به فروشگاه مراجعه کنید.
          </p>
          <Link to="/products">
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* هدر جدول */}
              <div className="hidden md:grid md:grid-cols-12 p-4 bg-gray-50 text-sm font-medium text-gray-700 border-b">
                <div className="md:col-span-6 lg:col-span-7">محصول</div>
                <div className="md:col-span-2 text-center">قیمت واحد</div>
                <div className="md:col-span-2 text-center">تعداد</div>
                <div className="md:col-span-2 lg:col-span-1 text-center">قیمت کل</div>
              </div>
              
              {/* آیتم‌های سبد خرید */}
              <div className="divide-y">
                {cart.map(item => (
                  <div key={item.id} className="p-4 hover:bg-gray-50">
                    <div className="md:grid md:grid-cols-12 flex flex-wrap items-center">
                      {/* محصول */}
                      <div className="md:col-span-6 lg:col-span-7 flex items-center mb-4 md:mb-0">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mr-4 flex-1">
                          <h3 className="text-sm md:text-base font-medium">{item.title}</h3>
                          <div className="mt-1 text-xs text-gray-500">
                            {item.color && <span className="ml-2">رنگ: {item.color}</span>}
                            {item.size && <span>سایز: {item.size}</span>}
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="mt-2 text-xs text-red-500 flex items-center md:hidden"
                          >
                            <TrashIcon className="h-4 w-4 ml-1" />
                            حذف
                          </button>
                        </div>
                      </div>
                      
                      {/* قیمت واحد */}
                      <div className="md:col-span-2 text-sm md:text-center w-1/2 md:w-auto mb-2 md:mb-0">
                        <span className="md:hidden inline-block w-16 text-gray-500">قیمت واحد:</span>
                        {formatPrice(item.price)}
                      </div>
                      
                      {/* تعداد */}
                      <div className="md:col-span-2 md:text-center w-1/2 md:w-auto mb-2 md:mb-0">
                        <div className="flex items-center justify-end md:justify-center">
                          <button 
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="text-gray-500 focus:outline-none focus:text-gray-600"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="text-gray-700 mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="text-gray-500 focus:outline-none focus:text-gray-600"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* قیمت کل */}
                      <div className="md:col-span-2 lg:col-span-1 text-sm md:text-center w-1/2 md:w-auto mb-2 md:mb-0 font-semibold">
                        <span className="md:hidden inline-block w-16 text-gray-500 font-normal">قیمت کل:</span>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      
                      {/* دکمه حذف */}
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hidden md:block md:col-span-12 lg:col-span-1 hover:text-red-600 focus:outline-none justify-self-end"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* پاورقی سبد خرید */}
              <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                <button 
                  onClick={handleClearCart}
                  className="text-red-500 text-sm flex items-center hover:text-red-600 focus:outline-none"
                >
                  <TrashIcon className="h-4 w-4 ml-1" />
                  خالی کردن سبد خرید
                </button>
                <Link to="/products" className="text-blue-500 text-sm hover:text-blue-600">
                  ادامه خرید
                </Link>
              </div>
            </div>
          </div>
          
          {/* خلاصه سفارش */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">خلاصه سفارش</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">قیمت کل:</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تخفیف عمده:</span>
                  <span className="text-green-600">
                    {calculateDiscount() > 0 ? `${formatPrice(calculateDiscount())}` : 'بدون تخفیف'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">هزینه ارسال:</span>
                  <span>
                    {calculateShipping() > 0 ? formatPrice(calculateShipping()) : 'رایگان'}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between py-3 border-t border-b font-semibold">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-blue-600">{formatPrice(calculateTotal())}</span>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={handleCheckout}
                  className="bg-blue-500 text-white hover:bg-blue-600 w-full"
                  disabled={loading}
                >
                  {loading ? 'در حال پردازش...' : 'ادامه فرایند خرید'}
                </Button>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                <p className="mb-2">
                  <span className="font-semibold text-green-600 text-sm ml-1">توجه:</span>
                  تخفیف‌های ویژه خرید عمده به صورت خودکار اعمال می‌شود.
                </p>
                <ul className="list-disc mr-5 space-y-1">
                  <li>خرید بیش از 10 عدد: 5% تخفیف</li>
                  <li>خرید بیش از 20 عدد: 10% تخفیف</li>
                  <li>خرید بیش از 50 عدد: 15% تخفیف</li>
                  <li>خرید بیش از 30 عدد: ارسال رایگان</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;