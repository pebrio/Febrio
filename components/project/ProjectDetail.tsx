"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Project, STATUS_LABELS, STATUS_COLORS, CATEGORY_LABELS } from "@/lib/projectTypes";
import { useProjectStore } from "@/lib/projectStore";
import { getProjectAccessRole, isProjectAdmin } from "@/lib/projectAccess";
import WorkTab from "./WorkTab";
import ProblemTab from "./ProblemTab";
import DocTab from "./DocTab";
import ProjectForm from "./ProjectForm";

type Tab = "overview" | "work" | "problems" | "docs";

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const router = useRouter();
  const { getProject, updateProject, deleteProject, projects } = useProjectStore();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [editing, setEditing] = useState(false);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const canManage = isProjectAdmin(getProjectAccessRole());

  // Sync project from store on any store change
  useEffect(() => {
    setProject(getProject(projectId));
  }, [projects, projectId, getProject]);

  const handleUpdate = () => {
    setProject(getProject(projectId));
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-white/60 text-sm">Project tidak ditemukan.</p>
          <button
            onClick={() => router.push("/project")}
            className="pm-btn-primary text-sm py-2 px-5 rounded-xl"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (!confirm(`Hapus project "${project.name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    deleteProject(project.id);
    router.push("/project");
  };

  const openProblems = project.problems.filter((p) => !p.resolvedAt).length;
  const workDone = project.workItems.filter((w) => w.status === "done").length;
  const workTotal = project.workItems.length;

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "overview", label: "Overview" },
    { id: "work", label: "Pekerjaan", count: workTotal },
    { id: "problems", label: "Masalah & Solusi", count: openProblems > 0 ? openProblems : undefined },
    { id: "docs", label: "Dokumentasi", count: project.docs.length },
  ];

  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
      : "—";

  return (
    <div className="min-h-screen px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ── Back link ── */}
        <button
          onClick={() => router.push("/project")}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          Dashboard Project
        </button>

        {/* ── Hero Header ── */}
        <div className="pm-card rounded-3xl overflow-hidden">
          {project.image && (
            <div className="h-52 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <span className={`pm-badge pm-badge-status ${STATUS_COLORS[project.status]}`}>
                  {STATUS_LABELS[project.status]}
                </span>
                <span className="pm-badge pm-badge-category">
                  {CATEGORY_LABELS[project.category]}
                </span>
              </div>
              {canManage && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(true)}
                    className="pm-btn-secondary text-sm py-1.5 px-4 rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="pm-btn-danger text-sm py-1.5 px-4 rounded-xl"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {project.name}
            </h1>
            <p className="text-white/60 leading-relaxed text-sm">{project.description}</p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40 border-t border-white/5 pt-4">
              <span>Mulai: {formatDate(project.startDate)}</span>
              <span>Selesai: {formatDate(project.endDate)}</span>
              <span>Update: {formatDate(project.updatedAt)}</span>
            </div>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="pm-tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { label: "Task Selesai", value: `${workDone}/${workTotal}` },
                { label: "Masalah Terbuka", value: openProblems },
                { label: "Solusi", value: project.solutions.length },
                { label: "Dokumentasi", value: project.docs.length },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Edit Form Modal ── */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="pm-card w-full max-w-2xl rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-5">Edit Project</h2>
              <ProjectForm
                initial={project}
                onSubmit={(data) => {
                  updateProject(project.id, data);
                  setEditing(false);
                  handleUpdate();
                }}
                onCancel={() => setEditing(false)}
                submitLabel="Simpan Perubahan"
              />
            </div>
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="pm-card rounded-3xl overflow-hidden">
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-white/8 px-1 pt-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pm-tab whitespace-nowrap ${activeTab === tab.id ? "pm-tab-active" : ""}`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="ml-1.5 pm-count-badge">{tab.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-4 text-sm text-white/70">
                <p className="leading-relaxed">{project.description}</p>
                {project.workItems.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Ringkasan Pekerjaan</h4>
                    <div className="pm-progress-track mb-1">
                      <div
                        className="pm-progress-fill"
                        style={{ width: `${workTotal > 0 ? Math.round((workDone / workTotal) * 100) : 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-white/40">{workDone} dari {workTotal} task selesai</p>
                  </div>
                )}
                <p className="text-xs text-white/30">Dibuat: {formatDate(project.createdAt)}</p>
              </div>
            )}
            {activeTab === "work" && (
              <WorkTab project={project} onUpdate={handleUpdate} />
            )}
            {activeTab === "problems" && (
              <ProblemTab project={project} onUpdate={handleUpdate} />
            )}
            {activeTab === "docs" && (
              <DocTab project={project} onUpdate={handleUpdate} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
