import React, { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import Card from '../components/common/Card';

const Contact: React.FC = () => {
  // استیت‌های فرم تماس
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ارسال فرم تماس
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // شبیه‌سازی ارسال فرم
    setTimeout(() => {
      toast.success('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* هدر */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">تماس با ما</h1>
        <p className="text-gray-600">با ما در تماس باشید! تیم پشتیبانی ما آماده پاسخگویی به سوالات شما درباره محصولات، سفارش‌ها و همکاری‌های تجاری است.</p>
      </div>
      
      {/* اطلاعات تماس و فرم */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* اطلاعات تماس */}
          <div className="md:col-span-1">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">اطلاعات تماس</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <PhoneIcon className="h-5 w-5" />
                    </div>
                    <div className="mr-4">
                      <h4 className="font-medium mb-1">تلفن تماس</h4>
                      <p className="text-gray-600">021-12345678</p>
                      <p className="text-gray-600">021-87654321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <EnvelopeIcon className="h-5 w-5" />
                    </div>
                    <div className="mr-4">
                      <h4 className="font-medium mb-1">ایمیل</h4>
                      <p className="text-gray-600">info@example.com</p>
                      <p className="text-gray-600">sales@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPinIcon className="h-5 w-5" />
                    </div>
                    <div className="mr-4">
                      <h4 className="font-medium mb-1">آدرس</h4>
                      <p className="text-gray-600">تهران، خیابان ولیعصر، بالاتر از میدان ونک، مرکز خرید پوشاک، طبقه ۴، واحد ۱۰۱</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ClockIcon className="h-5 w-5" />
                    </div>
                    <div className="mr-4">
                      <h4 className="font-medium mb-1">ساعات کاری</h4>
                      <p className="text-gray-600">شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر</p>
                      <p className="text-gray-600">پنجشنبه: ۹ صبح تا ۱ بعدازظهر</p>
                      <p className="text-gray-600">جمعه: تعطیل</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-3">ما را در شبکه‌های اجتماعی دنبال کنید</h4>
                  <div className="flex gap-4">
                    <a href="#" className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* فرم تماس */}
          <div className="md:col-span-2">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">ارسال پیام</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">نام و نام خانوادگی <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="نام و نام خانوادگی خود را وارد کنید"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">ایمیل <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ایمیل خود را وارد کنید"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">شماره تماس</label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="شماره تماس خود را وارد کنید"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">موضوع <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="موضوع پیام خود را وارد کنید"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">پیام <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      placeholder="پیام خود را وارد کنید"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="bg-blue-600 text-white hover:bg-blue-700 w-full md:w-auto px-8 py-3"
                      disabled={loading}
                    >
                      {loading ? 'در حال ارسال...' : 'ارسال پیام'}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* نقشه */}
      <div className="max-w-6xl mx-auto mt-12">
        <Card>
          <div className="aspect-video w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207306.91443960863!2d51.24773982462211!3d35.696002581762216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1634118578897!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="نقشه آدرس فروشگاه"
            ></iframe>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
                    