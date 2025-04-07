import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'wholesaler';
  phone?: string;
  company?: string;
  approved?: boolean;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isWholesaler: boolean;
  isApproved: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      isWholesaler: false,
      isApproved: false,
      loading: false,
      error: null,

      // ورود به سیستم
      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          
          // در محیط واقعی از api استفاده می‌شود
          // const { data } = await authService.login(email, password);
          
          // داده‌های ساختگی
          const mockData = {
            user: {
              id: '1',
              name: 'کاربر تست',
              email: email,
              role: email.includes('admin') ? 'admin' : 'user',
              createdAt: new Date(),
            } as User,
            token: 'mock-token-123456',
          };
          
          set({
            user: mockData.user,
            token: mockData.token,
            isAuthenticated: true,
            isAdmin: mockData.user.role === 'admin',
            isWholesaler: mockData.user.role === 'wholesaler',
            isApproved: mockData.user.approved === true,
            loading: false,
          });
        } catch (error) {
          set({
            error: 'نام کاربری یا رمز عبور اشتباه است',
            loading: false,
          });
        }
      },

      // ثبت‌نام
      register: async (userData, password) => {
        try {
          set({ loading: true, error: null });
          
          // در محیط واقعی از api استفاده می‌شود
          // const { data } = await authService.register(userData, password);
          
          // داده‌های ساختگی
          const mockData = {
            user: {
              id: '2',
              name: userData.name || 'کاربر جدید',
              email: userData.email || 'test@example.com',
              role: userData.role || 'user',
              phone: userData.phone,
              company: userData.company,
              approved: userData.role === 'wholesaler' ? false : true,
              createdAt: new Date(),
            } as User,
            token: 'mock-token-654321',
          };
          
          set({
            user: mockData.user,
            token: mockData.token,
            isAuthenticated: true,
            isAdmin: mockData.user.role === 'admin',
            isWholesaler: mockData.user.role === 'wholesaler',
            isApproved: mockData.user.approved === true,
            loading: false,
          });
        } catch (error) {
          set({
            error: 'ثبت‌نام با مشکل مواجه شد',
            loading: false,
          });
        }
      },

      // خروج از سیستم
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
          isWholesaler: false,
          isApproved: false,
        });
      },

      // به‌روزرسانی اطلاعات کاربر
      updateUser: async (userData) => {
        try {
          set({ loading: true, error: null });
          
          // در محیط واقعی از api استفاده می‌شود
          // const { data } = await authService.updateUser(userData);
          
          const currentUser = get().user;
          
          if (!currentUser) {
            throw new Error('کاربر یافت نشد');
          }
          
          // به‌روزرسانی اطلاعات کاربر
          const updatedUser = {
            ...currentUser,
            ...userData,
          };
          
          set({
            user: updatedUser,
            isAdmin: updatedUser.role === 'admin',
            isWholesaler: updatedUser.role === 'wholesaler',
            isApproved: updatedUser.approved === true,
            loading: false,
          });
        } catch (error) {
          set({
            error: 'به‌روزرسانی اطلاعات با مشکل مواجه شد',
            loading: false,
          });
        }
      },

      // بازیابی رمز عبور
      resetPassword: async (email) => {
        try {
          set({ loading: true, error: null });
          
          // در محیط واقعی از api استفاده می‌شود
          // await authService.resetPassword(email);
          
          set({ loading: false });
          // در اینجا فقط loading را به false تغییر می‌دهیم
          // و پیام موفقیت را در کامپوننت نمایش می‌دهیم
        } catch (error) {
          set({
            error: 'بازیابی رمز عبور با مشکل مواجه شد',
            loading: false,
          });
        }
      },

      // پاک کردن خطا
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        isWholesaler: state.isWholesaler,
        isApproved: state.isApproved,
      }),
    }
  )
);