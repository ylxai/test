```typescript src/app/api/admin/gallery/[photoId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { photoId: string } }
) {
  try {
    const result = await storage.deleteGalleryPhoto(params.photoId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Delete gallery photo error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```