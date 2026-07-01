import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akhmad Febriyo | Portfolio",
  description: "Dark minimalist amber portfolio built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
