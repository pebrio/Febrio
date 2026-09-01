import { Project } from "./projectTypes";
import { assetPath } from "./siteConfig";

// ─── Seed Data (existing projects from portfolio) ────────────────────────────
export const SEED_PROJECTS: Project[] = [
  {
    id: "iot-room-monitoring",
    name: "IoT-Based Room Monitoring System Using Blynk",
    description:
      "Developed a room attendance and facility control monitoring system using Blynk, capable of tracking entry/exit counts, displaying real-time sensor distances, and managing electrical devices like lights and fans automatically.",
    category: "iot",
    status: "completed",
    image: assetPath("/images/Smart-Monitoring.jpeg"),
    tags: ["IoT", "Blynk", "ESP32", "Sensor"],
    workItems: [
      {
        id: "w1",
        title: "Rancang skema hardware",
        status: "done",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "w2",
        title: "Setup Blynk dashboard",
        status: "done",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "w3",
        title: "Integrasi sensor jarak",
        status: "done",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    problems: [],
    solutions: [],
    docs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "aiot-smoke-detection",
    name: "AIoT Smoke Detection System with Digital Image Analysis",
    description:
      "Designed an AIoT smoke detection solution using MQ-137 gas sensors and digital image analysis to automate monitoring in public spaces such as malls and educational facilities.",
    category: "ai",
    status: "completed",
    image: assetPath("/images/AloT.jpeg"),
    tags: ["AIoT", "Machine Learning", "Computer Vision", "MQ-137"],
    workItems: [],
    problems: [],
    solutions: [],
    docs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "smp11-website",
    name: "SMP 11 Maret Sumberagung Website",
    description:
      "Built a WordPress school website for SMP 11 Maret Sumberagung to share academic information, school activities, and communication between teachers, students, and parents.",
    category: "web",
    status: "completed",
    image: assetPath("/images/Smp11-Maret.png"),
    tags: ["WordPress", "Website", "Education"],
    workItems: [],
    problems: [],
    solutions: [],
    docs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "smart-roaster-iot",
    name: "Smart Roaster Berbasis IoT",
    description:
      "Smart Coffee Roasting Monitoring System: Developing a microcontroller-based IoT system to optimize coffee roasting machines. This project integrates thermocouple sensors for precise temperature control and MQ135 sensors for monitoring smoke density levels.",
    category: "iot",
    status: "in-progress",
    image: "",
    tags: ["IoT", "Microcontroller", "Thermocouple", "Coffee"],
    workItems: [],
    problems: [],
    solutions: [],
    docs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
