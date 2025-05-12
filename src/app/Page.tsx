'use client';

import { useRef } from 'react';
import LogoSection from '../components/LogoSection';
import ResultsSection from '../components/ResultsSection';
import StrategySection from '../components/StrategySection';
import CheckoutSection from '../components/CheckoutSection';
import TestimonialsSection from '../components/TestimonialsSection';

export default function Home() {
  const checkoutRef = useRef<HTMLDivElement>(null);

  const handleScrollToCheckout = () => {
    checkoutRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // Tenta centralizar a seção na tela
    });
  };

  return (
    <> {/* Fragmento para permitir o footer fora do main se necessário */}
      <main className="flex min-h-screen flex-col">
        <LogoSection />
        <ResultsSection onScrollToCheckout={handleScrollToCheckout} />
        <StrategySection />
        <CheckoutSection ref={checkoutRef} />
        <TestimonialsSection />
      </main>

      <footer className="bg-neutral-950 text-neutral-500 text-center py-8 px-4 border-t border-neutral-800">
        <div className="container mx-auto">
          <Image src="/logo.png" alt="Caçador de Rosas V1" width={150} height={50} className="mx-auto mb-4 opacity-70 h-auto" />
          <p className="text-sm mb-1">
            © {new Date().getFullYear()} Caçador de Rosas V1. Todos os direitos reservados.
          </p>
          <p className="text-xs">
            
          </p>
          <p className="text-xs mt-2">
            VAMOS FAZER BOFUFA🇲🇿🤑
          </p>
        </div>
      </footer>
    </>
  );
}
