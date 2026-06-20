import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, dob, preference, street, city, state, zip, phone, email, insurance, emergencyContact, emergencyPhone } = body;

    if (!firstName || !lastName || !dob || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
        <tr><td style="font-weight:bold;background:#f5f5f5;">Name</td><td>${firstName} ${lastName}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Date of Birth</td><td>${dob}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Appointment Preference</td><td>${preference || "Not specified"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Address</td><td>${street ? `${street}, ${city}, ${state} ${zip}` : "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Phone</td><td>${phone || "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Email</td><td>${email}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Insurance</td><td>${insurance || "Not specified"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Emergency Contact</td><td>${emergencyContact || "Not provided"} ${emergencyPhone ? `(${emergencyPhone})` : ""}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `New Appointment Request - ${firstName} ${lastName}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
