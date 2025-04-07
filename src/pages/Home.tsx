import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useProductStore } from '../store/productStore';
// import ProductCard from '../components/product/ProductCard';
import { categories } from '../data/products';

const Home: React.FC = () => {
  const { 
    products, 
    loading, 
    fetchProducts,
  } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // چند محصول برتر برای نمایش
  const featuredProducts = products.slice(0, 8);
  // محصولات جدید براساس تاریخ
  const newProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
  // محصولات دارای تخفیف
  const discountedProducts = products
    .filter(product => product.originalPrice && product.originalPrice > product.price)
    .slice(0, 4);

  return (
    <div>
      {/* اسلایدر هدر */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="container-custom py-16 px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">فروش عمده پوشاک با بهترین کیفیت</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                برترین تولیدکنندگان و پخش‌کنندگان پوشاک با قیمت استثنایی برای خریداران عمده
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="btn-primary text-center py-3 px-6 text-lg rounded-lg"
                >
                  مشاهده محصولات
                </Link>
                <Link 
                  to="/wholesale/register" 
                  className="border-2 border-white text-white py-3 px-6 rounded-lg text-center hover:bg-white hover:text-primary-700 transition-colors duration-300 text-lg"
                >
                  ثبت‌نام عمده‌فروشان
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="پوشاک عمده" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* دسته‌بندی‌های اصلی */}
      <section className="mb-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">دسته‌بندی‌های محصولات</h2>
            <Link to="/products" className="text-primary-600 flex items-center hover:text-primary-800 transition-colors">
              <span>مشاهده همه</span>
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="relative rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 bg-neutral-200">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="w-full">
                    <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories?.slice(0, 3).map((sub) => (
                        <span key={sub.id} className="badge bg-white/20 text-white backdrop-blur-sm">
                          {sub.name}
                        </span>
                      ))}
                      {category.subcategories && category.subcategories.length > 3 && (
                        <span className="badge bg-white/20 text-white backdrop-blur-sm">
                          +{category.subcategories.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* محصولات جدید */}
      <section className="mb-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">جدیدترین محصولات</h2>
            <Link to="/products?sort=newest" className="text-primary-600 flex items-center hover:text-primary-800 transition-colors">
              <span>مشاهده همه</span>
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
              <span className="mr-3 text-neutral-600">در حال بارگیری محصولات...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))} */}
            </div>
          )}
        </div>
      </section>

      {/* بنر تبلیغاتی */}
      <section className="mb-12">
        <div className="container-custom">
          <div className="bg-secondary-50 rounded-2xl overflow-hidden">
            <div className="py-8 px-6 md:px-8 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-neutral-900">تخفیف ویژه برای سفارش عمده</h2>
                <p className="text-neutral-700 mb-6">
                  با سفارش بیش از ۱۰۰ عدد از محصولات، از ۲۰٪ تخفیف ویژه بهره‌مند شوید!
                </p>
                <Link 
                  to="/wholesale" 
                  className="btn-secondary inline-block py-3 px-6"
                >
                  شرایط خرید عمده
                </Link>
              </div>
              <div className="md:col-span-2">
                <img 
                  src="https://via.placeholder.com/500x300" 
                  alt="تخفیف ویژه" 
                  className="rounded-lg shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* محصولات تخفیف‌دار */}
      <section className="mb-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">تخفیف‌های ویژه</h2>
            <Link to="/products?discount=true" className="text-primary-600 flex items-center hover:text-primary-800 transition-colors">
              <span>مشاهده همه</span>
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
              <span className="mr-3 text-neutral-600">در حال بارگیری محصولات...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))} */}
            </div>
          )}
        </div>
      </section>

      {/* ویژگی‌های فروشگاه */}
      <section className="mb-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">قیمت رقابتی</h3>
              <p className="text-neutral-600">
                قیمت‌های ویژه و رقابتی برای خریداران عمده با امکان تخفیف پلکانی
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">تضمین کیفیت</h3>
              <p className="text-neutral-600">
                تمامی محصولات دارای ضمانت کیفیت و امکان بازگشت در صورت عدم رضایت
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">ارسال سریع</h3>
              <p className="text-neutral-600">
                ارسال سریع به سراسر کشور با بسته‌بندی استاندارد و مقاوم
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-card text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">پشتیبانی 24/7</h3>
              <p className="text-neutral-600">
                پشتیبانی شبانه‌روزی با کارشناسان مجرب و پاسخگویی سریع به سوالات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* محصولات محبوب */}
      <section className="mb-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">محصولات محبوب</h2>
            <Link to="/products" className="text-primary-600 flex items-center hover:text-primary-800 transition-colors">
              <span>مشاهده همه</span>
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
              <span className="mr-3 text-neutral-600">در حال بارگیری محصولات...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* {featuredProducts.slice(4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))} */}
            </div>
          )}
        </div>
      </section>

      {/* مزایای خرید عمده */}
      <section className="mb-12 bg-neutral-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">چرا خرید عمده از ما؟</h2>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              با خرید عمده از مجموعه ما، علاوه بر صرفه‌جویی در هزینه‌ها، از مزایای ویژه‌ای بهره‌مند خواهید شد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold">۱</span>
              </div>
              <h3 className="text-lg font-bold mb-3">قیمت‌گذاری پلکانی</h3>
              <p className="text-neutral-600">
                با افزایش تعداد سفارش، از تخفیف‌های پلکانی بیشتری بهره‌مند شوید. هرچه بیشتر بخرید، قیمت هر واحد کاهش می‌یابد.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold">۲</span>
              </div>
              <h3 className="text-lg font-bold mb-3">ارسال رایگان</h3>
              <p className="text-neutral-600">
                برای سفارش‌های بالای مبلغ مشخص، هزینه ارسال به سراسر کشور رایگان خواهد بود. صرفه‌جویی در هزینه‌های لجستیک.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold">۳</span>
              </div>
              <h3 className="text-lg font-bold mb-3">نمونه رایگان</h3>
              <p className="text-neutral-600">
                امکان دریافت نمونه محصولات قبل از سفارش عمده برای اطمینان از کیفیت و تناسب با نیازهای شما.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold">۴</span>
              </div>
              <h3 className="text-lg font-bold mb-3">خرید اعتباری</h3>
              <p className="text-neutral-600">
                برای مشتریان دائمی، امکان خرید اعتباری و پرداخت مدت‌دار فراهم است. بدون نیاز به پرداخت کامل در زمان سفارش.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold">۵</span>
              </div>
              <h3 className="text-lg font-bold mb-3">مشاوره تخصصی</h3>
              <p className="text-neutral-600">
                کارشناسان ما آماده ارائه مشاوره تخصصی در انتخاب محصولات، ترندهای بازار و بهینه‌سازی سبد خرید شما هستند.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-card">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold">۶</span>
              </div>
              <h3 className="text-lg font-bold mb-3">سفارش اختصاصی</h3>
              <p className="text-neutral-600">
                امکان سفارش محصولات با مشخصات دلخواه و برند اختصاصی شما. تولید محصولات مطابق با نیازهای خاص بازار هدف شما.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/wholesale/register" 
              className="btn-primary inline-block py-3 px-6 text-lg"
            >
              شروع همکاری با ما
            </Link>
          </div>
        </div>
      </section>

      {/* خبرنامه */}
      <section className="mb-12">
        <div className="container-custom">
          <div className="bg-primary-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-800">عضویت در خبرنامه</h2>
              <p className="text-primary-700 mb-6">
                برای اطلاع از آخرین محصولات، تخفیف‌های ویژه و اخبار مرتبط با صنعت پوشاک در خبرنامه ما عضو شوید
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="ایمیل خود را وارد کنید" 
                  className="input flex-grow py-3 px-4"
                  required
                />
                <button 
                  type="submit" 
                  className="btn-primary py-3 px-6 sm:whitespace-nowrap"
                >
                  عضویت
                </button>
              </form>
              
              <p className="text-sm text-primary-600 mt-4">
                با عضویت در خبرنامه، کد تخفیف ۱۰٪ برای اولین خرید عمده دریافت کنید.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;