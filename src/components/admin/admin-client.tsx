'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, Image, Settings, Plus, Edit, Trash2, Eye, Download, Upload, Images } from 'lucide-react';
import { storage } from '@/lib/storage';
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
}

interface Photo {
  id: string;
  eventId: string;
  url: string;
  filename: string;
  uploadedAt: string;
  downloads: number;
  album?: string;
}

export default function AdminClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false);
  const [isUploadGalleryOpen, setIsUploadGalleryOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Simulasi loading data dari storage
      const mockEvents: Event[] = [
        {
          id: '1',
          name: 'Wedding Sarah & Budi',
          date: '2024-12-15',
          location: 'Hotel Grand Palace, Jakarta',
          description: 'Pernikahan Sarah dan Budi',
          status: 'upcoming',
          guestCount: 150,
          photoCount: 0
        },
        {
          id: '2',
          name: 'Birthday Party Rina',
          date: '2024-11-20',
          location: 'Restaurant Seafood Garden',
          description: 'Ulang tahun Rina ke-25',
          status: 'completed',
          guestCount: 50,
          photoCount: 45
        }
      ];

      const mockPhotos: Photo[] = [
        {
          id: '1',
          eventId: '2',
          url: '/api/photos/1',
          filename: 'IMG_001.jpg',
          uploadedAt: '2024-11-20T10:30:00Z',
          downloads: 12,
          album: 'Tamu'
        }
      ];

      setEvents(mockEvents);
      setPhotos(mockPhotos);
    } catch (error) {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'photoCount'>) => {
    try {
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString(),
        photoCount: 0
      };
      setEvents(prev => [...prev, newEvent]);
      setIsCreateEventOpen(false);
      toast.success('Event berhasil dibuat');
    } catch (error) {
      toast.error('Gagal membuat event');
    }
  };

  const editEvent = async (eventData: Event) => {
    try {
      setEvents(prev => prev.map(event => 
        event.id === eventData.id ? eventData : event
      ));
      setIsEditEventOpen(false);
      setEditingEvent(null);
      toast.success('Event berhasil diperbarui');
    } catch (error) {
      toast.error('Gagal memperbarui event');
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      setEvents(prev => prev.filter(event => event.id !== eventId));
      toast.success('Event berhasil dihapus');
    } catch (error) {
      toast.error('Gagal menghapus event');
    }
  };

  const uploadPhotoToEvent = async (eventId: string, file: File, album: string) => {
    try {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        eventId,
        url: URL.createObjectURL(file),
        filename: file.name,
        uploadedAt: new Date().toISOString(),
        downloads: 0,
        album
      };
      
      setPhotos(prev => [...prev, newPhoto]);
      
      // Update event photo count
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, photoCount: event.photoCount + 1 }
          : event
      ));
      
      setIsUploadPhotoOpen(false);
      toast.success('Foto berhasil diupload');
    } catch (error) {
      toast.error('Gagal upload foto');
    }
  };

  const uploadPhotoToGallery = async (file: File, category: string) => {
    try {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        eventId: 'gallery',
        url: URL.createObjectURL(file),
        filename: file.name,
        uploadedAt: new Date().toISOString(),
        downloads: 0,
        album: category
      };
      
      setPhotos(prev => [...prev, newPhoto]);
      setIsUploadGalleryOpen(false);
      toast.success('Foto berhasil diupload ke galeri');
    } catch (error) {
      toast.error('Gagal upload foto ke galeri');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Kelola event, galeri, dan data Hafiportrait</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Pengaturan
              </Button>
              <Button size="sm" onClick={() => setIsCreateEventOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Event Baru
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{events.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {events.filter(e => e.status === 'upcoming').length} upcoming
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{photos.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +{photos.reduce((acc, p) => acc + p.downloads, 0)} downloads
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {events.reduce((acc, e) => acc + e.guestCount, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all events
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {events.filter(e => e.status === 'completed').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Successfully delivered
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>Event terbaru yang telah dibuat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{event.name}</h4>
                          <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                        <Badge className={getStatusColor(event.status)}>
                          {getStatusText(event.status)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Photos</CardTitle>
                  <CardDescription>Foto terbaru yang diupload</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {photos.slice(0, 3).map((photo) => (
                      <div key={photo.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{photo.filename}</h4>
                          <p className="text-sm text-gray-600">{photo.downloads} downloads</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Events Management</h2>
              <Button onClick={() => setIsCreateEventOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                        <CardDescription>{event.location}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusText(event.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Date:</span>
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Guests:</span>
                        <span className="font-medium">{event.guestCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Photos:</span>
                        <span className="font-medium">{event.photoCount}</span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setEditingEvent(event);
                            setIsEditEventOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsUploadPhotoOpen(true);
                          }}
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Upload
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteEvent(event.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Photo Gallery</h2>
              <Button onClick={() => setIsUploadGalleryOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Upload to Gallery
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {photos.filter(p => p.eventId === 'gallery').map((photo) => (
                <Card key={photo.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate">{photo.filename}</p>
                    <p className="text-xs text-gray-600">{photo.downloads} downloads</p>
                    <p className="text-xs text-gray-500">{photo.album}</p>
                    <div className="flex space-x-1 mt-2">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Uploads Tab */}
          <TabsContent value="uploads" className="space-y-6">
            <h2 className="text-2xl font-bold">Upload Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Upload to Event
                  </CardTitle>
                  <CardDescription>Upload foto ke event tertentu</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setIsUploadPhotoOpen(true)}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo to Event
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Images className="h-5 w-5 mr-2" />
                    Upload to Gallery
                  </CardTitle>
                  <CardDescription>Upload foto ke galeri homepage</CardDescription>
                </CardHeader>
                <CardContent>
                                     <Button 
                     onClick={() => setIsUploadGalleryOpen(true)}
                     className="w-full"
                   >
                     <Images className="h-4 w-4 mr-2" />
                     Upload to Gallery
                   </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Performance</CardTitle>
                  <CardDescription>Statistik performa event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Events</span>
                      <span className="font-medium">{events.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed Events</span>
                      <span className="font-medium">{events.filter(e => e.status === 'completed').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Upcoming Events</span>
                      <span className="font-medium">{events.filter(e => e.status === 'upcoming').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Photo Statistics</CardTitle>
                  <CardDescription>Statistik foto dan download</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Photos</span>
                      <span className="font-medium">{photos.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Downloads</span>
                      <span className="font-medium">{photos.reduce((acc, p) => acc + p.downloads, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Downloads</span>
                      <span className="font-medium">
                        {photos.length > 0 ? Math.round(photos.reduce((acc, p) => acc + p.downloads, 0) / photos.length) : 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Event Dialog */}
      <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new event to your portfolio
            </DialogDescription>
          </DialogHeader>
          <CreateEventForm onSubmit={createEvent} onCancel={() => setIsCreateEventOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update event information
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <EditEventForm 
              event={editingEvent} 
              onSubmit={editEvent} 
              onCancel={() => {
                setIsEditEventOpen(false);
                setEditingEvent(null);
              }} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Photo to Event Dialog */}
      <Dialog open={isUploadPhotoOpen} onOpenChange={setIsUploadPhotoOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Photo to Event</DialogTitle>
            <DialogDescription>
              Upload a photo to an event gallery
            </DialogDescription>
          </DialogHeader>
          <UploadPhotoToEventForm 
            events={events}
            selectedEvent={selectedEvent}
            onSubmit={uploadPhotoToEvent}
            onCancel={() => {
              setIsUploadPhotoOpen(false);
              setSelectedEvent(null);
            }} 
          />
        </DialogContent>
      </Dialog>

      {/* Upload Photo to Gallery Dialog */}
      <Dialog open={isUploadGalleryOpen} onOpenChange={setIsUploadGalleryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload to Gallery</DialogTitle>
            <DialogDescription>
              Upload a photo to the homepage gallery
            </DialogDescription>
          </DialogHeader>
          <UploadPhotoToGalleryForm 
            onSubmit={uploadPhotoToGallery}
            onCancel={() => setIsUploadGalleryOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Form Components
function CreateEventForm({ onSubmit, onCancel }: { 
  onSubmit: (data: Omit<Event, 'id' | 'photoCount'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    status: 'upcoming' as Event['status'],
    guestCount: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Event Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: Event['status']) => setFormData(prev => ({ ...prev, status: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="guestCount">Guest Count</Label>
        <Input
          id="guestCount"
          type="number"
          value={formData.guestCount}
          onChange={(e) => setFormData(prev => ({ ...prev, guestCount: parseInt(e.target.value) || 0 }))}
          required
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Event</Button>
      </DialogFooter>
    </form>
  );
}

function EditEventForm({ event, onSubmit, onCancel }: { 
  event: Event;
  onSubmit: (data: Event) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(event);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Event Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: Event['status']) => setFormData(prev => ({ ...prev, status: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="guestCount">Guest Count</Label>
        <Input
          id="guestCount"
          type="number"
          value={formData.guestCount}
          onChange={(e) => setFormData(prev => ({ ...prev, guestCount: parseInt(e.target.value) || 0 }))}
          required
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Update Event</Button>
      </DialogFooter>
    </form>
  );
}

function UploadPhotoToEventForm({ 
  events, 
  selectedEvent, 
  onSubmit, 
  onCancel 
}: { 
  events: Event[];
  selectedEvent: Event | null;
  onSubmit: (eventId: string, file: File, album: string) => void;
  onCancel: () => void;
}) {
  const [selectedEventId, setSelectedEventId] = useState(selectedEvent?.id || '');
  const [selectedAlbum, setSelectedAlbum] = useState('Tamu');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && selectedEventId) {
      onSubmit(selectedEventId, file, selectedAlbum);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="event">Select Event</Label>
        <Select value={selectedEventId} onValueChange={setSelectedEventId}>
          <SelectTrigger>
            <SelectValue placeholder="Choose an event" />
          </SelectTrigger>
          <SelectContent>
            {events.map(event => (
              <SelectItem key={event.id} value={event.id}>
                {event.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="album">Album</Label>
        <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Private">Private</SelectItem>
            <SelectItem value="Tamu">Tamu</SelectItem>
            <SelectItem value="Bridesmaid">Bridesmaid</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="file">Upload Photo</Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!file || !selectedEventId}>
          Upload Photo
        </Button>
      </DialogFooter>
    </form>
  );
}

function UploadPhotoToGalleryForm({ onSubmit, onCancel }: { 
  onSubmit: (file: File, category: string) => void;
  onCancel: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState('Wedding');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file, selectedCategory);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Wedding">Wedding</SelectItem>
            <SelectItem value="Birthday">Birthday</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
            <SelectItem value="Family">Family</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="file">Upload Photo</Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!file}>
          Upload to Gallery
        </Button>
      </DialogFooter>
    </form>
  );
}