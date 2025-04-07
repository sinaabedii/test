import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  ChartPieIcon, 
  CubeIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  ArchiveBoxIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';
import Header from './Header';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuthStore();

  const sidebarLinks = [
    { to: '/admin', text: 'داشبورد', icon: <ChartPieIcon className="w-5 h-5" /> },
    { to: '/admin/products', text: 'محصولات', icon: <CubeIcon className="w-5 h-5" /> },
    { to: '/admin/orders', text: 'سفارش‌ها', icon: <ShoppingCartIcon className="w-5 h-5" /> },
    { to: '/admin/customers', text: 'مشتریان', icon: <UsersIcon className="w-5 h-5" /> },
    { to: '/admin/inventory', text: 'موجودی انبار', icon: <ArchiveBoxIcon className="w-5 h-5" /> },
    { to: '/admin/reports', text: 'گزارش‌ها', icon: <DocumentChartBarIcon className="w-5 h-5" /> },
    { to: '/admin/settings', text: 'تنظیمات', icon: <Cog6ToothIcon className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    // انتقال به صفحه اصلی بعد از خروج
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container-custom flex flex-col md:flex-row flex-grow py-6">
        {/* دکمه منو برای موبایل */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">پنل مدیریت</h1>
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100"
          >
            {sidebarOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* سایدبار */}
        <aside className={`w-full md:w-64 md:flex-shrink-0 md:block transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow-card p-4 sticky top-20">
            <div className="mb-6 text-center">
              <div className="w-20 h-20 mx-auto bg-primary-700 text-white rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">مدیر</span>
              </div>
              <h3 className="font-bold text-lg">{user?.name || 'ادمین سیستم'}</h3>
              <p className="text-sm text-neutral-500">{user?.email || ''}</p>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  end={link.to === '/admin'}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`
                  }
                >
                  {link.icon}
                  <span className="mr-3">{link.text}</span>
                </NavLink>
              ))}

              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 rounded-md transition-colors text-red-600 hover:bg-red-50"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="mr-3">خروج از حساب</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* محتوای اصلی */}
        <main className="flex-grow md:mr-8 mt-4 md:mt-0">
          <div className="bg-white rounded-lg shadow-card p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
