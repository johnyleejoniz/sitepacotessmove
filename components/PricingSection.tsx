import React from 'react';
import { Check } from 'lucide-react';
import { PackageItem } from '../types';

const packages: PackageItem[] = [
  {
    name: 'PACOTE 100',
    price: '100',
    description: 'O Pacote 100 concede ao usuário uma licença de acesso inicial à plataforma SMOVE.',
    image: 'https://picsum.photos/id/183/600/400', // Abstract/Car related
    features: [
      'Acesso ao sistema e área do usuário',
      'Uso das ferramentas digitais da plataforma',
      'Acesso a materiais de treinamento básico',
      'Direito de participação no programa de afiliados S-MOVE',
      'Possibilidade de receber comissões sobre vendas diretas de serviços e produtos da plataforma, conforme plano comercial vigente',
      'Este pacote não configura investimento financeiro. Os ganhos estão condicionados exclusivamente ao desempenho individual em vendas e indicações.'
    ]
  },
  {
    name: 'PACOTE 500',
    price: '500',
    description: 'O Pacote 500 concede ao usuário uma licença profissional de uso da plataforma SMOVE, incluindo todos os benefícios do Pacote 100.',
    isPopular: true,
    image: 'https://picsum.photos/id/1071/600/400', // Car/Steering wheel
    features: [
      'Acesso a treinamentos avançados',
      'Acesso a grupos exclusivos de suporte e mentoria',
      'Ferramentas ampliadas para divulgação e gestão de equipe',
      'Participação no programa de afiliados em nível profissional',
      'Elegibilidade para comissões diferenciadas sobre a comercialização dos serviços e produtos da S-MOVE, conforme regras do plano comercial',
      'Este pacote não representa aplicação financeira. Não há garantia de retorno. Os resultados dependem exclusivamente do esforço, dedicação e capacidade comercial do usuário.'
    ]
  },
  {
    name: 'PACOTE 1.000',
    price: '1.000',
    description: 'O Pacote 1.000 concede ao usuário uma licença master de uso da plataforma SMOVE, incluindo todos os benefícios dos pacotes anteriores.',
    image: 'https://picsum.photos/id/1033/600/400', // Urban/Business
    features: [
      'Permissão para atuação como operador licenciado da marca S-MOVE',
      'Acesso a treinamentos estratégicos e gestão de rede',
      'Prioridade em recursos de expansão regional',
      'Ferramentas completas de gestão comercial',
      'Participação máxima no programa de afiliados e comissionamento da SMOVE, conforme plano comercial vigente',
      'Este pacote caracteriza-se como licença de uso de software e modelo de negócio. Não constitui investimento, título de capitalização, valor mobiliário ou promessa de rentabilidade.'
    ]
  }
];

const PricingSection: React.FC = () => {
  return (
    <section className="bg-black py-20 px-4 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-cross-pattern opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-12">
          Escolha Sua Participação na <span className="text-yellow-400">S-MOVE</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col h-full bg-[#0a0f1c] rounded-2xl overflow-hidden border ${pkg.isPopular ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)] scale-105 z-10' : 'border-gray-800'} transition-transform duration-300 hover:scale-[1.02]`}
            >
              {pkg.isPopular && (
                <div className="bg-yellow-400 text-black font-bold text-center py-1 text-sm uppercase tracking-wider">
                  Mais Popular
                </div>
              )}

              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover opacity-60"
                />
                <h3 className="absolute bottom-4 left-0 right-0 text-center text-2xl font-black text-white z-20 uppercase tracking-wider drop-shadow-md">
                  {pkg.name}
                </h3>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-400 text-sm mb-6 h-12">
                  {pkg.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto text-center">
                  <div className="flex items-baseline justify-center text-white mb-6">
                    <span className="text-2xl font-bold text-yellow-400">R$</span>
                    <span className="text-5xl font-black text-yellow-400 ml-1">{pkg.price}</span>
                  </div>

                  <button className={`w-full py-4 rounded-full font-bold uppercase tracking-wide transition-colors ${pkg.isPopular ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}>
                    Quero o {pkg.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aviso Legal */}
        <div className="mt-16 max-w-3xl mx-auto border border-gray-800 rounded-lg p-6 bg-[#0a0f1c]/80">
          <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-3">⚠ Aviso Legal</h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            A S-MOVE é uma plataforma de tecnologia e serviços. A aquisição de qualquer pacote refere-se exclusivamente à licença de uso do sistema, acesso a treinamentos e participação no programa de afiliados. Não se trata de investimento financeiro. Não há promessa, garantia ou projeção de ganhos. Os resultados dependem exclusivamente do desempenho individual de cada usuário.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;