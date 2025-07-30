```typescript src/app/api/messages/[messageId]/hearts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const body = await request.json();
    const { hearts } = body;

    const message = await storage.updateMessageHearts(params.messageId, hearts);
    
    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(message);
  } catch (error) {
    console.error("Update message hearts error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```