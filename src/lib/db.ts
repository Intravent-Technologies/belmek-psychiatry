import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("name, text")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addReview(name: string, text: string) {
  const { data, error } = await supabase
    .from("reviews")
    .insert({ name, text })
    .select("name, text")
    .single();

  if (error) throw error;
  return data;
}
