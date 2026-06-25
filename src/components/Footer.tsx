import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1200] text-gray-400 relative overflow-hidden">
      <div className="blob w-[600px] h-[600px] bg-primary-light top-[-200px] right-[-200px] opacity-[0.08]" />
      <div className="relative container-max px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/belmek-logo.png" alt="Belmek Psychiatry" className="w-10 h-10 object-contain" />
              <div>
                <span className="font-bold text-base text-white tracking-tight" style={{ fontFamily: "var(--font-cinzel)" }}>Belmek</span>
                <span className="text-primary font-medium text-base tracking-tight" style={{ fontFamily: "var(--font-cinzel)" }}> Psychiatry</span>
                <span className="text-gray-500 font-medium text-xs tracking-tight" style={{ fontFamily: "var(--font-cinzel)" }}> and Wellness</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Compassionate, evidence-based mental health care for children, adolescents, and adults.
              Personalized treatment plans for lasting emotional well-being.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Services</h3>
            <ul className="space-y-3">
              {[
                "Psychiatric Evaluation",
                "Medication Management",
                "ADHD Treatment",
                "Anxiety & Depression Care",
                "Telehealth Services",
              ].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-sm text-gray-500 hover:text-white transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                 <a href="tel:+14433398634" className="hover:text-white transition-colors">
                   (443) 339-8634
                 </a>
              </li>
              <li>
                <a href="mailto:info@belmekwellness.com" className="hover:text-white transition-colors">
                  info@belmekwellness.com
                </a>
              </li>
              <li className="leading-relaxed">
                 Reisterstown, MD 21136<br />
                 Online visits only
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Belmek Psychiatry and Wellness LLC. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
