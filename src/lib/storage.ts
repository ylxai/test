// Simulasi storage untuk development
// Dalam implementasi nyata, ini akan terhubung ke database atau API

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  guestCount: number;
  photoCount: number;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Photo {
  id: string;
  eventId: string;
  url: string;
  filename: string;
  uploadedAt: string;
  downloads: number;
  thumbnail?: string;
  metadata?: {
    width: number;
    height: number;
    size: number;
    format: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Wedding Sarah & Budi',
    date: '2024-12-15',
    location: 'Hotel Grand Palace, Jakarta',
    description: 'Pernikahan Sarah dan Budi yang diadakan di Hotel Grand Palace dengan tema klasik elegan.',
    status: 'upcoming',
    guestCount: 150,
    photoCount: 0,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Birthday Party Rina',
    date: '2024-11-20',
    location: 'Restaurant Seafood Garden',
    description: 'Ulang tahun Rina ke-25 dengan tema garden party yang meriah.',
    status: 'completed',
    guestCount: 50,
    photoCount: 45,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-20T16:45:00Z'
  },
  {
    id: '3',
    name: 'Corporate Event PT Maju Bersama',
    date: '2024-10-25',
    location: 'Convention Center Jakarta',
    description: 'Annual gathering perusahaan dengan tema modern dan profesional.',
    status: 'completed',
    guestCount: 200,
    photoCount: 120,
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-25T11:20:00Z'
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
    thumbnail: '/api/photos/1/thumbnail',
    metadata: {
      width: 1920,
      height: 1080,
      size: 2048576,
      format: 'JPEG'
    }
  },
  {
    id: '2',
    eventId: '2',
    url: '/api/photos/2',
    filename: 'IMG_002.jpg',
    uploadedAt: '2024-11-20T10:35:00Z',
    downloads: 8,
    thumbnail: '/api/photos/2/thumbnail',
    metadata: {
      width: 1920,
      height: 1080,
      size: 1876543,
      format: 'JPEG'
    }
  },
  {
    id: '3',
    eventId: '2',
    url: '/api/photos/3',
    filename: 'IMG_003.jpg',
    uploadedAt: '2024-11-20T10:40:00Z',
    downloads: 15,
    thumbnail: '/api/photos/3/thumbnail',
    metadata: {
      width: 1920,
      height: 1080,
      size: 2154321,
      format: 'JPEG'
    }
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Hafi Rahman',
    email: 'hafi@hafiportrait.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

class StorageService {
  private events: Event[] = [...mockEvents];
  private photos: Photo[] = [...mockPhotos];
  private users: User[] = [...mockUsers];

  // Event methods
  async getEvents(): Promise<Event[]> {
    // Simulasi network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getEvent(id: string): Promise<Event | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.events.find(event => event.id === id) || null;
  }

  async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.events.push(newEvent);
    return newEvent;
  }

  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event | null> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return null;
    
    this.events[index] = {
      ...this.events[index],
      ...eventData,
      updatedAt: new Date().toISOString()
    };
    
    return this.events[index];
  }

  async deleteEvent(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return false;
    
    this.events.splice(index, 1);
    
    // Also delete related photos
    this.photos = this.photos.filter(photo => photo.eventId !== id);
    
    return true;
  }

  // Photo methods
  async getPhotos(eventId?: string): Promise<Photo[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (eventId) {
      return this.photos.filter(photo => photo.eventId === eventId);
    }
    
    return this.photos.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  }

  async getPhoto(id: string): Promise<Photo | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.photos.find(photo => photo.id === id) || null;
  }

  async uploadPhoto(photoData: Omit<Photo, 'id' | 'uploadedAt'>): Promise<Photo> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newPhoto: Photo = {
      ...photoData,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString()
    };
    
    this.photos.push(newPhoto);
    
    // Update event photo count
    const event = this.events.find(e => e.id === photoData.eventId);
    if (event) {
      event.photoCount += 1;
      event.updatedAt = new Date().toISOString();
    }
    
    return newPhoto;
  }

  async deletePhoto(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const index = this.photos.findIndex(photo => photo.id === id);
    if (index === -1) return false;
    
    const photo = this.photos[index];
    this.photos.splice(index, 1);
    
    // Update event photo count
    const event = this.events.find(e => e.id === photo.eventId);
    if (event) {
      event.photoCount = Math.max(0, event.photoCount - 1);
      event.updatedAt = new Date().toISOString();
    }
    
    return true;
  }

  async incrementDownloadCount(photoId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const photo = this.photos.find(p => p.id === photoId);
    if (photo) {
      photo.downloads += 1;
    }
  }

  async updatePhotoLikes(photoId: string, likes: number): Promise<Photo | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const photo = this.photos.find(p => p.id === photoId);
    if (photo) {
      // Add likes property if it doesn't exist
      (photo as Photo & { likes: number }).likes = likes;
      return photo;
    }
    return null;
  }

  async deleteGalleryPhoto(photoId: string): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const index = this.photos.findIndex(photo => photo.id === photoId);
    if (index === -1) return { success: false };
    
    this.photos.splice(index, 1);
    return { success: true };
  }

  // User methods
  async getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.users;
  }

  async getUser(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.users.find(user => user.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.users.find(user => user.email === email) || null;
  }

  // Analytics methods
  async getAnalytics() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const totalEvents = this.events.length;
    const totalPhotos = this.photos.length;
    const totalDownloads = this.photos.reduce((acc, photo) => acc + photo.downloads, 0);
    const completedEvents = this.events.filter(event => event.status === 'completed').length;
    const upcomingEvents = this.events.filter(event => event.status === 'upcoming').length;
    
    return {
      totalEvents,
      totalPhotos,
      totalDownloads,
      completedEvents,
      upcomingEvents,
      averageDownloadsPerPhoto: totalPhotos > 0 ? Math.round(totalDownloads / totalPhotos) : 0
    };
  }

  // Search methods
  async searchEvents(query: string): Promise<Event[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const lowercaseQuery = query.toLowerCase();
    return this.events.filter(event => 
      event.name.toLowerCase().includes(lowercaseQuery) ||
      event.location.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  async searchPhotos(query: string): Promise<Photo[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const lowercaseQuery = query.toLowerCase();
    return this.photos.filter(photo => 
      photo.filename.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new StorageService();