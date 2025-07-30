# Hafiportrait - Next.js Migration

Aplikasi Hafiportrait yang telah dimigrasikan dari Vite/Express ke Next.js menggunakan App Router.

## 🚀 Fitur Utama

### Admin Dashboard
- **Overview**: Dashboard dengan statistik event, foto, dan tamu
- **Event Management**: 
  - ✅ Create, Edit, Delete Event
  - ✅ Upload foto ke event dengan album (Private, Tamu, Bridesmaid)
  - ✅ Manajemen status event (upcoming, ongoing, completed)
- **Gallery Management**: Upload foto ke galeri homepage
- **Upload Management**: Interface terpisah untuk upload ke event dan galeri
- **Analytics**: Statistik performa event dan foto

### Event Pages
- **Tab Galeri**: 
  - ✅ Album Private, Tamu, Bridesmaid
  - ✅ Search dan filter foto
  - ✅ Sort by newest, oldest, most liked, most downloaded
- **Guestbook**: 
  - ✅ Form untuk menulis pesan
  - ✅ Tampilan pesan dari tamu
  - ✅ Timestamp dan nama pengirim
- **Photo Lightbox**: 
  - ✅ Like, Download, Share, Slideshow di dalam lightbox
  - ✅ Zoom in/out, rotate, reset view
  - ✅ Keyboard navigation (arrow keys, escape, spacebar)
  - ✅ Thumbnail strip untuk navigasi cepat
  - ✅ Progress bar untuk slideshow

### Authentication
- ✅ Login page (Register dihapus sesuai permintaan)
- ✅ Form validation dengan toast notifications

## 🛠 Teknologi yang Digunakan

- **Framework**: Next.js 15.4.5 dengan App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: Sonner
- **Type Safety**: TypeScript
- **State Management**: React Hooks
- **Mock Data**: Custom storage service

## 📁 Struktur Project

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── event/[id]/        # Dynamic event pages
│   ├── login/             # Login page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── admin/            # Admin dashboard components
│   ├── events/           # Event-related components
│   ├── auth/             # Authentication components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Other components
├── lib/                  # Utilities and services
│   └── storage.ts        # Mock storage service
└── styles/               # Global styles
```

## 🎯 Halaman yang Dibuat

### 1. Admin Dashboard (`/admin`)
- **Overview Tab**: Statistik dashboard
- **Events Tab**: Manajemen event dengan CRUD operations
- **Gallery Tab**: Manajemen foto galeri homepage
- **Uploads Tab**: Interface upload terpisah
- **Analytics Tab**: Statistik performa

### 2. Event Detail (`/event/[id]`)
- **Gallery Tab**: 
  - Album tabs (Private, Tamu, Bridesmaid)
  - Search dan filter
  - Photo grid dengan hover effects
- **Guestbook Tab**: 
  - Form input pesan
  - Daftar pesan tamu

### 3. Login Page (`/login`)
- Form login dengan email/password
- Remember me dan forgot password
- Social login placeholders

### 4. About Page (`/about`)
- Company story dan values
- Team information
- Statistics

### 5. Contact Page (`/contact`)
- Contact form
- Contact information
- FAQ section
- Map placeholder

## 🔧 Fitur yang Diimplementasikan

### Admin Dashboard Enhancements
- ✅ **Add Event**: Form lengkap untuk membuat event baru
- ✅ **Edit Event**: Form untuk mengedit event yang ada
- ✅ **Delete Event**: Konfirmasi dan penghapusan event
- ✅ **Upload to Event**: Upload foto dengan pilihan album
- ✅ **Upload to Gallery**: Upload foto ke galeri homepage

### Event Page Enhancements
- ✅ **Album Tabs**: Private, Tamu, Bridesmaid dengan counter
- ✅ **Guestbook**: Form dan tampilan pesan tamu
- ✅ **Enhanced Lightbox**: 
  - Like, download, share, slideshow
  - Zoom, rotate, reset view
  - Keyboard navigation
  - Thumbnail strip
  - Progress bar

### UI/UX Improvements
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Toast Notifications**: Feedback untuk user actions
- ✅ **Loading States**: Skeleton dan spinner
- ✅ **Error Handling**: Graceful error handling
- ✅ **Accessibility**: Keyboard navigation dan screen reader support

## 🚀 Cara Menjalankan

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 📱 Responsive Design

Aplikasi dioptimalkan untuk:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔒 Security Features

- Type-safe API calls
- Input validation
- XSS protection
- CSRF protection (dalam implementasi nyata)

## 📊 Performance

- **Code Splitting**: Otomatis dengan Next.js
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Komponen dan gambar
- **Bundle Analysis**: Optimized build size

## 🎨 Design System

- **Colors**: Wedding theme dengan rose-gold accent
- **Typography**: Playfair Display untuk headings
- **Components**: shadcn/ui untuk konsistensi
- **Icons**: Lucide React untuk iconography

## 🔄 Migration Notes

### Dari Vite/Express ke Next.js
- ✅ Server-side rendering untuk SEO
- ✅ App Router untuk routing modern
- ✅ Built-in API routes
- ✅ Image optimization
- ✅ Automatic code splitting

### Perubahan Utama
- ✅ Hapus fungsi register
- ✅ Enhanced admin dashboard
- ✅ Tab galeri dengan album
- ✅ Guestbook functionality
- ✅ Advanced photo lightbox
- ✅ Improved UX/UI

## 🚧 TODO (Future Enhancements)

- [ ] Real API integration (mengganti mock storage)
- [ ] Image upload dengan cloud storage
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Payment integration
- [ ] Multi-language support
- [ ] PWA features

## 📄 License

MIT License - lihat file LICENSE untuk detail.

---

**Hafiportrait** - Capturing moments, creating memories.
