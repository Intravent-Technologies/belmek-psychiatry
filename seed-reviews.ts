import { getReviews, addReview } from "./lib/db.js";

const defaultReviews = [
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

async function seed() {
  const existing = await getReviews();
  if (existing.length === 0) {
    for (const review of defaultReviews) {
      await addReview(review.name, review.text);
    }
    console.log("Seeded default reviews");
  } else {
    console.log("Reviews already exist, skipping seed");
  }
}

seed().catch(console.error);
