```typescript src/app/api/admin/events/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await storage.deleteEvent(params.id);
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete admin event error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```