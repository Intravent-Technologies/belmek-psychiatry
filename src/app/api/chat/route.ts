import { NextResponse } from "next/server";

interface ChatRequest {
  message: string;
  history: Array<{ role: string; content: string }>;
}

const SERVICES =
  "We offer psychiatric evaluations, medication management, ADHD treatment, anxiety and depression care, bipolar disorder treatment, PTSD and trauma support, anger management, and help with family stressors. All visits are conducted via secure telehealth (online video).";

const INSURANCE =
  "We accept Medicare, UnitedHealthcare, Optum, Aetna, Blue Cross Blue Shield (BCBS), CIGNA, Oscar, Carelon, and Humana. If you have questions about your specific plan, feel free to call us at (443) 339-8634.";

const CONTACT =
  "You can reach us by phone at (443) 339-8634 or by email at info@belmekwellness.com. We're located in Reisterstown, MD 21136, and all visits are conducted online via video.";

const HOURS =
  "Our office hours are Monday through Saturday, 9:00 AM to 5:00 PM. All appointments are held via secure telehealth video visits.";

const BOOKING =
  "To book an appointment, you can:\n\n\u2022 Call us at (443) 339-8634\n\u2022 Email us at info@belmekwellness.com\n\u2022 Visit our Contact page to send a message\n\nWe'll get you scheduled as quickly as possible.";

const FIRST_VISIT =
  "During your first visit, Dr. Ossai will conduct a comprehensive psychiatric evaluation. This is a conversation\u2014not a test\u2014where we discuss your mental health history, current concerns, symptoms, and goals. From there, we'll develop a personalized treatment plan together. The visit is conducted via secure video, so you can attend from the comfort of your home.";

const CONDITIONS =
  "We treat a wide range of mental health conditions, including:\n\n\u2022 ADHD (Attention-Deficit/Hyperactivity Disorder)\n\u2022 Anxiety disorders\n\u2022 Depression\n\u2022 Bipolar disorder\n\u2022 PTSD and trauma\n\u2022 Panic disorder\n\u2022 Anger management\n\u2022 Family stressors and relationship challenges\n\nEvery treatment plan is tailored to the individual.";

const TELEMEDICINE =
  "All of our visits are conducted via secure, HIPAA-compliant telehealth video. This means you can receive compassionate psychiatric care from the comfort and privacy of your home\u2014no commute required. All you need is a device with a camera and an internet connection.";

const ABOUT =
  "Belmek Psychiatry and Wellness is led by Dr. Ossai, a board-certified psychiatric provider serving children, adolescents, and adults across Maryland. Our mission is to provide compassionate, evidence-based mental health care with personalized treatment plans for lasting emotional well-being.";

const FALLBACK =
  "I'd recommend contacting our office directly at (443) 339-8634 or emailing info@belmekwellness.com for more specific assistance.";

function getReply(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.match(/\b(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings|howdy)\b/)
  ) {
    return "Hello! Welcome to Belmek Psychiatry and Wellness. How can I help you today? I can answer questions about our services, insurance, booking appointments, and more.";
  }

  if (lower.match(/\b(thank|thanks|appreciate|grateful)\b/)) {
    return "You're very welcome! Is there anything else I can help you with?";
  }

  if (lower.match(/\b(bye|goodbye|see\s*ya|take\s*care|have\s*a\s*good)\b/)) {
    return "Thank you for reaching out! If you need anything else, don't hesitate to contact us at (443) 339-8634. Take care!";
  }

  if (lower.match(/\b(help|what\s*can\s*you|what\s*do\s*you|how\s*can\s*you)\b/)) {
    return "I can help you with information about:\n\n\u2022 Our services and what we treat\n\u2022 Insurance plans we accept\n\u2022 How to book an appointment\n\u2022 Office hours and telehealth\n\u2022 What to expect during your first visit\n\nJust ask away!";
  }

  if (lower.match(/\b(service|offer|provide|treatment|what\s*do|specializ)\b/)) {
    return SERVICES;
  }

  if (lower.match(/\b(insur|accept|take|coverage|plan|copay|payer)\b/)) {
    return INSURANCE;
  }

  if (lower.match(/\b(book|schedule|appointment|make\s*an|set\s*up|see|see\s*dr|see\s*the\s*doctor)\b/)) {
    return BOOKING;
  }

  if (lower.match(/\b(contact|phone|email|reach|call|number|address|location|where)\b/)) {
    return CONTACT;
  }

  if (lower.match(/\b(hour|time|open|close|when|schedule|monday|saturday)\b/)) {
    return HOURS;
  }

  if (lower.match(/\b(first\s*visit|first\s*time|new\s*patient|initial|what\s*to\s*expect|start|begin)\b/)) {
    return FIRST_VISIT;
  }

  if (lower.match(/\b(condition|diagnos|adhd|anxiety|depress|bipolar|ptsd|panic|anger|trauma|stress|family|ocd|insomnia|bipolar|ocd)\b/)) {
    return CONDITIONS;
  }

  if (lower.match(/\b(tele|video|virtual|remote|online|zoom|from\s*home|hipaa|secure)\b/)) {
    return TELEMEDICINE;
  }

  if (lower.match(/\b(about|who|dr|doctor|ossai|provider|background|qualif|belmek|practice|mission)\b/)) {
    return ABOUT;
  }

  if (lower.match(/\b(cost|price|fee|how\s*much|pay|afford|sliding|scale|free|consult)\b/)) {
    return "Pricing varies depending on the service and your insurance plan. We recommend calling us at (443) 339-8634 so we can provide you with specific information about costs and your coverage.";
  }

  if (lower.match(/\b(child|kid|teen|adolescent|young|age|adult|pediatric)\b/)) {
    return "Dr. Ossai provides psychiatric care for children, adolescents, and adults. Whether you're seeking help for your child or for yourself, we'll create a personalized treatment plan. Call us at (443) 339-8634 to learn more.";
  }

  if (lower.match(/\b(emergency|crisis|urgent|suicide|self.?harm|hurt|danger)\b/)) {
    return "If you're in immediate danger, please call 911 or go to your nearest emergency room. You can also reach the 988 Suicide & Crisis Lifeline by calling or texting 988. We're here to help during office hours at (443) 339-8634.";
  }

  return FALLBACK;
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const reply = getReply(body.message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: FALLBACK },
      { status: 500 }
    );
  }
}
