"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How do I schedule an appointment?",
    a: "Fill out our contact form or call us at (443) 339-8634. Dr. Ossai will contact you to schedule your appointment.",
  },
  {
    q: "Do you offer in-person and telehealth visits?",
    a: "We offer online video appointments only through a secure, HIPAA-compliant platform. Appointments are available Monday - Saturday | 9am - 5pm.",
  },
  {
    q: "What insurance do you accept?",
    a: "We accept Medicare, UnitedHealthcare, Optum, Cigna, Blue Cross Blue Shield, Aetna, Oscar, and many more. Submit our insurance verification form and we will confirm your coverage.",
  },
  {
    q: "What conditions do you treat?",
    a: "We treat a wide range of conditions including anxiety, depression, ADHD, bipolar disorder, OCD, PTSD, sleep disorders, and more.",
  },
  {
    q: "Do I need a referral to make an appointment?",
    a: "No referral is needed. You can schedule an appointment directly by calling us or filling out our online form.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-[#faf9f6]">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Common Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full flex items-center justify-between px-6 md:px-8 py-5 text-left transition-colors ${openIndex === i ? "" : "hover:bg-white/50"}`}
              >
                <span className="font-semibold text-gray-900 pr-4 text-sm md:text-base">{faq.q}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === i ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6">
                      <div className="w-8 h-0.5 bg-primary/20 rounded-full mb-4" />
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
