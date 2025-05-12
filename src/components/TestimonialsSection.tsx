import { motion } from 'framer-motion';

// Ícone de aspas
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={`w-8 h-8 ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.5 10C7.32843 10 8 9.32843 8 8.5C8 7.67157 7.32843 7 6.5 7C5.67157 7 5 7.67157 5 8.5C5 9.32843 5.67157 10 6.5 10ZM6.5 12C4.567 12 3 10.433 3 8.5C3 6.567 4.567 5 6.5 5C8.433 5 10 6.567 10 8.5C10 9.87827 9.2002 11.0573 8.00001 11.655V15.25C8.00001 15.9404 7.44036 16.5 6.75001 16.5L6.50001 16.5C5.81519 16.5021 5.25918 15.9565 5.25001 15.2718L5.25001 12.7917C4.12113 12.4378 3.16672 13.0198 3.00609 14.1417C2.83026 15.3802 3.70918 16.5218 4.94301 16.6892L4.99701 16.6952C6.15113 16.8515 7.22918 16.1052 7.55001 15.0032L7.75001 12H6.5Z M17.5 10C18.3284 10 19 9.32843 19 8.5C19 7.67157 18.3284 7 17.5 7C16.6716 7 16 7.67157 16 8.5C16 9.32843 16.6716 10 17.5 10ZM17.5 12C15.567 12 14 10.433 14 8.5C14 6.567 15.567 5 17.5 5C19.433 5 21 6.567 21 8.5C21 9.87827 20.2002 11.0573 19.00001 11.655V15.25C19.00001 15.9404 18.4404 16.5 17.75001 16.5L17.50001 16.5C16.8152 16.5021 16.2592 15.9565 16.25001 15.2718L16.25001 12.7917C15.1211 12.4378 14.1667 13.0198 14.0061 14.1417C13.8303 15.3802 14.7092 16.5218 15.94301 16.6892L15.99701 16.6952C17.1511 16.8515 18.2292 16.1052 18.55001 15.0032L18.75001 12H17.5Z" />
  </svg>
);


const testimonials = [
  { name: "Mário Vilanculos", comment: "Essa estratégia mudou meu jogo completamente. Os lucros aumentaram de forma que eu não esperava!", location: "Maputo" },
  { name: "Júlia Silva", comment: "Nunca mais perdi dinheiro no Aviator sem saber o porquê. Agora tenho controle e confiança!", location: "Beira" },
  { name: "Ernesto Chimoio", comment: "Caçador de Rosas é, sem dúvida, o melhor investimento que fiz para o Aviator. Simples, direto e muito eficaz.", location: "Nampula" },
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-neutral-900">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-neutral-100"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          O que nossos <span className="text-brand-pink">Caçadores de Moçambique</span> dizem 🇲🇿
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-neutral-800 p-6 md:p-8 rounded-xl shadow-custom-medium border border-neutral-700
                         hover:shadow-pink-glow-soft hover:border-brand-pink/30 transition-all duration-300
                         flex flex-col" // Para o nome ficar no rodapé
              variants={cardVariants}
            >
              <QuoteIcon className="text-brand-pink/70 mb-4 self-start" />
              <p className="text-neutral-300 italic text-base md:text-lg leading-relaxed mb-6 flex-grow">
                “{testimonial.comment}”
              </p>
              <div className="mt-auto border-t border-neutral-700 pt-4">
                <p className="font-semibold text-neutral-100 text-md">
                  {testimonial.name}
                </p>
                <p className="text-sm text-brand-pink/80">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
