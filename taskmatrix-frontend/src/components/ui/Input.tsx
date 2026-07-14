import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        className={clsx(
          "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition",
          "focus:border-blue-600",
          "focus:ring-4 focus:ring-blue-100",
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}