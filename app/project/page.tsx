"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProjectDashboard from "@/components/project/ProjectDashboard";
import ProjectDetail from "@/components/project/ProjectDetail";
import NewProjectPage from "@/components/project/NewProjectPage";
import { getProjectAccessRole, isProjectAdmin } from "@/lib/projectAccess";

function ProjectPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isNew = searchParams.get("new") === "1";
  const canManage = isProjectAdmin(getProjectAccessRole());

  if (isNew && canManage) {
    return <NewProjectPage />;
  }

  if (id) {
    return <ProjectDetail projectId={id} />;
  }

  return <ProjectDashboard />;
}

export default function ProjectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="pm-spinner mx-auto" />
          <p className="text-white/50 text-sm">Loading...</p>
        </div>
      </div>
    }>
      <ProjectPageContent />
    </Suspense>
  );
}
