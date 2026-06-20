"use client";

import { motion, type Variants } from "framer-motion";
import Button from "./Button";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#1a1200] via-[#2a1f00] to-primary overflow-hidden">
      <video autoPlay muted loop playsInline poster="/therapy-session.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50">
        <source src="/therapy-session.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1200] via-[#2a1f00]/80 to-primary/60" />
      <div className="blob w-[500px] h-[500px] bg-primary-light top-[-100px] right-[-100px]" />
      <div className="blob w-[400px] h-[400px] bg-[#c8a36e] bottom-[-150px] left-[-100px]" />

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 25px 25px, white 1px, transparent 0)", backgroundSize: "50px 50px" }} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative container-max px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40"
      >
        <div className="max-w-3xl">
          <motion.div variants={item} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-5 py-2 mb-8 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-200">Serving Maryland — Online Only</span>
          </motion.div>

          <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight">
            Your Partner
            <br />
            <span className="text-gradient" style={{ WebkitTextFillColor: "initial" }}>in Mental Wellness</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl font-[var(--font-geist-sans)]">
            Compassionate, evidence-based mental health care for children, adolescents, and adults.
            Psychiatric evaluations, medication management, and online video appointments across Maryland.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href="/contact" variant="primary">Schedule Evaluation</Button>
            <Button href="/about" variant="ghost">Learn More &rarr;</Button>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                Fridays 9AM–3:30PM EST
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                Online Video Only
              </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
              Most Insurance Accepted
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
