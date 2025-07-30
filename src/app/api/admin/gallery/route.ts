```typescript src/app/api/admin/gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("photo") as File;
    const category = formData.get("category") as string || "Gallery";

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

    const filename = `gallery_${randomUUID()}.${file.name.split('.').pop()}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const photoData = {
      filename,
      originalName: file.name,
      url: `data:${file.type};base64,${buffer.toString('base64')}`,
    };

    const result = await storage.addGalleryPhoto(category, photoData);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Gallery upload error:", error);
    return NextResponse.json(
      { message: "Server error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    
    const photos = await storage.getGalleryPhotos(category);
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Get gallery photos error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```