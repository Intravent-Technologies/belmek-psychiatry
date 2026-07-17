import { NextResponse } from "next/server";

interface ChatRequest {
  message: string;
  history: Array<{ role: string; content: string }>;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function extractName(history: Array<{ role: string; content: string }>): string | null {
  const botAsked = history.some((m) =>
    m.role === "assistant" && /what.{0,20}name|your name|call you/i.test(m.content)
  );
  if (!botAsked) return null;

  const lastUser = [...history].reverse().find((m) => m.role === "user");
  if (!lastUser) return null;

  const msg = lastUser.content.trim();
  const iAm = msg.match(/(?:i'?m|i\s+am|my\s+name\s+is|it'?s|this\s+is|call\s+me)\s+([A-Z][a-z]+)/i);
  if (iAm) return iAm[1];

  const shortMsg = msg.replace(/[!?.]/g, "").trim();
  if (shortMsg.split(/\s+/).length <= 3 && /^[A-Z]/.test(shortMsg)) {
    return shortMsg.split(/\s+/)[0];
  }

  return null;
}

function detectMood(message: string): string {
  const lower = message.toLowerCase();
  if (lower.match(/(sad|depress|down|hopeless|empty|worthless|numb|hate\s*myself|can'?t\s*go\s*on)/)) return "low";
  if (lower.match(/(anxious|anxiety|worried|nervous|panic|scared|fear|stressed|overwhelmed)/)) return "anxious";
  if (lower.match(/(angry|furious|frustrated|irritab|rage|hate|mad)/)) return "angry";
  if (lower.match(/(lonely|alone|isolated|no\s*friends|nobody)/)) return "lonely";
  if (lower.match(/(good|great|fine|okay|well|happy|better|amazing|wonderful)/)) return "good";
  if (lower.match(/(tired|exhausted|burnt\s*out|burnout|drained|no\s*energy)/)) return "tired";
  return "neutral";
}

function getReply(message: string, history: Array<{ role: string; content: string }>): string {
  const lower = message.toLowerCase();
  const name = extractName(history);
  const greeting = name ? name : "";
  const greetPrefix = greeting ? `${greeting}, ` : "";
  const greetSuffix = greeting ? ` ${greeting}` : "";

  const convoLength = history.filter((m) => m.role === "user").length;

  // Name extraction — user just told us their name
  const justName = history.some((m) =>
    m.role === "assistant" && /what.{0,20}name|your name|call you/i.test(m.content)
  );
  if (justName) {
    const maybeName = extractName(history);
    if (maybeName) {
      return pick([
        `${maybeName}! That's a beautiful name. It's so nice to meet you. So tell me — what brings you here today? Are you looking for support with something specific, or just exploring your options?`,
        `${maybeName}, wonderful to meet you! I'm really glad you reached out. So tell me — how are you doing today? Not the "I'm fine" version — the real version.`,
        `Nice to meet you, ${maybeName}! I already feel like we're going to have a great conversation. So what's on your mind today? I'm all ears.`,
        `${maybeName} — love that. Welcome! So what made you decide to reach out today? There's no wrong answer, by the way.`,
      ]);
    }
  }

  // First interaction — ask for name
  if (convoLength <= 1 && !name) {
    return pick([
      "Hey, welcome! I'm really glad you're here. Before we get started, what's your name? I like to make things personal — it's more fun that way.",
      "Hi there! Welcome to Belmek. I'd love to get to know you a bit — what should I call you?",
      "Hey! Thanks for reaching out, that takes courage. Quick question first — what's your name? I want to make sure we have a real conversation, not a robotic one.",
    ]);
  }

  // Greetings
  if (lower.match(/\b(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings|howdy|sup|yo)\b/) && convoLength <= 2) {
    return pick([
      "Hey! So glad you're here. Before anything else — what's your name? I'd love to know who I'm talking to.",
      "Welcome! I'm happy you reached out. What's your name, if you don't mind me asking?",
    ]);
  }

  if (lower.match(/\b(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings|howdy|sup|yo)\b/)) {
    return pick([
      `${greetPrefix}hey again! How are you doing right now?`,
      `${greetPrefix}hi! Good to see you. How's your day going so far?`,
    ]);
  }

  // How are you responses
  if (lower.match(/\b(fine|good|okay|ok|alright|not\s*bad|doing\s*well|great)\b/) && convoLength > 1) {
    return pick([
      `${greetPrefix}that's good to hear! I'm curious — what brings you to Belmek today? Whether it's something specific or just general curiosity, I'm here for it.`,
      `${greetPrefix}glad to hear that! So what can I help you with today? Maybe something about our services, or you just want to learn more about what we do?`,
    ]);
  }

  // Mood detection — low/sad
  if (detectMood(message) === "low") {
    return pick([
      `${greetPrefix}I hear you, and I want you to know — what you're feeling is valid. You don't have to go through this alone. Dr. Ossai at Belmek specializes in helping people who are going through exactly what you're describing. Would you like to know how we can help?`,
      `${greetPrefix}thank you for being honest with me — that takes real strength. Depression can feel so heavy, but there's absolutely support available for you. Belmek Psychiatry offers personalized treatment plans, and Dr. Ossai genuinely cares about every patient. Want me to tell you more about how to get started?`,
      `${greetPrefix}I'm really glad you felt comfortable sharing that with me. Feeling down is nothing to be ashamed of — so many people go through it, and the bravest thing you can do is reach out. That's exactly what you're doing right now. Would you like to know about scheduling a visit with Dr. Ossai?`,
    ]);
  }

  // Mood detection — anxious
  if (detectMood(message) === "anxious") {
    return pick([
      `${greetPrefix}I totally get it — anxiety can feel like a lot. But here's the thing: you're already taking a positive step just by being here and asking questions. That matters more than you know. At Belmek, Dr. Ossai works with patients every day to help manage anxiety through personalized treatment. Would you like to learn more?`,
      `${greetPrefix}anxiety is one of the most common things people reach out about, so you're definitely not alone in this. The good news is that it's very treatable. Dr. Ossai creates individualized plans that really work. Want to hear about what a first visit looks like? It's way less scary than you might think.`,
      `${greetPrefix}take a breath — you're in a safe space here. Anxiety can be overwhelming, but there's real, effective help available. Dr. Ossai at Belmek has helped so many patients find relief. Can I tell you about how to take the first step?`,
    ]);
  }

  // Mood detection — angry
  if (detectMood(message) === "angry") {
    return pick([
      `${greetPrefix}It's completely okay to feel that way. Anger often comes from a deeper place, and acknowledging it is the first step. Belmek offers anger management support that helps you understand and work through those feelings in a healthy way. Want to know more?`,
      `${greetPrefix}I appreciate you being real with me. Feeling frustrated or angry is a human experience — what matters is how we channel it. Dr. Ossai helps patients work through these feelings with compassion and practical strategies. Would you like to learn about our approach?`,
    ]);
  }

  // Mood detection — lonely
  if (detectMood(message) === "lonely") {
    return pick([
      `${greetPrefix}I'm sorry you're feeling that way — loneliness can be really tough. But I want you to know that reaching out here shows how strong you are. You matter, and there are people who care. Dr. Ossai at Belmek creates a warm, supportive environment where you'll never feel alone. Would you like to know more about getting started?`,
      `${greetPrefix}feeling isolated is one of the hardest things. But you're not alone — you're talking to me right now, and that's a beautiful first step. Belmek Psychiatry is built around compassion and connection. Dr. Ossai truly gets to know her patients. Can I tell you about scheduling a visit?`,
    ]);
  }

  // Mood detection — tired
  if (detectMood(message) === "tired") {
    return pick([
      `${greetPrefix}burnout is no joke — it affects everything. The fact that you're recognizing it and reaching out says a lot. Dr. Ossai at Belmek can help you get to the bottom of what's draining you and build a plan to get your energy and spark back. Want to know more?`,
      `${greetPrefix}exhaustion can make everything feel harder. But you don't have to push through it alone. There are real strategies and support that can help. Belmek Psychiatry offers personalized care for exactly this kind of thing. Interested in learning more?`,
    ]);
  }

  // Thanks
  if (lower.match(/\b(thank|thanks|appreciate|grateful|thx|ty)\b/)) {
    return pick([
      `${greetPrefix}of course! That's what I'm here for. Is there anything else on your mind? I'm happy to keep chatting.`,
      `${greetPrefix}you're so welcome! I really mean that. Don't hesitate to ask me anything else — no question is too small.`,
      `${greetPrefix}anytime! I'm always here if you need to talk or have questions.`,
    ]);
  }

  // Bye
  if (lower.match(/\b(bye|goodbye|see\s*ya|take\s*care|have\s*a\s*good|gotta\s*go|later|night)\b/)) {
    return pick([
      `${greetPrefix}take care of yourself, okay? And remember — reaching out for help is one of the bravest things you can do. We're always here when you need us. 💛`,
      `${greetPrefix}bye! I hope our chat made you feel a little lighter today. Whenever you're ready to take the next step, Belmek is just a call away at (443) 339-8634. You've got this.`,
      `${greetPrefix}see you! Remember, you deserve to feel better. Don't be a stranger — I'm always here. Take care.`,
    ]);
  }

  // Help
  if (lower.match(/\b(help|what\s*can\s*you|what\s*do\s*you|how\s*can\s*you)\b/)) {
    return pick([
      `${greetPrefix}I can help you with all sorts of things! Like our services, insurance, booking appointments, what to expect on your first visit, or even just chat about mental health in general. There's no wrong question here.`,
      `${greetPrefix}great question! I can tell you about what we offer, insurance we accept, how to book a visit, or even just be someone to talk to. What sounds good?`,
    ]);
  }

  // Services
  if (lower.match(/\b(service|offer|provide|treatment|what\s*do|specializ)\b/)) {
    return pick([
      `${greetPrefix}we offer a lot! Psychiatric evaluations, medication management, ADHD treatment, help with anxiety, depression, bipolar disorder, PTSD, anger management, and family stressors. Everything's done via secure telehealth video — so you can do it from wherever you feel most comfortable.`,
      `${greetPrefix}our services cover a lot of ground — from psychiatric evaluations and medication management to ADHD, anxiety, depression, bipolar disorder, PTSD, and more. And it's all online, so you can do it from your couch in your pajamas if you want. No judgment.`,
    ]);
  }

  // Insurance
  if (lower.match(/\b(insur|accept|take|coverage|plan|copay|payer)\b/)) {
    return pick([
      `${greetPrefix}we accept most major insurance — Medicare, UnitedHealthcare, Optum, Aetna, BCBS, CIGNA, Oscar, Carelon, and Humana. If you're not sure about your plan, just call us at (443) 339-8634 and we'll check for you. We want to make sure money isn't a barrier to getting help.`,
      `${greetPrefix}great question! We take Medicare, UnitedHealthcare, Optum, Aetna, Blue Cross Blue Shield, CIGNA, Oscar, Carelon, and Humana. Not sure about yours? Give us a call at (443) 339-8634 — we'll figure it out together.`,
    ]);
  }

  // Booking
  if (lower.match(/\b(book|schedule|appointment|make\s*an|set\s*up|see\s*dr|see\s*the\s*doctor|make\s*appt|sign\s*up|get\s*started|want\s*to\s*see|start\s*therapy|start\s*treatment)\b/)) {
    return pick([
      `${greetPrefix}I'd love to help you get started! You have a few options:\n\n📞 Call us at (443) 339-8634\n📧 Email info@belmekwellness.com\n📝 Or fill out the form on our Contact page\n\nWe'll get you scheduled and walk you through everything. You've already taken the hardest step — reaching out.`,
      `${greetPrefix}that's amazing that you're ready to take that step! Here's how to book:\n\n• Call (443) 339-8634\n• Email info@belmekwellness.com\n• Use our online Contact form\n\nWe'll take great care of you, I promise.`,
    ]);
  }

  // Contact
  if (lower.match(/\b(contact|phone|email|reach|call|number|address|location|where)\b/)) {
    return pick([
      `${greetPrefix}here's how to reach us:\n\n📞 (443) 339-8634\n📧 info@belmekwellness.com\n📍 Reisterstown, MD 21136 (online visits only)\n\nWe're super responsive and friendly — don't be shy!`,
      `${greetPrefix}you can reach us at (443) 339-8634 or email info@belmekwellness.com. We're in Reisterstown, MD, but all visits are online so you can join from anywhere.`,
    ]);
  }

  // Hours
  if (lower.match(/\b(hour|time|open|close|when|schedule|monday|saturday)\b/)) {
    return pick([
      `${greetPrefix}we're open Monday through Saturday, 9 AM to 5 PM. All appointments are via secure video, so you can join from wherever works best for you — home, office, even your car if you need to.`,
      `${greetPrefix}our hours are Mon–Sat, 9 AM to 5 PM. Everything's telehealth, so no commute or waiting rooms. Just you, your device, and Dr. Ossai.`,
    ]);
  }

  // First visit
  if (lower.match(/\b(first\s*visit|first\s*time|new\s*patient|initial|what\s*to\s*expect|start|begin|nervous|scared|worried)\b/)) {
    return pick([
      `${greetPrefix}it's totally normal to feel nervous — everyone does! But here's the truth: your first visit with Dr. Ossai is just a relaxed, open conversation. She'll ask about your history, what you're going through, and what you're hoping for. No tests, no pressure, no judgment. Just a real conversation to help you feel better. And since it's online, you can do it from wherever you feel safe.`,
      `${greetPrefix}I promise it's not as scary as it might seem! Your first visit is really just a warm conversation. Dr. Ossai will listen to your story, understand what you're dealing with, and work with you on a plan that makes sense. She's incredibly compassionate — her patients love her. And you can do it all from home via video.`,
    ]);
  }

  // Conditions
  if (lower.match(/\b(condition|diagnos|adhd|anxiety|depress|bipolar|ptsd|panic|anger|trauma|stress|family|ocd|insomnia)\b/)) {
    return pick([
      `${greetPrefix}we treat a wide range of things:\n\n• ADHD\n• Anxiety & panic disorders\n• Depression\n• Bipolar disorder\n• PTSD & trauma\n• Anger management\n• Family stressors\n\nDr. Ossai creates a personalized plan for each patient. You're never just a number here — you're a person, and you'll feel that from day one.`,
      `${greetPrefix}we help with ADHD, anxiety, depression, bipolar, PTSD, panic attacks, anger issues, family stressors, and more. What makes Belmek different is that Dr. Ossai truly tailors everything to you. Your treatment plan is yours — not a one-size-fits-all thing.`,
    ]);
  }

  // Telehealth
  if (lower.match(/\b(tele|video|virtual|remote|online|zoom|from\s*home|hipaa|secure)\b/)) {
    return pick([
      `${greetPrefix}everything's done through secure, HIPAA-compliant telehealth video. So yeah — you can literally do it from your couch in your pajamas. All you need is a phone or laptop with a camera. No commute, no waiting rooms, no stress.`,
      `${greetPrefix}all visits are virtual! We use secure HIPAA-compliant video, so your privacy is fully protected. You just need a device with a camera and you're good to go. It's the easiest way to get the care you need.`,
    ]);
  }

  // About Dr. Ossai
  if (lower.match(/\b(about|who|dr|doctor|ossai|provider|background|qualif|belmek|practice|mission)\b/)) {
    return pick([
      `${greetPrefix}Dr. Abimbola Ossai is the heart of Belmek. She's a board-certified psychiatric nurse practitioner with over 11 years of healthcare experience. She treats children, adolescents, and adults — and she genuinely, deeply cares about every single patient. She built this practice because she believes everyone deserves compassionate, personalized mental health care.`,
      `${greetPrefix}Dr. Ossai is the founder and lead provider. She's a board-certified PMHNP with over a decade of experience. What makes her special is how much she truly cares — patients don't just feel treated, they feel heard. She treats kids, teens, and adults across Maryland.`,
    ]);
  }

  // Cost
  if (lower.match(/\b(cost|price|fee|how\s*much|pay|afford|sliding|scale|free|consult)\b/)) {
    return pick([
      `${greetPrefix}costs depend on the service and your insurance. The best thing to do is call us at (443) 339-8634 — we'll walk you through everything and make sure cost isn't a barrier to you getting the help you deserve.`,
      `${greetPrefix}it varies based on what you need and your coverage. Give us a call at (443) 339-8634 and we'll give you all the details. We want to make this accessible for everyone.`,
    ]);
  }

  // Age groups
  if (lower.match(/\b(child|kid|teen|adolescent|young|age|adult|pediatric|son|daughter)\b/)) {
    return pick([
      `${greetPrefix}absolutely! Dr. Ossai treats children, adolescents, and adults. Whether it's for your child, a teenager, or yourself, she'll create a treatment plan tailored to that person's unique needs. Just call us at (443) 339-8634 to get started.`,
      `${greetPrefix}yes — we see kids, teens, and adults. Mental health matters at every age, and Dr. Ossai tailors her approach to each patient. Call us at (443) 339-8634 if you'd like to set something up.`,
    ]);
  }

  // Emergency
  if (lower.match(/\b(emergency|crisis|urgent|suicide|self.?harm|hurt|danger|kill|die|end\s*it|don'?t\s*want\s*to\s*live)\b/)) {
    return `${greetPrefix}please know that you are not alone and help is available right now.\n\n🆘 If you're in immediate danger, please call 911 or go to your nearest emergency room.\n📞 988 Suicide & Crisis Lifeline: call or text 988\n\nYou matter. Your life matters. Please reach out to someone right now. We're also here during office hours at (443) 339-8634. Please stay safe.`;
  }

  // Affirmations / positive
  if (lower.match(/\b(yes|yeah|yep|yup|ok|okay|sure|sounds\s*good|perfect|great|awesome|cool|please|yes\s*please)\b/) && convoLength > 2) {
    return pick([
      `${greetPrefix}I'm so glad! Is there anything else you'd like to know? I'm here for as long as you need me.`,
      `${greetPrefix}wonderful! Don't hesitate to ask me anything else. No question is too small.`,
      `${greetPrefix}love that! Anything else on your mind? I'm all ears.`,
    ]);
  }

  // Uncertainty
  if (lower.match(/\b(not\s*sure|idk|don'?t\s*know|maybe|umm|um|uh|hmm|confused)\b/)) {
    return pick([
      `${greetPrefix}no worries at all — take your time. There's no pressure here. I'm right here whenever you're ready.`,
      `${greetPrefix}that's totally okay! Sometimes it takes time to figure things out, and that's perfectly normal. I'm here whenever you need me.`,
      `${greetPrefix}no rush! When you're ready to talk about it, I'll be right here. 💛`,
    ]);
  }

  // How are you
  if (lower.match(/\b(how\s*are\s*you|how'?s\s*it\s*going|how\s*do\s*you\s*do|what'?s\s*up)\b/)) {
    return pick([
      `${greetPrefix}I'm doing great, thanks for asking! But more importantly — how are YOU doing? Like, for real.`,
      `${greetPrefix}I'm good! But let's talk about you. How are you feeling today?`,
    ]);
  }

  // What's your name
  if (lower.match(/\b(what'?s?\s*(is\s*)?your\s*name|who\s*are\s*you|tell\s*me\s*about\s*yourself)\b/)) {
    return pick([
      "I'm the Belmek Assistant — think of me as a friendly guide who's here to help you learn about our services and feel welcome. I'm not a therapist, but I care about making sure you feel comfortable and supported. 😊",
      "I'm just the Belmek chatbot, but I like to think of myself as your friendly neighborhood mental health guide! I'm here to answer questions, share info, and make you feel at home.",
    ]);
  }

  // Long vague messages — engage with empathy
  if (lower.length > 60 && !lower.match(/\b(insur|book|service|hour|contact|tele|cost|condition|child)\b/)) {
    return pick([
      `${greetPrefix}thank you for sharing that with me. It sounds like you've been carrying a lot. I want you to know that what you're feeling matters, and you don't have to face it alone. Dr. Ossai at Belmek creates a safe, warm space for exactly these kinds of conversations. Would you like to know how to get started?`,
      `${greetPrefix}I really appreciate you opening up. That takes courage. Whatever you're going through, there's support available. Belmek Psychiatry is all about meeting you where you are — no judgment, just care. Can I tell you about how to take the first step?`,
    ]);
  }

  // Catch-all
  return pick([
    `${greetPrefix}that's a great question! I want to make sure I give you the right answer. For something specific like that, I'd recommend reaching out to our office at (443) 339-8634 or emailing info@belmekwellness.com. They'll take great care of you.`,
    `${greetPrefix}hmm, I wish I had the perfect answer for that one! Our team at (443) 339-8634 would know best. Give them a call — they're super friendly.`,
    `${greetPrefix}I'm not 100% sure on that, but I know who would — our office team at (443) 339-8634. They'll get you sorted out. Is there anything else I can help with?`,
  ]);
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const reply = getReply(body.message, body.history);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong on my end! Try again in a sec, or call us at (443) 339-8634 if it's urgent." },
      { status: 500 }
    );
  }
}
