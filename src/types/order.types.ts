export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
    discount?: number;
    subtotal: number;
  }
  
  export interface ShippingAddress {
    fullName: string;
    phone: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
    company?: string;
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    discount?: number;
    finalPrice: number;
    shippingCost: number;
    shippingAddress: ShippingAddress;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    trackingCode?: string;
    invoiceNumber?: string;
    notes?: string;
    createdAt: Date;
    updatedAt?: Date;
    deliveredAt?: Date;
  }
  
  export type OrderStatus = 
    | 'pending'      // در انتظار تایید
    | 'processing'   // در حال پردازش
    | 'shipped'      // ارسال شده
    | 'delivered'    // تحویل داده شده
    | 'canceled'     // لغو شده
    | 'returned';    // مرجوع شده
  
  export type PaymentMethod = 
    | 'online'       // پرداخت آنلاین
    | 'card'         // کارت به کارت
    | 'credit'       // اعتباری
    | 'cod';         // پرداخت در محل
  
  export type PaymentStatus = 
    | 'pending'      // در انتظار پرداخت
    | 'paid'         // پرداخت شده
    | 'failed'       // ناموفق
    | 'refunded';    // بازگشت داده شده
  
  export interface OrderSummary {
    totalItems: number;
    subtotal: number;
    discount: number;
    shippingCost: number;
    tax: number;
    finalPrice: number;
  }