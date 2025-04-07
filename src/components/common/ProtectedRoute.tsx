import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();

  // اگر در حال بارگیری هستیم، یک نشانگر لودینگ نشان می‌دهیم
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
        <span className="mr-3 text-neutral-600">در حال بارگیری...</span>
      </div>
    );
  }

  // اگر کاربر لاگین نکرده است، به صفحه ورود هدایت می‌شود
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // اگر کاربر لاگین کرده است، محتوای اصلی نمایش داده می‌شود
  return <>{children}</>;
};

export default ProtectedRoute;