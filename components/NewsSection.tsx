import React from 'react';
import { Search, Menu } from 'lucide-react';

const NewsSection: React.FC = () => {
  return (
    <section className="bg-white pb-16">
      {/* Mock Header G1 */}
      <div className="w-full bg-[#C4170C] text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center h-12 px-4 text-[10px] md:text-xs font-bold tracking-tighter">
             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1 cursor-pointer">
                     <Menu className="w-4 h-4" />
                     <span>MENU</span>
                 </div>
                 <div className="text-xl md:text-2xl font-black italic tracking-tighter ml-2">g1</div>
             </div>
             <div className="text-center hidden sm:block font-normal tracking-widest uppercase text-[10px]">
                 TECNOLOGIA
             </div>
             <div className="flex items-center gap-2">
                 <Search className="w-4 h-4" />
                 <span className="hidden sm:inline">BUSCAR</span>
             </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
          Número de motoristas cresce 70% e entregadores em app tem alta de 18%
        </h2>
        
        <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed border-l-4 border-[#C4170C] pl-4 md:pl-6">
          <p>
            O número de motoristas que trabalham por meio de <span className="italic">aplicativos para transporte de passageiros</span> cresceu 35% no período de 2022 a 2025 no Brasil, enquanto entregadores tiveram uma alta de 18%.
          </p>
          <p className="font-semibold text-gray-900">
            São mais de 1,7 milhão de motoristas e 455,6 mil entregadores, <span className="font-normal">totalizando 2,2 milhões de pessoas nessa categoria.</span>
          </p>
          <p>
            A jornada média dos motoristas é, em média, de 19 a 27 horas semanais nos aplicativos, enquanto a jornada dos entregadores oscila entre 9 e 13 horas semanais.
          </p>
          <p>
            Segundo a pesquisa, em média os motoristas atuam cerca de três dias por semana nos aplicativos, enquanto entre os entregadores a média é de quatro dias por semana.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;