// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // Se usar tema dark/light

const inter = Inter({ subsets: ["latin"] });

// SEO Metadata - IMPORTANTE!
export const metadata: Metadata = {
  title: "Criação de Sites Profissionais em Moçambique | Sua Agência Web",
  description: "Criamos sites rápidos, modernos e otimizados para SEO em Moçambique. Blogs, sites corporativos, lojas online e landing pages. Preços em Meticais. Peça seu orçamento!",
  keywords: ["criação de sites moçambique", "web design maputo", "sites baratos moçambique", "loja online moçambique", "landing page moçambique", "agência web moçambique", "meticais", "MZN"],
  // Adicione outras tags meta se necessário (Open Graph, etc.)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-MZ" suppressHydrationWarning> {/* Lang para Moçambique */}
      <body className={inter.className}>
         {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
            {children}
         {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
