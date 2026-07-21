"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProjectAdminLogin from "@/components/project/ProjectAdminLogin";
import { getProjectAccessRole, isProjectAdmin } from "@/lib/projectAccess";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isProjectAdmin(getProjectAccessRole())) {
      router.replace("/project");
    }
  }, [router]);

  return (
    <main className="relative min-h-screen text-white">
      <div className="relative z-10 grid min-h-screen place-items-center px-6 py-12">
        <div className="relative w-full max-w-md rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400">Admin Login</p>
              <h1 className="mt-3 text-3xl font-bold">Masuk sebagai Admin</h1>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 text-orange-300" />
              Home
            </Link>
          </div>

          <ProjectAdminLogin
            onLoginChange={(isAdmin) => {
              if (isAdmin) {
                router.push("/project");
              }
            }}
          />

          <div className="mt-6 text-center text-sm text-white/60">
            HRD dapat melihat project tanpa akses edit atau hapus.
          </div>
        </div>
      </div>
    </main>
  );
}
