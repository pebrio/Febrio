"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Project, STATUS_LABELS, STATUS_COLORS, CATEGORY_LABELS } from "@/lib/projectTypes";
import { useProjectStore } from "@/lib/projectStore";
import SectionBackground from "../SectionBackground";

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const router = useRouter();
  const { getProject, projects } = useProjectStore();
  const [project, setProject] = useState<Project | undefined>(undefined);

  // Sync project from store on any store change
  useEffect(() => {
    setProject(getProject(projectId));
  }, [projects, projectId, getProject]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-white/60 text-sm">Project not found.</p>
          <button
            onClick={() => router.push("/project")}
            className="group pm-btn-primary text-sm py-2 px-5 rounded-xl inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const openProblems = project.problems.filter((p) => !p.resolvedAt).length;
  const workDone = project.workItems.filter((w) => w.status === "done").length;
  const workTotal = project.workItems.length;

  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
      : "—";

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-6 pb-24 pt-32 sm:px-8 lg:px-10">
      <SectionBackground />
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ── Back link ── */}
        <button
          onClick={() => router.push("/project")}
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-orange-300"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-orange-400/40 group-hover:bg-orange-500/10">
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
          </span>
          <span>Back to Projects</span>
        </button>

        <header className="mt-8 border-b border-white/10 pb-10">
          {project.image && (
            <div className="mb-8 h-64 overflow-hidden rounded-3xl border border-white/10">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 text-sm text-orange-300">
            <span className={`pm-badge pm-badge-status ${STATUS_COLORS[project.status]}`}>
              {STATUS_LABELS[project.status]}
            </span>
            <span className="pm-badge pm-badge-category">{CATEGORY_LABELS[project.category]}</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/70">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="pm-tag">{tag}</span>
            ))}
          </div>
        </header>

        <div className="grid gap-6 pt-10 md:grid-cols-2">
          <section className="portfolio-card rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/90">
              Project Overview
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">Project information</h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-white/70">
              <p>Category: {CATEGORY_LABELS[project.category]}</p>
              <p>Status: {STATUS_LABELS[project.status]}</p>
              <p>Started: {formatDate(project.startDate)}</p>
              <p>Last updated: {formatDate(project.updatedAt)}</p>
            </div>
          </section>

          <section className="portfolio-card rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/90">
              Work Details
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">Progress and tasks</h2>
            <div className="mt-5 space-y-4 text-sm text-white/70">
              <div className="pm-progress-track">
                <div className="pm-progress-fill" style={{ width: `${workTotal ? Math.round((workDone / workTotal) * 100) : 0}%` }} />
              </div>
              <p>{workDone} of {workTotal} tasks completed</p>
              {project.workItems.length > 0 && (
                <ul className="space-y-3">
                  {project.workItems.map((item) => <li key={item.id}>- {item.title} ({item.status})</li>)}
                </ul>
              )}
            </div>
          </section>

          <section className="portfolio-card rounded-3xl p-6 sm:p-8 md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/90">
              Project Notes
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">Problems, solutions, and documentation</h2>
            <div className="mt-5 grid gap-6 text-sm leading-7 text-white/70 md:grid-cols-3">
              <div><h3 className="font-semibold text-white">Problems ({openProblems})</h3><p className="mt-2">{openProblems ? project.problems.filter((problem) => !problem.resolvedAt).map((problem) => problem.title).join(", ") : "No open problems."}</p></div>
              <div><h3 className="font-semibold text-white">Solutions ({project.solutions.length})</h3><p className="mt-2">{project.solutions.length ? project.solutions.map((solution) => solution.title).join(", ") : "No solutions recorded."}</p></div>
              <div><h3 className="font-semibold text-white">Documentation ({project.docs.length})</h3><p className="mt-2">{project.docs.length ? project.docs.map((doc) => doc.title).join(", ") : "No documentation available."}</p></div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
