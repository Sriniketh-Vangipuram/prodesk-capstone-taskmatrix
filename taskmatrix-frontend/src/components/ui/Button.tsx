import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  loading?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  loading = false,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-900",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    ghost:
      "hover:bg-slate-100 text-slate-700",
  };

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}