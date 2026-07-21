"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Project,
  ProjectStatus,
  ProjectCategory,
  STATUS_LABELS,
  CATEGORY_LABELS,
} from "@/lib/projectTypes";

type FormData = {
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  image: string;
  tagsRaw: string; // comma-separated
};

interface ProjectFormProps {
  initial?: Partial<Project>;
  onSubmit: (data: Omit<Project, "id" | "workItems" | "problems" | "solutions" | "docs" | "createdAt" | "updatedAt">) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export default function ProjectForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Simpan Project",
}: ProjectFormProps) {
  const [form, setForm] = useState<FormData>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? "other",
    status: initial?.status ?? "planning",
    startDate: initial?.startDate ?? "",
    endDate: initial?.endDate ?? "",
    image: initial?.image ?? "",
    tagsRaw: initial?.tags?.join(", ") ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) newErrors.name = "Nama project wajib diisi.";
    if (!form.description.trim()) newErrors.description = "Deskripsi wajib diisi.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      status: form.status,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      image: form.image.trim() || undefined,
      tags: form.tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="pm-field">
        <label className="pm-label">Nama Project *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Nama project..."
          className={`pm-input ${errors.name ? "pm-input-error" : ""}`}
        />
        {errors.name && <p className="pm-error-msg">{errors.name}</p>}
      </div>

      {/* Description */}
      <div className="pm-field">
        <label className="pm-label">Deskripsi *</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Deskripsi singkat project..."
          rows={4}
          className={`pm-input ${errors.description ? "pm-input-error" : ""}`}
        />
        {errors.description && <p className="pm-error-msg">{errors.description}</p>}
      </div>

      {/* Category & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="pm-field">
          <label className="pm-label">Kategori</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value as ProjectCategory)}
            className="pm-input"
          >
            {(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((cat) => (
              <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
            ))}
          </select>
        </div>
        <div className="pm-field">
          <label className="pm-label">Status</label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value as ProjectStatus)}
            className="pm-input"
          >
            {(Object.keys(STATUS_LABELS) as ProjectStatus[]).map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="pm-field">
          <label className="pm-label">Tanggal Mulai</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => set("startDate", e.target.value)}
            className="pm-input"
          />
        </div>
        <div className="pm-field">
          <label className="pm-label">Tanggal Selesai</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => set("endDate", e.target.value)}
            className="pm-input"
          />
        </div>
      </div>

      {/* Image URL */}
      <div className="pm-field">
        <label className="pm-label">URL / Path Gambar (opsional)</label>
        <input
          type="text"
          value={form.image}
          onChange={(e) => set("image", e.target.value)}
          placeholder="/images/project.jpg atau https://..."
          className="pm-input"
        />
      </div>

      {/* Tags */}
      <div className="pm-field">
        <label className="pm-label">Tags (pisahkan dengan koma)</label>
        <input
          type="text"
          value={form.tagsRaw}
          onChange={(e) => set("tagsRaw", e.target.value)}
          placeholder="IoT, ESP32, Blynk, ..."
          className="pm-input"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" className="pm-btn-primary px-6 py-2.5 rounded-xl font-semibold">
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="pm-btn-secondary px-6 py-2.5 rounded-xl font-semibold"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
