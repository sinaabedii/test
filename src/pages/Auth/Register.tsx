import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuthStore();

  // تعریف مدل اعتبارسنجی با Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('وارد کردن نام و نام خانوادگی الزامی است'),
    email: Yup.string()
      .email('ایمیل نامعتبر است')
      .required('وارد کردن ایمیل الزامی است'),
    phone: Yup.string()
      .matches(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
      .required('وارد کردن شماره موبایل الزامی است'),
    password: Yup.string()
      .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
      .required('وارد کردن رمز عبور الزامی است'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'تکرار رمز عبور مطابقت ندارد')
      .required('تکرار رمز عبور الزامی است'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'پذیرش قوانین و مقررات الزامی است'),
  });

  // تنظیم Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      clearError();
      try {
        await register(
          {
            name: values.name,
            email: values.email,
            phone: values.phone,
            role: 'user',
          },
          values.password
        );
        toast.success('ثبت‌نام با موفقیت انجام شد');
        navigate('/dashboard');
      } catch (err) {
        // خطا در useAuthStore مدیریت می‌شود
      }
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">ثبت‌نام در سایت</h1>
          <p className="text-neutral-500 mt-2">
            برای خرید آسان‌تر و پیگیری سفارشات، ثبت‌نام کنید
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* نام و نام خانوادگی */}
          <Input
            type="text"
            id="name"
            name="name"
            label="نام و نام خانوادگی"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            rightIcon={<UserIcon className="w-5 h-5" />}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
          />

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

          {/* شماره موبایل */}
          <Input
            type="tel"
            id="phone"
            name="phone"
            label="شماره موبایل"
            placeholder="شماره موبایل خود را وارد کنید"
            rightIcon={<PhoneIcon className="w-5 h-5" />}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
          />

          {/* رمز عبور */}
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید"
            rightIcon={<LockClosedIcon className="w-5 h-5" />}
            leftIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            }
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
          />

          {/* تکرار رمز عبور */}
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            label="تکرار رمز عبور"
            placeholder="رمز عبور خود را مجدداً وارد کنید"
            rightIcon={<LockClosedIcon className="w-5 h-5" />}
            leftIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            }
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : undefined}
          />

          {/* پذیرش قوانین */}
          <div className="mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formik.values.acceptTerms}
                  onChange={formik.handleChange}
                  className="ml-2 mt-1"
                />
              </div>
              <div className="text-sm">
                <label htmlFor="acceptTerms" className="text-neutral-600">
                  <Link to="/terms" className="text-primary-600 hover:text-primary-800">
                    قوانین و مقررات
                  </Link> سایت را مطالعه کرده و می‌پذیرم
                </label>
                {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.acceptTerms}</p>
                )}
              </div>
            </div>
          </div>

          {/* دکمه ثبت‌نام */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            loading={loading}
            className="mb-4"
          >
            ثبت‌نام
          </Button>

          {/* لینک ورود */}
          <div className="text-center">
            <p className="text-neutral-600">
              قبلاً ثبت‌نام کرده‌اید؟{' '}
              <Link to="/auth/login" className="text-primary-600 hover:text-primary-800 font-medium">
                وارد شوید
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

export default Register;