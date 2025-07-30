```typescript src/app/api/admin/gallery/[category]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const photos = await storage.getGalleryPhotos(params.category);
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Get gallery category photos error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```