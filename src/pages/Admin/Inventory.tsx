import React, { useState, useEffect } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  DocumentArrowDownIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

// تایپ محصول در موجودی
interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  category: string;
  size?: string;
  color?: string;
  inStock: number;
  reservedStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  lastRestocked: Date;
  restockLeadTime: number; // زمان تامین مجدد (روز)
  costPrice: number;
  sellingPrice: number;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

// تایپ تاریخچه موجودی
interface InventoryHistory {
  id: string;
  productId: string;
  date: Date;
  type: 'import' | 'export' | 'adjustment' | 'return';
  quantity: number;
  notes: string;
  userId: string;
  userName: string;
}

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [inventoryHistory, setInventoryHistory] = useState<InventoryHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('productName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showReduceStockModal, setShowReduceStockModal] = useState(false);
  const [stockChangeAmount, setStockChangeAmount] = useState<number>(0);
  const [stockChangeNote, setStockChangeNote] = useState('');

  // داده‌های ساختگی برای موجودی
  useEffect(() => {
    // شبیه‌سازی API
    setLoading(true);
    setTimeout(() => {
      const demoInventory: InventoryItem[] = [
        {
          id: 'inv-001',
          productId: 'p001',
          productName: 'پیراهن مردانه طرح چهارخانه',
          productCode: 'MS-123',
          category: 'پیراهن مردانه',
          size: 'XL',
          color: 'آبی',
          inStock: 45,
          reservedStock: 3,
          minStockLevel: 10,
          maxStockLevel: 100,
          lastRestocked: new Date(2023, 6, 15),
          restockLeadTime: 7,
          costPrice: 120000,
          sellingPrice: 189000,
          location: 'انبار مرکزی - قفسه A12',
          status: 'in-stock'
        },
        {
          id: 'inv-002',
          productId: 'p002',
          productName: 'شلوار جین مردانه',
          productCode: 'MP-456',
          category: 'شلوار مردانه',
          size: '32',
          color: 'مشکی',
          inStock: 8,
          reservedStock: 2,
          minStockLevel: 10,
          maxStockLevel: 80,
          lastRestocked: new Date(2023, 7, 5),
          restockLeadTime: 10,
          costPrice: 180000,
          sellingPrice: 280000,
          location: 'انبار مرکزی - قفسه B24',
          status: 'low-stock'
        },
        {
          id: 'inv-003',
          productId: 'p003',
          productName: 'تی‌شرت زنانه یقه گرد',
          productCode: 'WT-789',
          category: 'تی‌شرت زنانه',
          size: 'M',
          color: 'صورتی',
          inStock: 0,
          reservedStock: 0,
          minStockLevel: 15,
          maxStockLevel: 120,
          lastRestocked: new Date(2023, 5, 20),
          restockLeadTime: 5,
          costPrice: 85000,
          sellingPrice: 149000,
          location: 'انبار مرکزی - قفسه C31',
          status: 'out-of-stock'
        },
        {
          id: 'inv-004',
          productId: 'p004',
          productName: 'مانتو زنانه بهاره',
          productCode: 'WC-321',
          category: 'مانتو زنانه',
          size: 'L',
          color: 'سبز',
          inStock: 22,
          reservedStock: 4,
          minStockLevel: 8,
          maxStockLevel: 60,
          lastRestocked: new Date(2023, 7, 18),
          restockLeadTime: 14,
          costPrice: 280000,
          sellingPrice: 430000,
          location: 'انبار مرکزی - قفسه D15',
          status: 'in-stock'
        },
        {
          id: 'inv-005',
          productId: 'p005',
          productName: 'کت تک مردانه',
          productCode: 'MJ-555',
          category: 'کت مردانه',
          size: 'L',
          color: 'طوسی',
          inStock: 7,
          reservedStock: 1,
          minStockLevel: 5,
          maxStockLevel: 40,
          lastRestocked: new Date(2023, 6, 25),
          restockLeadTime: 20,
          costPrice: 450000,
          sellingPrice: 750000,
          location: 'انبار مرکزی - قفسه A33',
          status: 'low-stock'
        }
      ];

      const demoHistory: InventoryHistory[] = [
        {
          id: 'hist-001',
          productId: 'p001',
          date: new Date(2023, 6, 15),
          type: 'import',
          quantity: 50,
          notes: 'واردات از تولیدی رضایی',
          userId: 'user-001',
          userName: 'علی محمدی'
        },
        {
          id: 'hist-002',
          productId: 'p001',
          date: new Date(2023, 7, 10),
          type: 'export',
          quantity: -5,
          notes: 'سفارش شماره 10045',
          userId: 'user-002',
          userName: 'سارا حسینی'
        },
        {
          id: 'hist-003',
          productId: 'p002',
          date: new Date(2023, 7, 5),
          type: 'import',
          quantity: 20,
          notes: 'واردات از تولیدی احمدی',
          userId: 'user-001',
          userName: 'علی محمدی'
        },
        {
          id: 'hist-004',
          productId: 'p002',
          date: new Date(2023, 7, 20),
          type: 'export',
          quantity: -12,
          notes: 'سفارش شماره 10062',
          userId: 'user-002',
          userName: 'سارا حسینی'
        },
        {
          id: 'hist-005',
          productId: 'p002',
          date: new Date(2023, 8, 2),
          type: 'adjustment',
          quantity: -2,
          notes: 'اصلاح موجودی - کسری انبار',
          userId: 'user-001',
          userName: 'علی محمدی'
        }
      ];

      setInventory(demoInventory);
      setInventoryHistory(demoHistory);
      setLoading(false);
    }, 1000);
  }, []);

  // فیلتر و مرتب‌سازی موجودی
  const filteredInventory = inventory.filter(item => {
    // فیلتر جستجو
    const matchesSearch = searchTerm === '' || 
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    // فیلتر دسته‌بندی
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    // فیلتر وضعیت
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    // مرتب‌سازی بر اساس فیلد انتخاب شده
    const fieldA = a[sortField as keyof InventoryItem];
    const fieldB = b[sortField as keyof InventoryItem];
    
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc' 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
    
    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    }
    
    if (fieldA instanceof Date && fieldB instanceof Date) {
      return sortDirection === 'asc' 
        ? fieldA.getTime() - fieldB.getTime() 
        : fieldB.getTime() - fieldA.getTime();
    }
    
    return 0;
  });

  // تغییر ترتیب مرتب‌سازی
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // فیلتر تاریخچه موجودی برای محصول انتخاب شده
  const filteredHistory = selectedItem
    ? inventoryHistory.filter(h => h.productId === selectedItem.productId)
    : [];

  // محاسبه وضعیت موجودی بر اساس تعداد
  const calculateStatus = (quantity: number, minLevel: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (quantity <= 0) return 'out-of-stock';
    if (quantity < minLevel) return 'low-stock';
    return 'in-stock';
  };

  // تغییر موجودی (افزایش)
  const handleAddStock = () => {
    if (!selectedItem || stockChangeAmount <= 0) return;
    
    // در دنیای واقعی، درخواست به API ارسال می‌شود
    const updatedItem = {
      ...selectedItem,
      inStock: selectedItem.inStock + stockChangeAmount,
      lastRestocked: new Date(),
      status: calculateStatus(selectedItem.inStock + stockChangeAmount, selectedItem.minStockLevel)
    };
    
    // به‌روزرسانی لیست موجودی
    const updatedInventory = inventory.map(item => 
      item.id === selectedItem.id ? updatedItem : item
    );
    
    // افزودن به تاریخچه
    const historyEntry: InventoryHistory = {
      id: `hist-${Date.now()}`,
      productId: selectedItem.productId,
      date: new Date(),
      type: 'import',
      quantity: stockChangeAmount,
      notes: stockChangeNote || 'افزایش موجودی',
      userId: 'current-user', // در دنیای واقعی، از ID کاربر فعلی استفاده می‌شود
      userName: 'کاربر مدیر' // در دنیای واقعی، از نام کاربر فعلی استفاده می‌شود
    };
    
    setInventory(updatedInventory);
    setInventoryHistory([historyEntry, ...inventoryHistory]);
    setSelectedItem(updatedItem);
    setShowAddStockModal(false);
    setStockChangeAmount(0);
    setStockChangeNote('');
    
    toast.success(`موجودی محصول "${selectedItem.productName}" با موفقیت افزایش یافت`);
  };
  
  // تغییر موجودی (کاهش)
  const handleReduceStock = () => {
    if (!selectedItem || stockChangeAmount <= 0 || stockChangeAmount > selectedItem.inStock) return;
    
    // در دنیای واقعی، درخواست به API ارسال می‌شود
    const updatedItem = {
      ...selectedItem,
      inStock: selectedItem.inStock - stockChangeAmount,
      status: calculateStatus(selectedItem.inStock - stockChangeAmount, selectedItem.minStockLevel)
    };
    
    // به‌روزرسانی لیست موجودی
    const updatedInventory = inventory.map(item => 
      item.id === selectedItem.id ? updatedItem : item
    );
    
    // افزودن به تاریخچه
    const historyEntry: InventoryHistory = {
      id: `hist-${Date.now()}`,
      productId: selectedItem.productId,
      date: new Date(),
      type: 'export',
      quantity: -stockChangeAmount,
      notes: stockChangeNote || 'کاهش موجودی',
      userId: 'current-user', // در دنیای واقعی، از ID کاربر فعلی استفاده می‌شود
      userName: 'کاربر مدیر' // در دنیای واقعی، از نام کاربر فعلی استفاده می‌شود
    };
    
    setInventory(updatedInventory);
    setInventoryHistory([historyEntry, ...inventoryHistory]);
    setSelectedItem(updatedItem);
    setShowReduceStockModal(false);
    setStockChangeAmount(0);
    setStockChangeNote('');
    
    toast.success(`موجودی محصول "${selectedItem.productName}" با موفقیت کاهش یافت`);
  };
  
  // دریافت کلاس وضعیت موجودی
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // متن وضعیت موجودی
  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'موجود';
      case 'low-stock':
        return 'کم';
      case 'out-of-stock':
        return 'ناموجود';
      default:
        return 'نامشخص';
    }
  };
  
  // فرمت کردن قیمت
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };
  
  // گرفتن رنگ برای نوع تاریخچه موجودی
  const getHistoryTypeClass = (type: string) => {
    switch (type) {
      case 'import':
        return 'text-green-600';
      case 'export':
        return 'text-red-600';
      case 'adjustment':
        return 'text-yellow-600';
      case 'return':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };
  
  // گرفتن متن نوع تاریخچه موجودی
  const getHistoryTypeText = (type: string) => {
    switch (type) {
      case 'import':
        return 'ورود';
      case 'export':
        return 'خروج';
      case 'adjustment':
        return 'تعدیل';
      case 'return':
        return 'برگشت';
      default:
        return 'نامشخص';
    }
  };

  // دریافت لیست دسته‌بندی‌های منحصر به فرد
  const uniqueCategories = ['all', ...new Set(inventory.map(item => item.category))];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">مدیریت موجودی انبار</h1>
        <div className="flex flex-wrap gap-2">
          <Button 
            className="bg-green-500 text-white hover:bg-green-600 text-sm"
            onClick={() => {
              /* در دنیای واقعی: دانلود گزارش */
              toast.success('دانلود گزارش موجودی شروع شد');
            }}
          >
            <DocumentArrowDownIcon className="h-5 w-5 ml-1" />
            دانلود گزارش موجودی
          </Button>
                            </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4">اطلاعات قیمت</h4>
                      <table className="min-w-full">
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-2 py-2 text-sm font-medium text-gray-500">قیمت خرید:</td>
                            <td className="px-2 py-2 text-sm">{formatPrice(selectedItem.costPrice)}</td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 text-sm font-medium text-gray-500">قیمت فروش:</td>
                            <td className="px-2 py-2 text-sm">{formatPrice(selectedItem.sellingPrice)}</td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 text-sm font-medium text-gray-500">حاشیه سود:</td>
                            <td className="px-2 py-2 text-sm">
                              {(((selectedItem.sellingPrice - selectedItem.costPrice) / selectedItem.costPrice) * 100).toFixed(1)}%
                            </td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 text-sm font-medium text-gray-500">ارزش موجودی:</td>
                            <td className="px-2 py-2 text-sm">
                              {formatPrice(selectedItem.inStock * selectedItem.costPrice)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="flex space-x-4 mt-4">
                      <Button 
                        onClick={() => setShowAddStockModal(true)}
                        className="bg-green-500 text-white hover:bg-green-600 ml-2"
                      >
                        افزایش موجودی
                      </Button>
                      <Button 
                        onClick={() => setShowReduceStockModal(true)}
                        className="bg-red-500 text-white hover:bg-red-600"
                        disabled={selectedItem.inStock <= 0}
                      >
                        کاهش موجودی
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
      
      {/* مودال افزایش موجودی */}
      {showAddStockModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">افزایش موجودی</h3>
              <button 
                onClick={() => setShowAddStockModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                افزایش موجودی برای محصول: <span className="font-semibold">{selectedItem.productName}</span>
              </p>
              <p className="text-gray-700 mb-2">
                موجودی فعلی: <span className="font-semibold">{selectedItem.inStock}</span>
              </p>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">تعداد افزایش:</label>
                <input
                  type="number"
                  min="1"
                  value={stockChangeAmount}
                  onChange={(e) => setStockChangeAmount(parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">توضیحات:</label>
                <textarea
                  value={stockChangeNote}
                  onChange={(e) => setStockChangeNote(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="علت افزایش موجودی..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setShowAddStockModal(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 ml-2"
              >
                انصراف
              </Button>
              <Button 
                onClick={handleAddStock}
                className="bg-green-500 text-white hover:bg-green-600"
                disabled={stockChangeAmount <= 0}
              >
                اعمال تغییرات
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* مودال کاهش موجودی */}
      {showReduceStockModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">کاهش موجودی</h3>
              <button 
                onClick={() => setShowReduceStockModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                کاهش موجودی برای محصول: <span className="font-semibold">{selectedItem.productName}</span>
              </p>
              <p className="text-gray-700 mb-2">
                موجودی فعلی: <span className="font-semibold">{selectedItem.inStock}</span>
              </p>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">تعداد کاهش:</label>
                <input
                  type="number"
                  min="1"
                  max={selectedItem.inStock}
                  value={stockChangeAmount}
                  onChange={(e) => setStockChangeAmount(parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">توضیحات:</label>
                <textarea
                  value={stockChangeNote}
                  onChange={(e) => setStockChangeNote(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="علت کاهش موجودی..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={() => setShowReduceStockModal(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 ml-2"
              >
                انصراف
              </Button>
              <Button 
                onClick={handleReduceStock}
                className="bg-red-500 text-white hover:bg-red-600"
                disabled={stockChangeAmount <= 0 || stockChangeAmount > selectedItem.inStock}
              >
                اعمال تغییرات
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
     