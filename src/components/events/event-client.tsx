'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Heart, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Users,
  Image as ImageIcon,
  Play,
  Send,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { toast } from 'sonner';
import { PhotoLightbox } from '@/components/photo-lightbox';
import { storage } from '@/lib/storage';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  guestCount: number;
  photoCount: number;
}

interface Photo {
  id: string;
  eventId: string;
  url: string;
  filename: string;
  uploadedAt: string;
  downloads: number;
  likes: number;
  album?: string;
}

interface GuestbookEntry {
  id: string;
  eventId: string;
  name: string;
  message: string;
  createdAt: string;
}

interface EventClientProps {
  event: Event;
}

export default function EventClient({ event }: EventClientProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');
  const [newGuestbookEntry, setNewGuestbookEntry] = useState({ name: '', message: '' });

  useEffect(() => {
    loadEventData();
  }, [event.id]);

  const loadEventData = async () => {
    try {
      setLoading(true);
      // Simulasi loading data dari storage
      const mockPhotos: Photo[] = [
        {
          id: '1',
          eventId: event.id,
          url: '/api/photos/1',
          filename: 'IMG_001.jpg',
          uploadedAt: '2024-11-20T10:30:00Z',
          downloads: 12,
          likes: 5,
          album: 'Tamu'
        },
        {
          id: '2',
          eventId: event.id,
          url: '/api/photos/2',
          filename: 'IMG_002.jpg',
          uploadedAt: '2024-11-20T11:15:00Z',
          downloads: 8,
          likes: 3,
          album: 'Private'
        },
        {
          id: '3',
          eventId: event.id,
          url: '/api/photos/3',
          filename: 'IMG_003.jpg',
          uploadedAt: '2024-11-20T12:00:00Z',
          downloads: 15,
          likes: 7,
          album: 'Bridesmaid'
        }
      ];

      const mockGuestbook: GuestbookEntry[] = [
        {
          id: '1',
          eventId: event.id,
          name: 'Sarah Johnson',
          message: 'Acara yang sangat indah! Semoga bahagia selalu.',
          createdAt: '2024-11-20T14:30:00Z'
        },
        {
          id: '2',
          eventId: event.id,
          name: 'Budi Santoso',
          message: 'Selamat menempuh hidup baru! Semoga langgeng sampai akhir hayat.',
          createdAt: '2024-11-20T15:45:00Z'
        }
      ];

      setPhotos(mockPhotos);
      setGuestbookEntries(mockGuestbook);
    } catch (error) {
      toast.error('Gagal memuat data event');
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAlbum = selectedAlbum === 'all' || photo.album === selectedAlbum;
    return matchesSearch && matchesAlbum;
  });

  const sortedPhotos = [...filteredPhotos].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      case 'oldest':
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      case 'most-liked':
        return b.likes - a.likes;
      case 'most-downloaded':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
  };

  const handleDownload = async (photo: Photo) => {
    try {
      // Simulasi download
      await storage.incrementDownloadCount(photo.id);
      setPhotos(prev => prev.map(p => 
        p.id === photo.id ? { ...p, downloads: p.downloads + 1 } : p
      ));
      toast.success('Foto berhasil didownload');
    } catch (error) {
      toast.error('Gagal download foto');
    }
  };

  const handleLike = async (photo: Photo) => {
    try {
      const newLikes = photo.likes + 1;
      await storage.updatePhotoLikes(photo.id, newLikes);
      setPhotos(prev => prev.map(p => 
        p.id === photo.id ? { ...p, likes: newLikes } : p
      ));
      toast.success('Foto berhasil disukai');
    } catch (error) {
      toast.error('Gagal menyukai foto');
    }
  };

  const handleShare = async (photo: Photo) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Foto dari ${event.name}`,
          text: `Lihat foto ini dari acara ${event.name}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link berhasil disalin');
      }
    } catch (error) {
      toast.error('Gagal membagikan foto');
    }
  };

  const handleSlideshow = (photo: Photo) => {
    // Mulai slideshow dari foto ini
    setSelectedPhoto(photo);
    setIsLightboxOpen(true);
    // TODO: Implement slideshow mode
    toast.info('Fitur slideshow akan segera hadir');
  };

  const submitGuestbookEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestbookEntry.name.trim() || !newGuestbookEntry.message.trim()) {
      toast.error('Nama dan pesan harus diisi');
      return;
    }

    try {
      const entry: GuestbookEntry = {
        id: Date.now().toString(),
        eventId: event.id,
        name: newGuestbookEntry.name,
        message: newGuestbookEntry.message,
        createdAt: new Date().toISOString()
      };

      setGuestbookEntries(prev => [entry, ...prev]);
      setNewGuestbookEntry({ name: '', message: '' });
      toast.success('Pesan berhasil ditambahkan');
    } catch (error) {
      toast.error('Gagal menambahkan pesan');
    }
  };

  const getAlbumCount = (album: string) => {
    return photos.filter(photo => photo.album === album).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-wedding-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat event...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-ivory">
      {/* Event Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>
            <div className="flex items-center justify-center space-x-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{format(new Date(event.date), 'EEEE, d MMMM yyyy', { locale: id })}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>{event.guestCount} tamu</span>
              </div>
            </div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery" className="flex items-center">
              <ImageIcon className="h-4 w-4 mr-2" />
              Galeri ({photos.length})
            </TabsTrigger>
            <TabsTrigger value="guestbook" className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Guestbook ({guestbookEntries.length})
            </TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            {/* Album Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Semua ({photos.length})</TabsTrigger>
                <TabsTrigger value="Private">Private ({getAlbumCount('Private')})</TabsTrigger>
                <TabsTrigger value="Tamu">Tamu ({getAlbumCount('Tamu')})</TabsTrigger>
                <TabsTrigger value="Bridesmaid">Bridesmaid ({getAlbumCount('Bridesmaid')})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <GalleryContent 
                  photos={sortedPhotos}
                  onPhotoClick={handlePhotoClick}
                />
              </TabsContent>

              <TabsContent value="Private" className="space-y-6">
                <GalleryContent 
                  photos={sortedPhotos.filter(p => p.album === 'Private')}
                  onPhotoClick={handlePhotoClick}
                />
              </TabsContent>

              <TabsContent value="Tamu" className="space-y-6">
                <GalleryContent 
                  photos={sortedPhotos.filter(p => p.album === 'Tamu')}
                  onPhotoClick={handlePhotoClick}
                />
              </TabsContent>

              <TabsContent value="Bridesmaid" className="space-y-6">
                <GalleryContent 
                  photos={sortedPhotos.filter(p => p.album === 'Bridesmaid')}
                  onPhotoClick={handlePhotoClick}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Guestbook Tab */}
          <TabsContent value="guestbook" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Guestbook Form */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Tulis Pesan
                    </CardTitle>
                    <CardDescription>
                      Tinggalkan pesan dan doa untuk pasangan pengantin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={submitGuestbookEntry} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nama Anda</Label>
                        <Input
                          id="name"
                          value={newGuestbookEntry.name}
                          onChange={(e) => setNewGuestbookEntry(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Masukkan nama Anda"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Pesan</Label>
                        <Textarea
                          id="message"
                          value={newGuestbookEntry.message}
                          onChange={(e) => setNewGuestbookEntry(prev => ({ ...prev, message: e.target.value }))}
                          placeholder="Tulis pesan dan doa Anda..."
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Kirim Pesan
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Guestbook Entries */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Pesan dari Tamu</CardTitle>
                    <CardDescription>
                      {guestbookEntries.length} pesan telah ditulis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {guestbookEntries.map((entry) => (
                        <div key={entry.id} className="border rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="bg-gray-100 rounded-full p-2">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">{entry.name}</h4>
                                <span className="text-sm text-gray-500">
                                  {format(new Date(entry.createdAt), 'd MMM yyyy, HH:mm', { locale: id })}
                                </span>
                              </div>
                              <p className="text-gray-700">{entry.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <PhotoLightbox
          photos={photos}
          initialPhoto={selectedPhoto}
          isOpen={isLightboxOpen}
          onClose={() => {
            setIsLightboxOpen(false);
            setSelectedPhoto(null);
          }}
          onDownload={() => handleDownload(selectedPhoto)}
          onLike={() => handleLike(selectedPhoto)}
          onShare={() => handleShare(selectedPhoto)}
          onSlideshow={() => handleSlideshow(selectedPhoto)}
        />
      )}
    </div>
  );
}

// Gallery Content Component
function GalleryContent({ 
  photos, 
  onPhotoClick 
}: { 
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredPhotos = photos.filter(photo =>
    photo.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPhotos = [...filteredPhotos].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      case 'oldest':
        return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      case 'most-liked':
        return b.likes - a.likes;
      case 'most-downloaded':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari foto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="oldest">Terlama</SelectItem>
              <SelectItem value="most-liked">Paling Disukai</SelectItem>
              <SelectItem value="most-downloaded">Paling Diunduh</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Photo Grid */}
      {sortedPhotos.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada foto</h3>
          <p className="text-gray-600">Belum ada foto yang diupload untuk album ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onPhotoClick(photo)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 right-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between">
                  <span className="truncate">{photo.filename}</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {photo.likes}
                    </span>
                    <span className="flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      {photo.downloads}
                    </span>
                  </div>
                </div>
              </div>
              {photo.album && (
                <Badge className="absolute top-2 left-2 text-xs">
                  {photo.album}
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}