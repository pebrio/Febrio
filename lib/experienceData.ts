export type ExperienceIcon = "globe" | "tech" | "briefcase" | "education";

export type ExperienceLink = {
  label: string;
  href: string;
  type?: "news" | "instagram" | "website" | "document";
};

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  summary: string;
  icon: ExperienceIcon;
  responsibilities: string[];
  achievements: string[];
  documentationLinks?: ExperienceLink[];
};

export const experiences: ExperienceItem[] = [
  {
    id: "admin-kasir",
    title: "Admin & Kasir",
    company: "Administration & Operations",
    period: "June 2026 - Present",
    summary:
      "Managed operational administration, served customers, recorded income and expenses, and ensured accurate and orderly cashier processes.",
    icon: "briefcase",
    responsibilities: [
      "Recorded and balanced daily store cash flows, encompassing all sales revenues and operational expenditures.",
      "Managed and disbursed payments for agricultural commodities purchased directly from local farmers and community members.",
      "Processed, verified, and logged supplier delivery receipts and purchase invoices into the ledger.",
      "Administered accounts payable (AP) to suppliers and monitored accounts receivable (AR) collections from customers.",
      "Prepared monthly recapitulations and tracked balances for employee loans and advances.",
      "Served retail and wholesale customers, processing sales transactions accurately and reconciling end-of-day cash balances.",
      "Verified physical stock inventory against incoming supplier invoices and store records.",
    ],
    achievements: [
      "Maintained accurate transaction records and organized administration.",
      "Supported smooth operations through responsive and organized service.",
      "Improved transaction process efficiency for daily transactions valued at IDR 5 million.",
    ],
    documentationLinks: [
      { label: "Google Drive", href: " ", type: "news" },
      { label: "Instagram", href: "", type: "instagram" },
    ],

  },
  {
    id: "it-helpdesk-tunas-dwipa-matra",
    title: "IT Helpdesk",
    company: "PT Tunas Dwipa Matra",
    period: "April - July 2026",
    summary:
      "Provided operational technical support, managed Odoo 18 ERP systems, and conducted Teds 2.0 testing with UAT reporting to ensure smooth business operations and efficient workflows.",
    icon: "globe",
    responsibilities: [
      "Provided technical support for users' operational needs and work devices.",
      "Managed and supported the maintenance of the Odoo 18 ERP system.",
      "Conducted Teds 2.0 testing and prepared UAT reports.",
    ],
    achievements: [
      "Supported smooth business processes through structured technical troubleshooting.",
      "Helped ensure system features and workflows were ready for the relevant teams.",
    ],
    documentationLinks: [
      { label: "Google Drive", href: "https://www.google.com/search?q=PT+Tunas+Dwipa+Matra", type: "news" },
      { label: "Instagram", href: "https://www.instagram.com/", type: "instagram" },
    ],
  },
  {
    id: "housekeeping-20-kopi",
    title: "Housekeeping",
    company: "20 Kopi+",
    period: "October - December 2025",
    summary:
      "Maintained cleanliness, organization, and comfort across operational facilities while providing excellent service to ensure customer satisfaction.",
    icon: "tech",
    responsibilities: [
      "Maintained the cleanliness and order of operational areas.",
      "Ensured facilities were ready for use and comfortable for customers.",
      "Provided responsive service to support the customer experience.",
    ],
    achievements: [
      "Helped maintain cleanliness and comfort standards throughout operations.",
      "Supported customer satisfaction through consistent service.",
    ],
    documentationLinks: [
      // { label: "News/Promotion", href: "https://www.google.com/search?q=20+Kopi+Indonesia", type: "news" },
      // { label: "Instagram", href: "https://www.instagram.com/", type: "instagram" },
    ],
  },
  {
    id: "faculty-teaching-assistant-teknokrat",
    title: "Faculty Teaching Assistant",
    company: "Universitas Teknokrat Indonesia",
    period: "October 2024 - March 2026",
    summary:
      "Assisted programming, networking, and IoT labs while providing hardware/software technical support and managing lab administration and grading.",
    icon: "briefcase",
    responsibilities: [
      "Assisted with programming, computer networking, and IoT labs.",
      "Provided technical support for laboratory hardware and software.",
      "Managed laboratory administration and supported student assessment.",
    ],
    achievements: [
      "Helped students understand the material and resolve issues during practical sessions.",
      "Maintained equipment readiness and smooth laboratory administration.",
    ],
    documentationLinks: [
      { label: "University Website", href: "https://teknokrat.ac.id/", type: "website" },
      { label: "Instagram", href: "https://www.instagram.com/teknokratofficial/", type: "instagram" },
    ],
  },
  {
    id: "kampus-mengajar-batch-7",
    title: "Kampus Mengajar Batch 7",
    company: "Kemendikbud Ristek",
    period: "March - August 2024",
    summary:
      "Contributed to the Kampus Mengajar Batch 7 program by integrating technology with an automated bell system, school website development, and interactive learning media to improve student literacy and numeracy.",
    icon: "education",
    responsibilities: [
      "Developed an automated school bell system to support school operations.",
      "Built a school website as an information and communication platform.",
      "Created interactive learning media to support student literacy and numeracy.",
    ],
    achievements: [
      "Integrated technology solutions relevant to the school's needs.",
      "Supported more engaging learning through interactive educational media.",
    ],
    documentationLinks: [
      { label: "Kampus Mengajar Program", href: "https://kampusmerdeka.kemdikbud.go.id/program/kampus-mengajar", type: "document" },
      { label: "Instagram", href: "https://www.instagram.com/kampusmerdeka/", type: "instagram" },
    ],
  },
];

export function getExperience(id: string) {
  return experiences.find((experience) => experience.id === id);
}