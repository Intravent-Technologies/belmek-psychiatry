import { NextResponse } from "next/server";

interface ChatRequest {
  message: string;
  history: Array<{ role: string; content: string }>;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.match(/\b(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings|howdy|sup|yo|wassup)\b/)) {
    return pick([
      "Hey there! Welcome to Belmek Psychiatry. What can I help you with today?",
      "Hi! Thanks for reaching out. I'm here to help with any questions about our services, insurance, or booking an appointment.",
      "Hello! Glad you stopped by. Whether it's about services, insurance, or scheduling — I've got you covered. What do you need?",
    ]);
  }

  if (lower.match(/\b(thank|thanks|appreciate|grateful|thx|ty)\b/)) {
    return pick([
      "Of course! Happy to help. Anything else you'd like to know?",
      "You got it! Let me know if anything else comes up.",
      "No problem at all! I'm here if you need anything else.",
    ]);
  }

  if (lower.match(/\b(bye|goodbye|see\s*ya|take\s*care|have\s*a\s*good|gotta\s*go|later)\b/)) {
    return pick([
      "Take care! Don't hesitate to reach out if you need anything. We're here for you.",
      "Bye! Hope I was able to help. Feel free to come back anytime.",
      "See ya! Remember, you can always call us at (443) 339-8634 if you need anything.",
    ]);
  }

  if (lower.match(/\b(help|what\s*can\s*you|what\s*do\s*you|how\s*can\s*you)\b/)) {
    return "I can help you with a bunch of things!\n\n• Services we offer and conditions we treat\n• Insurance plans we accept\n• How to book an appointment\n• Office hours and telehealth info\n• What to expect on your first visit\n\nJust ask — I'm here for it!";
  }

  if (lower.match(/\b(service|offer|provide|treatment|what\s*do|specializ)\b/)) {
    return pick([
      "We offer quite a few things! Psychiatric evaluations, medication management, ADHD treatment, help with anxiety and depression, bipolar disorder, PTSD, anger management, and family stressors. Everything's done via secure telehealth video — so you can do it from your couch.",
      "Our services cover a lot of ground — from psychiatric evaluations and medication management to ADHD, anxiety, depression, bipolar disorder, PTSD, and more. And it's all online through secure video visits, so no commuting needed.",
    ]);
  }

  if (lower.match(/\b(insur|accept|take|coverage|plan|copay|payer)\b/)) {
    return pick([
      "We take most major insurance! That includes Medicare, UnitedHealthcare, Optum, Aetna, BCBS, CIGNA, Oscar, Carelon, and Humana. If you're not sure about your specific plan, just give us a call at (443) 339-8634 and we'll figure it out for you.",
      "Great question! We accept Medicare, UnitedHealthcare, Optum, Aetna, Blue Cross Blue Shield, CIGNA, Oscar, Carelon, and Humana. Not sure about yours? Call us at (443) 339-8634 — we'll check for you!",
    ]);
  }

  if (lower.match(/\b(book|schedule|appointment|make\s*an|set\s*up|see|see\s*dr|see\s*the\s*doctor|make\s*appt)\b/)) {
    return pick([
      "Booking is super easy! You can:\n\n• Call us at (443) 339-8634\n• Email info@belmekwellness.com\n• Or fill out the contact form on our website\n\nWe'll get you in as soon as possible!",
      "You've got a few options! Give us a ring at (443) 339-8634, shoot us an email at info@belmekwellness.com, or use the booking form on our Contact page. Either way, we'll get you sorted out quickly.",
    ]);
  }

  if (lower.match(/\b(contact|phone|email|reach|call|number|address|location|where)\b/)) {
    return pick([
      "Here's how to reach us:\n\n📞 (443) 339-8634\n📧 info@belmekwellness.com\n📍 Reisterstown, MD 21136 (online visits only)\n\nWe're super responsive, so don't be shy!",
      "You can reach us at (443) 339-8634 by phone, or email us at info@belmekwellness.com. We're based in Reisterstown, MD, but all visits are online so location doesn't matter!",
    ]);
  }

  if (lower.match(/\b(hour|time|open|close|when|schedule|monday|saturday)\b/)) {
    return pick([
      "We're open Monday through Saturday, 9 AM to 5 PM. All appointments are via secure video, so you can see us from wherever works best for you.",
      "Our hours are Mon–Sat, 9 AM to 5 PM. Everything's done through telehealth, so you don't need to worry about traffic or parking — just hop on a video call.",
    ]);
  }

  if (lower.match(/\b(first\s*visit|first\s*time|new\s*patient|initial|what\s*to\s*expect|start|begin|nervous|scared|worried)\b/)) {
    return pick([
      "Totally normal to be a little nervous — everyone is! Your first visit with Dr. Ossai is basically a relaxed conversation about your mental health history, what you're going through, and what you're hoping to get out of treatment. No tests, no judgment. Just a real conversation to figure out the best path forward for you.",
      "Don't worry — it's not as scary as it might seem! Your first visit is really just a conversation. Dr. Ossai will ask about your history, what's been going on, and what your goals are. From there, you'll work together on a treatment plan that makes sense for you. And since it's all online, you can do it from your living room!",
    ]);
  }

  if (lower.match(/\b(condition|diagnos|adhd|anxiety|depress|bipolar|ptsd|panic|anger|trauma|stress|family|ocd|insomnia)\b/)) {
    return pick([
      "We treat a pretty wide range of things:\n\n• ADHD\n• Anxiety\n• Depression\n• Bipolar disorder\n• PTSD & trauma\n• Panic disorder\n• Anger management\n• Family stressors\n\nDr. Ossai creates a personalized plan for each patient, so you're never just a number here.",
      "We handle a lot — ADHD, anxiety, depression, bipolar, PTSD, panic attacks, anger issues, family stressors, and more. The approach is always tailored to you, because no two people experience mental health the same way.",
    ]);
  }

  if (lower.match(/\b(tele|video|virtual|remote|online|zoom|from\s*home|hipaa|secure)\b/)) {
    return pick([
      "All our visits are through secure, HIPAA-compliant telehealth video. So yeah — you can literally do it from your bed if you want. All you need is a phone or laptop with a camera. No commute, no waiting rooms.",
      "Yep, everything's virtual! We use secure HIPAA-compliant video, so your privacy is fully protected. You just need a device with a camera and you're good to go. Super convenient.",
    ]);
  }

  if (lower.match(/\b(about|who|dr|doctor|ossai|provider|background|qualif|belmek|practice|mission)\b/)) {
    return pick([
      "Belmek Psychiatry is led by Dr. Abimbola Ossai — she's a board-certified psychiatric nurse practitioner with over 11 years of healthcare experience. She treats kids, teens, and adults across Maryland, and she's really passionate about making mental health care accessible and compassionate.",
      "Great question! Dr. Ossai is the founder of Belmek Psychiatry and Wellness. She's a board-certified PMHNP with over a decade of experience in healthcare. She treats children, adolescents, and adults, and she genuinely cares about her patients. She's built this practice around providing personalized, evidence-based care.",
    ]);
  }

  if (lower.match(/\b(cost|price|fee|how\s*much|pay|afford|sliding|scale|free|consult)\b/)) {
    return pick([
      "Costs really depend on the service and your insurance coverage. The best way to get accurate pricing is to call us at (443) 339-8634 — we'll walk you through it and help figure out what works for your situation.",
      "It varies based on what service you need and what insurance you have. Give us a call at (443) 339-8634 and we'll give you the specifics. We want to make sure cost isn't a barrier to getting the help you need.",
    ]);
  }

  if (lower.match(/\b(child|kid|teen|adolescent|young|age|adult|pediatric)\b/)) {
    return pick([
      "Absolutely! Dr. Ossai treats children, adolescents, and adults. Whether it's for your kid, a teenager, or yourself, she'll create a treatment plan that fits that person's specific needs. Just call us at (443) 339-8634 to get started.",
      "Yes — we see kids, teens, and adults. Mental health matters at every age, and Dr. Ossai tailors her approach to each patient. Call us at (443) 339-8634 if you'd like to set something up!",
    ]);
  }

  if (lower.match(/\b(emergency|crisis|urgent|suicide|self.?harm|hurt|danger|kill|die|end\s*it)\b/)) {
    return "If you're in immediate danger, please call 911 or go to your nearest emergency room right away. You can also reach the 988 Suicide & Crisis Lifeline by calling or texting 988. You're not alone — please reach out for help. We're here during office hours at (443) 339-8634.";
  }

  if (lower.match(/\b(yes|yeah|yep|yup|ok|okay|sure|sounds\s*good|perfect|great|awesome|cool)\b/)) {
    return pick([
      "Glad I could help! Anything else on your mind?",
      "Awesome! Let me know if you have any other questions.",
      "Great! I'm here if you need anything else.",
    ]);
  }

  if (lower.match(/\b(not\s*sure|idk|don'?t\s*know|maybe|umm|um|uh|hmm)\b/)) {
    return pick([
      "No worries! Take your time. I'm right here whenever you're ready to ask anything.",
      "That's totally fine! When you figure out what you need, just let me know.",
    ]);
  }

  if (lower.match(/\b(what|how|when|where|why|who|which|can\s*I|do\s*you|is\s*it|are\s*there|do\s*I)\b/) && lower.length < 20) {
    return pick([
      "Could you tell me a bit more about what you're looking for? I want to make sure I give you the right info!",
      "Hmm, I want to make sure I understand — can you give me a little more detail?",
    ]);
  }

  return pick([
    "That's a great question! For something like that, I'd recommend reaching out to our office directly at (443) 339-8634 or emailing info@belmekwellness.com. They'll be able to give you the most accurate answer.",
    "I wish I had a more specific answer for that one! Our office team at (443) 339-8634 would know best. Feel free to give them a call.",
    "Hmm, I'm not 100% sure on that. Your best bet is to call us at (443) 339-8634 — the team there will know exactly what to tell you!",
  ]);
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const reply = getReply(body.message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong on my end! Try again in a sec, or call us at (443) 339-8634 if it's urgent." },
      { status: 500 }
    );
  }
}
