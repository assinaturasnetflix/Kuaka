// components/sections/HeroSection.tsx
"use client"; // Necessário para Framer Motion e R3F

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Canvas } from '@react-three/fiber';
import Laptop3D from '@/components/animations/Laptop3D'; // Criaremos este componente
import { Loader } from '@react-three/drei'; // Loader enquanto o modelo 3D carrega

const HeroSection = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-hidden px-6 pt-20 pb-10 lg:px-16">
      {/* Content */}
      <motion.div
        className="z-10 text-center lg:text-left lg:w-1/2 mb-10 lg:mb-0 lg:pr-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          Transforme Sua Visão em um Site Profissional em Moçambique
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Criamos websites rápidos, responsivos e otimizados que impulsionam o seu negócio no mercado moçambicano.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg shadow-lg">
            Pedir Orçamento Agora
          </Button>
        </motion.div>
      </motion.div>

      {/* 3D Animation */}
      <div className="w-full h-[300px] lg:h-auto lg:w-1/2 flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
           <ambientLight intensity={1.5} />
           <directionalLight position={[5, 5, 5]} intensity={1} />
           <Suspense fallback={<Loader />}>
             <Laptop3D />
           </Suspense>
           {/* <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} /> */} {/* Opcional: Controles e rotação */}
        </Canvas>
      </div>

      {/* Optional: Subtle background elements/shapes */}
      {/* <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full opacity-30 translate-x-1/4 translate-y-1/4 blur-2xl"></div> */}
    </section>
  );
};

export default HeroSection;
