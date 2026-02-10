import React from 'react';

const IntroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-4xl font-bold leading-snug">
          Você já usa aplicativos de transporte.<br />
          <span className="text-blue-200">Você já indica serviços que gosta.</span>
        </h2>
        
        <p className="text-lg md:text-xl font-medium text-blue-100 italic">
          Mas... quando foi a última vez que você <span className="text-yellow-400 font-bold bg-blue-800/50 px-1">recebeu uma fatia do lucro</span> por isso?
        </p>
        
        <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 mt-8">
          <p className="text-base md:text-lg leading-relaxed">
            A <span className="text-yellow-400 font-bold">S-MOVE</span> nasceu para mudar essa regra. Nossa plataforma de mobilidade já transforma usuários em afiliados, gerando <span className="text-green-400 font-bold">renda passiva através da rede</span>.
          </p>
          <p className="text-base md:text-lg leading-relaxed mt-4">
            Agora, estamos dando o próximo passo. Estamos abrindo as portas para você se tornar mais do que um afiliado.
          </p>
          <p className="text-xl md:text-2xl font-bold mt-6 text-yellow-400 uppercase">
            Estamos convidando você para ser <span className="underline decoration-wavy underline-offset-4">nosso sócio</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;