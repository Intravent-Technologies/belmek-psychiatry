import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

const posts = [
  {
    slug: "understanding-anxiety",
    title: "Understanding Anxiety: Signs, Symptoms, and Treatment Options",
    content: `
      Anxiety is a natural response to stress, but when it becomes persistent and overwhelming, it may be an anxiety disorder. At Belmek Psychiatry and Wellness, we help patients understand their anxiety and find effective treatment.

      ## What is Anxiety?

      Anxiety disorders are the most common mental health conditions in the United States, affecting millions of adults each year. While occasional anxiety is a normal part of life, anxiety disorders involve excessive fear or worry that interferes with daily activities.

      ## Common Symptoms

      - Persistent worry or fear about everyday situations
      - Restlessness or feeling on edge
      - Difficulty concentrating
      - Sleep disturbances
      - Physical symptoms like rapid heartbeat, sweating, or trembling
      - Avoidance of situations that trigger anxiety

      ## Types of Anxiety Disorders

      - Generalized Anxiety Disorder (GAD)
      - Panic Disorder
      - Social Anxiety Disorder
      - Specific Phobias
      - Agoraphobia

      ## Treatment Options

      Effective treatment for anxiety often includes a combination of therapy, medication, and lifestyle changes. At Belmek Psychiatry and Wellness, we develop personalized treatment plans that may include:

      - **Cognitive-Behavioral Therapy (CBT):** Helps identify and change negative thought patterns
      - **Medication Management:** SSRIs, SNRIs, and other medications can help manage symptoms
      - **Lifestyle Modifications:** Exercise, sleep hygiene, and stress reduction techniques

      ## When to Seek Help

      If anxiety is affecting your work, relationships, or quality of life, it's time to seek professional help. You don't have to struggle alone — effective treatments are available.
    `,
    date: "June 15, 2026",
    author: "Dr. Jane Belmek",
  },
  {
    slug: "benefits-of-telehealth-psychiatry",
    title: "The Benefits of Telehealth Psychiatry: Convenient Care From Home",
    content: `
      Telehealth has transformed mental health care delivery, making it more accessible and convenient than ever before. At Belmek Psychiatry and Wellness, we offer secure telehealth services for patients throughout Maryland.

      ## What is Telehealth Psychiatry?

      Telehealth psychiatry allows you to receive mental health care through secure video consultations from the comfort of your home. It's the same high-quality care you would receive in person, delivered through a convenient digital platform.

      ## Key Benefits

      ### 1. Convenience and Flexibility
      No need to travel to appointments. Save time on commuting and attend sessions from anywhere with a reliable internet connection.

      ### 2. Increased Access to Care
      Telehealth makes it easier for those in rural areas or with limited mobility to access specialized psychiatric care.

      ### 3. Comfort and Privacy
      Many patients feel more comfortable discussing sensitive topics from their own environment, leading to more productive sessions.

      ### 4. Consistent Care
      With telehealth, you're less likely to miss appointments due to weather, transportation issues, or scheduling conflicts.

      ## How It Works

      1. Schedule your telehealth appointment
      2. Receive a secure video link via email
      3. Join your session at the scheduled time
      4. Follow up with your provider as needed

      ## Is Telehealth Right for You?

      Telehealth is appropriate for most psychiatric consultations, including initial evaluations, medication management, and follow-up appointments. Contact us to discuss whether telehealth is a good fit for your needs.
    `,
    date: "June 8, 2026",
    author: "Dr. Michael Chen",
  },
  {
    slug: "understanding-adhd-in-adults",
    title: "Understanding ADHD in Adults: Challenges and Strategies",
    content: `
      Attention-Deficit/Hyperactivity Disorder (ADHD) is often associated with children, but it affects millions of adults as well. Many adults go undiagnosed for years, struggling with symptoms they don't fully understand.

      ## Adult ADHD Symptoms

      Adult ADHD can manifest differently than childhood ADHD. Common symptoms include:

      - Difficulty focusing and staying organized
      - Chronic procrastination
      - Impulsivity in decision-making
      - Restlessness or feeling "driven by a motor"
      - Difficulty managing time
      - Forgetfulness in daily activities
      - Emotional dysregulation

      ## Diagnosis

      Getting an accurate diagnosis is the first step toward effective management. Our comprehensive evaluation includes:

      - Detailed clinical interview
      - ADHD symptom rating scales
      - Review of childhood history
      - Collateral information from family members when appropriate

      ## Treatment Approaches

      Effective ADHD management is multimodal:

      - **Medication:** Stimulants and non-stimulants can improve focus and impulse control
      - **Therapy:** CBT can help develop coping strategies and organizational skills
      - **Lifestyle Changes:** Exercise, sleep, and nutrition play important roles
      - **Coaching:** ADHD coaching provides practical strategies for daily challenges

      ## Living Well with ADHD

      With proper treatment and support, adults with ADHD can thrive professionally and personally. The key is finding the right combination of treatments and strategies that work for you.
    `,
    date: "June 1, 2026",
    author: "Sarah Thompson, LICSW",
  },
];

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="relative min-h-[30vh] flex items-center bg-gradient-to-br from-[#1a1200] via-[#2a1f00] to-primary overflow-hidden">
        <img src="/therapy-session.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1200] via-[#2a1f00]/80 to-primary/60" />
        <div className="blob w-[300px] h-[300px] bg-primary-light top-[-80px] right-[-50px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-gray-300 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <span>{post.author}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      <article className="section-padding bg-white">
        <div className="container-max max-w-3xl">
          <div className="prose prose-gray max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{line.replace("## ", "")}</h2>;
              }
              if (line.startsWith("### ")) {
                return <h3 key={i} className="text-xl font-semibold text-gray-900 mt-8 mb-3">{line.replace("### ", "")}</h3>;
              }
              if (line.startsWith("- **") && line.endsWith("**")) {
                const [label, ...rest] = line.replace("- **", "").split(":**");
                return (
                  <p key={i} className="text-gray-700 leading-relaxed ml-4 mb-2">
                    <strong>{label}:</strong>{rest.join(":**")}
                  </p>
                );
              }
              if (line.startsWith("- ")) {
                return <li key={i} className="text-gray-700 ml-6 mb-1 list-disc">{line.replace("- ", "")}</li>;
              }
              if (line.trim() === "") {
                return <div key={i} className="h-4" />;
              }
              return <p key={i} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
            })}
          </div>

        </div>
      </article>

      <section className="relative py-20 md:py-28 bg-[#faf9f6] overflow-hidden">
        <img src="/therapy-session.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 blur-sm" />
        <div className="blob w-[300px] h-[300px] bg-primary-light top-[-50px] right-[-50px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Ready to Start Your Journey?"
            subtitle="Take the first step toward better mental health."
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact">Schedule an Appointment</Button>
            <Button href="/services" variant="outline">View Our Services</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
