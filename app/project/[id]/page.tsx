import ProjectDetail from "@/components/project/ProjectDetail";

export async function generateStaticParams() {
  // Return seeded project ids so static export can generate detail pages
  return [
    { id: "iot-room-monitoring" },
    { id: "aiot-smoke-detection" },
    { id: "smp11-website" },
    { id: "smart-roaster-iot" },
  ];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  return <ProjectDetail projectId={id} />;
}
