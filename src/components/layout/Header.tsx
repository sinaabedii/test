import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  HeartIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
// import logo from '../../assets/images/logo.png';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { cartItems } = useCartStore();

  // تعداد آیتم‌های سبد خرید
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // منوی دسته‌بندی‌ها
  const categories = [
    {
      title: 'مردانه',
      items: ['پیراهن', 'شلوار', 'کت و سوییشرت', 'تی‌شرت', 'کفش', 'اکسسوری']
    },
    {
      title: 'زنانه',
      items: ['لباس مجلسی', 'مانتو', 'شلوار', 'بلوز و شومیز', 'کفش', 'اکسسوری']
    },
    {
      title: 'بچگانه',
      items: ['نوزاد', 'دخترانه', 'پسرانه', 'کفش', 'سرهمی']
    }
  ];

  // تغییر استایل هدر هنگام اسکرول
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // لینک‌های اصلی
  const mainLinks = [
    { to: '/', text: 'صفحه اصلی' },
    { to: '/products', text: 'محصولات' },
    { to: '/blog', text: 'بلاگ' },
    { to: '/about', text: 'درباره ما' },
    { to: '/contact', text: 'تماس با ما' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleCategoryMenu = () => {
    setCategoryMenuOpen(!categoryMenuOpen);
  };

  return (
    <header className={`bg-white sticky top-0 z-50 ${scrolled ? 'shadow-header' : ''}`}>
      <div className="container-custom">
        {/* نوار بالایی */}
        <div className="py-2 border-b border-neutral-100 hidden md:flex justify-between items-center text-sm text-neutral-500">
          <div className="flex items-center">
            <a href="tel:+982112345678" className="ml-4 hover:text-primary-500 transition-colors">
              تلفن فروش: ۰۲۱-۱۲۳۴۵۶۷۸
            </a>
            <span className="ml-4">ساعات پاسخگویی: شنبه تا پنج‌شنبه ۹ الی ۱۸</span>
          </div>
          <div className="flex items-center">
            <Link to="/faq" className="ml-4 hover:text-primary-500 transition-colors">
              سوالات متداول
            </Link>
            <Link to="/stores" className="ml-4 hover:text-primary-500 transition-colors">
              فروشگاه‌های ما
            </Link>
            <Link to="/track-order" className="hover:text-primary-500 transition-colors">
              پیگیری سفارش
            </Link>
          </div>
        </div>

        {/* هدر اصلی */}
        <div className="py-4 flex justify-between items-center">
          {/* دکمه منوی موبایل */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-neutral-600 hover:text-primary-500 transition-colors"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* لوگو */}
          <Link to="/" className="flex items-center">
            {/* <img src={logo} alt="فروشگاه عمده لباس" className="h-10" /> */}
            <span className="mr-2 text-lg font-bold text-primary-700">پوشاک عمده</span>
          </Link>

          {/* جستجو (دسکتاپ) */}
          <div className="hidden md:block flex-grow mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                className="input pr-10"
              />
              <MagnifyingGlassIcon className="w-5 h-5 absolute top-3 right-3 text-neutral-400" />
            </div>
          </div>

          {/* آیکون‌های هدر */}
          <div className="flex items-center">
            {/* جستجو (موبایل) */}
            <button 
              onClick={toggleSearch}
              className="p-2 md:hidden text-neutral-600 hover:text-primary-500 transition-colors relative"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            {/* علاقمندی‌ها */}
            {isAuthenticated && (
              <Link to="/dashboard/favorites" className="p-2 text-neutral-600 hover:text-primary-500 transition-colors relative">
                <HeartIcon className="w-6 h-6" />
              </Link>
            )}

            {/* سبد خرید */}
            <Link to="/cart" className="p-2 text-neutral-600 hover:text-primary-500 transition-colors relative">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* حساب کاربری */}
            {isAuthenticated ? (
              <Link 
                to={isAdmin ? "/admin" : "/dashboard"} 
                className="p-2 text-neutral-600 hover:text-primary-500 transition-colors"
              >
                <UserIcon className="w-6 h-6" />
              </Link>
            ) : (
              <Link to="/auth/login" className="p-2 text-neutral-600 hover:text-primary-500 transition-colors">
                <UserIcon className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>

        {/* فرم جستجو در موبایل */}
        {searchOpen && (
          <div className="md:hidden py-2 px-4 border-t border-neutral-100 animate-slide-down">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                className="input pr-10"
                autoFocus
              />
              <MagnifyingGlassIcon className="w-5 h-5 absolute top-3 right-3 text-neutral-400" />
            </div>
          </div>
        )}

        {/* منوی ناوبری دسکتاپ */}
        <nav className="hidden md:block border-t border-neutral-100">
          <div className="flex justify-between items-center">
            <div className="flex">
              {/* دکمه دسته بندی‌ها */}
              <div className="relative">
                <button 
                  onClick={toggleCategoryMenu}
                  className="flex items-center py-3 px-4 text-neutral-700 hover:text-primary-500 font-medium transition-colors"
                >
                  <span>دسته‌بندی محصولات</span>
                  <ChevronDownIcon className={`w-4 h-4 mr-1 transition-transform ${categoryMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* منوی کشویی دسته‌بندی‌ها */}
                {categoryMenuOpen && (
                  <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg p-4 min-w-max animate-fade-in z-20">
                    <div className="flex space-x-8 space-x-reverse">
                      {categories.map((category, index) => (
                        <div key={index} className="min-w-[150px]">
                          <h3 className="font-bold text-primary-700 mb-2 pb-2 border-b border-neutral-100">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <Link 
                                  to={`/category/${category.title.toLowerCase()}/${item.replace(/ /g, '-').toLowerCase()}`}
                                  className="text-neutral-600 hover:text-primary-500 transition-colors block py-1"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* لینک‌های اصلی */}
              {mainLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => 
                    `py-3 px-4 font-medium transition-colors ${
                      isActive 
                        ? 'text-primary-500 border-b-2 border-primary-500' 
                        : 'text-neutral-700 hover:text-primary-500'
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
            </div>

            {/* بخش ویژه عمده فروشان */}
            <Link 
              to="/wholesale" 
              className="bg-primary-500 text-white py-2 px-4 rounded-md font-medium hover:bg-primary-600 transition-colors"
            >
              ثبت‌نام عمده‌فروشان
            </Link>
          </div>
        </nav>

        {/* منوی موبایل */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 animate-slide-down">
            <nav className="py-2">
              {mainLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => 
                    `block py-2 px-4 ${
                      isActive 
                        ? 'text-primary-500 font-medium' 
                        : 'text-neutral-700'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.text}
                </NavLink>
              ))}

              <hr className="my-2 border-neutral-100" />

              {/* بخش‌های دیگر در منوی موبایل */}
              <Link to="/faq" className="block py-2 px-4 text-neutral-700" onClick={() => setMobileMenuOpen(false)}>
                سوالات متداول
              </Link>
              <Link to="/stores" className="block py-2 px-4 text-neutral-700" onClick={() => setMobileMenuOpen(false)}>
                فروشگاه‌های ما
              </Link>
              <Link to="/track-order" className="block py-2 px-4 text-neutral-700" onClick={() => setMobileMenuOpen(false)}>
                پیگیری سفارش
              </Link>

              <hr className="my-2 border-neutral-100" />

              {/* بخش ویژه عمده فروشان در موبایل */}
              <div className="px-4 py-2">
                <Link 
                  to="/wholesale" 
                  className="block bg-primary-500 text-white py-2 px-4 rounded-md font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ثبت‌نام عمده‌فروشان
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;