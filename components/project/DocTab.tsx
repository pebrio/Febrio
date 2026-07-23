"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/projectTypes";
import { useProjectStore } from "@/lib/projectStore";
import { getProjectAccessRole, isProjectAdmin } from "@/lib/projectAccess";

interface DocTabProps {
  project: Project;
  onUpdate: () => void;
}

export default function DocTab({ project, onUpdate }: DocTabProps) {
  const { addDoc, deleteDoc } = useProjectStore();

  const [showForm, setShowForm] = useState(false);
  const [docType, setDocType] = useState<"note" | "link">("note");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filterType, setFilterType] = useState<"all" | "note" | "link">("all");
  const [canManage, setCanManage] = useState(false);

  useEffect(() => {
    setCanManage(isProjectAdmin(getProjectAccessRole()));
    const syncAccess = () => setCanManage(isProjectAdmin(getProjectAccessRole()));
    window.addEventListener("storage", syncAccess);
    window.addEventListener("projectAccessChanged", syncAccess);
    return () => {
      window.removeEventListener("storage", syncAccess);
      window.removeEventListener("projectAccessChanged", syncAccess);
    };
  }, []);

  const filtered =
    filterType === "all"
      ? project.docs
      : project.docs.filter((d) => d.type === filterType);

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) return;
    addDoc(project.id, {
      type: docType,
      title: title.trim(),
      content: content.trim(),
    });
    setTitle("");
    setContent("");
    setShowForm(false);
    onUpdate();
  };

  const handleDelete = (docId: string) => {
    if (!confirm("Hapus dokumentasi ini?")) return;
    deleteDoc(project.id, docId);
    onUpdate();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2">
          {(["all", "note", "link"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`pm-filter-btn ${filterType === f ? "pm-filter-btn-active" : ""}`}
            >
              {f === "all" ? "Semua" : f === "note" ? "📝 Catatan" : "🔗 Link"}
              <span className="ml-1 pm-count-badge">
                {f === "all"
                  ? project.docs.length
                  : project.docs.filter((d) => d.type === f).length}
              </span>
            </button>
          ))}
        </div>
        {canManage && (
          <button
            onClick={() => setShowForm(true)}
            className="pm-btn-primary text-sm py-2 px-4 rounded-xl"
          >
            + Tambah Dokumentasi
          </button>
        )}
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="pm-card rounded-2xl p-5 space-y-3 border border-amber-500/30">
          <h4 className="text-sm font-semibold text-white">Dokumentasi Baru</h4>
          {/* Type Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setDocType("note")}
              className={`pm-filter-btn flex-1 ${docType === "note" ? "pm-filter-btn-active" : ""}`}
            >
              📝 Catatan
            </button>
            <button
              onClick={() => setDocType("link")}
              className={`pm-filter-btn flex-1 ${docType === "link" ? "pm-filter-btn-active" : ""}`}
            >
              🔗 Link
            </button>
          </div>

          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={docType === "note" ? "Judul catatan..." : "Nama link / referensi..."}
            className="pm-input w-full"
          />
          {docType === "note" ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis catatan dokumentasi di sini..."
              rows={6}
              className="pm-input w-full font-mono text-xs leading-relaxed"
            />
          ) : (
            <input
              type="url"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="https://..."
              className="pm-input w-full"
            />
          )}
          <div className="flex gap-2">
            <button onClick={handleAdd} className="pm-btn-primary text-sm py-1.5 px-4 rounded-lg">
              Simpan
            </button>
            <button
              onClick={() => { setShowForm(false); setTitle(""); setContent(""); }}
              className="pm-btn-secondary text-sm py-1.5 px-4 rounded-lg"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Doc List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <p className="text-sm">Belum ada dokumentasi. Tambahkan catatan atau link!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className={`pm-card rounded-xl p-4 space-y-2 border-l-2 ${
                doc.type === "note" ? "border-blue-400" : "border-purple-400"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base">{doc.type === "note" ? "📝" : "🔗"}</span>
                  <h4 className="text-sm font-semibold text-white">{doc.title}</h4>
                  <span className="text-xs text-white/40">{formatDate(doc.createdAt)}</span>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-white/30 hover:text-red-400 text-sm transition-colors flex-shrink-0"
                  title="Hapus"
                >
                  ✕
                </button>
              </div>

              {doc.type === "note" ? (
                <p className="text-xs text-white/70 leading-relaxed whitespace-pre-wrap font-mono bg-white/5 rounded-lg p-3">
                  {doc.content}
                </p>
              ) : (
                <a
                  href={doc.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors hover:underline break-all"
                >
                  <span>↗</span>
                  {doc.content}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
