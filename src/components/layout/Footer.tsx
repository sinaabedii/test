import React from 'react';
import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
// import logo from '../../assets/images/logo.png';

const Footer: React.FC = () => {
  // لینک‌های فوتر
  const footerLinks = {
    quickLinks: [
      { to: '/about', text: 'درباره ما' },
      { to: '/contact', text: 'تماس با ما' },
      { to: '/faq', text: 'سوالات متداول' },
      { to: '/blog', text: 'بلاگ' },
      { to: '/stores', text: 'فروشگاه‌های ما' },
      { to: '/terms', text: 'قوانین و مقررات' },
    ],
    categories: [
      { to: '/category/men', text: 'پوشاک مردانه' },
      { to: '/category/women', text: 'پوشاک زنانه' },
      { to: '/category/kids', text: 'پوشاک بچگانه' },
      { to: '/category/accessories', text: 'اکسسوری' },
      { to: '/category/sport', text: 'لباس ورزشی' },
      { to: '/category/seasonal', text: 'لباس فصلی' },
    ],
    wholesale: [
      { to: '/wholesale/register', text: 'ثبت‌نام عمده‌فروشان' },
      { to: '/wholesale/terms', text: 'شرایط همکاری' },
      { to: '/wholesale/discounts', text: 'تخفیف‌های عمده' },
      { to: '/wholesale/pricing', text: 'قیمت‌گذاری عمده' },
      { to: '/wholesale/samples', text: 'درخواست نمونه' },
      { to: '/wholesale/shipping', text: 'ارسال سفارشات عمده' },
    ],
  };

  // نمادهای اعتماد
  const trustSymbols = [
    { src: 'https://via.placeholder.com/80', alt: 'نماد اعتماد الکترونیکی' },
    { src: 'https://via.placeholder.com/80', alt: 'درگاه پرداخت امن' },
    { src: 'https://via.placeholder.com/80', alt: 'اتحادیه کسب و کارهای مجازی' },
  ];

  // شبکه‌های اجتماعی
  const socialMedia = [
    { icon: 'instagram', url: 'https://instagram.com/' },
    { icon: 'telegram', url: 'https://telegram.org/' },
    { icon: 'twitter', url: 'https://twitter.com/' },
    { icon: 'linkedin', url: 'https://linkedin.com/' },
  ];

  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container-custom">
        {/* بخش اصلی فوتر */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* بخش اول - اطلاعات فروشگاه */}
          <div>
            <div className="flex items-center mb-4">
              {/* <img src={logo} alt="فروشگاه عمده لباس" className="h-10 bg-white p-1 rounded" /> */}
              <span className="mr-2 text-lg font-bold">پوشاک عمده</span>
            </div>
            <p className="text-neutral-300 mb-4">
              مرکز فروش عمده انواع پوشاک با کیفیت و قیمت مناسب برای فروشگاه‌ها و خریداران عمده در سراسر ایران
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPinIcon className="w-5 h-5 ml-2 mt-1 text-primary-400" />
                <p className="text-neutral-300">تهران، خیابان ولیعصر، مرکز خرید لباس، پلاک ۱۲۳</p>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-5 h-5 ml-2 text-primary-400" />
                <a href="tel:+982112345678" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </a>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="w-5 h-5 ml-2 text-primary-400" />
                <a href="mailto:info@example.com" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  info@example.com
                </a>
              </div>
            </div>
          </div>

          {/* بخش دوم - لینک‌های سریع */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-neutral-700 pb-2">دسترسی سریع</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-neutral-300 hover:text-primary-400 transition-colors block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* بخش سوم - دسته‌بندی محصولات */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-neutral-700 pb-2">دسته‌بندی محصولات</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-neutral-300 hover:text-primary-400 transition-colors block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* بخش چهارم - همکاری عمده‌فروشان */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-neutral-700 pb-2">همکاری عمده‌فروشان</h3>
            <ul className="space-y-2">
              {footerLinks.wholesale.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-neutral-300 hover:text-primary-400 transition-colors block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* خط جداکننده */}
        <hr className="border-neutral-700 my-6" />

        {/* بخش پایینی فوتر */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* نمادهای اعتماد */}
          <div className="flex justify-center md:justify-start space-x-4 space-x-reverse">
            {trustSymbols.map((symbol, index) => (
              <img 
                key={index} 
                src={symbol.src} 
                alt={symbol.alt}
                className="h-16 bg-white p-1 rounded"
              />
            ))}
          </div>

          {/* کپی‌رایت */}
          <div className="text-center text-neutral-400 text-sm">
            <p>تمامی حقوق این وب‌سایت متعلق به فروشگاه پوشاک عمده می‌باشد.</p>
            <p>© ۱۴۰۲-۱۴۰۳</p>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="flex justify-center md:justify-end space-x-4 space-x-reverse">
            {socialMedia.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <i className={`fab fa-${social.icon}`}></i>
                <span className="sr-only">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;