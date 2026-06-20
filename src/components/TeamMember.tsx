"use client";

import { motion } from "framer-motion";

interface TeamMemberProps {
  name: string;
  credentials: string;
  role: string;
  bio: string;
  specialties: string[];
}

export default function TeamMember({ name, credentials, role, bio, specialties }: TeamMemberProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20 flex items-center justify-center overflow-hidden">
        <div className="blob w-64 h-64 bg-primary-light top-[-80px] right-[-80px]" />
        <div className="relative w-24 h-24 rounded-2xl bg-white/80 backdrop-blur flex items-center justify-center shadow-lg">
          <span className="text-primary font-bold text-3xl">{name.split(" ").map(n => n[0]).join("")}</span>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <div className="inline-block px-3 py-1 rounded-lg bg-primary/5 text-primary text-xs font-semibold tracking-wide mb-3">
          {credentials}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{role}</p>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">{bio}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {specialties.map((s) => (
            <span key={s} className="inline-block bg-primary/5 text-primary/80 text-xs font-medium px-3 py-1.5 rounded-lg border border-primary/10">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
