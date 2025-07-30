```typescript src/app/api/admin/photos/[photoId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { photoId: string } }
) {
  try {
    await storage.deletePhoto(params.photoId);
    return NextResponse.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Delete photo error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```