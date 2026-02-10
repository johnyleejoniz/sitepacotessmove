import React from 'react';
import { MessageCircle } from 'lucide-react';

const SupportSection: React.FC = () => {
  return (
    <section className="bg-amber-200 py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
          Alguma dúvida até aqui?
        </h2>
        <p className="text-gray-800 text-lg mb-8 font-medium">
          É só clicar no botão abaixo e chamar nossa equipe comercial
        </p>

        <a 
          href="#" 
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-lg md:text-xl py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          <MessageCircle className="w-8 h-8 fill-current" />
          FALE COM NOSSO TIME COMERCIAL NO WHATSAPP
        </a>
      </div>
    </section>
  );
};

export default SupportSection;