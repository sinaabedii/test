import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
  minimumOrder?: number;
  bulkDiscount?: {
    quantity: number;
    discountPercentage: number;
  }[];
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateItemOptions: (itemId: string, options: { color?: string; size?: string }) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemSubtotal: (item: CartItem) => number;
  getDiscountPrice: (item: CartItem) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      // افزودن به سبد خرید
      addToCart: (item) => {
        const cartItems = get().cartItems;
        const existingItemIndex = cartItems.findIndex(
          (cartItem) => 
            cartItem.id === item.id && 
            cartItem.color === item.color && 
            cartItem.size === item.size
        );

        if (existingItemIndex >= 0) {
          // اگر محصول قبلاً در سبد خرید وجود دارد، تعداد آن را افزایش می‌دهیم
          const updatedCartItems = [...cartItems];
          updatedCartItems[existingItemIndex].quantity += item.quantity;
          set({ cartItems: updatedCartItems });
        } else {
          // افزودن محصول جدید به سبد خرید
          set({ cartItems: [...cartItems, item] });
        }
      },

      // حذف از سبد خرید
      removeFromCart: (itemId) => {
        const cartItems = get().cartItems;
        set({ cartItems: cartItems.filter((item) => item.id !== itemId) });
      },

      // به‌روزرسانی تعداد
      updateQuantity: (itemId, quantity) => {
        const cartItems = get().cartItems;
        const updatedCartItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ cartItems: updatedCartItems });
      },

      // به‌روزرسانی گزینه‌های محصول (رنگ، سایز و...)
      updateItemOptions: (itemId, options) => {
        const cartItems = get().cartItems;
        const updatedCartItems = cartItems.map((item) =>
          item.id === itemId ? { ...item, ...options } : item
        );
        set({ cartItems: updatedCartItems });
      },

      // پاک کردن سبد خرید
      clearCart: () => {
        set({ cartItems: [] });
      },

      // محاسبه تعداد کل محصولات
      getTotalItems: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      },

      // محاسبه قیمت کل
      getTotalPrice: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce(
          (total, item) => total + get().getItemSubtotal(item),
          0
        );
      },

      // محاسبه قیمت هر محصول با در نظر گرفتن تعداد و تخفیف
      getItemSubtotal: (item) => {
        if (!item.bulkDiscount || item.bulkDiscount.length === 0) {
          return item.price * item.quantity;
        }

        // محاسبه تخفیف عمده براساس تعداد
        const applicableDiscount = item.bulkDiscount
          .filter(discount => item.quantity >= discount.quantity)
          .sort((a, b) => b.quantity - a.quantity)[0];

        if (!applicableDiscount) {
          return item.price * item.quantity;
        }

        // اعمال تخفیف
        const discountMultiplier = 1 - (applicableDiscount.discountPercentage / 100);
        return item.price * item.quantity * discountMultiplier;
      },

      // محاسبه میزان تخفیف
      getDiscountPrice: (item) => {
        if (!item.bulkDiscount || item.bulkDiscount.length === 0) {
          return 0;
        }

        const totalWithoutDiscount = item.price * item.quantity;
        const totalWithDiscount = get().getItemSubtotal(item);
        return totalWithoutDiscount - totalWithDiscount;
      },
    }),
    {
      name: 'cart-store',
    }
  )
);