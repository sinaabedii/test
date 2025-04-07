import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingStorefrontIcon, 
  TruckIcon, 
  UsersIcon, 
  SparklesIcon, 
  CubeIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* بخش هدر */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">درباره فروشگاه عمده پوشاک ما</h1>
        <p className="text-lg text-gray-600 mb-8">
          فروشگاه ما با بیش از ۱۵ سال سابقه، یکی از بزرگ‌ترین مراکز پخش عمده پوشاک با کیفیت در ایران است.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600">۱۵+</div>
            <div className="text-sm text-gray-600">سال تجربه</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600">۵۰۰۰+</div>
            <div className="text-sm text-gray-600">مشتری راضی</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600">۱۰۰۰+</div>
            <div className="text-sm text-gray-600">محصول متنوع</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600">۳۰+</div>
            <div className="text-sm text-gray-600">شهر تحت پوشش</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600">۲۰+</div>
            <div className="text-sm text-gray-600">تولیدکننده همکار</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600">۹۷%</div>
            <div className="text-sm text-gray-600">رضایت مشتریان</div>
          </div>
        </div>
      </div>
      
      {/* بخش تصویر و توضیحات */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4">داستان ما</h2>
            <p className="text-gray-600 mb-4">
              فروشگاه ما از سال ۱۳۸۶ فعالیت خود را در زمینه پخش عمده پوشاک آغاز کرد. هدف اصلی ما از ابتدا تامین پوشاک با کیفیت و قیمت مناسب برای فروشگاه‌های سراسر کشور بوده است. با گذشت زمان و کسب تجربه، توانستیم شبکه گسترده‌ای از تولیدکنندگان داخلی و تامین‌کنندگان خارجی را ایجاد کنیم و به یکی از بزرگترین مراکز پخش عمده پوشاک در ایران تبدیل شویم.
            </p>
            <p className="text-gray-600 mb-4">
              امروز، ما افتخار می‌کنیم که با بیش از ۵۰۰۰ مشتری دائمی در سراسر کشور همکاری داریم و روزانه صدها سفارش عمده پوشاک را پردازش و ارسال می‌کنیم. تنوع محصولات ما از لباس‌های مردانه، زنانه و بچگانه گرفته تا انواع اکسسوری و البسه، پاسخگوی نیاز تمامی فروشگاه‌ها و خریداران عمده است.
            </p>
            <p className="text-gray-600">
              در کنار ارائه محصولات با کیفیت، ما به خدمات پس از فروش و رضایتمندی مشتریان نیز اهمیت ویژه‌ای می‌دهیم. تیم پشتیبانی ما همواره آماده پاسخگویی به سوالات و درخواست‌های شما است.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://via.placeholder.com/600x400"
              alt="فروشگاه عمده پوشاک"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
      
      {/* بخش مزیت‌های ما */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">چرا ما را انتخاب کنید</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mr-4">
                <BuildingStorefrontIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">تنوع محصولات</h3>
            </div>
            <p className="text-gray-600">
              بیش از ۱۰۰۰ مدل محصول متنوع در دسته‌بندی‌های مختلف، پاسخگوی تمامی نیازهای فروشگاه شما خواهد بود.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mr-4">
                <CubeIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">کیفیت برتر</h3>
            </div>
            <p className="text-gray-600">
              تمامی محصولات ما از مواد اولیه با کیفیت تولید شده‌اند و قبل از ارسال مورد بازرسی کیفی قرار می‌گیرند.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mr-4">
                <TruckIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">ارسال سریع</h3>
            </div>
            <p className="text-gray-600">
              سفارش‌های شما در کوتاه‌ترین زمان ممکن پردازش و ارسال می‌شوند. ارسال رایگان برای سفارش‌های بالای ۵ میلیون تومان.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mr-4">
                <UsersIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">پشتیبانی ۲۴/۷</h3>
            </div>
            <p className="text-gray-600">
              تیم پشتیبانی ما همواره آماده پاسخگویی به سوالات و درخواست‌های شما است. با ما تماس بگیرید.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mr-4">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">به‌روزترین مدل‌ها</h3>
            </div>
            <p className="text-gray-600">
              با همکاری با برندهای معتبر و طراحان مد، همواره جدیدترین ترندها و مدل‌ها را در اختیار شما قرار می‌دهیم.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mr-4">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">تضمین کیفیت</h3>
            </div>
            <p className="text-gray-600">
              تمامی محصولات ما دارای گارانتی تعویض هستند. با خیال راحت خرید کنید.
            </p>
          </div>
        </div>
      </div>
      
      {/* بخش تیم ما */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">تیم ما</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://via.placeholder.com/300x400" 
                alt="مدیر عامل" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">علی محمدی</h3>
              <p className="text-blue-600 text-sm mb-2">مدیر عامل</p>
              <p className="text-gray-600 text-sm">
                بیش از ۲۰ سال تجربه در صنعت پوشاک با تمرکز بر توسعه بازارهای داخلی و بین‌المللی.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://via.placeholder.com/300x400" 
                alt="مدیر فروش" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">سارا احمدی</h3>
              <p className="text-blue-600 text-sm mb-2">مدیر فروش</p>
              <p className="text-gray-600 text-sm">
                متخصص در استراتژی‌های فروش عمده با سابقه همکاری با بزرگترین فروشگاه‌های زنجیره‌ای کشور.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://via.placeholder.com/300x400" 
                alt="مدیر تولید" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">محمد رضایی</h3>
              <p className="text-blue-600 text-sm mb-2">مدیر تولید</p>
              <p className="text-gray-600 text-sm">
                با ۱۵ سال تجربه در تولید پوشاک، متخصص در بهینه‌سازی فرآیندهای تولید و کنترل کیفیت.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://via.placeholder.com/300x400" 
                alt="مدیر لجستیک" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">زهرا کریمی</h3>
              <p className="text-blue-600 text-sm mb-2">مدیر لجستیک</p>
              <p className="text-gray-600 text-sm">
                متخصص در مدیریت زنجیره تأمین با تمرکز بر بهینه‌سازی فرآیندهای انبارداری و ارسال کالا.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* بخش تماس با ما */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">آماده همکاری با شما هستیم</h2>
        <p className="text-gray-600 mb-8">
          اگر به دنبال یک تأمین‌کننده قابل اعتماد و با کیفیت برای پوشاک خود هستید، همین امروز با ما تماس بگیرید.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/contact" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300">
            تماس با ما
          </Link>
          <Link to="/products" className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors duration-300">
            مشاهده محصولات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;