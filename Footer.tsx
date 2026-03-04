import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-500 py-8 text-center text-sm border-t border-gray-800">
      <p>&copy; {new Date().getFullYear()} S-MOVE. Todos os direitos reservados.</p>
      <div className="flex justify-center gap-4 mt-4">
        <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
        <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
      </div>
    </footer>
  );
};

export default Footer;