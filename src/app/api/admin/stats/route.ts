```typescript src/app/api/admin/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(request: NextRequest) {
  try {
    const stats = await storage.getAdminStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Get admin stats error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```