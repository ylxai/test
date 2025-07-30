// src/types/schema.ts
export interface Event {
  id: string;
  name: string;
  date: string;
  qrCode: string;
  shareableLink: string;
  isPremium: boolean;
  accessCode: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  eventId: string;
  filename: string;
  originalName: string;
  url: string;
  uploaderName?: string;
  uploadedAt: string;
  albumName: string;
  likes: number;
}

export interface Message {
  id: string;
  eventId: string;
  guestName: string;
  message: string;
  hearts: number;
  createdAt: string;
}

export interface InsertEvent {
  name: string;
  date: string;
  isPremium?: boolean;
  accessCode?: string;
}

export interface InsertPhoto {
  eventId: string;
  filename: string;
  originalName: string;
  url: string;
  uploaderName?: string;
  albumName?: string;
}

export interface InsertMessage {
  eventId: string;
  guestName: string;
  message: string;
}