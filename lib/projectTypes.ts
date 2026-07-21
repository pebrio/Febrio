// ─── Project Types ────────────────────────────────────────────────────────────

export type ProjectStatus = "planning" | "in-progress" | "completed" | "on-hold" | "cancelled";
export type ProjectCategory = "iot" | "web" | "mobile" | "ai" | "hardware" | "other";
export type Severity = "low" | "medium" | "high" | "critical";
export type WorkItemStatus = "todo" | "in-progress" | "done";

// ─── Work Item (Task / Milestone) ─────────────────────────────────────────────
export interface WorkItem {
  id: string;
  title: string;
  description?: string;
  status: WorkItemStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Problem Log ──────────────────────────────────────────────────────────────
export interface Problem {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  resolvedAt?: string; // ISO date if resolved
  createdAt: string;
}

// ─── Solution ─────────────────────────────────────────────────────────────────
export interface Solution {
  id: string;
  problemId?: string; // linked problem (optional)
  title: string;
  description: string;
  createdAt: string;
}

// ─── Documentation Entry ──────────────────────────────────────────────────────
export interface DocEntry {
  id: string;
  type: "note" | "link";
  title: string;
  content: string; // notes text OR URL for links
  createdAt: string;
}

// ─── Main Project ─────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  startDate?: string; // ISO date
  endDate?: string;   // ISO date
  image?: string;     // URL or path
  tags: string[];
  workItems: WorkItem[];
  problems: Problem[];
  solutions: Solution[];
  docs: DocEntry[];
  createdAt: string;
  updatedAt: string;
}

// ─── Label Maps ───────────────────────────────────────────────────────────────
export const STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: "Planning",
  "in-progress": "In Progress",
  completed: "Completed",
  "on-hold": "On Hold",
  cancelled: "Cancelled",
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  iot: "IoT",
  web: "Web",
  mobile: "Mobile",
  ai: "AI / ML",
  hardware: "Hardware",
  other: "Other",
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  planning: "status-planning",
  "in-progress": "status-inprogress",
  completed: "status-completed",
  "on-hold": "status-onhold",
  cancelled: "status-cancelled",
};

export const SEVERITY_COLORS: Record<Severity, string> = {
  low: "severity-low",
  medium: "severity-medium",
  high: "severity-high",
  critical: "severity-critical",
};
