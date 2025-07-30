import { Metadata } from "next";
import EventClient from "@/components/events/event-client";
import { storage } from "@/lib/storage";

// Membuat metadata dinamis berdasarkan event
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = await storage.getEvent(id);
  
  if (!event) {
    return {
      title: 'Event Tidak Ditemukan | Hafiportrait',
    };
  }
  
  return {
    title: `${event.name} | Hafiportrait`,
    description: `Lihat dan bagikan foto dari acara ${event.name}`,
  };
}

// Server component yang mengambil data event
export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await storage.getEvent(id);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-wedding-ivory flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Acara Tidak Ditemukan</h1>
          <p className="text-gray-600">Acara yang Anda cari tidak ada atau telah dihapus.</p>
        </div>
      </div>
    );
  }
  
  return <EventClient event={event} />;
}