```typescript src/app/api/photos/[photoId]/likes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { photoId: string } }
) {
  try {
    const body = await request.json();
    const { likes } = body;

    const photo = await storage.updatePhotoLikes(params.photoId, likes);
    
    if (!photo) {
      return NextResponse.json(
        { message: "Photo not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(photo);
  } catch (error) {
    console.error("Update photo likes error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```