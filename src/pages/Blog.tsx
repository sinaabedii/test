import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserIcon, 
  ArrowLongLeftIcon, 
  MagnifyingGlassIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import Card from '../components/common/Card';

// تعریف تایپ مقاله بلاگ
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  comments: number;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // بارگذاری داده‌های مقالات
  useEffect(() => {
    // شبیه‌سازی درخواست API
    setLoading(true);
    setTimeout(() => {
      const mockPosts: BlogPost[] = [
        {
          id: 'post-1',
          title: 'راهنمای انتخاب بهترین پارچه برای لباس‌های تابستانی',
          excerpt: 'با گرم شدن هوا، انتخاب پارچه مناسب برای لباس‌های تابستانی اهمیت زیادی پیدا می‌کند. در این مقاله بهترین پارچه‌ها برای فصل گرما را معرفی می‌کنیم.',
          content: '...محتوای کامل مقاله...',
          image: 'https://via.placeholder.com/600x400',
          author: 'سارا محمدی',
          date: '۱۵ مرداد ۱۴۰۲',
          category: 'راهنمای خرید',
          tags: ['پارچه', 'تابستان', 'مد'],
          comments: 12
        },
        {
          id: 'post-2',
          title: 'ترندهای مد پاییز و زمستان ۱۴۰۲',
          excerpt: 'با نزدیک شدن به فصل پاییز، برندهای معتبر دنیا کالکشن‌های جدید خود را معرفی کرده‌اند. در این مقاله ترندهای اصلی پاییز و زمستان امسال را بررسی می‌کنیم.',
          content: '...محتوای کامل مقاله...',
          image: 'https://via.placeholder.com/600x400',
          author: 'محمد رضایی',
          date: '۲۰ شهریور ۱۴۰۲',
          category: 'ترندهای مد',
          tags: ['پاییز', 'زمستان', 'ترند', 'مد'],
          comments: 8
        },
        {
          id: 'post-3',
          title: 'چگونه لباس‌های خود را بهتر نگهداری کنیم؟',
          excerpt: 'نگهداری صحیح از لباس‌ها باعث می‌شود عمر آن‌ها افزایش یابد و همیشه تمیز و مرتب به نظر برسند. در این مقاله روش‌های نگهداری انواع مختلف لباس را مرور می‌کنیم.',
          content: '...محتوای کامل مقاله...',
          image: 'https://via.placeholder.com/600x400',
          author: 'زهرا کریمی',
          date: '۵ شهریور ۱۴۰۲',
          category: 'نگهداری لباس',
          tags: ['نگهداری', 'شستشو', 'لباس'],
          comments: 15
        },
        {
          id: 'post-4',
          title: 'معرفی ۱۰ برند برتر پوشاک مردانه در ایران',
          excerpt: 'در این مقاله ۱۰ برند برتر پوشاک مردانه در ایران را معرفی می‌کنیم که به دلیل کیفیت بالا و طراحی منحصر به فرد، طرفداران زیادی دارند.',
          content: '...محتوای کامل مقاله...',
          image: 'https://via.placeholder.com/600x400',
          author: 'علی حسینی',
          date: '۲۸ مرداد ۱۴۰۲',
          category: 'برندها',
          tags: ['برند', 'پوشاک مردانه', 'مد ایرانی'],
          comments: 6
        },
        {
          id: 'post-5',
          title: 'اصول خرید عمده پوشاک و افزایش سود فروشگاه',
          excerpt: 'خرید عمده پوشاک نیازمند استراتژی و برنامه‌ریزی دقیق است. در این مقاله اصول و نکات مهم در خرید عمده پوشاک را برای فروشندگان و بازاریان شرح می‌دهیم.',
          content: '...محتوای کامل مقاله...',
          image: 'https://via.placeholder.com/600x400',
          author: 'رضا قادری',
          date: '۱۰ مرداد ۱۴۰۲',
          category: 'خرید عمده',
          tags: ['خرید عمده', 'فروشگاه', 'سود', 'استراتژی'],
          comments: 22
        },
        {
          id: 'post-6',
          title: 'ست کردن لباس برای محیط کار؛ راهنمای کامل',
          excerpt: 'انتخاب لباس مناسب برای محیط کار یکی از چالش‌های روزانه بسیاری از افراد است. در این مقاله اصول ست کردن لباس برای محیط‌های کاری مختلف را بررسی می‌کنیم.',
          content: '...محتوای کامل مقاله...',
          image: 'https://via.placeholder.com/600x400',
          author: 'مریم نوری',
          date: '۲ مرداد ۱۴۰۲',
          category: 'استایل',
          tags: ['محیط کار', 'ست کردن', 'استایل رسمی'],
          comments: 10
        }
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  // فیلتر مقالات براساس دسته‌بندی و جستجو
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // دسته‌بندی‌های منحصر به فرد
  const uniqueCategories = ['all', ...new Set(posts.map(post => post.category))];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">وبلاگ تخصصی پوشاک</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          آخرین مقالات، ترندها و نکات کاربردی در زمینه لباس و مد را در وبلاگ ما دنبال کنید.
        </p>
      </div>
      
      {/* جستجو و فیلتر */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:space-y-0 space-y-4">
            <div className="relative flex-grow ml-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در مقالات..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">همه دسته‌بندی‌ها</option>
                {uniqueCategories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* لیست مقالات */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>در حال بارگذاری مقالات...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">هیچ مقاله‌ای یافت نشد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <Link to={`/blog/${post.id}`}>
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span className="inline-flex items-center ml-3">
                      <CalendarIcon className="h-4 w-4 ml-1" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center ml-3">
                      <UserIcon className="h-4 w-4 ml-1" />
                      {post.author}
                    </span>
                    <span className="inline-flex items-center">
                      <ChatBubbleLeftIcon className="h-4 w-4 ml-1" />
                      {post.comments}
                    </span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <h2 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 h-16 overflow-hidden">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                      ادامه مطلب
                      <ArrowLongLeftIcon className="h-4 w-4 mr-1" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* بخش اشتراک خبرنامه */}
      <div className="max-w-4xl mx-auto mt-16 bg-blue-50 p-8 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">عضویت در خبرنامه وبلاگ</h2>
          <p className="text-gray-600 mb-6">
            با عضویت در خبرنامه ما، از آخرین مقالات، ترندها و تخفیف‌های ویژه باخبر شوید.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="آدرس ایمیل خود را وارد کنید"
              className="md:w-96 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ml-4"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300">
              عضویت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;