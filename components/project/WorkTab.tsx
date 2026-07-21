"use client";

import { useState } from "react";
import { Project, WorkItem, WorkItemStatus } from "@/lib/projectTypes";
import { useProjectStore } from "@/lib/projectStore";

interface WorkTabProps {
  project: Project;
  onUpdate: () => void;
}

const STATUS_CYCLE: Record<WorkItemStatus, WorkItemStatus> = {
  todo: "in-progress",
  "in-progress": "done",
  done: "todo",
};

const STATUS_ICON: Record<WorkItemStatus, string> = {
  todo: "○",
  "in-progress": "◑",
  done: "●",
};

const STATUS_LABEL: Record<WorkItemStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const STATUS_CLASS: Record<WorkItemStatus, string> = {
  todo: "work-todo",
  "in-progress": "work-inprogress",
  done: "work-done",
};

export default function WorkTab({ project, onUpdate }: WorkTabProps) {
  const { addWorkItem, updateWorkItem, deleteWorkItem } = useProjectStore();
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [filter, setFilter] = useState<WorkItemStatus | "all">("all");

  const filtered =
    filter === "all"
      ? project.workItems
      : project.workItems.filter((w) => w.status === filter);

  const counts = {
    all: project.workItems.length,
    todo: project.workItems.filter((w) => w.status === "todo").length,
    "in-progress": project.workItems.filter((w) => w.status === "in-progress").length,
    done: project.workItems.filter((w) => w.status === "done").length,
  };

  const totalDone = counts.done;
  const total = counts.all;
  const progress = total === 0 ? 0 : Math.round((totalDone / total) * 100);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addWorkItem(project.id, {
      title: newTitle.trim(),
      description: newDesc.trim() || undefined,
      status: "todo",
    });
    setNewTitle("");
    setNewDesc("");
    setShowForm(false);
    onUpdate();
  };

  const handleCycleStatus = (item: WorkItem) => {
    updateWorkItem(project.id, item.id, { status: STATUS_CYCLE[item.status] });
    onUpdate();
  };

  const handleDelete = (itemId: string) => {
    if (!confirm("Hapus task ini?")) return;
    deleteWorkItem(project.id, itemId);
    onUpdate();
  };

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <div className="pm-card rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Progress Keseluruhan</h4>
          <span className="text-2xl font-bold text-amber-400">{progress}%</span>
        </div>
        <div className="pm-progress-track">
          <div className="pm-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex gap-4 text-xs text-white/50">
          <span>{counts.done} Selesai</span>
          <span>{counts["in-progress"]} Dikerjakan</span>
          <span>{counts.todo} Belum</span>
        </div>
      </div>

      {/* Filter + Add */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {(["all", "todo", "in-progress", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`pm-filter-btn ${filter === f ? "pm-filter-btn-active" : ""}`}
            >
              {f === "all" ? "Semua" : STATUS_LABEL[f]}
              <span className="ml-1 pm-count-badge">
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="pm-btn-primary text-sm py-2 px-4 rounded-xl"
        >
          + Tambah Task
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="pm-card rounded-2xl p-5 space-y-3 border border-amber-500/30">
          <h4 className="text-sm font-semibold text-white">Task Baru</h4>
          <input
            autoFocus
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Nama task / milestone..."
            className="pm-input w-full"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Deskripsi (opsional)..."
            rows={2}
            className="pm-input w-full"
          />
          <div className="flex gap-2">
            <button onClick={handleAdd} className="pm-btn-primary text-sm py-1.5 px-4 rounded-lg">
              Simpan
            </button>
            <button
              onClick={() => { setShowForm(false); setNewTitle(""); setNewDesc(""); }}
              className="pm-btn-secondary text-sm py-1.5 px-4 rounded-lg"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Task List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <p className="text-sm">Belum ada task. Tambahkan task pertama!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`pm-card rounded-xl p-4 flex items-start gap-3 transition-all ${item.status === "done" ? "opacity-60" : ""}`}
            >
              <button
                onClick={() => handleCycleStatus(item)}
                className={`work-status-btn text-xl flex-shrink-0 ${STATUS_CLASS[item.status]}`}
                title={`Status: ${STATUS_LABEL[item.status]} — klik untuk ubah`}
              >
                {STATUS_ICON[item.status]}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${item.status === "done" ? "line-through text-white/40" : "text-white"}`}>
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-xs text-white/50 mt-1">{item.description}</p>
                )}
                <span className={`inline-block mt-1 text-xs pm-badge pm-badge-status ${STATUS_CLASS[item.status]}`}>
                  {STATUS_LABEL[item.status]}
                </span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-white/30 hover:text-red-400 transition-colors text-sm flex-shrink-0"
                title="Hapus task"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
