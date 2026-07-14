import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
} from "react-icons/fi";

import {
  registerSchema,
  type RegisterFormData,
} from "../validation/auth.schema";

import { useRegister } from "../hooks/useRegister";

function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [serverError, setServerError] = useState("");

  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password");

  const onSubmit = (data: RegisterFormData) => {
    setServerError("");

    mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully 🎉");

        navigate("/login");
      },

      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message ??
            "Registration failed";

          setServerError(message);

          toast.error(message);

          return;
        }

        setServerError("Something went wrong.");

        toast.error("Something went wrong.");
      },
    });
  };

  const strength =
    password.length >= 8
      ? "Strong"
      : password.length >= 5
      ? "Medium"
      : password.length > 0
      ? "Weak"
      : "";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* NAME */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Full Name
        </label>

        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            {...register("name")}
            placeholder="John Doe"
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {errors.name && (
          <p className="mt-2 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* EMAIL */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>

        <div className="relative">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {errors.email && (
          <p className="mt-2 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* PASSWORD */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>

        <div className="relative">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
          >
            {showPassword ? (
              <FiEyeOff />
            ) : (
              <FiEye />
            )}
          </button>
        </div>

        {strength && (
          <p
            className={`mt-2 text-sm ${
              strength === "Strong"
                ? "text-green-600"
                : strength === "Medium"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            Password Strength: {strength}
          </p>
        )}

        {errors.password && (
          <p className="mt-2 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Confirm Password
        </label>

        <div className="relative">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type={
              showConfirmPassword ? "text" : "password"
            }
            {...register("confirmPassword")}
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            onClick={() =>
              setShowConfirmPassword((prev) => !prev)
            }
          >
            {showConfirmPassword ? (
              <FiEyeOff />
            ) : (
              <FiEye />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* SERVER ERROR */}

      {serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* BUTTON */}

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? (
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Creating Account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}

export default RegisterForm;