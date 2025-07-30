-- Wedibox Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (to avoid conflicts)
DROP TABLE IF EXISTS guest_messages CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS events CASCADE;

-- Create Events table
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
    guest_count INTEGER DEFAULT 0,
    photo_count INTEGER DEFAULT 0,
    event_code VARCHAR(10) UNIQUE NOT NULL,
    qr_code_url TEXT,
    guest_upload_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Photos table
CREATE TABLE photos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    downloads INTEGER DEFAULT 0,
    album VARCHAR(50) DEFAULT 'tamu',
    guest_name VARCHAR(100),
    file_size BIGINT,
    mime_type VARCHAR(100)
);

-- Create Guest Messages table
CREATE TABLE guest_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    guest_name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_events_event_code ON events(event_code);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_photos_event_id ON photos(event_id);
CREATE INDEX idx_photos_album ON photos(album);
CREATE INDEX idx_photos_uploaded_at ON photos(uploaded_at);
CREATE INDEX idx_guest_messages_event_id ON guest_messages(event_id);
CREATE INDEX idx_guest_messages_created_at ON guest_messages(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for events table
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to update photo count when photos are added/removed
CREATE OR REPLACE FUNCTION update_event_photo_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE events 
        SET photo_count = photo_count + 1 
        WHERE id = NEW.event_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE events 
        SET photo_count = photo_count - 1 
        WHERE id = OLD.event_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create triggers for photo count
CREATE TRIGGER trigger_update_photo_count_insert
    AFTER INSERT ON photos
    FOR EACH ROW
    EXECUTE FUNCTION update_event_photo_count();

CREATE TRIGGER trigger_update_photo_count_delete
    AFTER DELETE ON photos
    FOR EACH ROW
    EXECUTE FUNCTION update_event_photo_count();

-- Set up Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_messages ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Allow public read access to events" ON events
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert events" ON events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update events" ON events
    FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to delete events" ON events
    FOR DELETE USING (true);

-- Photos policies
CREATE POLICY "Allow public read access to photos" ON photos
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to photos" ON photos
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete photos" ON photos
    FOR DELETE USING (true);

-- Guest messages policies
CREATE POLICY "Allow public read access to guest messages" ON guest_messages
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to guest messages" ON guest_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete guest messages" ON guest_messages
    FOR DELETE USING (true);

-- Insert sample data (optional)
-- Generate sample UUIDs for events
DO $$
DECLARE
    wedding_id UUID := uuid_generate_v4();
    birthday_id UUID := uuid_generate_v4();
BEGIN
    INSERT INTO events (id, name, date, location, description, status, guest_count, event_code, qr_code_url, guest_upload_link)
    VALUES 
        (
            wedding_id,
            'Wedding Sarah & Michael',
            '2024-12-15',
            'Hotel Grand Palace, Jakarta',
            'Pernikahan Sarah dan Michael',
            'upcoming',
            150,
            'WED123',
            'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' || encode(('http://localhost:3000/event/' || wedding_id || '/upload?code=WED123')::bytea, 'base64'),
            'http://localhost:3000/event/' || wedding_id || '/upload?code=WED123'
        ),
        (
            birthday_id,
            'Birthday Party Rina',
            '2024-11-20',
            'Restaurant Seafood Garden',
            'Ulang tahun Rina ke-25',
            'completed',
            50,
            'BIRTH456',
            'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' || encode(('http://localhost:3000/event/' || birthday_id || '/upload?code=BIRTH456')::bytea, 'base64'),
            'http://localhost:3000/event/' || birthday_id || '/upload?code=BIRTH456'
        )
    ON CONFLICT (event_code) DO NOTHING;
    
    -- Insert sample photo for birthday event
    INSERT INTO photos (event_id, url, filename, album, guest_name, downloads)
    VALUES (
        birthday_id,
        '/sample-photos/birthday-photo-1.jpg',
        'IMG_001.jpg',
        'tamu',
        'John Doe',
        12
    );
    
    -- Insert sample guest message
    INSERT INTO guest_messages (event_id, guest_name, message)
    VALUES (
        birthday_id,
        'Jane Smith',
        'Happy birthday Rina! Wishing you all the best on your special day! 🎉🎂'
    );
END $$;

-- Create storage bucket policy (run this after creating the bucket)
/*
After creating the "photos" bucket in Supabase Storage, run this:

CREATE POLICY "Allow public uploads" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Allow public downloads" ON storage.objects
    FOR SELECT USING (bucket_id = 'photos');

CREATE POLICY "Allow authenticated deletes" ON storage.objects
    FOR DELETE USING (bucket_id = 'photos');
*/

-- Comments for clarity
COMMENT ON TABLE events IS 'Main events table storing celebration details';
COMMENT ON TABLE photos IS 'Photos uploaded by guests for each event';
COMMENT ON TABLE guest_messages IS 'Messages and wishes from guests';

COMMENT ON COLUMN events.event_code IS 'Unique 6-character code for guest access';
COMMENT ON COLUMN events.qr_code_url IS 'URL to QR code image for easy sharing';
COMMENT ON COLUMN events.guest_upload_link IS 'Direct link for guests to upload photos';

-- Database setup complete!
-- Next steps:
-- 1. Create the "photos" storage bucket in Supabase Dashboard > Storage
-- 2. Update your .env.local with the correct Supabase credentials
-- 3. Run: node scripts/test-db.js to verify connection 