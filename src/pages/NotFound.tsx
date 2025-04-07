import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  return (
    <div className="container-custom max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-lg shadow-card p-8">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">صفحه مورد نظر یافت نشد!</h1>
        <p className="text-neutral-600 mb-8 text-lg">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            as={Link}
            to="/"
            className="flex items-center justify-center"
          >
            <HomeIcon className="w-5 h-5 ml-2" />
            بازگشت به صفحه اصلی
          </Button>
          <Button
            variant="outline"
            size="lg"
            as={Link}
            to="/products"
            className="flex items-center justify-center"
          >
            مشاهده محصولات
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;