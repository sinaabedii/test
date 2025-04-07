import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'password' | 'preferences'>('info');

  // فرم اطلاعات پروفایل
  const profileFormik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: user?.company || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('نام و نام خانوادگی الزامی است'),
      email: Yup.string()
        .email('ایمیل نامعتبر است')
        .required('ایمیل الزامی است'),
      phone: Yup.string()
        .matches(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
        .required('شماره موبایل الزامی است'),
      company: Yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      
      try {
        // در حالت واقعی، اطلاعات به API ارسال می‌شود
        await updateUser(values);
        toast.success('اطلاعات حساب کاربری با موفقیت به‌روزرسانی شد');
      } catch (error) {
        toast.error('خطا در به‌روزرسانی اطلاعات');
      } finally {
        setLoading(false);
      }
    },
  });

  // فرم تغییر رمز عبور
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('رمز عبور فعلی الزامی است'),
      newPassword: Yup.string()
        .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
        .required('رمز عبور جدید الزامی است'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'تکرار رمز عبور مطابقت ندارد')
        .required('تکرار رمز عبور الزامی است'),
    }),
    onSubmit: async (values) => {
      setPasswordLoading(true);
      
      try {
        // در حالت واقعی، اطلاعات به API ارسال می‌شود
        console.log('تغییر رمز عبور:', values);
        
        // شبیه‌سازی ارسال به سرور
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        toast.success('رمز عبور با موفقیت تغییر یافت');
        passwordFormik.resetForm();
      } catch (error) {
        toast.error('خطا در تغییر رمز عبور');
      } finally {
        setPasswordLoading(false);
      }
    },
  });

  // فرم تنظیمات و ترجیحات
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    specialOffers: true,
    newsletterSubscription: false,
  });

  // تغییر وضعیت ترجیحات
  const handlePreferenceChange = (name: string) => {
    setPreferences({
      ...preferences,
      [name]: !preferences[name as keyof typeof preferences],
    });
  };

  // ذخیره ترجیحات
  const savePreferences = () => {
    // در حالت واقعی، اطلاعات به API ارسال می‌شود
    console.log('ترجیحات:', preferences);
    toast.success('تنظیمات با موفقیت ذخیره شد');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">پروفایل کاربری</h1>
      
      {/* تب‌ها */}
      <div className="border-b border-neutral-200 mb-6">
        <div className="flex flex-wrap -mb-px">
          <button
            className={`inline-block py-3 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'info'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('info')}
          >
            اطلاعات حساب کاربری
          </button>
          <button
            className={`inline-block py-3 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'password'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('password')}
          >
            تغییر رمز عبور
          </button>
          <button
            className={`inline-block py-3 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'preferences'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
            onClick={() => setActiveTab('preferences')}
          >
            تنظیمات و ترجیحات
          </button>
        </div>
      </div>
      
      {/* محتوای تب‌ها */}
      {activeTab === 'info' && (
        <Card>
          <h2 className="font-bold text-lg mb-6">ویرایش اطلاعات حساب کاربری</h2>
          
          <form onSubmit={profileFormik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input
                label="نام و نام خانوادگی"
                id="name"
                name="name"
                rightIcon={<UserIcon className="w-5 h-5" />}
                value={profileFormik.values.name}
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
                error={
                  profileFormik.touched.name && profileFormik.errors.name
                    ? profileFormik.errors.name
                    : undefined
                }
              />
              
              <div className="mt-4 text-sm text-neutral-600 bg-neutral-50 p-4 rounded-lg">
                <p className="flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 ml-2 text-neutral-500" />
                  رمز عبور جدید باید حداقل ۶ کاراکتر باشد و شامل حروف و اعداد باشد.
                </p>
              </div>
              
              <div className="flex items-center justify-center mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  loading={passwordLoading}
                  className="min-w-32"
                >
                  تغییر رمز عبور
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}
      
      {activeTab === 'preferences' && (
        <Card>
          <h2 className="font-bold text-lg mb-6">تنظیمات و ترجیحات</h2>
          
          <div className="space-y-6 max-w-2xl">
            <div className="border-b border-neutral-200 pb-6">
              <h3 className="font-medium mb-4">اطلاع‌رسانی‌ها</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="emailNotifications" className="font-medium">
                      اطلاع‌رسانی از طریق ایمیل
                    </label>
                    <p className="text-sm text-neutral-500 mt-1">
                      دریافت اطلاعیه‌های مربوط به سفارش‌ها، تخفیف‌ها و اخبار مهم از طریق ایمیل
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6 mr-2">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      className="sr-only"
                      checked={preferences.emailNotifications}
                      onChange={() => handlePreferenceChange('emailNotifications')}
                    />
                    <span
                      className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${
                        preferences.emailNotifications ? 'bg-primary-500' : 'bg-neutral-200'
                      }`}
                    ></span>
                    <span
                      className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out ${
                        preferences.emailNotifications ? 'translate-x-0' : 'translate-x-6'
                      }`}
                    ></span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="smsNotifications" className="font-medium">
                      اطلاع‌رسانی از طریق پیامک
                    </label>
                    <p className="text-sm text-neutral-500 mt-1">
                      دریافت اطلاعیه‌های مربوط به سفارش‌ها، تخفیف‌ها و اخبار مهم از طریق پیامک
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6 mr-2">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      className="sr-only"
                      checked={preferences.smsNotifications}
                      onChange={() => handlePreferenceChange('smsNotifications')}
                    />
                    <span
                      className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${
                        preferences.smsNotifications ? 'bg-primary-500' : 'bg-neutral-200'
                      }`}
                    ></span>
                    <span
                      className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out ${
                        preferences.smsNotifications ? 'translate-x-0' : 'translate-x-6'
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-b border-neutral-200 pb-6">
              <h3 className="font-medium mb-4">ترجیحات بازاریابی</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="specialOffers" className="font-medium">
                      دریافت پیشنهادات ویژه
                    </label>
                    <p className="text-sm text-neutral-500 mt-1">
                      دریافت اطلاعات مربوط به تخفیف‌های ویژه، پیشنهادات فصلی و فروش‌های ویژه
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6 mr-2">
                    <input
                      type="checkbox"
                      id="specialOffers"
                      className="sr-only"
                      checked={preferences.specialOffers}
                      onChange={() => handlePreferenceChange('specialOffers')}
                    />
                    <span
                      className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${
                        preferences.specialOffers ? 'bg-primary-500' : 'bg-neutral-200'
                      }`}
                    ></span>
                    <span
                      className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out ${
                        preferences.specialOffers ? 'translate-x-0' : 'translate-x-6'
                      }`}
                    ></span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="newsletterSubscription" className="font-medium">
                      اشتراک خبرنامه
                    </label>
                    <p className="text-sm text-neutral-500 mt-1">
                      دریافت اخبار، آموزش‌ها و مقالات مرتبط با صنعت پوشاک و مد
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6 mr-2">
                    <input
                      type="checkbox"
                      id="newsletterSubscription"
                      className="sr-only"
                      checked={preferences.newsletterSubscription}
                      onChange={() => handlePreferenceChange('newsletterSubscription')}
                    />
                    <span
                      className={`absolute inset-0 rounded-full transition duration-200 ease-in-out ${
                        preferences.newsletterSubscription ? 'bg-primary-500' : 'bg-neutral-200'
                      }`}
                    ></span>
                    <span
                      className={`absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition duration-200 ease-in-out ${
                        preferences.newsletterSubscription ? 'translate-x-0' : 'translate-x-6'
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Button
                variant="primary"
                onClick={savePreferences}
                className="min-w-32"
              >
                ذخیره تنظیمات
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* اطلاعات امنیتی حساب کاربری */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 flex items-start">
        <ShieldCheckIcon className="w-6 h-6 text-blue-500 ml-3" />
        <div>
          <h3 className="font-bold text-blue-800">اطلاعات امنیتی حساب کاربری</h3>
          <p className="text-blue-700 text-sm mt-1">
            برای افزایش امنیت حساب کاربری خود، رمز عبور را به صورت دوره‌ای تغییر دهید و از رمز عبور قوی استفاده کنید.
          </p>
          <div className="mt-2">
            <div className="flex items-center text-sm text-blue-700">
              <CheckCircleIcon className="w-4 h-4 ml-1 text-blue-600" />
              آخرین ورود: {new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center text-sm text-blue-700 mt-1">
              <CheckCircleIcon className="w-4 h-4 ml-1 text-blue-600" />
              تاریخ عضویت: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fa-IR') : 'نامشخص'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
              
              