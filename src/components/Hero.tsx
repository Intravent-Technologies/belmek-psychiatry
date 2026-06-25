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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
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
              <Button href="/about" variant="ghost" className="text-primary">Learn More &rarr;</Button>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                  Monday - Saturday | 9am - 5pm
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

          <motion.div variants={item} className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
              <div className="absolute inset-0 rounded-[2rem] bg-white/5 backdrop-blur border border-white/10" />
              <div className="blob w-80 h-80 bg-primary-light top-[-80px] right-[-80px]" />
              <div className="blob w-56 h-56 bg-primary bottom-[-60px] left-[-60px]" />
              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                <div className="text-center">
                  <div className="relative mx-auto mb-5 w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light to-primary p-[3px] shadow-2xl">
                      <div className="w-full h-full rounded-full bg-[#1a1200]">
                        <img src="/dr-ossai.jpg" alt="Dr. Abimbola Ossai" className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <p className="text-white font-bold text-xl">Dr. Abimbola Ossai</p>
                  <p className="text-sm text-gray-400 mt-0.5">DNP, PMHNP-BC</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
