import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// لی‌اوت‌ها
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';

// صفحات عمومی
import Home from './pages/Home';

// صفحات محصولات
import ProductList from './pages/Products/ProductList';
import ProductDetail from './pages/Products/ProductDetail';
import CategoryProducts from './pages/Products/CategoryProducts';

// صفحات احراز هویت
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

// صفحات سبد خرید و سفارش
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Checkout';
import OrderSuccess from './pages/Cart/OrderSuccess';

// صفحات داشبورد کاربر
import UserDashboard from './pages/Dashboard/Dashboard';
import UserOrders from './pages/Dashboard/Orders';
import UserProfile from './pages/Dashboard/Profile';
import UserFavorites from './pages/Dashboard/Favorites';
import UserAddresses from './pages/Dashboard/Addresses';

// صفحات مدیریت
import AdminDashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/Products';
import AdminOrders from './pages/Admin/Orders';
import AdminCustomers from './pages/Admin/Customers';




// کامپوننت محافظت شده
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// مدیریت حالت
import { useAuthStore } from './store/authStore';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Stores from './pages/Stores';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  // بررسی وضعیت ورود کاربر
  const { isAuthenticated, isAdmin } = useAuthStore();

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* مسیرهای عمومی */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="category/:category" element={<CategoryProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="terms" element={<Terms />} />
          <Route path="stores" element={<Stores />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* مسیرهای احراز هویت */}
        <Route path="/auth" element={<MainLayout />}>
          <Route path="login" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          } />
          <Route path="register" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
          } />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* مسیرهای پرداخت - نیاز به احراز هویت */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success/:id" element={<OrderSuccess />} />
        </Route>

        {/* مسیرهای داشبورد کاربر */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<UserDashboard />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="favorites" element={<UserFavorites />} />
          <Route path="addresses" element={<UserAddresses />} />
          <Route path="messages" element={<UserMessages />} />
        </Route>

        {/* مسیرهای پنل مدیر */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;