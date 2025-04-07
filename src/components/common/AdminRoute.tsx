import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuthStore();

  // اگر در حال بارگیری هستیم، یک نشانگر لودینگ نشان می‌دهیم
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
        <span className="mr-3 text-neutral-600">در حال بارگیری...</span>
      </div>
    );
  }

  // اگر کاربر لاگین نکرده یا ادمین نیست، به صفحه اصلی هدایت می‌شود
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // اگر کاربر ادمین است، محتوای پنل مدیریت نمایش داده می‌شود
  return <>{children}</>;
};

export default AdminRoute;