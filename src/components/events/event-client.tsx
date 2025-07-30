'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, MapPin, Users, Camera, Download, Share2, Heart, Eye, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import PhotoLightbox from '@/components/photo-lightbox';
import { toast } from 'sonner';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  guestCount: number;
  photoCount: number;
  coverImage?: string;
}

interface Photo {
  id: string;
  eventId: string;
  url: string;
  filename: string;
  uploadedAt: string;
  downloads: number;
  thumbnail?: string;
}

interface EventClientProps {
  event: Event;
}

export default function EventClient({ event }: EventClientProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'downloads' | 'name'>('date');

  useEffect(() => {
    loadPhotos();
  }, [event.id]);

  useEffect(() => {
    filterAndSortPhotos();
  }, [photos, searchTerm, sortBy]);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      // Simulasi loading foto dari API
      const mockPhotos: Photo[] = [
        {
          id: '1',
          eventId: event.id,
          url: '/api/photos/1',
          filename: 'IMG_001.jpg',
          uploadedAt: '2024-11-20T10:30:00Z',
          downloads: 12,
          thumbnail: '/api/photos/1/thumbnail'
        },
        {
          id: '2',
          eventId: event.id,
          url: '/api/photos/2',
          filename: 'IMG_002.jpg',
          uploadedAt: '2024-11-20T10:35:00Z',
          downloads: 8,
          thumbnail: '/api/photos/2/thumbnail'
        },
        {
          id: '3',
          eventId: event.id,
          url: '/api/photos/3',
          filename: 'IMG_003.jpg',
          uploadedAt: '2024-11-20T10:40:00Z',
          downloads: 15,
          thumbnail: '/api/photos/3/thumbnail'
        }
      ];

      setPhotos(mockPhotos);
    } catch (error) {
      toast.error('Gagal memuat foto');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPhotos = () => {
    let filtered = photos;

    // Filter berdasarkan search term
    if (searchTerm) {
      filtered = filtered.filter(photo => 
        photo.filename.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort berdasarkan kriteria
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        case 'downloads':
          return b.downloads - a.downloads;
        case 'name':
          return a.filename.localeCompare(b.filename);
        default:
          return 0;
      }
    });

    setFilteredPhotos(filtered);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
  };

  const handleDownload = async (photo: Photo) => {
    try {
      // Simulasi download
      const link = document.createElement('a');
      link.href = photo.url;
      link.download = photo.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update download count
      setPhotos(prev => prev.map(p => 
        p.id === photo.id ? { ...p, downloads: p.downloads + 1 } : p
      ));

      toast.success('Foto berhasil diunduh');
    } catch (error) {
      toast.error('Gagal mengunduh foto');
    }
  };

  const handleShare = async (photo: Photo) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${event.name} - ${photo.filename}`,
          text: `Lihat foto dari acara ${event.name}`,
          url: `${window.location.origin}/event/${event.id}/photo/${photo.id}`
        });
      } else {
        // Fallback untuk browser yang tidak mendukung Web Share API
        await navigator.clipboard.writeText(`${window.location.origin}/event/${event.id}/photo/${photo.id}`);
        toast.success('Link foto telah disalin ke clipboard');
      }
    } catch (error) {
      toast.error('Gagal membagikan foto');
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, dd MMMM yyyy', { locale: id });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-wedding-ivory">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className={getStatusColor(event.status)}>
              {getStatusText(event.status)}
            </Badge>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
              {event.name}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {event.description}
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {event.guestCount} tamu
              </div>
              <div className="flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                {photos.length} foto
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <Button size="lg" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
                <Eye className="h-5 w-5 mr-2" />
                Lihat Galeri
              </Button>
              <Button variant="outline" size="lg" onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: event.name,
                    text: `Lihat foto dari acara ${event.name}`,
                    url: window.location.href
                  });
                }
              }}>
                <Share2 className="h-5 w-5 mr-2" />
                Bagikan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Galeri Foto
            </h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari foto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Urutkan Foto</DialogTitle>
                      <DialogDescription>
                        Pilih cara mengurutkan foto dalam galeri
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="date"
                          name="sort"
                          value="date"
                          checked={sortBy === 'date'}
                          onChange={(e) => setSortBy(e.target.value as 'date')}
                        />
                        <Label htmlFor="date">Tanggal Upload (Terbaru)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="downloads"
                          name="sort"
                          value="downloads"
                          checked={sortBy === 'downloads'}
                          onChange={(e) => setSortBy(e.target.value as 'downloads')}
                        />
                        <Label htmlFor="downloads">Jumlah Download</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="name"
                          name="sort"
                          value="name"
                          checked={sortBy === 'name'}
                          onChange={(e) => setSortBy(e.target.value as 'name')}
                        />
                        <Label htmlFor="name">Nama File</Label>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Photo Count */}
            <p className="text-gray-600 text-center mb-8">
              {filteredPhotos.length} foto ditemukan
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center py-16">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada foto</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Tidak ada foto yang sesuai dengan pencarian Anda.' : 'Belum ada foto yang diupload untuk acara ini.'}
              </p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-4'}>
              {filteredPhotos.map((photo) => (
                <Card 
                  key={photo.id} 
                  className={`overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                  onClick={() => handlePhotoClick(photo)}
                >
                  <div className={`${viewMode === 'list' ? 'w-32 h-24' : 'aspect-square'} bg-gray-100 flex items-center justify-center relative group`}>
                    {photo.thumbnail ? (
                      <img 
                        src={photo.thumbnail} 
                        alt={photo.filename}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="h-8 w-8 text-gray-400" />
                    )}
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(photo);
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(photo);
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className={`p-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <p className="text-sm font-medium truncate">{photo.filename}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-600">{photo.downloads} downloads</p>
                      <p className="text-xs text-gray-600">
                        {format(new Date(photo.uploadedAt), 'dd/MM/yyyy')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <PhotoLightbox
          photo={selectedPhoto}
          isOpen={isLightboxOpen}
          onClose={() => {
            setIsLightboxOpen(false);
            setSelectedPhoto(null);
          }}
          onDownload={() => handleDownload(selectedPhoto)}
          onShare={() => handleShare(selectedPhoto)}
        />
      )}
    </div>
  );
}