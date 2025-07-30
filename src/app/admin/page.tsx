```tsx src/app/admin/page.tsx
import { Metadata } from 'next';
import AdminClient from '@/components/admin/admin-client';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Hafiportrait',
  description: 'Panel administrasi untuk mengelola event, galeri, dan data Hafiportrait',
};

export default function AdminPage() {
  return <AdminClient />;
}
```