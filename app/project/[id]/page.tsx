import ProjectDetail from "@/components/project/ProjectDetail";

export async function generateStaticParams() {
  return [];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  return <ProjectDetail projectId={id} />;
}
