```typescript src/app/api/events/[id]/verify-code/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { accessCode } = body;

    const isValid = await storage.verifyEventAccessCode(params.id, accessCode);
    
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error("Verify access code error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```