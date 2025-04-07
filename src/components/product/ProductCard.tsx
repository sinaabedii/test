// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
// import { useAuthStore } from '../../store/authStore';
// import { useCartStore } from '../../store/cartStore';
// import { useFavoriteStore } from '../../store/favoriteStore';
// import { Product } from '../../types/product.types';
// import Button from '../common/Button';
// import toast from 'react-hot-toast';

// interface ProductCardProps {
//   product: Product;
//   className?: string;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const { isAuthenticated } = useAuthStore();
//   const { addToCart } = useCartStore();
//   const { favorites, addToFavorites, removeFromFavorites } = useFavoriteStore();
  
//   // بررسی در علاقمندی‌ها بودن محصول
//   const isFavorite = favorites.some(fav => fav.id === product.id);

//   // تخفیف محصول (اگر وجود داشته باشد)
//   const discount = product.originalPrice && product.originalPrice > product.price
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   // افزودن به سبد خرید
//   const handleAddToCart = () => {
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: product.images[0],
//       quantity: 1,
//       color: product.colors[0],
//       size: product.sizes[0],
//     });
//     toast.success('محصول به سبد خرید اضافه شد');
//   };

//   // افزودن یا حذف از علاقمندی‌ها
//   const toggleFavorite = () => {
//     if (!isAuthenticated) {
//       toast.error('لطفاً ابتدا وارد حساب کاربری خود شوید');
//       return;
//     }

//     if (isFavorite) {
//       removeFromFavorites(product.id);
//       toast.success('محصول از علاقمندی‌ها حذف شد');
//     } else {
//       addToFavorites(product);
//       toast.success('محصول به علاقمندی‌ها اضافه شد');
//     }
//   };
  
//   return (
//     <div 
//       className={`bg-white rounded-lg shadow-card overflow-hidden transition-all duration-200 ${className}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* تصویر محصول */}
//       <div className="relative overflow-hidden h-64">
//         <Link to={`/products/${product.id}`}>
//           <img 
//             src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]} 
//             alt={product.name}
//             className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//           />
//         </Link>

//         {/* نشانگر تخفیف */}
//         {discount > 0 && (
//           <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
//             {discount}% تخفیف
//           </div>
//         )}

//         {/* دکمه افزودن به علاقمندی‌ها */}
//         <button 
//           onClick={toggleFavorite}
//           className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-neutral-100 transition-colors"
//         >
//           {isFavorite ? (
//             <HeartIconSolid className="w-5 h-5 text-red-500" />
//           ) : (
//             <HeartIcon className="w-5 h-5 text-neutral-500" />
//           )}
//         </button>

//         {/* نوار اکشن در حالت هاور */}
//         <div 
//           className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-2 px-4 transition-all duration-300 ${
//             isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
//           }`}
//         >
//           <Button 
//             onClick={handleAddToCart}
//             variant="primary" 
//             fullWidth 
//             size="sm"
//           >
//             <ShoppingCartIcon className="w-4 h-4 ml-1" />
//             افزودن به سبد خرید
//           </Button>
//         </div>
//       </div>

//       {/* اطلاعات محصول */}
//       <div className="p-4">
//         <Link to={`/products/${product.id}`} className="block">
//           <h3 className="font-bold text-lg mb-1 hover:text-primary-500 transition-colors">
//             {product.name}
//           </h3>
//         </Link>
        
//         <div className="flex items-center mb-2">
//           {product.category && (
//             <Link to={`/category/${product.category}`} className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">
//               {product.category}
//             </Link>
//           )}
          
//           {product.brand && (
//             <>
//               <span className="mx-1 text-neutral-300">|</span>
//               <span className="text-sm text-neutral-500">{product.brand}</span>
//             </>
//           )}
//         </div>
        
//         {/* قیمت‌ها */}
//         <div className="flex items-center justify-between mt-2">
//           <div>
//             {discount > 0 && product.originalPrice && (
//               <span className="text-neutral-400 line-through text-sm ml-2">
//                 {product.originalPrice.toLocaleString()} تومان
//               </span>
//             )}
//             <span className="font-bold text-lg">
//               {product.price.toLocaleString()} تومان
//             </span>
//           </div>

//           {/* موجودی */}
//           {product.inStock ? (
//             <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">موجود</span>
//           ) : (
//             <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">ناموجود</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;