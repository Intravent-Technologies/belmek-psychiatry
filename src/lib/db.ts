import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function getReviews() {
  await initDb();
  const result = await sql`SELECT name, text FROM reviews ORDER BY created_at DESC`;
  return result;
}

export async function addReview(name: string, text: string) {
  await initDb();
  const result = await sql`INSERT INTO reviews (name, text) VALUES (${name}, ${text}) RETURNING name, text`;
  return result[0];
}
