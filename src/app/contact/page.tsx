import { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ContactForm from '@/components/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Mail, Phone, Clock, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontak | Hafiportrait',
  description: 'Hubungi tim Hafiportrait untuk konsultasi dan booking layanan fotografi profesional',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-wedding-ivory">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Siap untuk mengabadikan momen spesial Anda? Mari diskusikan kebutuhan fotografi 
              Anda dengan tim profesional kami.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
              <p className="text-gray-600 mb-8">
                Isi form di bawah ini dan kami akan menghubungi Anda dalam waktu 24 jam.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
                <p className="text-gray-600 mb-8">
                  Berikut adalah berbagai cara untuk menghubungi tim Hafiportrait.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-rose-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Alamat Studio</CardTitle>
                        <CardDescription>Lokasi studio kami</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Jl. Sudirman No. 123<br />
                      Jakarta Pusat, 10220<br />
                      Indonesia
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Telepon</CardTitle>
                        <CardDescription>Hubungi kami langsung</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <strong>Customer Service:</strong><br />
                        +62 812-3456-7890
                      </p>
                      <p className="text-gray-600">
                        <strong>Booking:</strong><br />
                        +62 821-0987-6543
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Email</CardTitle>
                        <CardDescription>Kirim email kepada kami</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <strong>Informasi Umum:</strong><br />
                        info@hafiportrait.com
                      </p>
                      <p className="text-gray-600">
                        <strong>Booking & Reservasi:</strong><br />
                        booking@hafiportrait.com
                      </p>
                      <p className="text-gray-600">
                        <strong>Support:</strong><br />
                        support@hafiportrait.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Jam Operasional</CardTitle>
                        <CardDescription>Waktu layanan kami</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Senin - Jumat:</span>
                        <span className="font-medium">09:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sabtu:</span>
                        <span className="font-medium">09:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Minggu:</span>
                        <span className="font-medium">10:00 - 15:00</span>
                      </div>
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Catatan:</strong> Untuk event di luar jam operasional, 
                          silakan hubungi kami terlebih dahulu.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pertanyaan Umum</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-rose-600" />
                  Berapa lama waktu pengerjaan foto?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Waktu pengerjaan bervariasi tergantung jenis acara dan jumlah foto. 
                  Untuk event kecil (1-2 hari), untuk event besar (3-5 hari kerja).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-rose-600" />
                  Apakah ada biaya tambahan untuk lokasi jauh?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ya, untuk lokasi di luar Jakarta akan dikenakan biaya transportasi 
                  dan akomodasi sesuai dengan jarak dan durasi acara.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-rose-600" />
                  Bagaimana dengan hak cipta foto?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Klien mendapatkan hak untuk menggunakan foto untuk keperluan pribadi. 
                  Untuk penggunaan komersial, silakan diskusikan dengan tim kami.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-rose-600" />
                  Apakah tersedia layanan editing foto?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ya, semua paket sudah termasuk basic editing. Untuk editing khusus 
                  atau retouching lanjutan tersedia sebagai layanan tambahan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lokasi Studio</h2>
            <p className="text-gray-600">
              Kunjungi studio kami untuk melihat portfolio dan berdiskusi langsung
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Peta lokasi akan ditampilkan di sini</p>
              <p className="text-sm text-gray-500 mt-2">
                Jl. Sudirman No. 123, Jakarta Pusat
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}