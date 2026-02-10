import React from 'react';
import { ShieldCheck, Headphones, Lock } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-cross-pattern text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
      {/* Background Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
          A Mobilidade da Sua Cidade<br />
          <span className="text-[#2DD4BF] text-4xl md:text-6xl drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">
            Vai Gerar Lucro!
          </span>
        </h1>

        <p className="text-[#2DD4BF] text-xl font-bold uppercase tracking-wider">
          Esse lucro pode ser seu.
        </p>

        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Descubra como se tornar um sócio da revolução S-MOVE.
        </p>

        <p className="font-bold text-white text-lg mt-4">
          ASSISTA AGORA: O plano para transformar o transporte em fonte de renda.
        </p>

        {/* Vimeo Video Player */}
        <div className="w-full max-w-3xl mx-auto mt-8 rounded-lg overflow-hidden shadow-2xl border-2 border-gray-800">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1141331837?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="smove-video.mp4"
            />
          </div>
        </div>

        {/* Main CTA */}
        <div className="pt-8">
          <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-black text-lg md:text-2xl py-4 px-8 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all transform hover:-translate-y-1 uppercase w-full md:w-auto">
            Quero escolher meu pacote agora!
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-6 text-xs md:text-sm text-gray-300 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2DD4BF]" />
            <span>Garantia de 07 dias</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-[#2DD4BF]" />
            <span>Suporte 48 horas úteis</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#2DD4BF]" />
            <span>Compra Segura</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;