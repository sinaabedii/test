// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { 
//   PlusIcon, 
//   TrashIcon, 
//   PencilIcon, 
//   MapPinIcon,
//   CheckCircleIcon,
//   XMarkIcon
// } from '@heroicons/react/24/outline';
// import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';
// import Card from '../../components/common/Card';
// import Modal from '../../components/common/Modal';
// import { useAuthStore } from '../../store/authStore';
// import toast from 'react-hot-toast';

// // تایپ آدرس
// interface Address {
//   id: string;
//   fullName: string;
//   phone: string;
//   province: string;
//   city: string;
//   address: string;
//   postalCode: string;
//   isDefault: boolean;
// }

// const Addresses: React.FC = () => {
//   const { user } = useAuthStore();
//   const [addresses, setAddresses] = useState<Address[]>([
//     {
//       id: '1',
//       fullName: user?.name || 'کاربر',
//       phone: '09123456789',
//       province: 'تهران',
//       city: 'تهران',
//       address: 'خیابان ولیعصر، بالاتر از میدان ونک، پلاک 123',
//       postalCode: '1234567890',
//       isDefault: true,
//     },
//     {
//       id: '2',
//       fullName: user?.name || 'کاربر',
//       phone: '09123456789',
//       province: 'تهران',
//       city: 'تهران',
//       address: 'خیابان شریعتی، نرسیده به میدان قدس، پلاک 456',
//       postalCode: '9876543210',
//       isDefault: false,
//     },
//   ]);
  
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

//   // فرم افزودن/ویرایش آدرس
//   const addressFormik = useFormik({
//     initialValues: {
//       fullName: '',
//       phone: '',
//       province: '',
//       city: '',
//       address: '',
//       postalCode: '',
//       isDefault: false,
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string().required('نام و نام خانوادگی الزامی است'),
//       phone: Yup.string()
//         .matches(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
//         .required('شماره موبایل الزامی است'),
//       province: Yup.string().required('استان الزامی است'),
//       city: Yup.string().required('شهر الزامی است'),
//       address: Yup.string().required('آدرس الزامی است'),
//       postalCode: Yup.string()
//         .matches(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد')
//         .required('کد پستی الزامی است'),
//       isDefault: Yup.boolean(),
//     }),
//     onSubmit: (values) => {
//       setLoading(true);
      
//       // شبیه‌سازی ارسال به سرور
//       setTimeout(() => {
//         // اگر در حالت ویرایش هستیم
//         if (editingAddressId) {
//           // ویرایش آدرس
//           const updatedAddresses = addresses.map((addr) => {
//             if (addr.id === editingAddressId) {
//               return { ...values, id: editingAddressId };
//             }
            
//             // اگر آدرس جدید پیش‌فرض است، بقیه آدرس‌ها را از حالت پیش‌فرض خارج می‌کنیم
//             if (values.isDefault && addr.isDefault) {
//               return { ...addr, isDefault: false };
//             }
            
//             return addr;
//           });
          
//           setAddresses(updatedAddresses);
//           toast.success('آدرس با موفقیت ویرایش شد');
//         } else {
//           // افزودن آدرس جدید
//           const newAddress: Address = {
//             ...values,
//             id: `${Date.now()}`,
//           };
          
//           // اگر آدرس جدید پیش‌فرض است، بقیه آدرس‌ها را از حالت پیش‌فرض خارج می‌کنیم
//           let newAddresses;
//           if (values.isDefault) {
//             newAddresses = addresses.map((addr) => ({
//               ...addr,
//               isDefault: false,
//             }));
//           } else {
//             newAddresses = [...addresses];
//           }
          
//           // اگر اولین آدرس است، به صورت پیش‌فرض تنظیم می‌شود
//           if (newAddresses.length === 0) {
//             newAddress.isDefault = true;
//           }
          
//           setAddresses([...newAddresses, newAddress]);
//           toast.success('آدرس جدید با موفقیت اضافه شد');
//         }
        
//         // بستن مودال و ریست فرم
//         setIsModalOpen(false);
//         setEditingAddressId(null);
//         addressFormik.resetForm();
//         setLoading(false);
//       }, 1000);
//     },
//   });

//   // باز کردن مودال افزودن آدرس جدید
//   const handleAddNewAddress = () => {
//     setEditingAddressId(null);
//     addressFormik.resetForm();
//     setIsModalOpen(true);
//   };

//   // باز کردن مودال ویرایش آدرس
//   const handleEditAddress = (address: Address) => {
//     setEditingAddressId(address.id);
//     addressFormik.setValues({
//       fullName: address.fullName,
//       phone: address.phone,
//       province: address.province,
//       city: address.city,
//       address: address.address,
//       postalCode: address.postalCode,
//       isDefault: address.isDefault,
//     });
//     setIsModalOpen(true);
//   };

//   // تغییر آدرس پیش‌فرض
//   const handleSetDefaultAddress = (addressId: string) => {
//     const updatedAddresses = addresses.map((addr) => ({
//       ...addr,
//       isDefault: addr.id === addressId,
//     }));
    
//     setAddresses(updatedAddresses);
//     toast.success('آدرس پیش‌فرض با موفقیت تغییر کرد');
//   };

//   // حذف آدرس
//   const handleRemoveAddress = (addressId: string) => {
//     // اگر آدرس پیش‌فرض است، نمی‌توان آن را حذف کرد
//     const address = addresses.find((addr) => addr.id === addressId);
//     if (address?.isDefault) {
//       toast.error('آدرس پیش‌فرض را نمی‌توان حذف کرد');
//       return;
//     }
    
//     const updatedAddresses = addresses.filter((addr) => addr.id !== addressId);
//     setAddresses(updatedAddresses);
//     setDeleteConfirmationId(null);
//     toast.success('آدرس با موفقیت حذف شد');
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">آدرس‌های من</h1>
        
//         <Button
//           variant="primary"
//           onClick={handleAddNewAddress}
//           className="flex items-center"
//         >
//           <PlusIcon className="w-5 h-5 ml-1" />
//           افزودن آدرس جدید
//         </Button>
//       </div>

//       {addresses.length === 0 ? (
//         <Card className="text-center py-12">
//           <div className="mb-4">
//             <MapPinIcon className="w-16 h-16 mx-auto text-neutral-300" />
//           </div>
//           <h2 className="text-xl font-bold mb-2">هنوز آدرسی ثبت نکرده‌اید</h2>
//           <p className="text-neutral-500 mb-6">
//             برای تسریع در فرآیند خرید، آدرس‌های خود را در این قسمت مدیریت کنید.
//           </p>
//           <Button
//             variant="primary"
//             onClick={handleAddNewAddress}
//             className="inline-block"
//           >
//             افزودن آدرس جدید
//           </Button>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {addresses.map((address) => (
//             <Card key={address.id}>
//               <div className="flex justify-between items-start">
//                 <h3 className="font-bold">{address.fullName}</h3>
                
//                 {address.isDefault && (
//                   <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full inline-flex items-center">
//                     <CheckCircleIcon className="w-3 h-3 ml-1" />
//                     پیش‌فرض
//                   </span>
//                 )}
//               </div>
              
//               <p className="text-neutral-600 text-sm mt-4">
//                 {address.province}، {address.city}، {address.address}
//               </p>
              
//               <div className="flex text-neutral-500 text-sm mt-2">
//                 <span className="ml-4">کد پستی: {address.postalCode}</span>
//                 <span>شماره تماس: {address.phone}</span>
//               </div>
              
//               <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
//                 <div className="flex">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleEditAddress(address)}
//                     className="ml-2"
//                   >
//                     <PencilIcon className="w-4 h-4 ml-1" />
//                     ویرایش
//                   </Button>
                  
//                   {!address.isDefault && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleSetDefaultAddress(address.id)}
//                     className="text-primary-600"
//                   >
//                     تنظیم به عنوان پیش‌فرض
//                   </Button>
//                 )}
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* مودال افزودن/ویرایش آدرس */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingAddressId(null);
//           addressFormik.resetForm();
//         }}
//         title={editingAddressId ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}
//       >
//         <form onSubmit={addressFormik.handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <Input
//               label="نام و نام خانوادگی گیرنده"
//               id="fullName"
//               name="fullName"
//               value={addressFormik.values.fullName}
//               onChange={addressFormik.handleChange}
//               onBlur={addressFormik.handleBlur}
//               error={
//                 addressFormik.touched.fullName && addressFormik.errors.fullName
//                   ? addressFormik.errors.fullName
//                   : undefined
//               }
//             />
            
//             <Input
//               label="شماره موبایل"
//               id="phone"
//               name="phone"
//               value={addressFormik.values.phone}
//               onChange={addressFormik.handleChange}
//               onBlur={addressFormik.handleBlur}
//               error={
//                 addressFormik.touched.phone && addressFormik.errors.phone
//                   ? addressFormik.errors.phone
//                   : undefined
//               }
//             />
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <Input
//               label="استان"
//               id="province"
//               name="province"
//               value={addressFormik.values.province}
//               onChange={addressFormik.handleChange}
//               onBlur={addressFormik.handleBlur}
//               error={
//                 addressFormik.touched.province && addressFormik.errors.province
//                   ? addressFormik.errors.province
//                   : undefined
//               }
//             />
            
//             <Input
//               label="شهر"
//               id="city"
//               name="city"
//               value={addressFormik.values.city}
//               onChange={addressFormik.handleChange}
//               onBlur={addressFormik.handleBlur}
//               error={
//                 addressFormik.touched.city && addressFormik.errors.city
//                   ? addressFormik.errors.city
//                   : undefined
//               }
//             />
//           </div>
          
//           <div className="mb-4">
//             <Input
//               label="آدرس پستی"
//               id="address"
//               name="address"
//               value={addressFormik.values.address}
//               onChange={addressFormik.handleChange}
//               onBlur={addressFormik.handleBlur}
//               error={
//                 addressFormik.touched.address && addressFormik.errors.address
//                   ? addressFormik.errors.address
//                   : undefined
//               }
//             />
//           </div>
          
//           <div className="mb-4">
//             <Input
//               label="کد پستی"
//               id="postalCode"
//               name="postalCode"
//               value={addressFormik.values.postalCode}
//               onChange={addressFormik.handleChange}
//               onBlur={addressFormik.handleBlur}
//               error={
//                 addressFormik.touched.postalCode && addressFormik.errors.postalCode
//                   ? addressFormik.errors.postalCode
//                   : undefined
//               }
//             />
//           </div>
          
//           <div className="mb-6">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="isDefault"
//                 name="isDefault"
//                 checked={addressFormik.values.isDefault}
//                 onChange={addressFormik.handleChange}
//                 className="ml-2"
//               />
//               <label htmlFor="isDefault" className="text-sm font-medium text-neutral-700">
//                 تنظیم به عنوان آدرس پیش‌فرض
//               </label>
//             </div>
//           </div>
          
//           <div className="flex justify-end space-x-2 space-x-reverse">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => {
//                 setIsModalOpen(false);
//                 setEditingAddressId(null);
//                 addressFormik.resetForm();
//               }}
//             >
//               انصراف
//             </Button>
            
//             <Button
//               type="submit"
//               variant="primary"
//               loading={loading}
//             >
//               {editingAddressId ? 'ویرایش آدرس' : 'افزودن آدرس'}
//             </Button>
//           </div>
//         </form>
//       </Modal>

//       {/* مودال تأیید حذف آدرس */}
//       <Modal
//         isOpen={!!deleteConfirmationId}
//         onClose={() => setDeleteConfirmationId(null)}
//         title="حذف آدرس"
//         maxWidth="sm"
//       >
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//             <TrashIcon className="h-6 w-6 text-red-600" />
//           </div>
//           <h3 className="text-lg font-medium text-neutral-900 mb-2">
//             آیا از حذف این آدرس مطمئن هستید؟
//           </h3>
//           <p className="text-sm text-neutral-500 mb-6">
//             این عملیات غیرقابل بازگشت است و پس از حذف، امکان بازیابی آدرس وجود ندارد.
//           </p>
          
//           <div className="flex justify-center space-x-2 space-x-reverse">
//             <Button
//               variant="outline"
//               onClick={() => setDeleteConfirmationId(null)}
//               className="min-w-20"
//             >
//               انصراف
//             </Button>
            
//             <Button
//               variant="danger"
//               onClick={() => deleteConfirmationId && handleRemoveAddress(deleteConfirmationId)}
//               className="min-w-20"
//             >
//               حذف
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Addresses;
                    