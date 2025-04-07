import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  UserIcon, 
  HeartIcon, 
  MapPinIcon, 
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';
import Header from './Header';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuthStore();

  const sidebarLinks = [
    { to: '/dashboard', text: 'داشبورد', icon: <HomeIcon className="w-5 h-5" /> },
    { to: '/dashboard/orders', text: 'سفارش‌های من', icon: <ShoppingBagIcon className="w-5 h-5" /> },
    { to: '/dashboard/profile', text: 'اطلاعات حساب', icon: <UserIcon className="w-5 h-5" /> },
    { to: '/dashboard/favorites', text: 'محصولات مورد علاقه', icon: <HeartIcon className="w-5 h-5" /> },
    { to: '/dashboard/addresses', text: 'آدرس‌های من', icon: <MapPinIcon className="w-5 h-5" /> },
    { to: '/dashboard/messages', text: 'پیام‌ها', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
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
          <h1 className="text-xl font-bold">پنل کاربری</h1>
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
              <div className="w-20 h-20 mx-auto bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold">{user?.name?.charAt(0) || 'K'}</span>
              </div>
              <h3 className="font-bold text-lg">{user?.name || 'کاربر عزیز'}</h3>
              <p className="text-sm text-neutral-500">{user?.email || ''}</p>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  end={link.to === '/dashboard'}
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

export default DashboardLayout;