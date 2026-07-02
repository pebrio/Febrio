import { Activity, LayoutGrid, Zap, BookOpen, ShoppingBag, Wifi } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import SectionBackground from "./SectionBackground";

const services = [
  {
    title: "Monitoring Systems",
    description:
      "Sensor integration and web dashboards for real-time facility monitoring.",
    icon: Activity,
  },
  {
    title: "Landing Pages",
    description:
      "Promotional pages with clear structure designed to capture attention and generate leads.",
    icon: LayoutGrid,
  },
  {
    title: "Automation Systems",
    description:
      "Sensor-based automation prototypes for simplified operations and monitoring.",
    icon: Zap,
  },
  {
    title: "Education Systems",
    description:
      "School solutions for communication, information sharing, and digital workflow.",
    icon: BookOpen,
  },
  {
    title: "E-Commerce Platforms",
    description:
      "Information and transaction platforms that streamline online buying and selling.",
    icon: ShoppingBag,
  },
  {
    title: "IoT Development",
    description:
      "Monitoring dashboards and device control interfaces for IoT solutions.",
    icon: Wifi,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden scroll-mt-28 px-6 py-24 sm:px-8 lg:px-10"
    >
      <SectionBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Services"
        title="Services I can help build."
        description="A service section designed as a set of cards to explain your offerings clearly."
      />
      <ScrollReveal className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.title} className="portfolio-card rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-hover cursor-pointer">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {service.description}
              </p>
            </article>
          );
        })}
      </ScrollReveal>
      </div>
    </section>
  );
}

