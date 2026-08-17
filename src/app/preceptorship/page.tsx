import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import PreceptorshipForm from "@/components/PreceptorshipForm";
import { AnimatedSection, StaggerContainer } from "@/components/Animations";

export const metadata: Metadata = {
  title: "Preceptorship | Belmek Psychiatry and Wellness",
  description: "Join Belmek Psychiatry for your PMHNP preceptorship. Gain hands-on clinical experience with Dr. Ossai in a supportive learning environment.",
};

export default function Preceptorship() {
  return (
    <>
      <section className="relative min-h-[40vh] flex items-center bg-gradient-to-br from-[#1a1200] via-[#2a1f00] to-primary overflow-hidden">
        <img src="/therapy-session.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1200] via-[#2a1f00]/80 to-primary/60" />
        <div className="blob w-[400px] h-[400px] bg-primary-light top-[-100px] right-[-50px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">Preceptorship</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Gain hands-on clinical experience with Dr. Ossai at Belmek Psychiatry.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
                For Students
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                PMHNP Preceptorship Opportunities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Belmek Psychiatry and Wellness is committed to training the next generation of psychiatric mental health nurse practitioners. Our preceptorship program offers students a unique opportunity to gain real-world clinical experience under the guidance of Dr. Abimbola Ossai, a board-certified PMHNP with over 11 years of healthcare experience.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                During your rotation, you&apos;ll work directly with patients across the lifespan — from children and adolescents to adults — gaining exposure to a wide range of psychiatric conditions and treatment approaches in a supportive, collaborative learning environment.
              </p>

              <StaggerContainer className="space-y-6">
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Comprehensive Training</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Gain experience in psychiatric evaluations, medication management, treatment planning, and patient communication across diverse populations.
                      </p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Mentorship</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Receive one-on-one mentorship from Dr. Ossai, with regular feedback and guidance to support your professional development.
                      </p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Telehealth Experience</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Learn how to deliver high-quality psychiatric care through secure telehealth platforms — a critical skill in modern mental health practice.
                      </p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Diverse Patient Population</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Work with patients of all ages and backgrounds, gaining exposure to conditions including ADHD, anxiety, depression, bipolar disorder, PTSD, and more.
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/5 rounded-2xl p-8 border border-primary/10 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {[
                    "Currently enrolled in an accredited PMHNP program",
                    "Completed foundational psychiatric coursework",
                    "Active student malpractice insurance",
                    "Compliance with HIPAA and patient confidentiality",
                    "Reliable internet connection for telehealth sessions",
                    "Professional demeanor and commitment to patient care",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-primary/5 rounded-2xl p-8 border border-primary/10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Submit Your Application</h4>
                      <p className="text-gray-600 text-sm mt-1">Complete the form below with your information and clinical interests.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Review & Interview</h4>
                      <p className="text-gray-600 text-sm mt-1">Our team will review your application and contact you for a brief interview.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Begin Your Rotation</h4>
                      <p className="text-gray-600 text-sm mt-1">Once approved, you&apos;ll receive your schedule and orientation materials to get started.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <section className="relative py-20 md:py-28 bg-[#faf9f6] overflow-hidden">
        <img src="/therapy-session.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 blur-sm" />
        <div className="blob w-[300px] h-[300px] bg-primary-light top-[-50px] right-[-50px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Apply for Preceptorship"
            subtitle="Complete the form below and we'll be in touch shortly."
          />
          <div className="max-w-2xl mx-auto">
            <PreceptorshipForm />
          </div>
        </div>
      </section>
    </>
  );
}
