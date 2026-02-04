"use client";

import React, { useState } from "react";
import PerfumeExperience from "@/components/PerfumeExperience";
import { ProductGrid } from "@/components/ProductGrid";
import { DesireSection } from "@/components/DesireSection";
import { PreferenceSelector } from "@/components/PreferenceSelector";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Men" | "Women" | "Unisex">("All");

  const handlePreferenceSelect = (category: "Men" | "Women" | "Unisex") => {
    setSelectedCategory(category);

    // Smooth scroll to the collection section
    const element = document.getElementById("collection");
    if (element) {
      const offset = 80; // Buffer for header/pacing
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Animation Section */}
      <PerfumeExperience />

      {/* Desire Lifestyle Section */}
      <DesireSection />

      {/* Entry Choice Section */}
      <PreferenceSelector onSelect={handlePreferenceSelect} />

      {/* E-commerce Section */}
      <ProductGrid initialCategory={selectedCategory} />

      {/* Footer Placeholder */}
      <footer className="bg-neutral-900 text-white/40 py-12 px-6 text-center text-[10px] tracking-[0.3em] uppercase">
        © 2026 Bombshell Intense. All Rights Reserved.
      </footer>
    </main>
  );
}
