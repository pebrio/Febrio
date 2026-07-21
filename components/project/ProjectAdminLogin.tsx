"use client";

import { useEffect, useState } from "react";
import { Lock, Mail, UserCircle } from "lucide-react";
import { getProjectAccessRole, setProjectAccessRole } from "@/lib/projectAccess";

interface ProjectAdminLoginProps {
  onLoginChange?: (isAdmin: boolean) => void;
}

export default function ProjectAdminLogin({ onLoginChange }: ProjectAdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(getProjectAccessRole() === "admin");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "pebri" && password === "190723") {
      setProjectAccessRole("admin");
      setLoggedIn(true);
      setError("");
      window.dispatchEvent(new Event("projectAccessChanged"));
      onLoginChange?.(true);
      return;
    }

    if (email === "hrd") {
      setProjectAccessRole("guest");
      setLoggedIn(false);
      setError("");
      window.dispatchEvent(new Event("projectAccessChanged"));
      onLoginChange?.(false);
      return;
    }

    setError("Email atau password salah");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-white/10 text-orange-300 shadow-[0_20px_80px_rgba(249,115,22,0.3)] backdrop-blur-xl">
          <UserCircle className="h-12 w-12" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400">Admin Access</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Login untuk mengelola project</h3>
        </div>
      </div>

      <div className="space-y-4 rounded-[2rem] border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
        <label className="flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-3 text-sm text-white/70">
          <Mail className="h-5 w-5 text-orange-300" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email ID"
            className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
            type="text"
          />
        </label>

        <label className="flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-3 text-sm text-white/70">
          <Lock className="h-5 w-5 text-orange-300" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
          />
        </label>
      </div>

      <div className="flex items-center justify-between text-sm text-white/60">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/5 text-orange-400 focus:ring-orange-400"
          />
          Remember me
        </label>
        <button type="button" className="text-sm text-white/70 hover:text-white">
          Forgot Password?
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-3xl bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black shadow-[0_20px_60px_rgba(249,115,22,0.22)] transition hover:opacity-90"
      >
        {loggedIn ? "Sudah Login" : "Login"}
      </button>

      <p className="text-center text-xs text-white/40">Pebri && 190723</p>
    </form>
  );
}
