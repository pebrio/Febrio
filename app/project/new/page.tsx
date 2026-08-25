"use client";

import { useRouter } from "next/navigation";
import { useProjectStore } from "@/lib/projectStore";
import ProjectForm from "@/components/project/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useProjectStore();

  return (
    <div className="min-h-screen px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back */}
        <button
          onClick={() => router.push("/project")}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          ← Dashboard Project
        </button>

        {/* Header */}
        <div>
          <p className="text-xs text-amber-400 uppercase tracking-widest font-semibold mb-1">
            Project Manager
          </p>
          <h1 className="text-3xl font-bold text-white">Add New Project</h1>
          <p className="text-white/50 text-sm mt-1">
            Enter the basic project information. Work details, problems, and documentation can be added later.
          </p>
        </div>

        {/* Form */}
        <div className="pm-card rounded-3xl p-6">
          <ProjectForm
            onSubmit={(data) => {
              const newProject = addProject(data);
              router.push(`/project/${newProject.id}`);
            }}
            onCancel={() => router.push("/project")}
            submitLabel="Buat Project"
          />
        </div>
      </div>
    </div>
  );
}
