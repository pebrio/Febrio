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

// ─── Seed Data (existing projects from portfolio) ────────────────────────────
const SEED_PROJECTS: Project[] = [
  {
    id: "iot-room-monitoring",
    name: "IoT-Based Room Monitoring System Using Blynk",
    description:
      "Developed a room attendance and facility control monitoring system using Blynk, capable of tracking entry/exit counts, displaying real-time sensor distances, and managing electrical devices like lights and fans automatically.",
    category: "iot",
    status: "completed",
    image: "/Febrio/images/Smart-Monitoring.jpeg",
    tags: ["IoT", "Blynk", "ESP32", "Sensor"],
    workItems: [
      {
        id: "w1",
        title: "Rancang skema hardware",
        status: "done",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "w2",
        title: "Setup Blynk dashboard",
        status: "done",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "w3",
        title: "Integrasi sensor jarak",
        status: "done",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    problems: [],
    solutions: [],
    docs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "aiot-smoke-detection",
    name: "AIoT Smoke Detection System with Digital Image Analysis",
    description:
      "Designed an AIoT smoke detection solution using MQ-137 gas sensors and digital image analysis to automate monitoring in public spaces such as malls and educational facilities.",
    category: "ai",
    status: "completed",
    image: "/Febrio/images/AloT.jpeg",
    tags: ["AIoT", "Machine Learning", "Computer Vision", "MQ-137"],
    workItems: [],
    problems: [],
    solutions: [],
    docs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "smp11-website",
    name: "SMP 11 Maret Sumberagung Website",
    description:
      "Built a WordPress school website for SMP 11 Maret Sumberagung to share academic information, school activities, and communication between teachers, students, and parents.",
    category: "web",
    status: "completed",
    image: "/Febrio/images/Smp11-Maret.png",
    tags: ["WordPress", "Website", "Education"],
    workItems: [],
    problems: [],
    solutions: [],
    docs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "smart-roaster-iot",
    name: "Smart Roaster Berbasis IoT",
    description:
      "Smart Coffee Roasting Monitoring System: Developing a microcontroller-based IoT system to optimize coffee roasting machines. This project integrates thermocouple sensors for precise temperature control and MQ135 sensors for monitoring smoke density levels.",
    category: "iot",
    status: "in-progress",
    image: "",
    tags: ["IoT", "Microcontroller", "Thermocouple", "Coffee"],
    workItems: [],
    problems: [],
    solutions: [],
    docs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

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
