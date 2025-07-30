import { supabase } from './supabase';

// Wedibox Database Types
export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  guest_count: number;
  photo_count: number;
  event_code: string;
  qr_code_url?: string;
  guest_upload_link?: string;
  created_at: string;
  updated_at: string;
}

export interface Photo {
  id: string;
  event_id: string;
  url: string;
  filename: string;
  uploaded_at: string;
  downloads: number;
  album?: string;
  guest_name?: string;
  file_size?: number;
  mime_type?: string;
}

export interface GuestMessage {
  id: string;
  event_id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

// Test database connection
export async function testDatabaseConnection() {
  try {
    console.log('🔌 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('events')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return {
        success: false,
        error: error.message,
        details: error
      };
    }

    console.log('✅ Database connection successful!');
    return {
      success: true,
      message: 'Connected to Supabase successfully',
      data
    };

  } catch (error) {
    console.error('❌ Database connection error:', error);
    return {
      success: false,
      error: 'Failed to connect to database',
      details: error
    };
  }
}

// Database operations for Events
export const eventOperations = {
  // Get all events
  async getAll() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Get event by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  // Get event by code
  async getByCode(eventCode: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('event_code', eventCode)
      .single();
    
    return { data, error };
  },

  // Create new event
  async create(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();
    
    return { data, error };
  },

  // Update event
  async update(id: string, eventData: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update({
        ...eventData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  // Delete event
  async delete(id: string) {
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    return { data, error };
  }
};

// Database operations for Photos
export const photoOperations = {
  // Get photos for an event
  async getByEvent(eventId: string, album?: string) {
    let query = supabase
      .from('photos')
      .select('*')
      .eq('event_id', eventId)
      .order('uploaded_at', { ascending: false });

    if (album) {
      query = query.eq('album', album);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Upload photo
  async create(photoData: Omit<Photo, 'id' | 'uploaded_at'>) {
    const { data, error } = await supabase
      .from('photos')
      .insert([{
        ...photoData,
        uploaded_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    return { data, error };
  },

  // Delete photo
  async delete(id: string) {
    const { data, error } = await supabase
      .from('photos')
      .delete()
      .eq('id', id);
    
    return { data, error };
  }
};

// Database operations for Guest Messages
export const messageOperations = {
  // Get messages for an event
  async getByEvent(eventId: string) {
    const { data, error } = await supabase
      .from('guest_messages')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Create new message
  async create(messageData: Omit<GuestMessage, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('guest_messages')
      .insert([{
        ...messageData,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    return { data, error };
  }
};

// Storage operations for file uploads
export const storageOperations = {
  // Upload file to Supabase Storage
  async uploadPhoto(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from('photos')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    return { data, error };
  },

  // Get public URL for uploaded file
  getPublicUrl(path: string) {
    const { data } = supabase.storage
      .from('photos')
      .getPublicUrl(path);
    
    return data.publicUrl;
  },

  // Delete file from storage
  async deletePhoto(path: string) {
    const { data, error } = await supabase.storage
      .from('photos')
      .remove([path]);
    
    return { data, error };
  }
}; 