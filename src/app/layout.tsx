import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Caçador de Rosas V1 - Maximize seus Lucros no Aviator",
  description: "A estratégia definitiva para identificar e lucrar com as velas rosas (10x+) no Aviator. Domine o jogo agora!",
  // Adicione meta tags OG e Twitter aqui se desejar
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${poppins.className} bg-page-bg-gradient text-neutral-200 antialiased selection:bg-brand-pink selection:text-neutral-950 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
