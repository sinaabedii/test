// import React from 'react';
// import { Link } from 'react-router-dom';
// import { HeartIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
// import { useFavoriteStore } from '../../store/favoriteStore';
// import { useCartStore } from '../../store/cartStore';
// import Button from '../../components/common/Button';
// import Card from '../../components/common/Card';
// import toast from 'react-hot-toast';

// const Favorites: React.FC = () => {
//   const { favorites, removeFromFavorites, clearFavorites } = useFavoriteStore();
//   const { addToCart } = useCartStore();

//   // افزودن به سبد خرید
//   const handleAddToCart = (product: any) => {
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

//   // حذف از علاقمندی‌ها
//   const handleRemoveFavorite = (productId: string) => {
//     removeFromFavorites(productId);
//     toast.success('محصول از علاقمندی‌ها حذف شد');
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">محصولات مورد علاقه</h1>
        
//         {favorites.length > 0 && (
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => {
//               clearFavorites();
//               toast.success('لیست علاقمندی‌ها خالی شد');
//             }}
//             className="text-red-500 border-red-500 hover:bg-red-50"
//           >
//             <TrashIcon className="w-4 h-4 ml-1" />
//             حذف همه
//           </Button>
//         )}
//       </div>

//       {favorites.length === 0 ? (
//         <Card className="text-center py-12">
//           <div className="mb-4">
//             <HeartIcon className="w-16 h-16 mx-auto text-neutral-300" />
//           </div>
//           <h2 className="text-xl font-bold mb-2">لیست علاقمندی‌های شما خالی است</h2>
//           <p className="text-neutral-500 mb-6">
//             محصولات مورد علاقه خود را به این لیست اضافه کنید تا بعداً به آسانی آن‌ها را پیدا کنید.
//           </p>
//           <Link to="/products" className="btn-primary inline-block px-4 py-2">
//             مشاهده محصولات
//           </Link>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {favorites.map((product) => (
//             <Card key={product.id} className="flex flex-col">
//               <div className="relative h-64 mb-4">
//                 <img
//                   src={product.images[0]}
//                   alt={product.name}
//                   className="w-full h-full object-cover rounded-t-lg"
//                 />
//                 <button
//                   onClick={() => handleRemoveFavorite(product.id)}
//                   className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-neutral-100 transition-colors"
//                 >
//                   <HeartIcon className="w-5 h-5 text-red-500" />
//                 </button>
//               </div>
              
//               <div className="flex-grow p-4 pt-0">
//                 <Link to={`/products/${product.id}`} className="block">
//                   <h3 className="font-bold text-lg mb-1 hover:text-primary-500 transition-colors">
//                     {product.name}
//                   </h3>
//                 </Link>
                
//                 <div className="flex items-center mb-3">
//                   {product.category && (
//                     <Link to={`/category/${product.category}`} className="text-sm text-neutral-500 hover:text-primary-500 transition-colors">
//                       {product.category}
//                     </Link>
//                   )}
                  
//                   {product.brand && (
//                     <>
//                       <span className="mx-1 text-neutral-300">|</span>
//                       <span className="text-sm text-neutral-500">{product.brand}</span>
//                     </>
//                   )}
//                 </div>
                
//                 <div className="flex flex-wrap gap-1 mb-3">
//                   {product.colors.slice(0, 3).map((color: string, index: number) => (
//                     <span key={index} className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
//                       {color}
//                     </span>
//                   ))}
//                   {product.colors.length > 3 && (
//                     <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
//                       +{product.colors.length - 3}
//                     </span>
//                   )}
//                 </div>
                
//                 <div className="mt-auto">
//                   <div className="flex justify-between items-center mb-3">
//                     <div>
//                       {product.originalPrice && product.originalPrice > product.price && (
//                         <span className="text-neutral-400 line-through text-sm ml-2">
//                           {product.originalPrice.toLocaleString()} تومان
//                         </span>
//                       )}
//                       <span className="font-bold">
//                         {product.price.toLocaleString()} تومان
//                       </span>
//                     </div>
//                     {product.inStock ? (
//                       <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">موجود</span>
//                     ) : (
//                       <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">ناموجود</span>
//                     )}
//                   </div>
                  
//                   <div className="flex gap-2">
//                     <Button
//                       variant="primary"
//                       fullWidth
//                       onClick={() => handleAddToCart(product)}
//                       disabled={!product.inStock}
//                     >
//                       <ShoppingCartIcon className="w-5 h-5 ml-1" />
//                       افزودن به سبد خرید
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorites;