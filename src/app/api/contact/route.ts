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

function parseBase64Image(dataUri: string): { buffer: Buffer; filename: string; mimeType: string } | null {
  const match = dataUri.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) return null;
  const mimeType = match[1];
  const ext = mimeType.split("/")[1] === "jpeg" ? "jpg" : mimeType.split("/")[1];
  return {
    buffer: Buffer.from(match[2], "base64"),
    filename: `insurance-card.${ext}`,
    mimeType,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName, lastName, dob, preference, street, city, state, zip,
      phone, email, insurance, emergencyContact, emergencyPhone,
      insuranceCardFront, insuranceCardBack,
    } = body;

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

    const attachments: { filename: string; content: Buffer; contentType: string; cid: string }[] = [];
    const hasFront = typeof insuranceCardFront === "string" && insuranceCardFront.startsWith("data:image");
    const hasBack = typeof insuranceCardBack === "string" && insuranceCardBack.startsWith("data:image");

    let insuranceCardSection = "";
    if (hasFront || hasBack) {
      const frontParts = hasFront ? parseBase64Image(insuranceCardFront!) : null;
      const backParts = hasBack ? parseBase64Image(insuranceCardBack!) : null;

      if (frontParts) {
        attachments.push({
          filename: `insurance-front.${frontParts.filename.split(".").pop()}`,
          content: frontParts.buffer,
          contentType: frontParts.mimeType,
          cid: "insurance-front",
        });
      }
      if (backParts) {
        attachments.push({
          filename: `insurance-back.${backParts.filename.split(".").pop()}`,
          content: backParts.buffer,
          contentType: backParts.mimeType,
          cid: "insurance-back",
        });
      }

      insuranceCardSection = `
        <tr>
          <td style="font-weight:bold;background:#f5f5f5;">Insurance Card</td>
          <td>
            ${hasFront ? `<p style="margin:0 0 8px 0;"><strong>Front:</strong><br/><img src="cid:insurance-front" style="max-width:100%;max-height:300px;border:1px solid #ddd;border-radius:8px;" /></p>` : ""}
            ${hasBack ? `<p style="margin:0;"><strong>Back:</strong><br/><img src="cid:insurance-back" style="max-width:100%;max-height:300px;border:1px solid #ddd;border-radius:8px;" /></p>` : ""}
          </td>
        </tr>
      `;
    }

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
        ${insuranceCardSection}
        <tr><td style="font-weight:bold;background:#f5f5f5;">Emergency Contact</td><td>${escapeHtml(emergencyContact) || "Not provided"} ${emergencyPhone ? `(${escapeHtml(emergencyPhone)})` : ""}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `New Appointment Request - ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
      html,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
