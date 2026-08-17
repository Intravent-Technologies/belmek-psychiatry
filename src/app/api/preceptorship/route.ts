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

    const {
      firstName, lastName, email, phone, school, program,
      expectedGraduation, clinicalHours, startDate, endDate,
      clinicalInterests, previousExperience, goals, additionalInfo,
    } = body;

    if (!firstName || !lastName || !email || !school || !program || !expectedGraduation || !startDate) {
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

    const interestsList = Array.isArray(clinicalInterests) && clinicalInterests.length > 0
      ? clinicalInterests.join(", ")
      : "Not specified";

    const html = `
      <h2>New Preceptorship Application</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:100%; max-width:600px;">
        <tr><td style="font-weight:bold;background:#f5f5f5;">Name</td><td>${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Phone</td><td>${escapeHtml(phone) || "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">School / University</td><td>${escapeHtml(school)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Program</td><td>${escapeHtml(program)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Expected Graduation</td><td>${escapeHtml(expectedGraduation)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Clinical Hours Completed</td><td>${escapeHtml(clinicalHours) || "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Desired Start Date</td><td>${escapeHtml(startDate)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Desired End Date</td><td>${escapeHtml(endDate) || "Not specified"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Clinical Interests</td><td>${escapeHtml(interestsList)}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Previous Experience</td><td>${escapeHtml(previousExperience) || "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Goals</td><td>${escapeHtml(goals) || "Not provided"}</td></tr>
        <tr><td style="font-weight:bold;background:#f5f5f5;">Additional Info</td><td>${escapeHtml(additionalInfo) || "Not provided"}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `New Preceptorship Application - ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Preceptorship form error:", error);
    return NextResponse.json({ error: "Failed to send application" }, { status: 500 });
  }
}
