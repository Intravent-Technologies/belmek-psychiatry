import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { AnimatedSection, StaggerContainer } from "@/components/Animations";

export const metadata: Metadata = {
  title: "Contact | Belmek Psychiatry and Wellness",
  description: "Schedule an appointment with Belmek Psychiatry and Wellness. Online video visits available throughout Maryland.",
};

export default function Contact() {
  return (
    <>
      <section className="relative min-h-[40vh] flex items-center bg-gradient-to-br from-[#1a1200] via-[#2a1f00] to-primary overflow-hidden">
        <div className="blob w-[400px] h-[400px] bg-primary-light top-[-100px] right-[-50px]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Take the first step toward better mental health. Schedule your appointment today.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <a href="tel:+14433398634" className="text-primary hover:underline">(443) 339-8634</a>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <a href="mailto:info@belmekpsychiatry.com" className="text-primary hover:underline">info@belmekpsychiatry.com</a>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-sm text-gray-600">Reisterstown, MD 21136<br />Online visits only</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=Reisterstown%2C%20MD%2021136&output=embed"
              width="100%"
              height="350"
              className="w-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Belmek Psychiatry Location - Reisterstown, MD"
            />
          </div>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <SectionHeading
                title="Book an Appointment"
                subtitle="Choose your preferred date and time, submit your details, and we'll take care of the rest."
                centered={false}
              />
              <ContactForm />
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-br from-primary/5 to-primary/5 rounded-2xl p-8 border border-primary/10">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Take the Next Step?</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Whether you&apos;re exploring treatment options for the first time or need ongoing
                  psychiatric care, Belmek Psychiatry is here to support you.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Fridays 9:00 AM – 3:30 PM EST</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Online video appointments only</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Most insurance accepted</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">New patients welcome</span>
                  </div>
                </div>
              </div>
            </div>
          </StaggerContainer>
        </div>
      </AnimatedSection>
    </>
  );
}
