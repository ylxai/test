```typescript src/app/api/admin/recent-photos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(request: NextRequest) {
  try {
    const photos = await storage.getRecentPhotos(20);
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Get recent photos error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```