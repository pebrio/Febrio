"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
          className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-orange-300"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-orange-400/40 group-hover:bg-orange-500/10">
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
          </span>
          Back to Projects
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
              router.push(`/project?id=${newProject.id}`);
            }}
            onCancel={() => router.push("/project")}
            submitLabel="Create Project"
          />
        </div>
      </div>
    </div>
  );
}
