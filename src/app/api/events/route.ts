```typescript src/app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { insertEventSchema } from "@/types/schema";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertEventSchema.parse(body);
    const event = await storage.createEvent(validatedData);
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid event data", errors: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Create event error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await storage.getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```