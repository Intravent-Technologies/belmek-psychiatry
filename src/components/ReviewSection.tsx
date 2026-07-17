"use client";

import { useState, useEffect } from "react";

interface Review {
  name: string;
  text: string;
}

const fallbackReviews: Review[] = [
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

function deduplicateReviews(reviews: Review[]): Review[] {
  const seen = new Set<string>();
  return reviews.filter((r) => {
    const key = `${r.name}|${r.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass-card rounded-2xl p-6 relative h-full flex flex-col min-w-0">
      <div className="absolute top-4 right-4 text-5xl font-serif text-primary/10 leading-none">&ldquo;</div>
      <div className="flex items-center gap-0.5 mb-4">
        {[...Array(5)].map((_, j) => (
          <StarIcon key={j} />
        ))}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed relative z-10 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="mt-4 text-sm font-semibold text-gray-900">— {review.name}</p>
    </div>
  );
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const maxSlide = Math.max(0, reviews.length - visibleCount);
  const numDots = Math.min(reviews.length, maxSlide + 1);
  const effectivePage = Math.min(currentPage, maxSlide);

  useEffect(() => {
    function handleResize() {
      setVisibleCount(window.innerWidth >= 768 ? 3 : 1);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxSlide]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Review[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews((prev) => deduplicateReviews([...data, ...prev]));
        }
      })
      .catch(() => {});
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: reviewName.trim(), text: reviewText.trim() }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews((prev) => deduplicateReviews([newReview, ...prev]));
        setReviewSubmitted(true);
        setReviewName("");
        setReviewText("");
        setTimeout(() => setReviewSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#faf9f6]">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            What Our Patients Say
          </h2>
        </div>

        <div className="relative mb-14">
          <div className="overflow-hidden rounded-2xl h-[320px]">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${effectivePage * (100 / visibleCount)}%)`,
              }}
            >
              {reviews.map((review, i) => (
                <div
                  key={`${review.name}-${i}`}
                  className="flex-shrink-0 px-3 h-full"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {numDots > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {[...Array(numDots)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === effectivePage
                      ? "bg-primary w-6 h-2.5"
                      : "bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="max-w-lg mx-auto">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Share Your Experience</h3>
            <p className="text-sm text-gray-500 mb-6">
              Your feedback helps others find the care they need.
            </p>
            {reviewSubmitted ? (
              <div className="flex items-center gap-3 text-green-700 bg-green-50 rounded-xl px-5 py-4">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
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
                    disabled={submitting}
                    className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
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
