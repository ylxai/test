'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validasi form
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Nama, email, dan pesan harus diisi');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Format email tidak valid');
      }

      // Simulasi pengiriman form
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: ''
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal mengirim pesan');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Pesan Terkirim!
          </h3>
          <p className="text-gray-600 mb-6">
            Terima kasih telah menghubungi kami. Tim Hafiportrait akan menghubungi Anda 
            dalam waktu 24 jam untuk mendiskusikan kebutuhan fotografi Anda.
          </p>
          <Button 
            onClick={() => setSubmitted(false)}
            variant="outline"
          >
            Kirim Pesan Lain
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@contoh.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="08123456789"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType">Jenis Acara</Label>
              <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis acara" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Pernikahan</SelectItem>
                  <SelectItem value="birthday">Ulang Tahun</SelectItem>
                  <SelectItem value="corporate">Acara Perusahaan</SelectItem>
                  <SelectItem value="family">Foto Keluarga</SelectItem>
                  <SelectItem value="graduation">Wisuda</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate">Tanggal Acara</Label>
            <Input
              id="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Pesan *</Label>
            <Textarea
              id="message"
              placeholder="Ceritakan detail acara Anda, lokasi, jumlah tamu, dan kebutuhan khusus lainnya..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={5}
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tips:</strong> Semakin detail informasi yang Anda berikan, 
              semakin baik kami dapat memahami kebutuhan Anda dan memberikan penawaran yang tepat.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim Pesan...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Kirim Pesan
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Dengan mengirim pesan ini, Anda menyetujui{' '}
            <a href="/privacy" className="text-rose-600 hover:text-rose-500">
              kebijakan privasi
            </a>{' '}
            kami.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}