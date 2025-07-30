import { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Heart, Award, Users, Star, MapPin, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang Kami | Hafiportrait',
  description: 'Kenali tim Hafiportrait dan cerita di balik layanan fotografi profesional kami',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-wedding-ivory">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-rose-100 text-rose-800 mb-4">Tentang Kami</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mengabadikan Momen Indah
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hafiportrait adalah studio fotografi profesional yang berdedikasi untuk mengabadikan 
              momen-momen berharga dalam hidup Anda dengan keahlian dan kreativitas yang unik.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Hafiportrait dimulai dari passion sederhana untuk mengabadikan momen-momen indah 
                  dalam hidup. Sejak 2018, kami telah melayani ribuan klien dengan berbagai acara 
                  spesial mereka.
                </p>
                <p>
                  Dari pernikahan yang megah hingga ulang tahun yang intim, dari acara perusahaan 
                  hingga sesi foto keluarga, kami percaya bahwa setiap momen memiliki cerita unik 
                  yang layak untuk diabadikan dengan sempurna.
                </p>
                <p>
                  Tim kami terdiri dari fotografer profesional yang berpengalaman dan berdedikasi 
                  untuk memberikan hasil terbaik. Kami menggunakan peralatan fotografi terkini 
                  dan teknik editing yang modern untuk memastikan setiap foto memiliki kualitas 
                  yang luar biasa.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <Camera className="h-24 w-24 text-rose-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prinsip-prinsip yang memandu setiap langkah kami dalam memberikan layanan terbaik
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Passion</CardTitle>
                <CardDescription>
                  Kami bekerja dengan hati dan dedikasi penuh untuk setiap proyek
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Kualitas</CardTitle>
                <CardDescription>
                  Komitmen untuk memberikan hasil terbaik dengan standar profesional
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Kolaborasi</CardTitle>
                <CardDescription>
                  Bekerja sama dengan klien untuk memahami visi dan kebutuhan mereka
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kenali fotografer profesional yang akan mengabadikan momen spesial Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Camera className="h-12 w-12 text-rose-400" />
                </div>
                <CardTitle>Hafi Rahman</CardTitle>
                <CardDescription>Fotografer Utama & Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Dengan pengalaman lebih dari 5 tahun, Hafi telah mengabadikan ratusan acara 
                  spesial dengan gaya fotografi yang unik dan kreatif.
                </p>
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Camera className="h-12 w-12 text-blue-400" />
                </div>
                <CardTitle>Sarah Putri</CardTitle>
                <CardDescription>Fotografer Senior</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Spesialis dalam fotografi pernikahan dan portrait, Sarah memiliki keahlian 
                  dalam menangkap emosi dan momen-momen candid yang autentik.
                </p>
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Camera className="h-12 w-12 text-green-400" />
                </div>
                <CardTitle>Budi Santoso</CardTitle>
                <CardDescription>Fotografer Event</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Ahli dalam fotografi event dan corporate, Budi memastikan setiap detail 
                  acara terekam dengan sempurna.
                </p>
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-rose-600 mb-2">500+</div>
              <div className="text-gray-600">Event Berhasil</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-rose-600 mb-2">1000+</div>
              <div className="text-gray-600">Klien Puas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-rose-600 mb-2">5+</div>
              <div className="text-gray-600">Tahun Pengalaman</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-rose-600 mb-2">50K+</div>
              <div className="text-gray-600">Foto Diabadikan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
            <p className="text-gray-600">
              Siap untuk mengabadikan momen spesial Anda? Mari diskusikan kebutuhan fotografi Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Lokasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Jl. Sudirman No. 123<br />
                  Jakarta Pusat, 10220
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Telepon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  +62 812-3456-7890<br />
                  +62 821-0987-6543
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  info@hafiportrait.com<br />
                  booking@hafiportrait.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}