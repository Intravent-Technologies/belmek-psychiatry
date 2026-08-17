import { NextResponse } from "next/server";

interface ChatRequest {
  message: string;
  history: Array<{ role: string; content: string }>;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getName(history: Array<{ role: string; content: string }>): string | null {
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].role === "assistant" && /what.{0,30}name|your name|call you/i.test(history[i].content)) {
      for (let j = i + 1; j < history.length; j++) {
        if (history[j].role === "user") {
          const msg = history[j].content.trim();
          const patterns = [
            /(?:i'?m|i\s+am|my\s+name\s+is|it'?s|this\s+is|call\s+me)\s+([A-Z][a-z]{1,20})/i,
            /^([A-Z][a-z]{1,20})$/,
            /^([A-Z][a-z]{1,20})\s*[!.]?$/,
          ];
          for (const pat of patterns) {
            const m = msg.match(pat);
            if (m) return m[1];
          }
          if (msg.split(/\s+/).length <= 2 && /^[A-Z]/.test(msg)) {
            return msg.replace(/[!?.]/g, "").split(/\s+/)[0];
          }
          return null;
        }
      }
      break;
    }
  }
  return null;
}

function nameAsked(history: Array<{ role: string; content: string }>): boolean {
  return history.some(
    (m) => m.role === "assistant" && /what.{0,30}name|your name|call you/i.test(m.content)
  );
}

function hasBookingMention(history: Array<{ role: string; content: string }>): boolean {
  return history.some(
    (m) => m.role === "assistant" && /book|schedule|appointment|contact\s*page|call\s*us/i.test(m.content)
  );
}

function getReply(message: string, history: Array<{ role: string; content: string }>): string {
  const lower = message.toLowerCase();
  const name = getName(history);
  const n = name ? `${name}, ` : "";
  const ns = name ? ` ${name}` : "";
  const userMsgCount = history.filter((m) => m.role === "user").length;

  // ─── STEP 1: Bot just asked for name, user is responding ───
  if (nameAsked(history)) {
    const maybeName = getName(history);
    if (maybeName) {
      return pick([
        `${maybeName}, it's so nice to meet you. I'm really glad you're here. So tell me — what brings you to Belmek today? What's been going on with you?`,
        `${maybeName}! Love that name. Welcome. So what made you reach out today? There's no wrong answer — I'm just here to listen and help.`,
        `Nice to meet you, ${maybeName}. Before we get into everything — how are you doing today? Like, genuinely.`,
      ]);
    }
    // User didn't give a name, gently redirect
    return pick([
      "No worries at all! You can share your name whenever you're comfortable. But for now — what brings you here today? What's been on your mind?",
      "That's okay! We can skip the name part. Just tell me — what's going on? What made you decide to reach out?",
    ]);
  }

  // ─── FIRST MESSAGE: Ask for name warmly ───
  if (userMsgCount <= 1) {
    return pick([
      "Hey, welcome to Belmek. I'm really glad you're here. Before we get started — what's your name? I like to make our conversations personal.",
      "Hi there! Welcome to Belmek Psychiatry. I'd love to know who I'm talking to — what's your name?",
      "Hey! Thanks for reaching out, that takes courage. Quick thing first — what should I call you?",
    ]);
  }

  // ─── CRISIS / EMERGENCY ───
  if (lower.match(/\b(suicide|kill\s*myself|end\s*it|self.?harm|want\s*to\s*die|don'?t\s*want\s*to\s*live|hurt\s*myself|die|emergency|crisis)\b/)) {
    return `Please know that you are not alone and help is available right now.

🆘 If you're in immediate danger, please call 911 or go to your nearest emergency room.
📞 988 Suicide & Crisis Lifeline — call or text 988

You matter, ${name || "friend"}. Your life has value. Please reach out to someone right now. I'm here too — we'll get through this together.`;
  }

  // ─── MOOD: SAD / DEPRESSED ───
  if (lower.match(/\b(depress|sad|down|hopeless|empty|worthless|numb|cry|crying|tears|dark|no\s*reason\s*to|give\s*up|hate\s*myself|don'?t\s*care\s*anymore)\b/)) {
    return pick([
      `${n}thank you for trusting me enough to share that. I hear you, and what you're feeling is real and valid. You don't have to carry this alone. Dr. Ossai at Belmek has helped so many people who felt exactly the way you're feeling right now. She creates a warm, safe space where you can just be yourself — no judgment, no pressure. Would you like me to help you take the first step toward getting support?`,
      `${n}I'm really sorry you're going through this. Depression can feel so heavy, like you're carrying the weight of the world. But I want you to know — reaching out right now shows incredible strength. That's the hardest part, and you've already done it. Dr. Ossai specializes in helping people find their way back to feeling like themselves again. Can I tell you how to get started with her?`,
      `${n}I hear you, and I want you to know — you're not alone in this. So many people feel this way, and the bravest thing you can do is exactly what you're doing right now: reaching out. Dr. Ossai at Belmek offers a safe, compassionate space where you can talk about what you're going through and find real, personalized support. Would you like to know how to schedule a visit with her?`,
    ]);
  }

  // ─── MOOD: ANXIOUS ───
  if (lower.match(/\b(anxious|anxiety|worried|nervous|panic|scared|fear|stressed|overwhelmed|can'?t\s*breathe|heart\s*racing|racing\s*thoughts)\b/)) {
    return pick([
      `${n}anxiety can feel so overwhelming — like your mind won't stop racing. But here's what I want you to know: you're already doing something brave by being here. Dr. Ossai at Belmek helps people manage anxiety every single day with personalized, compassionate care. And since everything is via telehealth, you can have your first appointment from the comfort of your own space. Would you like to know how to get started?`,
      `${n}I hear you. Anxiety is one of the hardest things to deal with because it can feel like it's everywhere at once. But the good news is — it's very treatable. Dr. Ossai creates individualized plans that really work. And the first step is just a conversation. No tests, no pressure. Want me to help you book a visit?`,
    ]);
  }

  // ─── MOOD: ANGRY ───
  if (lower.match(/\b(angry|furious|frustrated|irritab|rage|mad|pissed|fed\s*up|sick\s*of)\b/)) {
    return pick([
      `${n}it's okay to feel that way. Anger usually comes from a deeper place — something that matters to you. Dr. Ossai at Belmek helps patients understand and work through those feelings in a healthy, supportive way. If you'd like, I can help you take the first step toward getting that support.`,
      `${n}I hear you. Feeling that way is human, and there's nothing wrong with it. But having someone in your corner who can help you work through it? That changes everything. Dr. Ossai at Belmek offers exactly that kind of support. Want to know how to get started?`,
    ]);
  }

  // ─── MOOD: LONELY ───
  if (lower.match(/\b(lonely|alone|isolated|no\s*friends|nobody\s*cares|nobody|miss\s*people)\b/)) {
    return pick([
      `${n}feeling lonely is one of the hardest things a person can go through. But I want you to know — you're not alone right now. You're talking to me, and that matters. Dr. Ossai at Belmek creates a warm, caring environment where you'll feel heard and valued from the very first visit. Would you like to know how to schedule a time to talk with her?`,
      `${n}I'm sorry you're feeling that way. Loneliness can be so heavy. But reaching out here — that's a sign of strength, not weakness. Dr. Ossai genuinely cares about her patients and creates a space where you'll never feel invisible. Can I help you take the first step?`,
    ]);
  }

  // ─── MOOD: TIRED / BURNOUT ───
  if (lower.match(/\b(tired|exhausted|burnt\s*out|burnout|drained|no\s*energy|can'?t\s*keep\s*going|overwhelmed)\b/)) {
    return pick([
      `${n}burnout and exhaustion can make everything feel impossible. But you're still here, still reaching out — that tells me there's a part of you that's ready for change. Dr. Ossai at Belmek can help you get to the bottom of what's draining you and build a real plan to get your energy back. Want to know how to get started?`,
      `${n}I hear you. When you're running on empty, everything feels harder. But you don't have to figure this out alone. Dr. Ossai offers personalized support that helps people find their spark again. Would you like to learn about scheduling a visit?`,
    ]);
  }

  // ─── MOOD: GOOD ───
  if (lower.match(/\b(good|great|fine|okay|ok|alright|better|happy|amazing|wonderful|fantastic)\b/) && userMsgCount > 2) {
    return pick([
      `${n}that's wonderful to hear! So what brings you to Belmek today? Are you looking for support with something specific, or just exploring your options?`,
      `${n}love to hear that! So what can I help you with today? Whether it's about our services, insurance, or just learning more — I'm here for it.`,
    ]);
  }

  // ─── THANKS ───
  if (lower.match(/\b(thank|thanks|appreciate|grateful|thx|ty)\b/)) {
    return pick([
      `${n}of course! That's what I'm here for. Is there anything else on your mind? I'm happy to keep chatting.`,
      `${n}you're so welcome! Don't hesitate to ask me anything else — no question is too small.`,
      `${n}anytime, truly. I'm always here if you need to talk or have questions.`,
    ]);
  }

  // ─── BYE ───
  if (lower.match(/\b(bye|goodbye|see\s*ya|take\s*care|have\s*a\s*good|gotta\s*go|later|night|good\s*night)\b/)) {
    return pick([
      `${n}take care of yourself, okay? And remember — reaching out for help is one of the bravest things you can do. We're always here when you need us.`,
      `${n}bye! I hope our chat made you feel a little lighter today. Whenever you're ready, Belmek is just a call away at (443) 339-8634. You've got this.`,
      `${n}see you! Remember, you deserve to feel better. Don't be a stranger — I'm always here. Take care of yourself.`,
    ]);
  }

  // ─── HELP ───
  if (lower.match(/\b(help|what\s*can\s*you|what\s*do\s*you|how\s*can\s*you)\b/)) {
    return pick([
      `${n}I can help with lots of things! I can tell you about our services, insurance we accept, how to book an appointment, what to expect on your first visit, or even just be someone to talk to. What sounds good?`,
      `${n}great question! I'm here to help you learn about Belmek — our services, insurance, booking, what Dr. Ossai is like, anything. What would you like to know?`,
    ]);
  }

  // ─── SERVICES ───
  if (lower.match(/\b(service|offer|provide|treatment|what\s*do|specializ)\b/)) {
    return pick([
      `${n}we offer psychiatric evaluations, medication management, ADHD treatment, anxiety and depression care, bipolar disorder, PTSD, anger management, and help with family stressors. Everything's done via secure telehealth video — so you can do it from wherever you feel most comfortable. Would you like to know how to set something up?`,
      `${n}Dr. Ossai provides comprehensive psychiatric care — evaluations, medication management, and treatment for ADHD, anxiety, depression, bipolar disorder, PTSD, and more. And it's all online, so you can do it from your couch. Want me to help you book a visit?`,
    ]);
  }

  // ─── INSURANCE ───
  if (lower.match(/\b(insur|accept|take|coverage|plan|copay|payer)\b/)) {
    return pick([
      `${n}we accept most major insurance — Medicare, UnitedHealthcare, Optum, Aetna, BCBS, CIGNA, Oscar, Carelon, and Humana. If you're not sure about your plan, just give us a call at (443) 339-8634 and we'll figure it out for you. We want to make sure cost isn't a barrier to getting help.`,
      `${n}great question! We take Medicare, UnitedHealthcare, Optum, Aetna, Blue Cross Blue Shield, CIGNA, Oscar, Carelon, and Humana. Not sure about yours? Call us at (443) 339-8634 — we'll check for you!`,
    ]);
  }

  // ─── BOOKING / APPOINTMENT ───
  if (lower.match(/\b(book|schedule|appointment|make\s*an|set\s*up|see\s*dr|see\s*the\s*doctor|make\s*appt|get\s*started|sign\s*up|want\s*to\s*see|start\s*therapy|start\s*treatment|ready\s*to|want\s*to\s*book)\b/)) {
    return pick([
      `${n}I'd love to help you get started! Here's what to do:\n\n📞 Call us at (443) 339-8634\n📧 Email info@belmekwellness.com\n📝 Or fill out the form on our Contact page\n\nWe'll get you scheduled and walk you through everything. The hardest part is reaching out — and you've already done that.`,
      `${n}that's amazing that you're ready to take that step! Here's how to book:\n\n• Call (443) 339-8634\n• Email info@belmekwellness.com\n• Use our Contact page form\n\nWe'll take great care of you. I promise.`,
    ]);
  }

  // ─── CONTACT ───
  if (lower.match(/\b(contact|phone|email|reach|call|number|address|location|where)\b/)) {
    return pick([
      `${n}here's how to reach us:\n\n📞 (443) 339-8634\n📧 info@belmekwellness.com\n📍 Reisterstown, MD 21136 (online visits only)\n\nWe're super responsive and friendly — don't be shy!`,
      `${n}you can reach us at (443) 339-8634 or email info@belmekwellness.com. We're in Reisterstown, MD, but all visits are online.`,
    ]);
  }

  // ─── HOURS ───
  if (lower.match(/\b(hour|time|open|close|when|schedule|monday|saturday)\b/)) {
    return pick([
      `${n}we're open Monday through Saturday, 9 AM to 5 PM. All appointments are via secure video, so you can join from wherever works best for you.`,
      `${n}our hours are Mon–Sat, 9 AM to 5 PM. Everything's telehealth, so no commute or waiting rooms needed.`,
    ]);
  }

  // ─── FIRST VISIT / NERVOUS ───
  if (lower.match(/\b(first\s*visit|first\s*time|new\s*patient|initial|what\s*to\s*expect|nervous|scared|worried|afraid|intimidat)\b/)) {
    return pick([
      `${n}it's completely normal to feel nervous — most people do! But here's the truth: your first visit with Dr. Ossai is just a relaxed, open conversation. She'll ask about your history, what you're going through, and what you're hoping for. No tests, no judgment. Just a real conversation. And since it's online, you can do it from wherever you feel safe. Would you like me to help you schedule it?`,
      `${n}I promise it's not as scary as it seems! Your first visit is really just a warm conversation. Dr. Ossai will listen to your story, understand what you're dealing with, and work with you on a plan. She's incredibly compassionate — her patients love her. And you can do it all from home via video. Want to get something on the calendar?`,
    ]);
  }

  // ─── CONDITIONS ───
  if (lower.match(/\b(condition|diagnos|adhd|anxiety|depress|bipolar|ptsd|panic|anger|trauma|stress|family|ocd|insomnia|mental\s*health)\b/)) {
    return pick([
      `${n}we help with ADHD, anxiety, depression, bipolar disorder, PTSD, panic attacks, anger issues, family stressors, and more. What makes Belmek different is that Dr. Ossai truly tailors everything to you. Would you like to talk with her about what you're going through?`,
      `${n}Dr. Ossai treats a wide range of conditions — ADHD, anxiety, depression, bipolar, PTSD, trauma, anger, family stressors, and more. Every treatment plan is personalized. Would you like to schedule a visit to discuss your specific situation?`,
    ]);
  }

  // ─── TELEHEALTH ───
  if (lower.match(/\b(tele|video|virtual|remote|online|zoom|from\s*home|hipaa|secure)\b/)) {
    return pick([
      `${n}all visits are through secure, HIPAA-compliant telehealth video. So you can do it from your couch, your car, wherever you feel comfortable. All you need is a phone or laptop with a camera. No commute, no waiting rooms.`,
      `${n}everything's virtual! Secure, HIPAA-compliant video visits. You just need a device with a camera and you're good to go. Super convenient and completely private.`,
    ]);
  }

  // ─── ABOUT DR. OSSAI ───
  if (lower.match(/\b(about|who|dr|doctor|ossai|provider|background|qualif|belmek|practice|mission)\b/)) {
    return pick([
      `${n}Dr. Abimbola Ossai is the heart of Belmek. She's a board-certified psychiatric nurse practitioner with over 11 years of healthcare experience. She treats children, adolescents, and adults — and she genuinely cares about every single patient. She built this practice because she believes everyone deserves compassionate, personalized mental health care. Would you like to schedule a visit with her?`,
      `${n}Dr. Ossai is the founder and lead provider at Belmek. She's a board-certified PMHNP with over a decade of experience. What makes her special is how much she truly cares — patients don't just feel treated, they feel heard. She treats kids, teens, and adults across Maryland.`,
    ]);
  }

  // ─── COST ───
  if (lower.match(/\b(cost|price|fee|how\s*much|pay|afford|sliding|scale|free|consult)\b/)) {
    return pick([
      `${n}costs depend on the service and your insurance. The best thing to do is call us at (443) 339-8634 — we'll walk you through everything and make sure cost isn't a barrier to getting the help you deserve.`,
      `${n}it varies based on what you need and your coverage. Give us a call at (443) 339-8634 and we'll give you all the details. We want to make this accessible for everyone.`,
    ]);
  }

  // ─── AGE GROUPS ───
  if (lower.match(/\b(child|kid|teen|adolescent|young|age|adult|pediatric|son|daughter)\b/)) {
    return pick([
      `${n}absolutely! Dr. Ossai treats children, adolescents, and adults. Whether it's for your child, a teenager, or yourself, she'll create a treatment plan tailored to that person's unique needs. Would you like to schedule a visit?`,
      `${n}yes — we see kids, teens, and adults. Mental health matters at every age. Call us at (443) 339-8634 if you'd like to set something up.`,
    ]);
  }

  // ─── HOW ARE YOU ───
  if (lower.match(/\b(how\s*are\s*you|how'?s\s*it\s*going|how\s*do\s*you\s*do|what'?s\s*up)\b/)) {
    return pick([
      `${n}I'm doing great, thanks for asking! But more importantly — how are YOU doing? Like, for real.`,
      `${n}I'm good! But let's talk about you. How are you feeling today?`,
    ]);
  }

  // ─── WHAT'S YOUR NAME ───
  if (lower.match(/\b(what'?s?\s*(is\s*)?your\s*name|who\s*are\s*you|tell\s*me\s*about\s*yourself)\b/)) {
    return pick([
      "I'm the Belmek Assistant — think of me as a friendly guide who's here to help you feel welcome and learn about our services. I'm not a therapist, but I care about making sure you feel comfortable and supported.",
      "I'm just the Belmek chatbot, but I like to think of myself as your friendly mental health guide! I'm here to answer questions, share info, and make you feel at home.",
    ]);
  }

  // ─── AFFIRMATIVE / POSITIVE ───
  if (lower.match(/\b(yes|yeah|yep|yup|ok|okay|sure|sounds\s*good|perfect|great|awesome|cool|please|yes\s*please|let'?s\s*do\s*it|sure|why\s*not)\b/) && userMsgCount > 2) {
    if (!hasBookingMention(history)) {
      return pick([
        `${n}I'm glad! So let me ask — what made you decide to reach out today? What's been going on with you?`,
        `${n}great! I'd love to learn more about what brings you here. What's been on your mind?`,
      ]);
    }
    return pick([
      `${n}I'm so glad! Is there anything else you'd like to know? I'm here for as long as you need me.`,
      `${n}wonderful! Don't hesitate to ask me anything else. No question is too small.`,
    ]);
  }

  // ─── UNCERTAINTY ───
  if (lower.match(/\b(not\s*sure|idk|don'?t\s*know|maybe|umm|um|uh|hmm|confused|don'?t\s*know\s*where\s*to\s*start)\b/)) {
    return pick([
      `${n}no worries at all — take your time. There's no pressure here. I'm right here whenever you're ready to talk about it.`,
      `${n}that's totally okay! Sometimes it takes time to figure things out. When you're ready, I'm here. And if you'd rather just talk to someone directly, you can always call us at (443) 339-8634.`,
    ]);
  }

  // ─── LONG PERSONAL MESSAGES (not matching specific topics) ───
  if (lower.length > 40 && !lower.match(/\b(insur|book|service|hour|contact|tele|cost|condition|child)\b/)) {
    if (!hasBookingMention(history)) {
      return pick([
        `${n}thank you for sharing that with me. It sounds like you've been carrying a lot, and I want you to know — what you're feeling matters. You don't have to face it alone. Dr. Ossai at Belmek creates a safe, warm space where you can talk about exactly these things. She'll listen without judgment and help you find a path forward. Would you like to schedule a visit with her?`,
        `${n}I really appreciate you opening up. That takes courage. Whatever you're going through, there's support available. Dr. Ossai at Belmek offers personalized, compassionate care — and the first step is just a conversation. Can I help you get something on the calendar?`,
      ]);
    }
    return pick([
      `${n}thank you for sharing that. I know it's not easy. Dr. Ossai would really be able to help you with this. Would you like me to walk you through how to book a visit?`,
      `${n}I hear you. This is exactly the kind of thing Dr. Ossai specializes in. When you're ready, she's just a call away at (443) 339-8634. No pressure — take your time.`,
    ]);
  }

  // ─── CATCH-ALL ───
  if (!hasBookingMention(history)) {
    return pick([
      `${n}that's a great question. For something specific like that, I'd recommend reaching out to our office at (443) 339-8634 or emailing info@belmekwellness.com. They'll take great care of you.`,
      `${n}hmm, I want to make sure I give you the right answer. Our office team at (443) 339-8634 would know best. Give them a call — they're super friendly!`,
    ]);
  }

  return pick([
    `${n}great question! Our team at (443) 339-8634 would know best. Is there anything else I can help with?`,
    `${n}I'm not 100% sure on that, but our office at (443) 339-8634 would know. Anything else I can help with?`,
  ]);
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const reply = getReply(body.message, body.history);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong on my end! Try again in a sec, or call us at (443) 339-8634." },
      { status: 500 }
    );
  }
}
