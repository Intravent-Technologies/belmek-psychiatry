"use client";

import { useState } from "react";

interface Review {
  name: string;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Sarah M.",
    text: "Dr. Ossai and the team have been incredible. They truly listen and care about their patients. I've never felt more supported in my mental health journey.",
  },
  {
    name: "James R.",
    text: "After years of struggling with anxiety, I finally found a practice that takes the time to understand me. The telehealth option makes it so convenient.",
  },
  {
    name: "Maria L.",
    text: "The staff is professional, compassionate, and responsive. I was able to get an appointment within a week. Highly recommend Belmek Psychiatry.",
  },
];

export default function ReviewSection() {
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setReviewName("");
    setReviewText("");
  };

  return (
    <section className="py-20 md:py-28 bg-[#faf9f6]">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">What Our Patients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {reviews.map((review, i) => (
            <div key={i} className="glass-card rounded-2xl p-8 relative">
              <div className="absolute top-6 right-6 text-5xl font-serif text-primary/10 leading-none">&ldquo;</div>
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed relative z-10">&ldquo;{review.text}&rdquo;</p>
              <p className="mt-5 text-sm font-semibold text-gray-900">— {review.name}</p>
            </div>
          ))}
        </div>

        <div className="max-w-lg mx-auto">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Share Your Experience</h3>
            <p className="text-sm text-gray-500 mb-6">Your feedback helps others find the care they need.</p>
            {reviewSubmitted ? (
              <div className="flex items-center gap-3 text-green-700 bg-green-50 rounded-xl px-5 py-4">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Thank you for your feedback!</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
                <textarea
                  placeholder="Your Review"
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-sm"
                  maxLength={1000}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{reviewText.length}/1000</span>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
