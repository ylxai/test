import { Metadata } from 'next';
import RegisterForm from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Register | Hafiportrait',
  description: 'Daftar akun baru di Hafiportrait',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Daftar Akun Baru
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Atau{' '}
            <a href="/login" className="font-medium text-rose-600 hover:text-rose-500">
              masuk ke akun yang sudah ada
            </a>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}