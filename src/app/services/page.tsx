import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/Animations";

export const metadata: Metadata = {
  title: "Services | Belmek Psychiatry and Wellness",
  description: "Comprehensive psychiatric services including evaluations, medication management, and telehealth for children, adolescents, and adults in Maryland.",
};

const services = [
  {
    title: "Psychiatric Evaluation",
    description:
      "A comprehensive psychiatric evaluation is the foundation of effective treatment. During your initial visit, we conduct a thorough assessment of your emotional, psychological, and behavioral health. This includes a detailed review of your symptoms, medical history, family history, and current life circumstances. The evaluation helps us accurately diagnose your condition and develop a personalized treatment plan tailored to your unique needs.",
    features: [
      "Comprehensive mental health assessment",
      "Diagnostic clarification",
      "Personalized treatment planning",
      "Collaborative goal setting",
    ],
    image: "https://plus.unsplash.com/premium_photo-1664474879417-7dca72bd6430?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Medication Management",
    description:
      "Our medication management services provide ongoing monitoring and optimization of psychiatric medications. We understand that finding the right medication and dosage is a process that requires patience and careful observation. Our team works closely with you to track your progress, manage side effects, and make adjustments as needed to ensure the best possible outcomes.",
    features: [
      "Initial medication consultation",
      "Regular follow-up appointments",
      "Medication adjustments and optimization",
      "Side effect management",
    ],
    image: "https://plus.unsplash.com/premium_photo-1661396976291-6cf919380ce3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Individual & Family Support",
    description:
      "We offer personalized care for children, adolescents, and adults facing emotional, cognitive, or behavioral challenges. Our holistic approach addresses unique life factors rather than just suppressing temporary symptoms, promoting long-term wellness and resilience.",
    features: [
      "Comprehensive psychiatric assessment",
      "Individualized treatment planning",
      "Family-related stressor management",
      "Collaborative care coordination",
    ],
    image: "https://plus.unsplash.com/premium_photo-1663045457143-cc7d323888ad?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Diagnostic Evaluation",
    description:
      "Our diagnostic evaluations are detailed assessments designed to identify the underlying causes of your mental health concerns. We use standardized assessment tools and clinical interviews to ensure accurate diagnosis. This thorough approach allows us to differentiate between conditions that may present with similar symptoms, ensuring you receive the most appropriate treatment.",
    features: [
      "Standardized assessment tools",
      "Differential diagnosis",
      "Comprehensive clinical interviews",
      "Detailed diagnostic reporting",
    ],
    image: "https://plus.unsplash.com/premium_photo-1661405495459-9abded8b63a5?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Telehealth Services",
    description:
      "Our secure telehealth platform brings expert mental health care directly to you. All sessions are conducted through a HIPAA-compliant video platform to ensure your privacy and confidentiality.",
    features: [
      "HIPAA-compliant video platform",
      "Fridays 9:00 AM – 3:30 PM EST",
      "Online appointments only",
      "Serving all of Maryland",
    ],
    image: "https://plus.unsplash.com/premium_photo-1661922412488-c43dc65b1b74?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Services() {
  return (
    <>
      <section className="relative min-h-[40vh] flex items-center bg-gradient-to-br from-[#1a1200] via-[#2a1f00] to-primary overflow-hidden">
        <div className="blob w-[400px] h-[400px] bg-primary-light top-[-100px] right-[-50px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">Our Services</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive mental health services tailored to your individual needs.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-max">
          <StaggerContainer className="space-y-16">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-gray-50 text-center">
        <div className="container-max">
          <SectionHeading
            title="Ready to Get Started?"
            subtitle="Take the first step toward better mental health."
          />
          <Button href="/contact">Book an Appointment</Button>
        </div>
      </AnimatedSection>
    </>
  );
}
