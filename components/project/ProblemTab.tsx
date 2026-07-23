"use client";

import { useState, useEffect } from "react";
import { Project, Severity, SEVERITY_LABELS, SEVERITY_COLORS } from "@/lib/projectTypes";
import { useProjectStore } from "@/lib/projectStore";
import { getProjectAccessRole, isProjectAdmin } from "@/lib/projectAccess";

interface ProblemTabProps {
  project: Project;
  onUpdate: () => void;
}

export default function ProblemTab({ project, onUpdate }: ProblemTabProps) {
  const { addProblem, updateProblem, deleteProblem, addSolution, deleteSolution } =
    useProjectStore();

  const [showProblemForm, setShowProblemForm] = useState(false);
  const [showSolutionForm, setShowSolutionForm] = useState<string | null>(null); // problemId or "general"
  const [activeTab, setActiveTab] = useState<"problems" | "solutions">("problems");
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

  // Problem form state
  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pSeverity, setPSeverity] = useState<Severity>("medium");

  // Solution form state
  const [sTitle, setSTitle] = useState("");
  const [sDesc, setSDesc] = useState("");
  const [sProblemId, setSProblemId] = useState("");

  const openProblems = project.problems.filter((p) => !p.resolvedAt);
  const resolvedProblems = project.problems.filter((p) => p.resolvedAt);

  const handleAddProblem = () => {
    if (!pTitle.trim()) return;
    addProblem(project.id, {
      title: pTitle.trim(),
      description: pDesc.trim(),
      severity: pSeverity,
    });
    setPTitle(""); setPDesc(""); setPSeverity("medium");
    setShowProblemForm(false);
    onUpdate();
  };

  const handleResolveProblem = (problemId: string) => {
    updateProblem(project.id, problemId, { resolvedAt: new Date().toISOString() });
    onUpdate();
  };

  const handleReopenProblem = (problemId: string) => {
    updateProblem(project.id, problemId, { resolvedAt: undefined });
    onUpdate();
  };

  const handleDeleteProblem = (problemId: string) => {
    if (!confirm("Hapus masalah ini?")) return;
    deleteProblem(project.id, problemId);
    onUpdate();
  };

  const handleAddSolution = () => {
    if (!sTitle.trim()) return;
    addSolution(project.id, {
      title: sTitle.trim(),
      description: sDesc.trim(),
      problemId: sProblemId || undefined,
    });
    setSTitle(""); setSDesc(""); setSProblemId("");
    setShowSolutionForm(null);
    onUpdate();
  };

  const handleDeleteSolution = (solutionId: string) => {
    if (!confirm("Hapus solusi ini?")) return;
    deleteSolution(project.id, solutionId);
    onUpdate();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-5">
      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 rounded-xl pm-tab-bar">
        <button
          onClick={() => setActiveTab("problems")}
          className={`pm-subtab flex-1 ${activeTab === "problems" ? "pm-subtab-active" : ""}`}
        >
          Masalah
          {openProblems.length > 0 && (
            <span className="ml-1.5 pm-count-badge bg-orange-500/20 text-orange-300">
              {openProblems.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("solutions")}
          className={`pm-subtab flex-1 ${activeTab === "solutions" ? "pm-subtab-active" : ""}`}
        >
          Solusi
          <span className="ml-1.5 pm-count-badge">{project.solutions.length}</span>
        </button>
      </div>

      {/* ─── PROBLEMS ────────────────────────────────── */}
      {activeTab === "problems" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-white/50">
              {openProblems.length} masalah terbuka · {resolvedProblems.length} diselesaikan
            </p>
            {canManage && (
              <button
                onClick={() => setShowProblemForm(true)}
                className="pm-btn-primary text-sm py-2 px-4 rounded-xl"
              >
                + Tambah Masalah
              </button>
            )}
          </div>

          {/* Add Problem Form */}
          {showProblemForm && (
            <div className="pm-card rounded-2xl p-5 space-y-3 border border-orange-500/30">
              <h4 className="text-sm font-semibold text-white">Masalah Baru</h4>
              <input
                autoFocus
                type="text"
                value={pTitle}
                onChange={(e) => setPTitle(e.target.value)}
                placeholder="Judul masalah..."
                className="pm-input w-full"
              />
              <textarea
                value={pDesc}
                onChange={(e) => setPDesc(e.target.value)}
                placeholder="Deskripsi masalah..."
                rows={3}
                className="pm-input w-full"
              />
              <div className="pm-field">
                <label className="pm-label">Severity</label>
                <select value={pSeverity} onChange={(e) => setPSeverity(e.target.value as Severity)} className="pm-input">
                  {(Object.keys(SEVERITY_LABELS) as Severity[]).map((s) => (
                    <option key={s} value={s}>{SEVERITY_LABELS[s]}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={handleAddProblem} className="pm-btn-primary text-sm py-1.5 px-4 rounded-lg">Simpan</button>
                <button onClick={() => setShowProblemForm(false)} className="pm-btn-secondary text-sm py-1.5 px-4 rounded-lg">Batal</button>
              </div>
            </div>
          )}

          {/* Problem List */}
          {project.problems.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              <p className="text-sm">Tidak ada masalah tercatat. Bagus!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Open problems first */}
              {openProblems.map((problem) => (
                <div key={problem.id} className="pm-card rounded-xl p-4 space-y-2 border-l-2 border-orange-500">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`pm-badge pm-badge-severity ${SEVERITY_COLORS[problem.severity]}`}>
                        {SEVERITY_LABELS[problem.severity]}
                      </span>
                      <span className="text-xs text-white/40">{formatDate(problem.createdAt)}</span>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleResolveProblem(problem.id)}
                        className="pm-btn-secondary text-xs py-1 px-2 rounded-lg"
                        title="Tandai selesai"
                      >
                        Selesai
                      </button>
                      <button onClick={() => handleDeleteProblem(problem.id)} className="text-white/30 hover:text-red-400 text-sm transition-colors">Hapus</button>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{problem.title}</h4>
                  {problem.description && (
                    <p className="text-xs text-white/60 leading-relaxed">{problem.description}</p>
                  )}
                  {/* Linked solutions */}
                  {project.solutions.filter((s) => s.problemId === problem.id).length > 0 && (
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-xs text-white/40 mb-1">Solusi terhubung:</p>
                      {project.solutions
                        .filter((s) => s.problemId === problem.id)
                        .map((s) => (
                          <p key={s.id} className="text-xs text-amber-300">• {s.title}</p>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Resolved problems */}
              {resolvedProblems.length > 0 && (
                <details className="group">
                  <summary className="cursor-pointer text-xs text-white/40 hover:text-white/60 transition-colors py-2">
                    {resolvedProblems.length} masalah diselesaikan
                  </summary>
                  <div className="mt-2 space-y-2">
                    {resolvedProblems.map((problem) => (
                      <div key={problem.id} className="pm-card rounded-xl p-4 space-y-1.5 opacity-50 border-l-2 border-green-500">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-green-400">Diselesaikan {formatDate(problem.resolvedAt!)}</span>
                            <span className={`pm-badge pm-badge-severity ${SEVERITY_COLORS[problem.severity]}`}>{SEVERITY_LABELS[problem.severity]}</span>
                          </div>
                          <div className="flex gap-1.5">
                            <button onClick={() => handleReopenProblem(problem.id)} className="pm-btn-secondary text-xs py-1 px-2 rounded-lg">Buka Kembali</button>
                            <button onClick={() => handleDeleteProblem(problem.id)} className="text-white/30 hover:text-red-400 text-sm">Hapus</button>
                          </div>
                        </div>
                        <h4 className="text-sm font-medium text-white line-through">{problem.title}</h4>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}
        </div>
      )}

      {/* ─── SOLUTIONS ───────────────────────────────── */}
      {activeTab === "solutions" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-white/50">{project.solutions.length} solusi dicatat</p>
            {canManage && (
              <button
                onClick={() => setShowSolutionForm("general")}
                className="pm-btn-primary text-sm py-2 px-4 rounded-xl"
              >
                + Tambah Solusi
              </button>
            )}
          </div>

          {/* Add Solution Form */}
          {showSolutionForm && (
            <div className="pm-card rounded-2xl p-5 space-y-3 border border-amber-500/30">
              <h4 className="text-sm font-semibold text-white">Solusi Baru</h4>
              <input
                autoFocus
                type="text"
                value={sTitle}
                onChange={(e) => setSTitle(e.target.value)}
                placeholder="Judul solusi..."
                className="pm-input w-full"
              />
              <textarea
                value={sDesc}
                onChange={(e) => setSDesc(e.target.value)}
                placeholder="Penjelasan solusi..."
                rows={4}
                className="pm-input w-full"
              />
              {project.problems.length > 0 && (
                <div className="pm-field">
                  <label className="pm-label">Terhubung ke masalah (opsional)</label>
                  <select value={sProblemId} onChange={(e) => setSProblemId(e.target.value)} className="pm-input">
                    <option value="">— Tidak terhubung —</option>
                    {project.problems.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={handleAddSolution} className="pm-btn-primary text-sm py-1.5 px-4 rounded-lg">Simpan</button>
                <button onClick={() => setShowSolutionForm(null)} className="pm-btn-secondary text-sm py-1.5 px-4 rounded-lg">Batal</button>
              </div>
            </div>
          )}

          {/* Solution List */}
          {project.solutions.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              <p className="text-sm">Belum ada solusi dicatat.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {project.solutions.map((sol) => {
                const linkedProblem = sol.problemId
                  ? project.problems.find((p) => p.id === sol.problemId)
                  : null;
                return (
                  <div key={sol.id} className="pm-card rounded-xl p-4 space-y-2 border-l-2 border-amber-500">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white">{sol.title}</h4>
                      <button onClick={() => handleDeleteSolution(sol.id)} className="text-white/30 hover:text-red-400 text-sm transition-colors flex-shrink-0">Hapus</button>
                    </div>
                    {sol.description && (
                      <p className="text-xs text-white/60 leading-relaxed whitespace-pre-wrap">{sol.description}</p>
                    )}
                    {linkedProblem && (
                      <div className="flex items-center gap-1.5 text-xs text-orange-300/80">
                        <span>Terkait: {linkedProblem.title}</span>
                      </div>
                    )}
                    <p className="text-xs text-white/30">{formatDate(sol.createdAt)}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
