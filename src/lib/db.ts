import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabase;
}

export async function getReviews() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("reviews")
    .select("name, text")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addReview(name: string, text: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("reviews")
    .insert({ name, text })
    .select("name, text")
    .single();

  if (error) throw error;
  return data;
}
