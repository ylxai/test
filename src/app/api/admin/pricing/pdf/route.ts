```typescript src/app/api/admin/pricing/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("pdf") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No PDF file uploaded" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { message: "File must be a PDF" },
        { status: 400 }
      );
    }

    const filename = `pricing_${randomUUID()}.pdf`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await storage.uploadPricingPDF({
      filename,
      originalName: file.name,
      buffer,
      size: file.size
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Upload pricing PDF error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
```