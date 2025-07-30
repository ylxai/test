```typescript src/app/api/events/[id]/photos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { insertPhotoSchema } from "@/types/schema";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const file = formData.get("photo") as File;
    
    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const filename = `${randomUUID()}.${file.name.split('.').pop()}`;
    const uploaderName = formData.get("uploaderName") as string || "Anonymous";
    const albumName = formData.get("albumName") as string || "Tamu";

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const photoData = {
      eventId: params.id,
      filename,
      originalName: file.name,
      url: `data:${file.type};base64,${buffer.toString('base64')}`,
      uploaderName,
      albumName,
    };

    const validatedData = insertPhotoSchema.parse(photoData);
    const photo = await storage.addPhoto(validatedData);
    
    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid photo data", errors: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Upload photo error:", error);
    return NextResponse.json(
      { message: "Failed to upload photo" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const photos = await storage.getEventPhotos(params.id);
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Get photos error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```