```typescript src/lib/storage.ts
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import type { InsertEvent, Event, InsertPhoto, Photo, InsertMessage, Message } from '@/types/schema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface AdminStats {
  totalEvents: number;
  totalPhotos: number;
  totalMessages: number;
  activeEvents: number;
  storageUsed: string;
}

interface StorageInterface {
  createEvent(data: InsertEvent): Promise<Event>;
  getEvent(id: string): Promise<Event | null>;
  getAllEvents(): Promise<Event[]>;
  deleteEvent(id: string): Promise<void>;
  
  addPhoto(data: InsertPhoto): Promise<Photo>;
  getEventPhotos(eventId: string): Promise<Photo[]>;
  getPhotosByAlbum(eventId: string, albumName: string): Promise<Photo[]>;
  updatePhotoLikes(photoId: string, likes: number): Promise<Photo | null>;
  deletePhoto(photoId: string): Promise<void>;
  getRecentPhotos(limit: number): Promise<Photo[]>;
  
  addMessage(data: InsertMessage): Promise<Message>;
  getEventMessages(eventId: string): Promise<Message[]>;
  updateMessageHearts(messageId: string, hearts: number): Promise<Message | null>;
  
  verifyEventAccessCode(eventId: string, accessCode: string): Promise<boolean>;
  
  getAdminStats(): Promise<AdminStats>;
  
  addGalleryPhoto(category: string, photoData: any): Promise<any>;
  getGalleryPhotos(category?: string): Promise<any[]>;
  deleteGalleryPhoto(photoId: string): Promise<any>;
  
  getPricing(): Promise<any>;
  updatePricing(data: any): Promise<any>;
  uploadPricingPDF(data: any): Promise<any>;
}

class SupabaseStorage implements StorageInterface {
  private async uploadToSupabase(base64Data: string, filename: string, bucket: string = 'photos'): Promise<string> {
    try {
      // Extract base64 data
      const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches) {
        throw new Error('Invalid base64 data');
      }

      const contentType = matches[1];
      const base64 = matches[2];
      const buffer = Buffer.from(base64, 'base64');

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filename, buffer, {
          contentType,
          upsert: true
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filename);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload to Supabase failed:', error);
      // Return the original base64 data as fallback
      return base64Data;
    }
  }

  async createEvent(data: InsertEvent): Promise<Event> {
    const eventId = randomUUID();
    const shareableLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/event/${eventId}`;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareableLink)}`;

    const eventData = {
      id: eventId,
      ...data,
      shareableLink,
      qrCode,
      createdAt: new Date().toISOString(),
    };

    const { data: event, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();

    if (error) {
      console.error('Create event error:', error);
      throw error;
    }

    return event;
  }

  async getEvent(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  }

  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async deleteEvent(id: string): Promise<void> {
    // Delete related photos first
    await supabase.from('photos').delete().eq('eventId', id);
    // Delete related messages
    await supabase.from('messages').delete().eq('eventId', id);
    // Delete event
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
  }

  async addPhoto(data: InsertPhoto): Promise<Photo> {
    const photoId = randomUUID();
    
    // Upload to Supabase if it's base64 data
    let finalUrl = data.url;
    if (data.url.startsWith('data:')) {
      finalUrl = await this.uploadToSupabase(data.url, data.filename);
    }

    const photoData = {
      id: photoId,
      ...data,
      url: finalUrl,
      uploadedAt: new Date().toISOString(),
    };

    const { data: photo, error } = await supabase
      .from('photos')
      .insert(photoData)
      .select()
      .single();

    if (error) throw error;
    return photo;
  }

  async getEventPhotos(eventId: string): Promise<Photo[]> {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('eventId', eventId)
      .order('uploadedAt', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getPhotosByAlbum(eventId: string, albumName: string): Promise<Photo[]> {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('eventId', eventId)
      .eq('albumName', albumName)
      .order('uploadedAt', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updatePhotoLikes(photoId: string, likes: number): Promise<Photo | null> {
    const { data, error } = await supabase
      .from('photos')
      .update({ likes })
      .eq('id', photoId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  async deletePhoto(photoId: string): Promise<void> {
    const { error } = await supabase
      .from('photos')
      .delete()
      .eq('id', photoId);

    if (error) throw error;
  }

  async getRecentPhotos(limit: number): Promise<Photo[]> {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('uploadedAt', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async addMessage(data: InsertMessage): Promise<Message> {
    const messageId = randomUUID();
    const messageData = {
      id: messageId,
      ...data,
      hearts: 0,
      createdAt: new Date().toISOString(),
    };

    const { data: message, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select()
      .single();

    if (error) throw error;
    return message;
  }

  async getEventMessages(eventId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('eventId', eventId)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updateMessageHearts(messageId: string, hearts: number): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .update({ hearts })
      .eq('id', messageId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  async verifyEventAccessCode(eventId: string, accessCode: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('events')
      .select('accessCode')
      .eq('id', eventId)
      .single();

    if (error) return false;
    return data.accessCode === accessCode;
  }

  async getAdminStats(): Promise<AdminStats> {
    const [eventsResult, photosResult, messagesResult] = await Promise.all([
      supabase.from('events').select('id', { count: 'exact' }),
      supabase.from('photos').select('id', { count: 'exact' }),
      supabase.from('messages').select('id', { count: 'exact' }),
    ]);

    return {
      totalEvents: eventsResult.count || 0,
      totalPhotos: photosResult.count || 0,
      totalMessages: messagesResult.count || 0,
      activeEvents: eventsResult.count || 0,
      storageUsed: "0 GB", // Placeholder
    };
  }

  async addGalleryPhoto(category: string, photoData: any): Promise<any> {
    // Upload to Supabase if it's base64 data
    let finalUrl = photoData.url;
    if (photoData.url.startsWith('data:')) {
      finalUrl = await this.uploadToSupabase(photoData.url, photoData.filename, 'gallery');
    }

    const galleryData = {
      id: randomUUID(),
      category,
      filename: photoData.filename,
      originalName: photoData.originalName,
      url: finalUrl,
      createdAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('gallery')
      .insert(galleryData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getGalleryPhotos(category?: string): Promise<any[]> {
    let query = supabase.from('gallery').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async deleteGalleryPhoto(photoId: string): Promise<any> {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', photoId);

    if (error) throw error;
    return { success: true };
  }

  async getPricing(): Promise<any> {
    const { data, error } = await supabase
      .from('pricing')
      .select('*')
      .single();

    if (error) {
      // Return default pricing if not found
      return {
        akad: {
          name: "Paket Akad Nikah",
          price: "1300000",
          badge: "PROMO",
          icon: "👰‍♀️💒",
          features: "1 fotografer\n1 hari kerja\n40 cetak foto 5R (pilihan)\nAlbum magnetik (tempel)\nFile foto tanpa batas\nSoftcopy di flashdisk"
        },
        premium: {
          name: "Paket Premium",
          price: "8000000",
          badge: "RECOMMENDED",
          icon: "💍✨",
          features: "2 fotografer\n8 jam liputan\n200 foto edit profesional\nAlbum premium 40 halaman\nUSB flashdisk custom\nOnline gallery selamanya\nVideo highlight 3-5 menit"
        },
        platinum: {
          name: "Paket Platinum",
          price: "12000000",
          badge: "LUXURY",
          icon: "👑💎",
          features: "3 fotografer + videographer\nFull day coverage\nUnlimited foto edit\nAlbum premium leather\nCinematic wedding video\nDrone footage\nPre-wedding session\nSame day edit + highlight"
        }
      };
    }

    return data;
  }

  async updatePricing(data: any): Promise<any> {
    const { data: result, error } = await supabase
      .from('pricing')
      .upsert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async uploadPricingPDF(data: any): Promise<any> {
    const { filename, buffer } = data;

    const { data: uploadData, error } = await supabase.storage
      .from('documents')
      .upload(filename, buffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(filename);

    return {
      filename,
      url: urlData.publicUrl,
      success: true
    };
  }
}

export const storage = new SupabaseStorage();
```