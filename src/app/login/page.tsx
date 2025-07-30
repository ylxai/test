import { Metadata } from 'next';
import LoginForm from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Login | Hafiportrait',
  description: 'Masuk ke akun Hafiportrait Anda',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Masuk ke Akun Anda
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}