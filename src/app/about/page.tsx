import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/Animations";

export const metadata: Metadata = {
  title: "About Us | Belmek Psychiatry and Wellness",
  description: "Learn about Belmek Psychiatry and Wellness's mission, vision, and Dr. Ossai's commitment to compassionate mental health care across Maryland.",
};

const values = [
  {
    title: "Compassion",
    description: "We approach every patient with empathy, respect, and understanding, creating a safe, non-judgmental space for healing and growth.",
  },
  {
    title: "Excellence",
    description: "We are committed to providing the highest quality, evidence-based care through continuous learning, innovation, and clinical expertise.",
  },
  {
    title: "Accessibility",
    description: "We believe mental health care should be accessible to all, offering online video appointments and flexible scheduling throughout Maryland.",
  },
  {
    title: "Empowerment",
    description: "We empower our patients to actively participate in their treatment journey, fostering resilience and lasting emotional wellness.",
  },
];

export default function About() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-[#1a1200] via-[#2a1f00] to-primary overflow-hidden">
        <div className="blob w-[400px] h-[400px] bg-primary-light top-[-100px] right-[-50px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">About Us</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Compassionate, high-quality mental health care in a safe, confidential, and supportive environment.
          </p>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#faf9f6] overflow-hidden">
        <div className="blob w-[400px] h-[400px] bg-primary-light top-[-150px] left-[-100px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                title="Our Mission"
                subtitle="Dedicated to your mental wellness"
                centered={false}
              />
              <p className="text-gray-600 leading-relaxed mb-4">
                At Belmek Psychiatry and Wellness, our mission is to provide compassionate, high-quality, and
                evidence-based mental health care in a safe, confidential, and supportive environment.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are committed to fostering healing, growth, and emotional well-being through a warm, friendly,
                and non-judgmental approach. We believe every individual deserves to be heard, respected, and
                empowered as they navigate their unique journey toward better mental health.
              </p>
              <div className="mt-8">
                <Button href="/contact">Book an Appointment</Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20 flex items-center justify-center relative overflow-hidden p-8">
                <div className="blob w-64 h-64 bg-primary-light bottom-[-40px] right-[-40px]" />
                <img src="/belmek-logo.png" alt="Belmek Psychiatry and Wellness" className="relative w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="blob w-[400px] h-[400px] bg-primary-light top-[-150px] left-[-100px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <SectionHeading
                title="Our Vision"
                subtitle="A trusted leader in mental health and wellness"
                centered={false}
              />
              <p className="text-gray-600 leading-relaxed mb-4">
                Our vision is to be a trusted leader in mental health and wellness, creating a community where
                individuals feel safe to seek help without fear of stigma or judgment.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We aspire to make accessible, personalized, and compassionate care the standard, empowering
                people of all backgrounds to achieve emotional wellness, resilience, and lasting positive change.
                Through excellence in care, innovation, and human connection, Belmek Psychiatry and Wellness
                aims to transform lives and strengthen communities.
              </p>
            </div>
            <div className="flex justify-center lg:order-1">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20 flex items-center justify-center relative overflow-hidden p-8">
                <div className="blob w-64 h-64 bg-primary bottom-[-40px] left-[-40px]" />
                <img src="/belmek-logo.png" alt="Belmek Psychiatry and Wellness" className="relative w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#faf9f6] overflow-hidden">
        <div className="blob w-[500px] h-[500px] bg-primary bottom-[-200px] right-[-100px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="blob w-[500px] h-[500px] bg-primary-light top-[-200px] left-[-100px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
                Founder &amp; Owner
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Meet Dr. Abimbola Ossai
              </h2>
              <div className="mt-2 inline-block px-3 py-1 rounded-lg bg-primary/5 text-primary text-sm font-semibold">
                DNP, PMHNP-BC
              </div>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Dr. Abimbola Ossai is a Doctor of Nursing Practice and ANCC Board-Certified Psychiatric Mental Health
                Nurse Practitioner with over 11 years of healthcare experience. She is the founder of Belmek Psychiatry
                and Wellness, where she is committed to providing compassionate, evidence-based mental health care in a
                safe, confidential, and judgment-free environment.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Dr. Ossai&apos;s educational journey reflects her dedication to excellence and lifelong learning. She
                graduated Cum Laude from the University of Wisconsin&ndash;Eau Claire with a Bachelor of Science degree
                in Health Care Administration. She later earned a Master of Science in Nursing with a Clinical Nurse
                Leader concentration from the University of Maryland, Baltimore. Driven by her passion for mental
                health, she obtained both her Psychiatric Mental Health Nurse Practitioner degree and Doctor of Nursing
                Practice degree from Frontier Nursing University in Kentucky.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Throughout her career, Dr. Ossai has worked with individuals across diverse backgrounds and stages of
                life, helping them navigate challenges such as anxiety, depression, ADHD, mood disorders,
                trauma-related conditions, and other mental health concerns. Her approach combines clinical expertise
                with empathy, understanding, and individualized care to ensure that each patient feels heard, respected,
                and supported.
              </p>
            </div>
            <div className="flex justify-center">
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
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 bg-[#faf9f6] overflow-hidden">
        <div className="blob w-[300px] h-[300px] bg-primary-light top-[-50px] right-[-50px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Take the First Step"
            subtitle="Your journey to mental wellness starts here."
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
