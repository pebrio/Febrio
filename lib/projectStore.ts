"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Project,
  WorkItem,
  Problem,
  Solution,
  DocEntry,
  ProjectStatus,
  ProjectCategory,
} from "./projectTypes";
import { assetPath } from "./siteConfig";

import { SEED_PROJECTS } from "./seedProjects";
export { SEED_PROJECTS };

const STORAGE_KEY = "febrio_projects";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function uuid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function now(): string {
  return new Date().toISOString();
}

function loadFromStorage(): Project[] {
  if (typeof window === "undefined") return SEED_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time: seed
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROJECTS));
      return SEED_PROJECTS;
    }
    return JSON.parse(raw) as Project[];
  } catch {
    return SEED_PROJECTS;
  }
}

function saveToStorage(projects: Project[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useProjectStore() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProjects(loadFromStorage());
    setLoading(false);
  }, []);

  const save = useCallback((updated: Project[]) => {
    setProjects(updated);
    saveToStorage(updated);
  }, []);

  // ── Project CRUD ─────────────────────────────────────────────────────────
  const addProject = useCallback(
    (data: Omit<Project, "id" | "workItems" | "problems" | "solutions" | "docs" | "createdAt" | "updatedAt">) => {
      const newProject: Project = {
        ...data,
        id: uuid(),
        workItems: [],
        problems: [],
        solutions: [],
        docs: [],
        createdAt: now(),
        updatedAt: now(),
      };
      const updated = [...projects, newProject];
      save(updated);
      return newProject;
    },
    [projects, save]
  );

  const updateProject = useCallback(
    (id: string, data: Partial<Omit<Project, "id" | "createdAt">>) => {
      const updated = projects.map((p) =>
        p.id === id ? { ...p, ...data, updatedAt: now() } : p
      );
      save(updated);
    },
    [projects, save]
  );

  const deleteProject = useCallback(
    (id: string) => {
      save(projects.filter((p) => p.id !== id));
    },
    [projects, save]
  );

  const getProject = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects]
  );

  // ── Work Items ───────────────────────────────────────────────────────────
  const addWorkItem = useCallback(
    (projectId: string, data: Omit<WorkItem, "id" | "createdAt" | "updatedAt">) => {
      const item: WorkItem = { ...data, id: uuid(), createdAt: now(), updatedAt: now() };
      const updated = projects.map((p) =>
        p.id === projectId
          ? { ...p, workItems: [...p.workItems, item], updatedAt: now() }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  const updateWorkItem = useCallback(
    (projectId: string, itemId: string, data: Partial<WorkItem>) => {
      const updated = projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              updatedAt: now(),
              workItems: p.workItems.map((w) =>
                w.id === itemId ? { ...w, ...data, updatedAt: now() } : w
              ),
            }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  const deleteWorkItem = useCallback(
    (projectId: string, itemId: string) => {
      const updated = projects.map((p) =>
        p.id === projectId
          ? { ...p, workItems: p.workItems.filter((w) => w.id !== itemId), updatedAt: now() }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  // ── Problems ─────────────────────────────────────────────────────────────
  const addProblem = useCallback(
    (projectId: string, data: Omit<Problem, "id" | "createdAt">) => {
      const problem: Problem = { ...data, id: uuid(), createdAt: now() };
      const updated = projects.map((p) =>
        p.id === projectId
          ? { ...p, problems: [...p.problems, problem], updatedAt: now() }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  const updateProblem = useCallback(
    (projectId: string, problemId: string, data: Partial<Problem>) => {
      const updated = projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              updatedAt: now(),
              problems: p.problems.map((pr) =>
                pr.id === problemId ? { ...pr, ...data } : pr
              ),
            }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  const deleteProblem = useCallback(
    (projectId: string, problemId: string) => {
      const updated = projects.map((p) =>
        p.id === projectId
          ? { ...p, problems: p.problems.filter((pr) => pr.id !== problemId), updatedAt: now() }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  // ── Solutions ────────────────────────────────────────────────────────────
  const addSolution = useCallback(
    (projectId: string, data: Omit<Solution, "id" | "createdAt">) => {
      const solution: Solution = { ...data, id: uuid(), createdAt: now() };
      const updated = projects.map((p) =>
        p.id === projectId
          ? { ...p, solutions: [...p.solutions, solution], updatedAt: now() }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  const deleteSolution = useCallback(
    (projectId: string, solutionId: string) => {
      const updated = projects.map((p) =>
        p.id === projectId
          ? { ...p, solutions: p.solutions.filter((s) => s.id !== solutionId), updatedAt: now() }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  // ── Docs ─────────────────────────────────────────────────────────────────
  const addDoc = useCallback(
    (projectId: string, data: Omit<DocEntry, "id" | "createdAt">) => {
      const doc: DocEntry = { ...data, id: uuid(), createdAt: now() };
      const updated = projects.map((p) =>
        p.id === projectId
          ? { ...p, docs: [...p.docs, doc], updatedAt: now() }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  const deleteDoc = useCallback(
    (projectId: string, docId: string) => {
      const updated = projects.map((p) =>
        p.id === projectId
          ? { ...p, docs: p.docs.filter((d) => d.id !== docId), updatedAt: now() }
          : p
      );
      save(updated);
    },
    [projects, save]
  );

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem,
    addProblem,
    updateProblem,
    deleteProblem,
    addSolution,
    deleteSolution,
    addDoc,
    deleteDoc,
  };
}
