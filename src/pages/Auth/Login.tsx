import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon 
} from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, clearError } = useAuthStore();

  // دریافت مسیر بازگشت (اگر وجود داشته باشد)
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // تعریف مدل اعتبارسنجی با Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('ایمیل نامعتبر است')
      .required('وارد کردن ایمیل الزامی است'),
    password: Yup.string()
      .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
      .required('وارد کردن رمز عبور الزامی است'),
    rememberMe: Yup.boolean(),
  });

  // تنظیم Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      clearError();
      try {
        await login(values.email, values.password);
        toast.success('ورود با موفقیت انجام شد');
        navigate(from);
      } catch (err) {
        // خطا در useAuthStore مدیریت می‌شود
      }
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">ورود به حساب کاربری</h1>
          <p className="text-neutral-500 mt-2">
            برای مشاهده سفارش‌ها و خرید آسان‌تر وارد شوید
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* ایمیل */}
          <Input
            type="email"
            id="email"
            name="email"
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید"
            rightIcon={<EnvelopeIcon className="w-5 h-5" />}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
          />

          {/* به‌خاطرسپاری و فراموشی رمز عبور */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                className="ml-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-neutral-600">
                مرا به خاطر بسپار
              </label>
            </div>
            <Link to="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-800">
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          {/* دکمه ورود */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={loading}
            className="mb-4"
          >
            ورود به حساب کاربری
          </Button>

          {/* لینک ثبت‌نام */}
          <div className="text-center">
            <p className="text-neutral-600">
              حساب کاربری ندارید؟{' '}
              <Link to="/auth/register" className="text-primary-600 hover:text-primary-800 font-medium">
                ثبت‌نام کنید
              </Link>
            </p>
          </div>
        </form>

        {/* بخش ثبت‌نام مشتریان عمده */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <div className="text-center">
            <h2 className="font-bold mb-2">مشتریان عمده</h2>
            <p className="text-sm text-neutral-600 mb-4">
              برای دسترسی به قیمت‌ها و تخفیف‌های ویژه عمده فروشان، ثبت‌نام کنید
            </p>
            <Link 
              to="/wholesale/register" 
              className="btn-secondary inline-block w-full py-2"
            >
              ثبت‌نام مشتریان عمده
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;