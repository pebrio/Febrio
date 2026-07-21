"use client";

import Link from "next/link";
import { Project, STATUS_LABELS, STATUS_COLORS, CATEGORY_LABELS } from "@/lib/projectTypes";

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
}

function progressPercent(project: Project): number {
  const total = project.workItems.length;
  if (total === 0) return 0;
  const done = project.workItems.filter((w) => w.status === "done").length;
  return Math.round((done / total) * 100);
}

export default function ProjectCard({ project, onDelete, onEdit }: ProjectCardProps) {
  const progress = progressPercent(project);
  const openProblems = project.problems.filter((p) => !p.resolvedAt).length;

  return (
    <article className="pm-card group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full pm-card-placeholder" />
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 pm-badge pm-badge-category text-xs">
          {CATEGORY_LABELS[project.category]}
        </span>
        {/* Status badge */}
        <span className={`absolute top-3 right-3 pm-badge pm-badge-status text-xs ${STATUS_COLORS[project.status]}`}>
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-base font-semibold text-white leading-snug line-clamp-2">
          {project.name}
        </h3>
        <p className="text-xs text-white/60 leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="pm-tag">{tag}</span>
            ))}
            {project.tags.length > 3 && (
              <span className="pm-tag">+{project.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Progress */}
        {project.workItems.length > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-white/50">
              <span>Progress Pekerjaan</span>
              <span>{progress}%</span>
            </div>
            <div className="pm-progress-track">
              <div
                className="pm-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 pt-1 text-xs text-white/50 border-t border-white/5">
          <span title="Jumlah pekerjaan">{project.workItems.length} Task</span>
          {openProblems > 0 && (
            <span title="Masalah terbuka" className="text-orange-400">
              {openProblems} Masalah
            </span>
          )}
          <span title="Dokumentasi">{project.docs.length} Dok</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href={`/project?id=${project.id}`}
            className="flex-1 min-w-[110px] text-center pm-btn-primary text-xs py-2 rounded-xl"
          >
            Lihat Detail
          </Link>
          {onEdit && (
            <button
              onClick={onEdit}
              className="pm-btn-secondary text-xs py-2 px-3 rounded-xl"
              title="Edit project"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                if (confirm(`Hapus project "${project.name}"?`)) {
                  onDelete(project.id);
                }
              }}
              className="pm-btn-danger text-xs py-2 px-3 rounded-xl"
              title="Hapus project"
            >
              Hapus
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
