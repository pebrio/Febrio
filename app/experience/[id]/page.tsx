import { notFound } from "next/navigation";
import ExperienceDetail from "@/components/ExperienceDetail";
import { experiences, getExperience } from "@/lib/experienceData";

export function generateStaticParams() {
  return experiences.map((experience) => ({ id: experience.id }));
}

interface Props {
  params: { id: string };
}

export default function ExperienceDetailPage({ params }: Props) {
  if (!getExperience(params.id)) {
    notFound();
  }

  return <ExperienceDetail experienceId={params.id} />;
}