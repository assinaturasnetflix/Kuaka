// app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <ServicesSection />
      <BenefitsSection />
      {/* Adicionar outras seções aqui se necessário (ex: Portfólio, Testemunhos) */}
      <Footer />
    </main>
  );
}
