import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EnvelopeIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuthStore } from '../../store/authStore';

const ForgotPassword: React.FC = () => {
  const { resetPassword, loading, error, clearError } = useAuthStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // تعریف مدل اعتبارسنجی با Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('ایمیل نامعتبر است')
      .required('وارد کردن ایمیل الزامی است'),
  });

  // تنظیم Formik
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      clearError();
      try {
        await resetPassword(values.email);
        setIsSubmitted(true);
      } catch (err) {
        // خطا در useAuthStore مدیریت می‌شود
      }
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{isSubmitted ? 'ایمیل بازیابی ارسال شد' : 'بازیابی رمز عبور'}</h1>
          {!isSubmitted && (
            <p className="text-neutral-500 mt-2">
              ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود
            </p>
          )}
        </div>

        {isSubmitted ? (
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-green-100 mb-4">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-neutral-600 mb-6">
              لینک بازیابی رمز عبور به آدرس ایمیل <span className="font-bold">{formik.values.email}</span> ارسال شد. لطفاً ایمیل خود را بررسی کنید و روی لینک ارسال شده کلیک کنید.
            </p>
            <div className="text-center mt-6">
              <Link to="/auth/login" className="text-primary-600 hover:text-primary-800 font-medium">
                بازگشت به صفحه ورود
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

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

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              className="mt-6 mb-4"
            >
              ارسال لینک بازیابی
            </Button>

            <div className="text-center">
              <Link to="/auth/login" className="text-primary-600 hover:text-primary-800 flex items-center justify-center">
                <ArrowRightIcon className="w-4 h-4 ml-1" />
                بازگشت به صفحه ورود
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;