"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/lib/projectStore";
import { Project, ProjectCategory, ProjectStatus, CATEGORY_LABELS, STATUS_LABELS } from "@/lib/projectTypes";
import { getProjectAccessRole, isProjectAdmin } from "@/lib/projectAccess";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

export default function ProjectDashboard() {
  const router = useRouter();
  const { projects, loading, deleteProject, updateProject } = useProjectStore();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "all">("all");
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | "all">("all");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [canManage, setCanManage] = useState(isProjectAdmin(getProjectAccessRole()));

  // Re-check auth when page is visited
  useEffect(() => {
    setCanManage(isProjectAdmin(getProjectAccessRole()));
  }, []);

  useEffect(() => {
    // Listen for auth changes from navbar, including same-tab updates
    const syncAccess = () => setCanManage(isProjectAdmin(getProjectAccessRole()));
    window.addEventListener("storage", syncAccess);
    window.addEventListener("projectAccessChanged", syncAccess);
    return () => {
      window.removeEventListener("storage", syncAccess);
      window.removeEventListener("projectAccessChanged", syncAccess);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="pm-spinner mx-auto" />
          <p className="text-white/50 text-sm">Memuat project...</p>
        </div>
      </div>
    );
  }

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    const matchCat = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchStatus && matchCat;
  });

  const totalCompleted = projects.filter((p) => p.status === "completed").length;
  const totalInProgress = projects.filter((p) => p.status === "in-progress").length;

  return (
    <div className="min-h-screen px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs text-amber-400 uppercase tracking-widest font-semibold mb-1">
              Project Manager
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Semua Project
            </h1>
            <p className="text-white/50 text-sm mt-1">
              {projects.length} project · {totalCompleted} selesai · {totalInProgress} berjalan
            </p>
          </div>
          {canManage && (
            <button
              onClick={() => router.push("/project?new=1")}
              className="pm-btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 w-fit"
            >
              + Tambah Project
            </button>
          )}
        </div>

        {/* ── Stats Summary ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Project", value: projects.length },
            { label: "Selesai", value: totalCompleted },
            { label: "Berjalan", value: totalInProgress },
            { label: "On Hold", value: projects.filter((p) => p.status === "on-hold").length },
          ].map((stat) => (
            <div key={stat.label} className="pm-card rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Search & Filters ── */}
        <div className="pm-card rounded-2xl p-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari project, tag, atau deskripsi..."
              className="pm-input w-full"
            />
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-white/40">Status:</span>
            {(["all", "planning", "in-progress", "completed", "on-hold", "cancelled"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`pm-filter-btn ${filterStatus === s ? "pm-filter-btn-active" : ""}`}
              >
                {s === "all" ? "Semua" : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-white/40">Kategori:</span>
            {(["all", "iot", "web", "mobile", "ai", "hardware", "other"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`pm-filter-btn ${filterCategory === c ? "pm-filter-btn-active" : ""}`}
              >
                {c === "all" ? "Semua" : CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Project Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg font-semibold">Tidak ada project ditemukan</p>
            <p className="text-sm mt-1">Coba ubah filter atau tambahkan project baru.</p>
            {canManage && (
              <button onClick={() => router.push("/project?new=1")} className="pm-btn-primary text-sm py-2 px-5 rounded-xl inline-block mt-4">
                + Tambah Project
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={canManage ? deleteProject : undefined}
                onEdit={canManage ? () => setEditingProject(project) : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="pm-card w-full max-w-2xl rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-5">Edit Project</h2>
            <ProjectForm
              initial={editingProject}
              onSubmit={(data) => {
                updateProject(editingProject.id, data);
                setEditingProject(null);
              }}
              onCancel={() => setEditingProject(null)}
              submitLabel="Simpan Perubahan"
            />
          </div>
        </div>
      )}
    </div>
  );
}
