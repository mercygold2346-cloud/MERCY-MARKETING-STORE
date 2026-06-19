import nodemailer from "nodemailer";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getMailConfig() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL ?? user;

  if (!user || !pass || !to) {
    return null;
  }

  return { user, pass, to };
}

export async function sendStoreEmail(options: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  to?: string;
}) {
  const config = getMailConfig();
  if (!config) {
    return { ok: false as const, error: "Email is not configured." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: config.user, pass: config.pass },
  });

  await transporter.sendMail({
    from: `"Mercy Marketing Store" <${config.user}>`,
    to: options.to ?? config.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  return { ok: true as const };
}

export const EMAIL_NOT_CONFIGURED =
  "Email is not configured yet. Add GMAIL_USER and GMAIL_APP_PASSWORD to your .env.local file.";
