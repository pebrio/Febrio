export type ProjectAccessRole = "admin" | "hrd" | "guest";

const STORAGE_KEY = "febrio_project_access_role";

export function getProjectAccessRole(): ProjectAccessRole {
  if (typeof window === "undefined") return "guest";

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "admin" || value === "hrd" ? value : "guest";
  } catch {
    return "guest";
  }
}

export function setProjectAccessRole(role: ProjectAccessRole): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, role);
  } catch {
    // ignore storage errors
  }
}

export function isProjectAdmin(role?: ProjectAccessRole): boolean {
  return (role ?? getProjectAccessRole()) === "admin";
}
