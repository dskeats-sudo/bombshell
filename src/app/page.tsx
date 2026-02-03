import PerfumeExperience from "@/components/PerfumeExperience";
import { ProductGrid } from "@/components/ProductGrid";
import { DesireSection } from "@/components/DesireSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Animation Section */}
      <PerfumeExperience />

      {/* Desire Lifestyle Section */}
      <DesireSection />

      {/* E-commerce Section */}
      <ProductGrid />

      {/* Footer Placeholder */}
      <footer className="bg-neutral-900 text-white/40 py-12 px-6 text-center text-[10px] tracking-[0.3em] uppercase">
        © 2026 Bombshell Intense. All Rights Reserved.
      </footer>
    </main>
  );
}
