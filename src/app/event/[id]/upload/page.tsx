'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, Image, Check, AlertCircle, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useParams, useSearchParams } from 'next/navigation';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function EventUploadPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = params.id as string;
  const eventCode = searchParams.get('code');
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState('tamu');
  const [uploadedCount, setUploadedCount] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);

  useEffect(() => {
    loadEventData();
  }, [eventId, eventCode]);

  const loadEventData = async () => {
    try {
      setLoading(true);
      
      // Simulate API call to validate event code and load event data
      if (!eventCode) {
        toast.error('Kode event tidak ditemukan');
        return;
      }

      // Mock validation - in real app, this would be an API call
      const validCodes = ['WED123', 'BIRTH456'];
      if (!validCodes.includes(eventCode)) {
        toast.error('Kode event tidak valid');
        return;
      }

      setIsCodeValid(true);
      
      // Mock event data - in real app, this would come from API
      const mockEvent: Event = {
        id: eventId,
        name: eventCode === 'WED123' ? 'Wedding Sarah & Budi' : 'Birthday Party Rina',
        date: eventCode === 'WED123' ? '2024-12-15' : '2024-11-20',
        location: eventCode === 'WED123' ? 'Hotel Grand Palace, Jakarta' : 'Restaurant Seafood Garden',
        description: eventCode === 'WED123' ? 'Pernikahan Sarah dan Budi' : 'Ulang tahun Rina ke-25',
        status: eventCode === 'WED123' ? 'upcoming' : 'completed'
      };

      setEvent(mockEvent);
    } catch (error) {
      toast.error('Gagal memuat data event');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      if (file.type.startsWith('image/')) {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error(`File ${file.name} terlalu besar (max 10MB)`);
          return false;
        }
        return true;
      } else {
        toast.error(`File ${file.name} bukan format gambar`);
        return false;
      }
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Pilih foto yang akan diupload');
      return;
    }

    if (!guestName.trim()) {
      toast.error('Masukkan nama Anda');
      return;
    }

    try {
      setUploading(true);
      
      // Simulate upload process
      for (let i = 0; i < selectedFiles.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload delay
        setUploadedCount(i + 1);
      }

      toast.success(`${selectedFiles.length} foto berhasil diupload! Terima kasih ${guestName} ❤️`);
      setSelectedFiles([]);
      setUploadedCount(0);
      setGuestName('');
    } catch (error) {
      toast.error('Gagal upload foto');
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Event['status']) => {
    switch (status) {
      case 'upcoming': return 'Akan Datang';
      case 'ongoing': return 'Sedang Berlangsung';
      case 'completed': return 'Selesai';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat event...</p>
        </div>
      </div>
    );
  }

  if (!isCodeValid || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Event Tidak Ditemukan</CardTitle>
            <CardDescription>
              Kode event tidak valid atau event sudah tidak tersedia
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      {/* Mobile-Optimized Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-6 w-6 text-pink-500 mr-2" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{event.name}</h1>
            </div>
            <p className="text-sm text-gray-600">{event.location}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
            <Badge className={`${getStatusColor(event.status)} mt-2`}>
              {getStatusText(event.status)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="mb-6 border-pink-200 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-lg sm:text-xl text-gray-800">
              Upload Foto Kenangan 📸
            </CardTitle>
            <CardDescription>
              Bagikan momen indah Anda bersama kami! Upload foto ke album yang sesuai.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Album Tabs - Mobile Optimized */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-3 w-full min-w-[300px] bg-white/90 backdrop-blur-sm">
              <TabsTrigger value="tamu" className="text-sm">
                👥 Tamu
              </TabsTrigger>
              <TabsTrigger value="bridesmaid" className="text-sm">
                👰 Bridesmaid
              </TabsTrigger>
              <TabsTrigger value="private" className="text-sm">
                🔒 Private
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tamu Album */}
          <TabsContent value="tamu">
            <Card className="border-pink-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  👥 Album Tamu
                </CardTitle>
                <CardDescription>
                  Upload foto bersama tamu undangan lainnya
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadSection
                  selectedFiles={selectedFiles}
                  onFileSelect={handleFileSelect}
                  onRemoveFile={removeFile}
                  uploading={uploading}
                  uploadedCount={uploadedCount}
                  onUpload={uploadPhotos}
                  guestName={guestName}
                  onGuestNameChange={setGuestName}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bridesmaid Album */}
          <TabsContent value="bridesmaid">
            <Card className="border-pink-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  👰 Album Bridesmaid
                </CardTitle>
                <CardDescription>
                  Foto khusus untuk para bridesmaid dan keluarga dekat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadSection
                  selectedFiles={selectedFiles}
                  onFileSelect={handleFileSelect}
                  onRemoveFile={removeFile}
                  uploading={uploading}
                  uploadedCount={uploadedCount}
                  onUpload={uploadPhotos}
                  guestName={guestName}
                  onGuestNameChange={setGuestName}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Private Album */}
          <TabsContent value="private">
            <Card className="border-pink-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  🔒 Album Private
                </CardTitle>
                <CardDescription>
                  Foto pribadi untuk mempelai (tidak akan dipublikasikan)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadSection
                  selectedFiles={selectedFiles}
                  onFileSelect={handleFileSelect}
                  onRemoveFile={removeFile}
                  uploading={uploading}
                  uploadedCount={uploadedCount}
                  onUpload={uploadPhotos}
                  guestName={guestName}
                  onGuestNameChange={setGuestName}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Thank You Message */}
        <Card className="mt-6 border-pink-200 bg-gradient-to-r from-pink-50 to-blue-50">
          <CardContent className="text-center py-6">
            <Heart className="h-8 w-8 text-pink-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Terima Kasih! 💕
            </h3>
            <p className="text-sm text-gray-600">
              Setiap foto yang Anda bagikan adalah kenangan berharga bagi kami.
              <br />
              Foto akan segera tersedia di galeri event setelah diverifikasi.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Upload Section Component
function UploadSection({
  selectedFiles,
  onFileSelect,
  onRemoveFile,
  uploading,
  uploadedCount,
  onUpload,
  guestName,
  onGuestNameChange
}: {
  selectedFiles: File[];
  onFileSelect: (files: FileList | null) => void;
  onRemoveFile: (index: number) => void;
  uploading: boolean;
  uploadedCount: number;
  onUpload: () => void;
  guestName: string;
  onGuestNameChange: (name: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Guest Name Input */}
      <div>
        <Label htmlFor="guestName" className="text-sm font-medium">
          Nama Anda *
        </Label>
        <Input
          id="guestName"
          placeholder="Masukkan nama Anda"
          value={guestName}
          onChange={(e) => onGuestNameChange(e.target.value)}
          className="mt-1"
          disabled={uploading}
        />
      </div>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center bg-pink-50/50">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onFileSelect(e.target.files)}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="space-y-3">
            <div className="flex justify-center">
              <Camera className="h-12 w-12 text-pink-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Upload Foto</p>
              <p className="text-sm text-gray-500">
                Klik atau drag foto ke sini (maks 10MB per foto)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-pink-300 text-pink-600 hover:bg-pink-50"
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Pilih Foto
            </Button>
          </div>
        </label>
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">
            Foto Terpilih ({selectedFiles.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemoveFile(index)}
                    disabled={uploading}
                    className="text-xs"
                  >
                    Hapus
                  </Button>
                </div>
                <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">
              Mengupload foto...
            </span>
            <span className="text-sm text-blue-600">
              {uploadedCount}/{selectedFiles.length}
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(uploadedCount / selectedFiles.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Upload Button */}
      <Button
        onClick={onUpload}
        disabled={selectedFiles.length === 0 || !guestName.trim() || uploading}
        className="w-full bg-pink-600 hover:bg-pink-700"
        size="lg"
      >
        {uploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Mengupload...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Upload {selectedFiles.length} Foto
          </>
        )}
      </Button>
    </div>
  );
} 