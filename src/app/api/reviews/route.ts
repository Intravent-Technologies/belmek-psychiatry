import { NextResponse } from "next/server";
import { getReviews, addReview } from "@/lib/db";

export async function GET() {
  try {
    const reviews = await getReviews();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, text } = body;

    if (!name || !text) {
      return NextResponse.json({ error: "Name and text are required" }, { status: 400 });
    }

    const review = await addReview(name.trim(), text.trim());
    return NextResponse.json(review);
  } catch (error) {
    console.error("Failed to add review:", error);
    return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
  }
}
