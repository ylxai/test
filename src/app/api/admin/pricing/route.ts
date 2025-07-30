```typescript src/app/api/admin/pricing/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(request: NextRequest) {
  try {
    const pricing = await storage.getPricing();
    return NextResponse.json(pricing);
  } catch (error) {
    console.error("Get pricing error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await storage.updatePricing(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Update pricing error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```