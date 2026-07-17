import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
  const { count } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true });

  if (count === 0) {
    const { error } = await supabase.from("reviews").insert(defaultReviews);
    if (error) {
      console.error("Seed failed:", error);
    } else {
      console.log("Seeded default reviews");
    }
  } else {
    console.log("Reviews already exist, skipping seed");
  }
}

seed().catch(console.error);
