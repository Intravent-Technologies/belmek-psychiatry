"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

export default function BlogCard({ slug, title, excerpt, date, author }: BlogCardProps) {
  return (
    <motion.div whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={`/blog/${slug}`}
        className="group block glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500"
      >
        <div className="h-48 bg-gradient-to-br from-primary/5 via-[#faf9f6] to-primary/10 flex items-center justify-center relative overflow-hidden">
          <div className="blob w-48 h-48 bg-primary-light bottom-[-60px] right-[-60px]" />
          <div className="relative w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{author}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
            Read more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
