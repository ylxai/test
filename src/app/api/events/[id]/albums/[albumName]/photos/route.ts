```typescript src/app/api/events/[id]/albums/[albumName]/photos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; albumName: string } }
) {
  try {
    const photos = await storage.getPhotosByAlbum(params.id, params.albumName);
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Get album photos error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```