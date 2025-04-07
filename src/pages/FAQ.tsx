import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Card from '../components/common/Card';

// تایپ سوال
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  // استیت برای نمایش و مخفی کردن پاسخ‌ها
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});
  // استیت برای فیلتر دسته‌بندی
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // استیت برای جستجو
  const [searchQuery, setSearchQuery] = useState<string>('');

  // توابع سوالات متداول
  const toggleItem = (index: number) => {
    setOpenItems(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  // لیست سوالات متداول
  const faqItems: FAQItem[] = [
    {
      question: 'شرایط خرید عمده از فروشگاه چیست؟',
      answer: 'برای خرید عمده باید ابتدا در سایت ثبت‌نام کنید و حساب کاربری خود را به عنوان خریدار عمده تایید کنید. حداقل مبلغ خرید عمده ۱ میلیون تومان و حداقل تعداد از هر محصول ۱۰ عدد است. تخفیفات ویژه برای خریدهای بالاتر از ۵ میلیون تومان در نظر گرفته شده است.',
      category: 'خرید'
    },
    {
      question: 'آیا امکان مرجوع کردن کالا وجود دارد؟',
      answer: 'بله، تمامی محصولات تا ۷ روز پس از تحویل قابل مرجوع هستند، مشروط بر اینکه در بسته‌بندی اصلی و بدون استفاده باشند. برای مرجوعی باید از طریق پنل کاربری درخواست خود را ثبت کنید و پس از تایید، کالا را برای ما ارسال کنید.',
      category: 'خرید'
    },
    {
      question: 'هزینه ارسال به چه صورت محاسبه می‌شود؟',
      answer: 'هزینه ارسال بر اساس وزن، حجم و مقصد محاسبه می‌شود. برای سفارش‌های بالای ۳ میلیون تومان، ارسال به تمام نقاط ایران رایگان است. برای سفارش‌های با مبلغ کمتر، هزینه ارسال در صفحه پرداخت محاسبه و نمایش داده می‌شود.',
      category: 'ارسال'
    },
    {
      question: 'زمان تحویل سفارشات چقدر است؟',
      answer: 'سفارشات معمولاً ظرف ۲۴ تا ۴۸ ساعت کاری آماده ارسال می‌شوند. زمان تحویل بسته به مقصد، بین ۱ تا ۵ روز کاری متغیر است. برای تهران و کلان‌شهرها معمولاً ۱ تا ۲ روز و برای سایر شهرها و مناطق ۳ تا ۵ روز زمان لازم است.',
      category: 'ارسال'
    },
    {
      question: 'آیا امکان بازدید حضوری از محصولات وجود دارد؟',
      answer: 'بله، شما می‌توانید با هماهنگی قبلی از نمایشگاه دائمی ما بازدید کنید. برای هماهنگی با شماره ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیرید یا از طریق فرم تماس با ما، درخواست خود را ارسال کنید.',
      category: 'خرید'
    },
    {
      question: 'آیا امکان خرید اعتباری وجود دارد؟',
      answer: 'برای مشتریان دائمی و فروشگاه‌های معتبر، پس از چند خرید موفق، امکان خرید اعتباری فراهم می‌شود. برای اطلاعات بیشتر با واحد فروش تماس بگیرید.',
      category: 'پرداخت'
    },
    {
      question: 'آیا می‌توانم نمونه محصول را قبل از خرید عمده دریافت کنم؟',
      answer: 'بله، امکان خرید نمونه قبل از سفارش عمده وجود دارد. می‌توانید از هر محصول تا ۲ عدد را به عنوان نمونه با قیمت خرده سفارش دهید. هزینه نمونه در صورت خرید عمده بعدی، از صورتحساب کسر خواهد شد.',
      category: 'خرید'
    },
    {
      question: 'روش‌های پرداخت چیست؟',
      answer: 'پرداخت آنلاین از طریق درگاه بانکی، پرداخت در محل (فقط برای تهران)، و پرداخت از طریق کارت به کارت امکان‌پذیر است. برای خریدهای اعتباری، پرداخت به صورت چک نیز قابل انجام است.',
      category: 'پرداخت'
    },
    {
      question: 'آیا قیمت‌ها شامل مالیات است؟',
      answer: 'بله، تمامی قیمت‌های نمایش داده شده در سایت شامل مالیات بر ارزش افزوده است. فاکتور رسمی با احتساب ۹٪ مالیات بر ارزش افزوده صادر می‌شود.',
      category: 'پرداخت'
    },
    {
      question: 'آیا امکان سفارش محصول خاص وجود دارد؟',
      answer: 'بله، برای سفارشات خاص و تولیدی می‌توانید با واحد فروش تماس بگیرید. حداقل تیراژ برای سفارشات تولیدی، بسته به نوع محصول متفاوت است.',
      category: 'محصولات'
    },
    {
      question: 'گارانتی محصولات چگونه است؟',
      answer: 'تمامی محصولات دارای ضمانت کیفیت هستند. در صورت وجود هرگونه مشکل کیفی، تا ۳۰ روز پس از خرید امکان تعویض وجود دارد. برای استفاده از گارانتی، باید فاکتور خرید را ارائه دهید.',
      category: 'محصولات'
    },
    {
      question: 'چگونه می‌توانم از وضعیت سفارش خود مطلع شوم؟',
      answer: 'پس از ثبت سفارش، کد پیگیری از طریق پیامک و ایمیل برای شما ارسال می‌شود. با ورود به پنل کاربری و بخش سفارش‌ها، می‌توانید وضعیت سفارش خود را پیگیری کنید. همچنین می‌توانید از طریق کد رهگیری پست، مرسوله خود را پیگیری کنید.',
      category: 'ارسال'
    }
  ];

  // دسته‌بندی‌های منحصر به فرد
  const categories = ['all', ...Array.from(new Set(faqItems.map(item => item.category)))];

  // فیلتر کردن سوالات بر اساس دسته‌بندی و جستجو
  const filteredFaqItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">سوالات متداول</h1>
        <p className="text-gray-600">
          پاسخ سوالات رایج شما درباره خرید عمده پوشاک را در این صفحه مشاهده کنید.
        </p>
      </div>
      
      {/* جستجو و فیلترها */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card>
          <div className="p-4">
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در سوالات متداول..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'همه دسته‌بندی‌ها' : category}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      {/* لیست سوالات */}
      <div className="max-w-4xl mx-auto">
        {filteredFaqItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">سوالی با این معیارها یافت نشد.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <div
                  className={`p-4 cursor-pointer ${openItems[index] ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <span className="text-blue-600">
                      {openItems[index] ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                </div>
                {openItems[index] && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* بخش سوال نیافتید */}
      <div className="max-w-4xl mx-auto mt-16 bg-blue-50 p-8 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">پاسخ سوال خود را پیدا نکردید؟</h2>
          <p className="text-gray-600 mb-6">
            اگر پاسخ سوال خود را در اینجا پیدا نکردید، می‌توانید با ما تماس بگیرید. تیم پشتیبانی ما آماده پاسخگویی به سوالات شما است.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 md:ml-4"
            >
              تماس با ما
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;