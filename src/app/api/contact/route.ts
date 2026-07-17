import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, dob, preference, street, city, state, zip, phone, email, insurance, emergencyContact, emergencyPhone } = body;

    if (!firstName || !lastName || !dob || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <h2>New Appointment Request</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:100%; max-width:600px;">
        <tr><td style="font-weight:bold;background:#f5f5f5;">Name</td><td>${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Date of Birth</td><td>${escapeHtml(dob)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Appointment Preference</td><td>${escapeHtml(preference) || "Not specified"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Address</td><td>${street ? `${escapeHtml(street)}, ${escapeHtml(city)}, ${escapeHtml(state)} ${escapeHtml(zip)}` : "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Phone</td><td>${escapeHtml(phone) || "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Insurance</td><td>${escapeHtml(insurance) || "Not specified"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Emergency Contact</td><td>${escapeHtml(emergencyContact) || "Not provided"} ${emergencyPhone ? `(${escapeHtml(emergencyPhone)})` : ""}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `New Appointment Request - ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
