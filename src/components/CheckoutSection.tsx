import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const CheckoutSection = forwardRef<HTMLDivElement>((props, ref) => {
  const iframeUrl = "https://pay.kuenha.com/4ef532cd-d7d4-4a4a-b9b8-f2b82f379a7b";

  return (
    <section
      ref={ref}
      id="checkout"
      className="min-h-screen w-full flex flex-col items-center justify-center py-16 md:py-24 px-4 bg-neutral-950"
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">
          Garanta Já o Seu <span className="text-brand-pink">Acesso Exclusivo</span>!
        </h2>
        <p className="text-neutral-400 mt-2 text-lg">Desbloqueie os segredos do Aviator e comece a lucrar.</p>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl h-[80vh] md:h-[85vh] bg-neutral-800 rounded-xl shadow-custom-heavy overflow-hidden
                   border border-neutral-700 p-1 md:p-2" // Adiciona uma borda interna e padding para "emoldurar"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] }}
      >
        <iframe
          src={iframeUrl}
          title="Checkout Caçador de Rosas V1"
          width="100%"
          height="100%"
          frameBorder="0"
          className="border-none rounded-lg" // Arredonda o iframe interno também
        />
      </motion.div>
       <motion.p
        className="text-neutral-500 mt-8 text-sm text-center max-w-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        🔒 Pagamento seguro processado pela KUENHA. Seus dados estão protegidos.
      </motion.p>
    </section>
  );
});

CheckoutSection.displayName = 'CheckoutSection';
export default CheckoutSection;
