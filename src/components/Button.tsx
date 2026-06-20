import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
}

export default function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base";
  const sizes = "px-7 py-3.5 sm:px-9 sm:py-4";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5",
    secondary: "bg-secondary text-white hover:bg-[#2a3a14] shadow-lg shadow-black/10 hover:-translate-y-0.5",
    outline: "border-2 border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary",
    ghost: "text-gray-600 hover:text-primary hover:bg-primary/5",
  };

  return (
    <Link href={href} className={`${base} ${sizes} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
