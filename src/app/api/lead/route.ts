import { NextResponse } from "next/server";
import type { LeadFormData, LeadApiResponse } from "@/types";

export async function POST(request: Request) {
  try {
    const body: LeadFormData = await request.json();

    // Basic validation
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json<LeadApiResponse>(
        { success: false, message: "First name, last name, and email are required." },
        { status: 400 },
      );
    }

    // Log the lead (in production, send to email/CRM/webhook)
    console.log("📩 New lead received:", {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: body.phone,
      address: body.address,
      service: body.service,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email service or CRM
    // e.g., send to Resend, SendGrid, or forward to client email

    return NextResponse.json<LeadApiResponse>({
      success: true,
      message: "Thank you! We'll get back to you shortly.",
    });
  } catch {
    return NextResponse.json<LeadApiResponse>(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
