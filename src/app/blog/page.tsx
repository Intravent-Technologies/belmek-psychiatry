import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog | Belmek Psychiatry and Wellness",
  description: "Mental health resources, tips, and insights from Belmek Psychiatry and Wellness.",
};

const posts = [
  {
    slug: "understanding-anxiety",
    title: "Understanding Anxiety: Signs, Symptoms, and Treatment Options",
    excerpt:
      "Anxiety is more than just feeling stressed or worried. Learn about the different types of anxiety disorders, common symptoms, and effective treatment approaches that can help you regain control.",
    date: "June 15, 2026",
    author: "Dr. Jane Belmek",
  },
  {
    slug: "benefits-of-telehealth-psychiatry",
    title: "The Benefits of Telehealth Psychiatry: Convenient Care From Home",
    excerpt:
      "Telehealth psychiatry offers a flexible, accessible way to receive mental health care. Discover how virtual visits work and why they might be the right choice for you.",
    date: "June 8, 2026",
    author: "Dr. Michael Chen",
  },
  {
    slug: "understanding-adhd-in-adults",
    title: "Understanding ADHD in Adults: Challenges and Strategies",
    excerpt:
      "ADHD doesn't just affect children. Many adults struggle with undiagnosed ADHD. Learn about the signs, diagnosis process, and effective management strategies for adult ADHD.",
    date: "June 1, 2026",
    author: "Sarah Thompson, LICSW",
  },
  {
    slug: "managing-seasonal-affective-disorder",
    title: "Managing Seasonal Affective Disorder: Tips for Winter Wellness",
    excerpt:
      "As the seasons change, so can your mood. Learn about Seasonal Affective Disorder (SAD) and discover practical strategies to maintain your mental health during the darker months.",
    date: "May 25, 2026",
    author: "Dr. Jane Belmek",
  },
  {
    slug: "what-to-expect-psychiatric-evaluation",
    title: "What to Expect During a Psychiatric Evaluation",
    excerpt:
      "If you've never had a psychiatric evaluation before, you might feel nervous. Here's a step-by-step guide to help you understand what happens during your first visit.",
    date: "May 18, 2026",
    author: "Dr. Jane Belmek",
  },
];

export default function Blog() {
  return (
    <>
      <section className="relative min-h-[40vh] flex items-center bg-gradient-to-br from-[#1a1200] via-[#2a1f00] to-primary overflow-hidden">
        <div className="blob w-[400px] h-[400px] bg-primary-light top-[-100px] right-[-50px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">Blog</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, resources, and guidance for your mental health journey.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
