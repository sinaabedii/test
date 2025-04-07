// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import {
//   ChevronRightIcon,
//   ShoppingCartIcon,
//   HeartIcon,
//   ShareIcon,
//   InformationCircleIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
//   CheckIcon,
//   StarIcon,
//   ClockIcon,
//   TruckIcon,
//   CurrencyDollarIcon,
// } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
// import { useProductStore } from '../../store/productStore';
// import { useCartStore } from '../../store/cartStore';
// import { useFavoriteStore } from '../../store/favoriteStore';
// import { useAuthStore } from '../../store/authStore';
// import Button from '../../components/common/Button';
// import ProductCard from '../../components/product/ProductCard';
// import toast from 'react-hot-toast';

// const ProductDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { currentProduct, fetchProductById, loading, products, fetchProducts } = useProductStore();
//   const { addToCart } = useCartStore();
//   const { favorites, addToFavorites, removeFromFavorites } = useFavoriteStore();
//   const { isAuthenticated } = useAuthStore();

//   // حالت‌های UI
//   const [selectedImage, setSelectedImage] = useState<number>(0);
//   const [selectedColor, setSelectedColor] = useState<string>('');
//   const [selectedSize, setSelectedSize] = useState<string>('');
//   const [quantity, setQuantity] = useState<number>(1);
//   const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description');
//   const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
//     shipping: true,
//     bulk: true,
//     returns: false,
//   });

//   // دریافت اطلاعات محصول از API
//   useEffect(() => {
//     if (id) {
//       fetchProductById(id);
//     }
    
//     if (products.length === 0) {
//       fetchProducts();
//     }
//   }, [id, fetchProductById, products.length, fetchProducts]);

//   // تنظیم مقادیر پیش‌فرض برای رنگ و سایز
//   useEffect(() => {
//     if (currentProduct) {
//       if (currentProduct.colors.length > 0 && !selectedColor) {
//         setSelectedColor(currentProduct.colors[0]);
//       }
//       if (currentProduct.sizes.length > 0 && !selectedSize) {
//         setSelectedSize(currentProduct.sizes[0]);
//       }

//       // تنظیم حداقل تعداد سفارش
//       if (currentProduct.minOrderQuantity && currentProduct.minOrderQuantity > quantity) {
//         setQuantity(currentProduct.minOrderQuantity);
//       }
//     }
//   }, [currentProduct, selectedColor, selectedSize, quantity]);

//   // بررسی در علاقمندی‌ها بودن محصول
//   const isFavorite = favorites.some(fav => fav.id === currentProduct?.id);

//   // محصولات مرتبط
//   const relatedProducts = products
//     .filter(p => 
//       p.id !== currentProduct?.id && 
//       (p.category === currentProduct?.category || p.brand === currentProduct?.brand)
//     )
//     .slice(0, 4);

//   // تغییر تعداد سفارش
//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity < 1) return;
    
//     // اعمال حداقل تعداد سفارش
//     if (currentProduct?.minOrderQuantity && newQuantity < currentProduct.minOrderQuantity) {
//       newQuantity = currentProduct.minOrderQuantity;
//     }
    
//     setQuantity(newQuantity);
//   };

//   // محاسبه قیمت با در نظر گرفتن تخفیف عمده‌فروشی
//   const calculatePrice = () => {
//     if (!currentProduct) return { unitPrice: 0, totalPrice: 0, discount: 0 };

//     let unitPrice = currentProduct.price;
//     let discount = 0;

//     // اعمال تخفیف در صورت وجود
//     if (currentProduct.bulkDiscounts && currentProduct.bulkDiscounts.length > 0) {
//       // مرتب‌سازی بر اساس تعداد نزولی
//       const applicableDiscount = [...currentProduct.bulkDiscounts]
//         .sort((a, b) => b.quantity - a.quantity)
//         .find(d => quantity >= d.quantity);

//       if (applicableDiscount) {
//         discount = (unitPrice * applicableDiscount.discountPercentage) / 100;
//         unitPrice = unitPrice - discount;
//       }
//     }

//     return {
//       unitPrice,
//       totalPrice: unitPrice * quantity,
//       discount: discount * quantity,
//     };
//   };

//   // افزودن به سبد خرید
//   const handleAddToCart = () => {
//     if (!currentProduct) return;

//     if (!selectedSize) {
//       toast.error('لطفاً سایز را انتخاب کنید');
//       return;
//     }

//     if (!selectedColor) {
//       toast.error('لطفاً رنگ را انتخاب کنید');
//       return;
//     }

//     const { unitPrice } = calculatePrice();

//     addToCart({
//       id: currentProduct.id,
//       name: currentProduct.name,
//       price: unitPrice,
//       image: currentProduct.images[0],
//       quantity,
//       color: selectedColor,
//       size: selectedSize,
//       minimumOrder: currentProduct.minOrderQuantity,
//       bulkDiscount: currentProduct.bulkDiscounts,
//     });

//     toast.success('محصول به سبد خرید اضافه شد');
//   };

//   // افزودن یا حذف از علاقمندی‌ها
//   const toggleFavorite = () => {
//     if (!currentProduct) return;

//     if (!isAuthenticated) {
//       toast.error('لطفاً ابتدا وارد حساب کاربری خود شوید');
//       return;
//     }

//     if (isFavorite) {
//       removeFromFavorites(currentProduct.id);
//       toast.success('محصول از علاقمندی‌ها حذف شد');
//     } else {
//       addToFavorites(currentProduct);
//       toast.success('محصول به علاقمندی‌ها اضافه شد');
//     }
//   };

//   // اشتراک‌گذاری محصول
//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: currentProduct?.name,
//         text: currentProduct?.description,
//         url: window.location.href,
//       });
//     } else {
//       // کپی لینک به کلیپ‌بورد
//       navigator.clipboard.writeText(window.location.href);
//       toast.success('لینک محصول کپی شد');
//     }
//   };

//   // تغییر وضعیت باز/بسته بودن بخش‌های اطلاعات
//   const toggleSection = (section: string) => {
//     setExpandedSections({
//       ...expandedSections,
//       [section]: !expandedSections[section],
//     });
//   };

//   // رندر بخش قیمت
//   const renderPriceSection = () => {
//     if (!currentProduct) return null;

//     const { unitPrice, totalPrice, discount } = calculatePrice();

//     return (
//       <div className="mb-6">
//         <div className="flex items-baseline mb-2">
//           {currentProduct.originalPrice && currentProduct.originalPrice > currentProduct.price && (
//             <span className="text-neutral-400 line-through text-lg ml-3">
//               {currentProduct.originalPrice.toLocaleString()} تومان
//             </span>
//           )}
//           <span className="text-2xl font-bold">
//             {unitPrice.toLocaleString()} تومان
//           </span>
//         </div>

//         {currentProduct.bulkDiscounts && currentProduct.bulkDiscounts.length > 0 && (
//           <div className="mt-3 bg-green-50 text-green-700 p-3 rounded-lg text-sm">
//             <div className="font-bold mb-1">تخفیف عمده:</div>
//             <div className="space-y-1">
//               {currentProduct.bulkDiscounts.map((discount, index) => (
//                 <div key={index} className="flex items-center">
//                   <CheckIcon className="w-4 h-4 ml-1 inline" />
//                   <span>سفارش بیش از {discount.quantity} عدد: {discount.discountPercentage}٪ تخفیف</span>
//                 </div>
//               ))}
//             </div>
//             {discount > 0 && (
//               <div className="mt-2 font-bold border-t border-green-200 pt-2">
//                 <span>شما {discount.toLocaleString()} تومان تخفیف دریافت می‌کنید!</span>
//               </div>
//             )}
//           </div>
//         )}

//         {quantity > 1 && (
//           <div className="mt-3 text-sm">
//             <span className="text-neutral-500">قیمت کل ({quantity} عدد): </span>
//             <span className="font-bold">{totalPrice.toLocaleString()} تومان</span>
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="spinner"></div>
//         <span className="mr-3 text-neutral-600">در حال بارگیری اطلاعات محصول...</span>
//       </div>
//     );
//   }

//   if (!currentProduct) {
//     return (
//       <div className="bg-white rounded-lg shadow-card p-8 text-center">
//         <h2 className="text-xl font-bold mb-4">محصول یافت نشد</h2>
//         <p className="text-neutral-600 mb-6">متأسفانه محصول مورد نظر در سیستم موجود نیست.</p>
//         <Link to="/products" className="btn-primary inline-block py-2 px-4">
//           بازگشت به لیست محصولات
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* بخش بالایی - عکس و اطلاعات محصول */}
//       <div className="bg-white rounded-lg shadow-card p-4 md:p-6 mb-6">
//         {/* نان کرامب */}
//         <div className="flex items-center text-sm text-neutral-500 mb-6">
//           <Link to="/" className="hover:text-primary-600">خانه</Link>
//           <ChevronRightIcon className="w-4 h-4 mx-1" />
//           <Link to="/products" className="hover:text-primary-600">محصولات</Link>
//           {currentProduct.category && (
//             <>
//               <ChevronRightIcon className="w-4 h-4 mx-1" />
//               <Link to={`/category/${currentProduct.category}`} className="hover:text-primary-600">
//                 {currentProduct.category}
//               </Link>
//             </>
//           )}
//           {currentProduct.subcategory && (
//             <>
//               <ChevronRightIcon className="w-4 h-4 mx-1" />
//               <Link 
//                 to={`/category/${currentProduct.category}/${currentProduct.subcategory}`} 
//                 className="hover:text-primary-600"
//               >
//                 {currentProduct.subcategory}
//               </Link>
//             </>
//           )}
//           <ChevronRightIcon className="w-4 h-4 mx-1" />
//           <span className="text-neutral-800 font-medium">{currentProduct.name}</span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* بخش تصاویر */}
//           <div>
//             <div className="bg-neutral-50 rounded-lg overflow-hidden mb-4 h-96 flex items-center justify-center">
//               <img
//                 src={currentProduct.images[selectedImage]}
//                 alt={currentProduct.name}
//                 className="max-w-full max-h-full object-contain product-zoom"
//               />
//             </div>
            
//             <div className="grid grid-cols-5 gap-2">
//               {currentProduct.images.map((image, index) => (
//                 <div
//                   key={index}
//                   className={`cursor-pointer border rounded-md overflow-hidden h-16 ${
//                     selectedImage === index
//                       ? 'border-primary-500 ring-2 ring-primary-200'
//                       : 'border-neutral-200 hover:border-primary-300'
//                   }`}
//                   onClick={() => setSelectedImage(index)}
//                 >
//                   <img
//                     src={image}
//                     alt={`تصویر ${index + 1} ${currentProduct.name}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* بخش اطلاعات محصول */}
//           <div>
//             <h1 className="text-2xl font-bold mb-2">{currentProduct.name}</h1>
            
//             {/* برند و دسته‌بندی */}
//             <div className="flex items-center text-sm text-neutral-500 mb-4">
//               {currentProduct.brand && (
//                 <div className="ml-4">
//                   <span className="ml-1">برند:</span>
//                   <Link 
//                     to={`/products?brand=${currentProduct.brand}`} 
//                     className="text-primary-600 hover:text-primary-800"
//                   >
//                     {currentProduct.brand}
//                   </Link>
//                 </div>
//               )}
//               {currentProduct.category && (
//                 <div>
//                   <span className="ml-1">دسته‌بندی:</span>
//                   <Link 
//                     to={`/category/${currentProduct.category}`} 
//                     className="text-primary-600 hover:text-primary-800"
//                   >
//                     {currentProduct.category}
//                   </Link>
//                 </div>
//               )}
//             </div>
            
//             {/* امتیاز */}
//             {currentProduct.rating && (
//               <div className="flex items-center mb-4">
//                 <div className="flex items-center">
//                   {Array.from({ length: 5 }).map((_, index) => (
//                     index < Math.floor(currentProduct.rating) ? (
//                       <StarIconSolid key={index} className="h-5 w-5 text-yellow-400" />
//                     ) : index < currentProduct.rating ? (
//                       <div key={index} className="relative">
//                         <StarIcon className="h-5 w-5 text-yellow-400" />
//                         <StarIconSolid className="h-5 w-5 text-yellow-400 absolute inset-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
//                       </div>
//                     ) : (
//                       <StarIcon key={index} className="h-5 w-5 text-yellow-400" />
//                     )
//                   ))}
//                   <span className="text-neutral-600 mr-1">{currentProduct.rating}</span>
//                 </div>
//                 {currentProduct.reviews && (
//                   <span className="text-sm text-neutral-500 mr-2">
//                     ({currentProduct.reviews.length} نظر)
//                   </span>
//                 )}
//               </div>
//             )}
            
//             {/* توضیحات کوتاه */}
//             {currentProduct.description && (
//               <div className="mb-6 text-neutral-700">
//                 <p>{currentProduct.description}</p>
//               </div>
//             )}
            
//             {/* قیمت و تخفیف */}
//             {renderPriceSection()}
            
//             {/* انتخاب رنگ */}
//             {currentProduct.colors.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold mb-2">انتخاب رنگ:</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {currentProduct.colors.map((color) => (
//                     <button
//                       key={color}
//                       className={`px-4 py-2 border rounded-md ${
//                         selectedColor === color
//                           ? 'border-primary-500 bg-primary-50 text-primary-700'
//                           : 'border-neutral-200 text-neutral-600 hover:border-primary-300'
//                       }`}
//                       onClick={() => setSelectedColor(color)}
//                     >
//                       {color}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {/* انتخاب سایز */}
//             {currentProduct.sizes.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="font-bold mb-2">انتخاب سایز:</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {currentProduct.sizes.map((size) => (
//                     <button
//                       key={size}
//                       className={`px-4 py-2 border rounded-md ${
//                         selectedSize === size
//                           ? 'border-primary-500 bg-primary-50 text-primary-700'
//                           : 'border-neutral-200 text-neutral-600 hover:border-primary-300'
//                       }`}
//                       onClick={() => setSelectedSize(size)}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {/* انتخاب تعداد */}
//             <div className="mb-6">
//               <h3 className="font-bold mb-2">تعداد:</h3>
//               <div className="flex items-center">
//                 <button
//                   className="w-10 h-10 border border-neutral-200 rounded-r-md flex items-center justify-center text-neutral-600 hover:bg-neutral-50"
//                   onClick={() => handleQuantityChange(quantity - 1)}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
//                   className="w-16 h-10 border-y border-neutral-200 text-center"
//                   min={currentProduct.minOrderQuantity || 1}
//                 />
//                 <button
//                   className="w-10 h-10 border border-neutral-200 rounded-l-md flex items-center justify-center text-neutral-600 hover:bg-neutral-50"
//                   onClick={() => handleQuantityChange(quantity + 1)}
//                 >
//                   +
//                 </button>
                
//                 {currentProduct.minOrderQuantity && (
//                   <div className="mr-3 text-sm text-neutral-500 flex items-center">
//                     <InformationCircleIcon className="w-4 h-4 ml-1" />
//                     <span>حداقل سفارش: {currentProduct.minOrderQuantity} عدد</span>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* وضعیت موجودی */}
//             <div className="mb-6">
//               <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
//                 currentProduct.inStock
//                   ? 'bg-green-50 text-green-700'
//                   : 'bg-red-50 text-red-700'
//               }`}>
//                 <span className={`w-2 h-2 rounded-full mr-1 ${
//                   currentProduct.inStock ? 'bg-green-500' : 'bg-red-500'
//                 }`}></span>
//                 {currentProduct.inStock ? 'موجود در انبار' : 'ناموجود'}
//                 {currentProduct.stockCount && currentProduct.stockCount > 0 && (
//                   <span className="mr-1">
//                     ({currentProduct.stockCount} عدد)
//                   </span>
//                 )}
//               </div>
//             </div>
            
//             {/* دکمه‌های عملیات */}
//             <div className="flex flex-col gap-3 sm:flex-row">
//               <Button
//                 variant="primary"
//                 size="lg"
//                 fullWidth
//                 disabled={!currentProduct.inStock}
//                 onClick={handleAddToCart}
//                 className="flex-grow"
//               >
//                 <ShoppingCartIcon className="w-5 h-5 ml-2" />
//                 افزودن به سبد خرید
//               </Button>
              
//               <Button
//                 variant={isFavorite ? 'primary' : 'outline'}
//                 size="lg"
//                 onClick={toggleFavorite}
//                 className="sm:w-auto"
//               >
//                 {isFavorite ? (
//                   <HeartIconSolid className="w-5 h-5" />
//                 ) : (
//                   <HeartIcon className="w-5 h-5" />
//                 )}
//               </Button>
              
//               <Button
//                 variant="outline"
//                 size="lg"
//                 onClick={handleShare}
//                 className="sm:w-auto"
//               >
//                 <ShareIcon className="w-5 h-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* بخش اطلاعات تکمیلی و شرایط خرید */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         {/* اطلاعات تکمیلی - ۲ ستون */}
//         <div className="md:col-span-2 bg-white rounded-lg shadow-card p-6">
//           {/* تب‌ها */}
//           <div className="border-b mb-6">
//             <div className="flex flex-wrap -mb-px">
//               <button
//                 className={`inline-block py-3 px-4 border-b-2 font-medium text-sm ${
//                   activeTab === 'description'
//                     ? 'border-primary-500 text-primary-600'
//                     : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
//                 }`}
//                 onClick={() => setActiveTab('description')}
//               >
//                 توضیحات
//               </button>
//               <button
//                 className={`inline-block py-3 px-4 border-b-2 font-medium text-sm ${
//                   activeTab === 'features'
//                     ? 'border-primary-500 text-primary-600'
//                     : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
//                 }`}
//                 onClick={() => setActiveTab('features')}
//               >
//                 ویژگی‌ها و مشخصات
//               </button>
//               <button
//                 className={`inline-block py-3 px-4 border-b-2 font-medium text-sm ${
//                   activeTab === 'reviews'
//                     ? 'border-primary-500 text-primary-600'
//                     : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
//                 }`}
//                 onClick={() => setActiveTab('reviews')}
//               >
//                 نظرات کاربران
//               </button>
//             </div>
//           </div>

//           {/* محتوای تب‌ها */}
//           <div>
//             {/* توضیحات */}
//             {activeTab === 'description' && (
//               <div className="text-neutral-700 leading-7">
//                 <p>{currentProduct.description}</p>
//                 <div className="mt-6">
//                   <h3 className="text-lg font-bold mb-3">جزئیات محصول</h3>
//                   <p>این محصول با بهترین کیفیت و با استفاده از مواد اولیه درجه یک تولید شده است. طراحی منحصر به فرد و دوخت حرفه‌ای آن باعث می‌شود تا مشتریان از خرید خود رضایت کامل داشته باشند.</p>
                  
//                   {currentProduct.material && (
//                     <div className="mt-4">
//                       <h4 className="font-bold mb-2">جنس پارچه:</h4>
//                       <p>{currentProduct.material}</p>
//                     </div>
//                   )}
                  
//                   {currentProduct.careInstructions && currentProduct.careInstructions.length > 0 && (
//                     <div className="mt-4">
//                       <h4 className="font-bold mb-2">شیوه نگهداری:</h4>
//                       <ul className="list-disc mr-5 space-y-1">
//                         {currentProduct.careInstructions.map((instruction, index) => (
//                           <li key={index}>{instruction}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* ویژگی‌ها */}
//             {activeTab === 'features' && (
//               <div>
//                 {currentProduct.features && currentProduct.features.length > 0 && (
//                   <div className="mb-6">
//                     <h3 className="text-lg font-bold mb-3">ویژگی‌های محصول</h3>
//                     <ul className="space-y-2">
//                       {currentProduct.features.map((feature, index) => (
//                         <li key={index} className="flex items-start">
//                           <CheckIcon className="w-5 h-5 text-green-500 ml-2 mt-0.5" />
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 <div className="mt-6">
//                   <h3 className="text-lg font-bold mb-3">مشخصات کلی</h3>
//                   <div className="border rounded-lg overflow-hidden">
//                     <table className="w-full text-sm">
//                       <tbody>
//                         <tr className="border-b">
//                           <td className="px-4 py-3 bg-neutral-50 font-medium">برند</td>
//                           <td className="px-4 py-3">{currentProduct.brand || 'نامشخص'}</td>
//                         </tr>
//                         <tr className="border-b">
//                           <td className="px-4 py-3 bg-neutral-50 font-medium">دسته‌بندی</td>
//                           <td className="px-4 py-3">{currentProduct.category || 'نامشخص'}</td>
//                         </tr>
//                         <tr className="border-b">
//                           <td className="px-4 py-3 bg-neutral-50 font-medium">نوع محصول</td>
//                           <td className="px-4 py-3">{currentProduct.subcategory || 'نامشخص'}</td>
//                         </tr>
//                         <tr className="border-b">
//                           <td className="px-4 py-3 bg-neutral-50 font-medium">جنس</td>
//                           <td className="px-4 py-3">{currentProduct.material || 'نامشخص'}</td>
//                         </tr>
//                         <tr className="border-b">
//                           <td className="px-4 py-3 bg-neutral-50 font-medium">سایزهای موجود</td>
//                           <td className="px-4 py-3">{currentProduct.sizes.join('، ') || 'نامشخص'}</td>
//                         </tr>
//                         <tr>
//                           <td className="px-4 py-3 bg-neutral-50 font-medium">رنگ‌های موجود</td>
//                           <td className="px-4 py-3">{currentProduct.colors.join('، ') || 'نامشخص'}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* نظرات */}
//             {activeTab === 'reviews' && (
//               <div>
//                 {currentProduct.reviews && currentProduct.reviews.length > 0 ? (
//                   <div className="space-y-6">
//                     {currentProduct.reviews.map((review) => (
//                       <div key={review.id} className="border-b border-neutral-200 pb-6">
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <h4 className="font-bold">{review.userName}</h4>
//                             <div className="flex items-center text-sm text-neutral-500">
//                               <span>{new Date(review.date).toLocaleDateString('fa-IR')}</span>
//                               {review.isVerifiedPurchase && (
//                                 <span className="mr-2 text-green-600 flex items-center">
//                                   <CheckIcon className="w-4 h-4 ml-1" />
//                                   خرید تایید شده
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                           <div className="flex items-center">
//                             {Array.from({ length: 5 }).map((_, index) => (
//                               <StarIconSolid 
//                                 key={index}
//                                 className={`w-4 h-4 ${
//                                   index < review.rating ? 'text-yellow-400' : 'text-neutral-300'
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                         </div>
//                         <p className="text-neutral-700">{review.comment}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <p className="text-neutral-500 mb-4">هنوز نظری برای این محصول ثبت نشده است.</p>
//                     {isAuthenticated ? (
//                       <Button variant="outline" size="sm">
//                         ثبت نظر جدید
//                       </Button>
//                     ) : (
//                       <p className="text-sm text-neutral-500">
//                         برای ثبت نظر، لطفا
//                         <Link to="/auth/login" className="text-primary-600 mx-1">
//                           وارد حساب کاربری
//                         </Link>
//                         خود شوید.
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* اطلاعات خرید - ۱ ستون */}
//         <div className="bg-white rounded-lg shadow-card p-6">
//           {/* شرایط ارسال */}
//           <div className="border-b border-neutral-200 pb-4 mb-4">
//             <button
//               className="w-full flex justify-between items-center focus:outline-none"
//               onClick={() => toggleSection('shipping')}
//             >
//               <div className="flex items-center">
//                 <TruckIcon className="w-5 h-5 ml-2 text-neutral-600" />
//                 <h3 className="font-bold">شرایط ارسال</h3>
//               </div>
//               {expandedSections.shipping ? (
//                 <ChevronUpIcon className="w-5 h-5 text-neutral-500" />
//               ) : (
//                 <ChevronDownIcon className="w-5 h-5 text-neutral-500" />
//               )}
//             </button>
            
//             {expandedSections.shipping && (
//               <div className="mt-3 text-sm text-neutral-600 space-y-3">
//                 <p>
//                   <span className="font-medium">ارسال سریع:</span> برای سفارش‌های بالای ۲۰ عدد، ارسال در همان روز انجام می‌شود.
//                 </p>
//                 <p>
//                   <span className="font-medium">هزینه ارسال:</span> برای سفارش‌های بالای ۱۰۰ عدد، ارسال رایگان است.
//                 </p>
//                 <p>
//                   <span className="font-medium">روش‌های ارسال:</span> پست پیشتاز، تیپاکس، اسنپ
//                 </p>
//               </div>
//             )}
//           </div>
          
//           {/* تخفیف‌های عمده */}
//           <div className="border-b border-neutral-200 pb-4 mb-4">
//             <button
//               className="w-full flex justify-between items-center focus:outline-none"
//               onClick={() => toggleSection('bulk')}
//             >
//               <div className="flex items-center">
//                 <CurrencyDollarIcon className="w-5 h-5 ml-2 text-neutral-600" />
//                 <h3 className="font-bold">تخفیف‌های عمده</h3>
//               </div>
//               {expandedSections.bulk ? (
//                 <ChevronUpIcon className="w-5 h-5 text-neutral-500" />
//               ) : (
//                 <ChevronDownIcon className="w-5 h-5 text-neutral-500" />
//               )}
//             </button>
            
//             {expandedSections.bulk && (
//               <div className="mt-3 text-sm text-neutral-600 space-y-3">
//                 {currentProduct.bulkDiscounts && currentProduct.bulkDiscounts.length > 0 ? (
//                   <div className="space-y-2">
//                     {currentProduct.bulkDiscounts.map((discount, index) => (
//                       <div key={index} className="flex items-center">
//                         <CheckIcon className="w-4 h-4 ml-2 text-green-600" />
//                         <span>سفارش بیش از {discount.quantity} عدد: {discount.discountPercentage}٪ تخفیف</span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>برای این محصول تخفیف عمده تعریف نشده است.</p>
//                 )}
//                 <p className="pt-2 border-t border-neutral-100">
//                   برای اطلاع از شرایط ویژه و قیمت‌های اختصاصی با کارشناسان ما تماس بگیرید.
//                 </p>
//               </div>
//             )}
//           </div>
          
//           {/* شرایط مرجوعی */}
//           <div className="border-b border-neutral-200 pb-4 mb-4">
//             <button
//               className="w-full flex justify-between items-center focus:outline-none"
//               onClick={() => toggleSection('returns')}
//             >
//               <div className="flex items-center">
//                 <ClockIcon className="w-5 h-5 ml-2 text-neutral-600" />
//                 <h3 className="font-bold">شرایط مرجوعی</h3>
//               </div>
//               {expandedSections.returns ? (
//                 <ChevronUpIcon className="w-5 h-5 text-neutral-500" />
//               ) : (
//                 <ChevronDownIcon className="w-5 h-5 text-neutral-500" />
//               )}
//             </button>
            
//             {expandedSections.returns && (
//               <div className="mt-3 text-sm text-neutral-600 space-y-3">
//                 <p>
//                   <span className="font-medium">گارانتی اصالت:</span> تمامی محصولات دارای گارانتی اصالت و سلامت فیزیکی هستند.
//                 </p>
//                 <p>
//                   <span className="font-medium">مهلت مرجوعی:</span> کالاهای خریداری شده تا ۷ روز قابل مرجوع هستند.
//                 </p>
//                 <p>
//                   <span className="font-medium">شرایط مرجوعی:</span> کالا باید بدون استفاده، به همراه برچسب و در بسته‌بندی اصلی باشد.
//                 </p>
//               </div>
//             )}
//           </div>
          
//           {/* اطلاعات تماس پشتیبانی */}
//           <div>
//             <h3 className="font-bold mb-3">پشتیبانی و مشاوره خرید</h3>
//             <div className="text-sm text-neutral-600 space-y-3">
//               <p>
//                 <span className="font-medium">شماره تماس:</span> ۰۲۱-۱۲۳۴۵۶۷۸
//               </p>
//               <p>
//                 <span className="font-medium">ساعات پاسخگویی:</span> شنبه تا پنج‌شنبه ۹ الی ۱۸
//               </p>
//               <p>
//                 <span className="font-medium">پشتیبانی آنلاین:</span> از طریق چت آنلاین سایت
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* محصولات مرتبط */}
//       {relatedProducts.length > 0 && (
//         <div className="bg-white rounded-lg shadow-card p-6 mb-6">
//           <h2 className="text-xl font-bold mb-6">محصولات مرتبط</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {relatedProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;