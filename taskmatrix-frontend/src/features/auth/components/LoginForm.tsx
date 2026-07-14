import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { loginSchema, type LoginFormData } from "../validation/auth.schema";
import { useLogin } from "../hooks/useLogin";

import { useAppDispatch } from "../../../store/hooks";
import { login as loginAction } from "../../../store/slices/authSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        dispatch(loginAction({
            token:response.data.token,
            user:response.data.user,
        }));

        localStorage.setItem("token", response.data.token);

        toast.success("Login successful");

        navigate("/dashboard");
      },

      onError: (error) => {
        if (axios.isAxiosError(error)) {
            toast.error(
            error.response?.data?.message ??
            "Login failed"
        );
        return;
    }

    toast.error("Login failed");
    },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          {...register("email")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          placeholder="john@example.com"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none"
            placeholder="********"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-slate-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;