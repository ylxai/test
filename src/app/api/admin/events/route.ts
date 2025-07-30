```typescript src/app/api/admin/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(request: NextRequest) {
  try {
    const events = await storage.getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Get admin events error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```