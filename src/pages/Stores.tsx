import React, { useState } from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import Card from '../components/common/Card';

// تعریف تایپ فروشگاه
interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  description: string;
  image: string;
  mapUrl: string;
  features: string[];
}

const Stores: React.FC = () => {
  const [activeCity, setActiveCity] = useState<string>('all');
  
  // لیست فروشگاه‌ها
  const stores: Store[] = [
    {
      id: 'store-1',
      name: 'فروشگاه مرکزی تهران',
      address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، مرکز خرید پوشاک، طبقه ۴، واحد ۱۰۱',
      city: 'تهران',
      phone: '021-12345678',
      hours: 'شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر، پنجشنبه: ۹ صبح تا ۱ بعدازظهر، جمعه: تعطیل',
      description: 'فروشگاه مرکزی ما در تهران با فضایی بزرگ و متنوع، آماده ارائه انواع پوشاک عمده به شما عزیزان است. با بیش از ۱۰۰۰ مدل لباس متنوع، می‌توانید نیاز خود را به راحتی در این فروشگاه پیدا کنید.',
      image: 'https://via.placeholder.com/600x400',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.2460244756292!2d51.41003967509943!3d35.770672572386834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2JzE0LjQiTiA1McKwMjQnNDIuNyJF!5e0!3m2!1sen!2s!4v1634118578897!5m2!1sen!2s',
      features: ['پارکینگ رایگان', 'کافه', 'اتاق پرو', 'مشاوره استایل', 'بسته‌بندی رایگان']
    },
    {
      id: 'store-2',
      name: 'شعبه اصفهان',
      address: 'اصفهان، خیابان چهارباغ بالا، مجتمع تجاری پوشاک، طبقه ۲، واحد ۱۵',
      city: 'اصفهان',
      phone: '031-12345678',
      hours: 'شنبه تا پنجشنبه: ۹ صبح تا ۶ عصر، جمعه: ۱۰ صبح تا ۱ بعدازظهر',
      description: 'شعبه اصفهان با ارائه جدیدترین مدل‌های لباس، آماده خدمت‌رسانی به مشتریان عمده در مرکز کشور است. این فروشگاه با طراحی مدرن و دسترسی آسان، تجربه خرید لذت‌بخشی را برای شما فراهم می‌کند.',
      image: 'https://via.placeholder.com/600x400',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.638006062323!2d51.66443617503071!3d32.65379817305386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDM5JzEzLjciTiA1McKwMzknNTkuNiJF!5e0!3m2!1sen!2s!4v1634118578897!5m2!1sen!2s',
      features: ['پارکینگ رایگان', 'اتاق پرو', 'بسته‌بندی رایگان']
    },
    {
      id: 'store-3',
      name: 'شعبه مشهد',
      address: 'مشهد، بلوار سجاد، مجتمع تجاری نگین، طبقه ۳، واحد ۳۰۲',
      city: 'مشهد',
      phone: '051-12345678',
      hours: 'شنبه تا پنجشنبه: ۹ صبح تا ۷ عصر، جمعه: ۱۰ صبح تا ۲ بعدازظهر',
      description: 'شعبه مشهد با ارائه انواع پوشاک با کیفیت و قیمت مناسب، آماده خدمت‌رسانی به مشتریان عمده در شرق کشور است. این شعبه با پرسنل مجرب و حرفه‌ای، مشاوره‌های لازم را برای خرید بهتر به شما ارائه می‌دهد.',
      image: 'https://via.placeholder.com/600x400',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3216.827246493697!2d59.57303467511257!3d36.31070577496407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE4JzM4LjUiTiA1OcKwMzQnMjkuOCJF!5e0!3m2!1sen!2s!4v1634118578897!5m2!1sen!2s',
      features: ['پارکینگ رایگان', 'کافه', 'اتاق پرو', 'بسته‌بندی رایگان']
    },
    {
      id: 'store-4',
      name: 'شعبه شیراز',
      address: 'شیراز، خیابان زند، پاساژ مرکزی، طبقه همکف، واحد ۱۲',
      city: 'شیراز',
      phone: '071-12345678',
      hours: 'شنبه تا پنجشنبه: ۹ صبح تا ۶ عصر، جمعه: تعطیل',
      description: 'شعبه شیراز با فضایی دلنشین و محصولات متنوع، بهترین گزینه برای خرید عمده پوشاک در جنوب کشور است. در این فروشگاه می‌توانید از جدیدترین مدل‌های لباس بازدید کرده و خرید خود را انجام دهید.',
      image: 'https://via.placeholder.com/600x400',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.2397345191896!2d52.53083097497634!3d29.962282028618635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU3JzQ0LjIiTiA1MsKwMzInMDIuNyJF!5e0!3m2!1sen!2s!4v1634118578897!5m2!1sen!2s',
      features: ['اتاق پرو', 'بسته‌بندی رایگان']
    },
    {
      id: 'store-5',
      name: 'شعبه تبریز',
      address: 'تبریز، چهارراه آبرسان، مجتمع تجاری آبرسان، طبقه ۲، واحد ۲۱۵',
      city: 'تبریز',
      phone: '041-12345678',
      hours: 'شنبه تا پنجشنبه: ۹ صبح تا ۶ عصر، جمعه: ۱۰ صبح تا ۱ بعدازظهر',
      description: 'شعبه تبریز با طراحی مدرن و ارائه محصولات با کیفیت، آماده خدمت‌رسانی به مشتریان عمده در شمال غرب کشور است. این فروشگاه با پرسنل متخصص، مشاوره‌های لازم را برای انتخاب بهتر به شما ارائه می‌دهد.',
      image: 'https://via.placeholder.com/600x400',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.752799954394!2d46.30133867513175!3d38.07305825756743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDA0JzIzLjAiTiA0NsKwMTgnMTIuNCJF!5e0!3m2!1sen!2s!4v1634118578897!5m2!1sen!2s',
      features: ['پارکینگ رایگان', 'کافه', 'اتاق پرو', 'بسته‌بندی رایگان']
    }
  ];

  // فیلتر کردن فروشگاه‌ها بر اساس شهر
  const filteredStores = activeCity === 'all' 
    ? stores 
    : stores.filter(store => store.city === activeCity);

  // لیست شهرهای منحصر به فرد
  const cities = ['all', ...Array.from(new Set(stores.map(store => store.city)))];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">فروشگاه‌های ما</h1>
        <p className="text-gray-600">
          برای بازدید حضوری و خرید عمده، می‌توانید به یکی از فروشگاه‌های ما در سراسر کشور مراجعه کنید.
        </p>
      </div>
      
      {/* فیلتر شهرها */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card>
          <div className="p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCity === city 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {city === 'all' ? 'همه شهرها' : city}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      {/* لیست فروشگاه‌ها */}
      <div className="max-w-6xl mx-auto">
        {filteredStores.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">فروشگاهی در این شهر یافت نشد.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredStores.map(store => (
              <Card key={store.id} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="h-64 md:h-full overflow-hidden">
                      <img 
                        src={store.image} 
                        alt={store.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 p-6">
                    <h2 className="text-2xl font-bold mb-4">{store.name}</h2>
                    <p className="text-gray-700 mb-6">{store.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <MapPinIcon className="h-5 w-5 text-blue-600 mt-1 ml-2 flex-shrink-0" />
                        <span className="text-gray-700">{store.address}</span>
                      </div>
                      <div className="flex items-start">
                        <PhoneIcon className="h-5 w-5 text-blue-600 mt-1 ml-2 flex-shrink-0" />
                        <span className="text-gray-700">{store.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <ClockIcon className="h-5 w-5 text-blue-600 mt-1 ml-2 flex-shrink-0" />
                        <span className="text-gray-700">{store.hours}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">امکانات و خدمات</h3>
                      <div className="flex flex-wrap gap-2">
                        {store.features.map((feature, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      onClick={() => window.open(store.mapUrl.replace('embed?', 'place?'), '_blank')}
                    >
                      <MapPinIcon className="h-5 w-5 ml-1" />
                      نمایش در نقشه
                    </button>
                  </div>
                </div>
                
                {/* نقشه */}
                <div className="border-t border-gray-200">
                  <div className="h-64">
                    <iframe 
                      src={store.mapUrl} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title={`نقشه ${store.name}`}
                    ></iframe>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* بخش تماس */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">نیاز به اطلاعات بیشتر دارید؟</h2>
        <p className="text-gray-600 mb-6">
          برای هماهنگی بازدید حضوری یا کسب اطلاعات بیشتر درباره محصولات، با ما تماس بگیرید.
        </p>
        <div className="flex justify-center">
          <a
            href="/contact"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            تماس با ما
          </a>
        </div>
      </div>
    </div>
  );
};

export default Stores;