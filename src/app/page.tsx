import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import InsuranceGrid from "@/components/InsuranceGrid";
import FAQ from "@/components/FAQ";
import ReviewSection from "@/components/ReviewSection";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/Animations";

const services = [
  {
    title: "Psychiatric Evaluation",
    description: "Comprehensive assessment of your emotional and psychological health to determine the best care path.",
    href: "/services",
    icon: "evaluation",
  },
  {
    title: "Medication Management",
    description: "Ongoing monitoring and adjustments to your psychiatric medications for optimal results.",
    href: "/services",
    icon: "medication",
  },
  {
    title: "Counseling Services",
    description: "Individual, group, and family therapy options tailored to meet your specific needs.",
    href: "/services",
    icon: "counseling",
  },
  {
    title: "Diagnostic Evaluation",
    description: "Detailed assessments to identify underlying causes of your mental health concerns.",
    href: "/services",
    icon: "diagnostic",
  },
  {
    title: "Telehealth Services",
    description: "Secure video consultations bringing expert mental health care directly to you.",
    href: "/services",
    icon: "telehealth",
  },
];

const conditions = [
  "ADHD", "Anxiety", "Depression", "Bipolar",
  "Panic", "PTSD", "Anger Management", "Family Stressors",
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="relative py-20 md:py-28 bg-[#faf9f6] overflow-hidden">
        <div className="blob w-[400px] h-[400px] bg-primary-light top-[-100px] right-[-100px]" />
        <div className="blob w-[300px] h-[300px] bg-primary bottom-[-150px] left-[-100px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Mission"
            subtitle="What Drives Us"
          />
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                </svg>
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed italic font-[var(--font-geist-sans)]">
                &ldquo;Our mission is to provide compassionate, high-quality, and evidence-based mental health care in a
                safe, confidential, and supportive environment. We are committed to fostering healing, growth, and
                emotional well-being through a warm, friendly, and non-judgmental approach.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-max">
          <SectionHeading
            title="Our Services"
            subtitle="Expert care for your well-being"
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <section className="relative py-20 md:py-28 bg-[#faf9f6] overflow-hidden">
        <div className="blob w-[500px] h-[500px] bg-primary-light top-[-200px] left-[-100px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20 flex items-center justify-center relative overflow-hidden">
                <div className="blob w-64 h-64 bg-primary-light top-[-40px] right-[-40px]" />
                <div className="relative text-center">
                  <img
                    src="/dr-ossai.jpg"
                    alt="Dr. Abimbola Ossai"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover mx-auto mb-5 shadow-xl"
                  />
                  <p className="text-primary font-bold text-lg">Dr. Abimbola Ossai</p>
                  <p className="text-sm text-gray-500">DNP, PMHNP-BC</p>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
                Founder &amp; Owner
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Meet Dr. Ossai
              </h2>
              <div className="mt-2 inline-block px-3 py-1 rounded-lg bg-primary/5 text-primary text-sm font-semibold">
                DNP, PMHNP-BC
              </div>
              <p className="mt-6 text-gray-600 leading-relaxed">
                With over 11 years of healthcare experience, Dr. Ossai provides comprehensive psychiatric
                evaluations, diagnosis, and medication management for children, adolescents, and adults.
                She treats a wide range of conditions including anxiety, depression, ADHD, bipolar disorder,
                PTSD, panic disorders, and more.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A Cum Laude graduate of the University of Wisconsin&ndash;Eau Claire, with advanced degrees
                from the University of Maryland, Baltimore and Frontier Nursing University, she combines deep
                clinical expertise with compassionate, patient-centered care. Currently accepting new patients
                for online video appointments across Maryland.
              </p>
              <div className="mt-8">
                <Button href="/about">Meet Dr. Ossai</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="blob w-[400px] h-[400px] bg-primary bottom-[-150px] right-[-100px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Conditions We Treat"
            subtitle="Custom assessments and individualized treatment strategies"
          />
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {conditions.map((condition) => (
              <StaggerItem key={condition}>
                <div className="glass-card rounded-xl px-4 py-5 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                  <span className="text-sm font-semibold text-gray-700">{condition}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-10 text-center">
            <Button href="/contact">Make an Appointment</Button>
          </div>
        </div>
      </section>

      <InsuranceGrid />

      <FAQ />
      <ReviewSection />
    </>
  );
}
