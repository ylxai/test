```typescript src/app/api/events/[id]/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { insertMessageSchema } from "@/types/schema";
import { z } from "zod";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const messageData = {
      eventId: params.id,
      guestName: body.guestName,
      message: body.message,
    };

    const validatedData = insertMessageSchema.parse(messageData);
    const message = await storage.addMessage(validatedData);
    
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid message data", errors: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Add message error:", error);
    return NextResponse.json(
      { message: "Failed to add message" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const messages = await storage.getEventMessages(params.id);
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```