import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ========================================= */}
        {/* LEFT SIDE */}
        {/* ========================================= */}

        <div className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          {/* Background Glow */}

          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-center px-20">
            <div className="inline-flex w-fit rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 backdrop-blur">
              🚀 Enterprise Project Workspace
            </div>

            <h1 className="mt-8 text-6xl font-bold tracking-tight text-white">
              TaskMatrix
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Organize projects, assign tasks, collaborate with your team and
              monitor progress from a single modern workspace.
            </p>

            <div className="mt-12 space-y-5">
              <Feature text="Project Management" emoji="📊" />
              <Feature text="Task Tracking" emoji="📋" />
              <Feature text="Team Collaboration" emoji="👥" />
              <Feature text="Real-time Notifications" emoji="🔔" />
              <Feature text="Secure Authentication" emoji="🔒" />
            </div>

            <div className="mt-16 flex gap-10">
              <Stat number="1200+" label="Projects" />
              <Stat number="350+" label="Teams" />
              <Stat number="99.9%" label="Uptime" />
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* RIGHT SIDE */}
        {/* ========================================= */}

        <div className="flex items-center justify-center px-6 py-12">

          {/* Mobile Branding */}

          <div className="w-full max-w-md">
            <div className="mb-10 text-center lg:hidden">
              <h1 className="text-4xl font-bold text-slate-900">
                TaskMatrix
              </h1>

              <p className="mt-2 text-slate-500">
                Enterprise Project Workspace
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                  Welcome Back
                </h2>

                <p className="mt-2 text-slate-500">
                  Sign in to continue managing your workspace.
                </p>
              </div>

              <LoginForm />

              <div className="mt-8 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Create one
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureProps {
  emoji: string;
  text: string;
}

function Feature({ emoji, text }: FeatureProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-lg">
        {emoji}
      </div>

      <span className="text-slate-300">{text}</span>
    </div>
  );
}

interface StatProps {
  number: string;
  label: string;
}

function Stat({ number, label }: StatProps) {
  return (
    <div>
      <div className="text-3xl font-bold text-white">{number}</div>

      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}

export default LoginPage;