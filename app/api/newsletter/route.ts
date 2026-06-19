import { EMAIL_NOT_CONFIGURED, escapeHtml, sendStoreEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim() ?? "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const result = await sendStoreEmail({
      subject: "New newsletter signup — Mercy Marketing Store",
      replyTo: email,
      text: `New newsletter subscriber:\n\nEmail: ${email}\n\nSend them the 15% welcome discount code.`,
      html: `
        <h2>New newsletter signup</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p>Send this subscriber your 15% welcome discount code.</p>
      `,
    });

    if (!result.ok) {
      return NextResponse.json({ error: EMAIL_NOT_CONFIGURED }, { status: 503 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}
