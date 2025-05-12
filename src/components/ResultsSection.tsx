import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

// Ícone de foguete (SVG inline ou de uma biblioteca como Heroicons)
const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10.893 2.206a2 2 0 00-1.786 0L3.53 5.531A2 2 0 002.056 7.25v5.5a2 2 0 001.473 1.925l5.574 2.787a2 2 0 001.786 0l5.574-2.787A2 2 0 0017.944 12.75v-5.5a2 2 0 00-1.473-1.925L10.893 2.206zM10 6a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 6zm0 3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 9zm7-1.25a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5z" />
    <path fillRule="evenodd" d="M20 10.5a.75.75 0 01-.75.75H18a.75.75 0 010-1.5h1.25a.75.75 0 01.75.75zM2.75 11.25a.75.75 0 000 1.5H4.5a.75.75 0 000-1.5H2.75zM11.5 2.25a.75.75 0 00-1.5 0v1.505a.75.75 0 001.5 0V2.25z" clipRule="evenodd" />
    <path d="M10 18.25a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM1.204 7.843a6.02 6.02 0 018.013-5.546.75.75 0 10.605-1.222 7.519 7.519 0 00-10.016 6.93c.002.09.005.18.009.27a.75.75 0 101.49-.154 6.02 6.02 0 01-.1-1.278zM18.796 12.157a6.02 6.02 0 01-8.013 5.546.75.75 0 10-.605 1.222 7.519 7.519 0 0010.016-6.93c-.002-.09-.005-.18-.009-.27a.75.75 0 10-1.49.154c.033.422.049.848.05 1.278z" />
  </svg>
);


interface ResultsSectionProps {
  onScrollToCheckout: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ onScrollToCheckout }) => {
  const reelContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, 0.05, -0.01, 0.9], // Custom cubic bezier for a smoother pop
        staggerChildren: 0.2,
      },
    },
  };

  const reelItemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="py-16 md:py-24 px-4 overflow-hidden">
      <motion.div
        className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 mb-12 md:mb-16"
        variants={reelContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Bloco de Vídeo */}
        <motion.div
          className="relative aspect-[9/16] w-52 sm:w-60 lg:w-72 bg-neutral-800 rounded-2xl shadow-custom-heavy overflow-hidden
                     border-2 border-brand-pink/50 hover:border-brand-pink transition-all duration-300 group"
          variants={reelItemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 via-transparent to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
          <video
            src="/video-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover relative z-10"
          ></video>
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">▶️ VÍDEO DEMO</div>
        </motion.div>

        {/* Bloco de Imagem */}
        <motion.div
          className="relative aspect-[9/16] w-52 sm:w-60 lg:w-72 bg-neutral-800 rounded-2xl shadow-custom-heavy overflow-hidden
                     border-2 border-brand-purple/50 hover:border-brand-purple transition-all duration-300 group"
          variants={reelItemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
          <Image
            src="/image-demo.jpg"
            alt="Exemplo de Resultado Caçador de Rosas"
            fill
            sizes="(max-width: 640px) 208px, (max-width: 1024px) 240px, 288px"
            className="object-cover relative z-10"
            priority // Carregar uma das imagens principais com prioridade
          />
           <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">✨ RESULTADO REAL</div>
        </motion.div>
      </motion.div>

      {/* Botão Comprar Agora */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <button
          onClick={onScrollToCheckout}
          className="relative group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white
                     bg-gradient-to-r from-brand-pink to-brand-purple
                     rounded-full shadow-pink-glow-soft hover:shadow-pink-glow-medium
                     transition-all duration-400 ease-in-out
                     transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-pink/50
                     overflow-hidden" // Para o efeito de brilho no hover
        >
          {/* Efeito de brilho sutil no hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-pink via-brand-purple to-brand-pink
                           opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-gradientShift bg-[length:200%_auto]">
          </span>
          <span className="relative z-10 flex items-center">
            Comprar Agora
            <span className="ml-2 transform group-hover:rotate-12 transition-transform duration-300">
              <RocketIcon />
            </span>
          </span>
        </button>
      </motion.div>
    </section>
  );
};

export default ResultsSection;
