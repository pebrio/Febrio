import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShapeGrid from "@/components/ShapeGrid";

export const metadata: Metadata = {
  title: "Akhmad Febriyo | Portfolio",
  description: "Dark minimalist amber portfolio built with Next.js and Tailwind CSS.",
  icons: {
    icon: "/user.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-black text-white antialiased min-h-screen relative">
        {/* Global Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ShapeGrid
            direction="diagonal"
            speed={0.18}
            squareSize={34}
            borderColor="rgba(255,255,255,0.16)"
            hoverFillColor="rgba(249,115,22,0.22)"
            shape="hexagon"
            hoverTrailAmount={4}
            className="opacity-70 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.58)_50%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow text-white">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}


