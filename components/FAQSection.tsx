import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "O que é a PLR (Participação de Lucro Recorrente)?",
    answer: "É a sua chance de receber uma parte dos lucros gerados pela S-MOVE. Com base no desempenho da plataforma, distribuímos uma porcentagem dos ganhos para os detentores dos pacotes. É a forma mais direta de lucrar com o nosso crescimento coletivo."
  },
  {
    question: "Meu retorno de 200% é garantido?",
    answer: "O teto de 200% representa o potencial máximo de retorno sobre o seu pacote, através da PLR. Os pagamentos são variáveis e diários, dependendo do volume de corridas e do crescimento da plataforma. É um investimento de participação em um negócio real."
  },
  {
    question: "O que a Licença S-MOVE (Pacote 1.000) me permite fazer?",
    answer: "A licença transforma você em um representante oficial da S-MOVE na sua cidade. Você poderá abrir um ponto de apoio físico, realizar cadastros em massa de motoristas e passageiros, criar parcerias locais e ter fontes de receita adicionais, além de toda a participação nos lucros da plataforma."
  },
  {
    question: "Preciso participar ativamente para lucrar?",
    answer: "A PLR é uma forma de lucro passiva, baseada no sucesso da empresa. No entanto, os pacotes incluem treinamento de cadastros justamente para potencializar seus ganhos ativos através da construção da sua rede de afiliados, que é o outro pilar de ganhos da S-MOVE."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-cross-pattern py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center text-[#2DD4BF] mb-12">
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#0f172a] border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-600"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="text-[#2DD4BF] font-bold text-lg md:text-xl pr-4">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 shrink-0" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-gray-800/50 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;