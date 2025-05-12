import Image from 'next/image';
import { motion } from 'framer-motion';

const LogoSection = () => {
  return (
    <motion.div
      className="relative flex justify-center items-center pt-12 pb-8 md:pt-16 md:pb-10"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "circOut" }}
    >
      {/* Efeito de brilho radial sutil atrás do logo */}
      <div className="absolute inset-0 bg-gradient-radial-hero z-0"></div>

      <div className="relative z-10"> {/* Garante que o logo fique acima do brilho */}
        <Image
          src="/logo.png"
          alt="Caçador de Rosas V1 Logo"
          width={280} // Aumentei um pouco, ajuste conforme sua logo
          height={90} // Ajuste conforme sua logo
          priority
          className="max-w-[220px] md:max-w-[280px] h-auto drop-shadow-lg"
        />
      </div>
    </motion.div>
  );
};

export default LogoSection;
