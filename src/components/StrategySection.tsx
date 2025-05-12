import { motion } from 'framer-motion';

// Ícone de avião estilizado (Exemplo)
const AviatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-brand-pink inline-block mr-2">
    <path d="M12.001 2.25a2.251 2.251 0 00-2.095 1.503L6.51 9.517a1.5 1.5 0 00-.243.77l-.971 4.853A2.25 2.25 0 007.54 17.99l4.46-1.593a.75.75 0 01.624.02L16.46 17.99a2.25 2.25 0 002.244-2.849l-.97-4.853a1.5 1.5 0 00-.244-.77L14.096 3.753A2.251 2.251 0 0012.001 2.25zm3.903 9.709L14.07 8.142a.75.75 0 00-1.322-.013l-2.162 4.325-3.53-1.26a.75.75 0 00-.9.393L5.09 14.738a.75.75 0 00.748.95l3.497-.999a.75.75 0 01.716.15L12 16.568l1.94-1.734a.75.75 0 01.716-.15l3.497.999a.75.75 0 00.748-.95l-1.066-3.152a.75.75 0 00-.9-.393l-1.83.655z" />
  </svg>
);

const StrategySection = () => {
  const content = {
    title: "A Estratégia <span class='text-brand-pink'>Definitiva</span> para Dominar o Aviator",
    description: "Caçador de Rosas V1 é a estratégia definitiva para quem quer maximizar lucros no Aviator ✈️💰. Focada nas velas rosas (10x ou mais) 🌹🔥, ela ensina a identificar os melhores momentos para apostar e aplicar táticas de risco controlado ⚖️🎯. Com gestão de banco eficiente 📊 e horários ideais ⏰, essa estratégia vai transformar suas apostas em vitórias consistentes 🏆. Domine o Aviador e comece a caçar as melhores velas rosas agora! 🚀🌹",
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-neutral-900/70 backdrop-blur-sm relative overflow-hidden">
       {/* Elemento decorativo de fundo */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-pink/10 rounded-full filter blur-3xl opacity-50 animate-pulseGlow animation-delay-2000"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-brand-purple/10 rounded-full filter blur-3xl opacity-50 animate-pulseGlow"></div>

      <motion.div
        className="container mx-auto max-w-3xl text-center relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 text-neutral-50 leading-tight"
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: content.title.replace('Aviator', `<span class="inline-block"><AviatorIcon />Aviator</span>`) }}
        />
        <motion.p
          className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-10"
          variants={itemVariants}
        >
          {content.description}
        </motion.p>

        {/* Linha Ascendente Estilizada */}
        <motion.div
          className="mt-12 h-1.5 w-32 md:w-48 mx-auto rounded-full"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: ['0rem', '8rem', '12rem'], opacity: 1 }} // w-32, w-48
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: "circOut", times: [0, 0.7, 1] }}
        >
          <div className="w-full h-full bg-gradient-to-r from-brand-pink via-brand-purple to-brand-pink animate-gradientShift bg-[length:200%_auto] rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StrategySection;
