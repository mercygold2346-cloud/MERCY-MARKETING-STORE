import { EMAIL_NOT_CONFIGURED, escapeHtml, sendStoreEmail } from "@/lib/mail";
import { sendContactAutoReply } from "@/lib/order-emails";
import { NextResponse } from "next/server";
type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "General inquiry";
    const message = body.message?.trim() ?? "";

    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Please write a message of at least 10 characters." }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const result = await sendStoreEmail({
      subject: `[Contact] ${subject} — from ${name}`,
      replyTo: email,
      text: [
        "New message from your website contact form",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (!result.ok) {
      return NextResponse.json({ error: EMAIL_NOT_CONFIGURED }, { status: 503 });
    }

    await sendContactAutoReply({ name, email, subject });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);

    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    if (code === "EAUTH") {
      return NextResponse.json(
        {
          error:
            "Gmail rejected the login. Use a Google App Password (16 characters) in GMAIL_APP_PASSWORD — not your regular Gmail password. Create one at myaccount.google.com/apppasswords (2-Step Verification must be on).",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to send email. Check your Gmail app password and try again." },
      { status: 500 },
    );
  }
}
