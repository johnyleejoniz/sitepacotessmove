import React, { useState } from "react";
import { supabase } from "../supabaseClient";

type Pacote = "100" | "500" | "1000";

type Package = {
  pacote: Pacote;
  titulo: string;
  precoLabel: string;
  descricao: string;
  beneficios: string[];
  popular?: boolean;
};

const PACKAGES: Package[] = [
  {
    pacote: "100",
    titulo: "PACOTE 100",
    precoLabel: "R$ 100",
    descricao: "O ponto de partida para lucrar com a mobilidade urbana.",
    beneficios: [
      "Suporte exclusivo para afiliados",
      "Acesso a treinamento de cadastros",
      "PLR: Participação de Lucro Recorrente",
      "Potencial de retorno de até 200% (variável diária)",
    ],
  },
  {
    pacote: "500",
    titulo: "PACOTE 500",
    precoLabel: "R$ 500",
    descricao: "Acelere seus ganhos e tenha acesso à nossa comunidade VIP.",
    beneficios: [
      "Todos os benefícios do Pacote 100",
      "Acesso ao nosso grupo VIP exclusivo",
      "PLR com maior potencial de ganho",
      "Potencial de retorno de até 200% (variável diária)",
    ],
    popular: true,
  },
  {
    pacote: "1000",
    titulo: "PACOTE 1.000",
    precoLabel: "R$ 1000",
    descricao: "A licença definitiva para ser um pioneiro S-MOVE em sua região.",
    beneficios: [
      "Todos os benefícios anteriores",
      "Licença Oficial da S-MOVE",
      "Permissão para espaço físico e digital",
      "Torne-se uma autoridade local e maximize seus lucros",
    ],
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const PricingSection: React.FC = () => {
  const [loadingPacote, setLoadingPacote] = useState<Pacote | null>(null);

  const handleCheckout = async (pacote: Pacote) => {
    try {
      setLoadingPacote(pacote);

      // Pega o usuário logado (se você exigir login)
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (!userId) {
        alert("Usuário não autenticado. Faça login antes de comprar.");
        return;
      }

      // ✅ Endpoint correto em produção na Vercel (NUNCA localhost)
      // Se seu arquivo estiver em /api/create-checkout-session.ts => rota será /api/create-checkout-session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          pacote, // "100" | "500" | "1000"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data?.error || "Erro ao criar sessão de checkout.");
        return;
      }

      if (!data?.url) {
        alert("Checkout não retornou URL.");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Erro no checkout:", err);
      alert("Erro inesperado no checkout.");
    } finally {
      setLoadingPacote(null);
    }
  };

  return (
    <section className="relative w-full py-16">
      {/* fundo com pontos / vibe dark */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#2b2b2b_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative mx-auto w-full max-w-6xl px-4">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Escolha Sua Participação na <span className="text-[#ffcc00]">S-MOVE</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PACKAGES.map((p) => {
            const isLoading = loadingPacote === p.pacote;

            return (
              <div
                key={p.pacote}
                className={cx(
                  "group relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1220] to-[#070b14]",
                  "p-6 md:p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
                  "transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
                  p.popular && "border-2 border-[#ffcc00] shadow-[0_0_0_1px_rgba(255,204,0,0.25)]"
                )}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ffcc00] px-4 py-1 text-xs font-extrabold tracking-wider text-black">
                    MAIS POPULAR
                  </div>
                )}

                <div className="overflow-hidden rounded-xl">
                  {/* “imagem” fake com gradiente (se quiser colocar imagem real, eu te digo como) */}
                  <div className="h-32 w-full rounded-xl bg-gradient-to-br from-white/10 to-white/0 transition duration-300 group-hover:scale-[1.02]" />
                </div>

                <h3 className="mt-5 text-center text-xl md:text-2xl font-extrabold text-white">
                  {p.titulo}
                </h3>

                <p className="mt-4 text-center text-sm text-white/70">
                  {p.descricao}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-white/85">
                  {p.beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                        ✓
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 text-center">
                  <div className="text-[#ffcc00] text-sm font-semibold">a partir de</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-[#ffcc00]">
                    {p.precoLabel}
                  </div>
                </div>

                <button
                  onClick={() => handleCheckout(p.pacote)}
                  disabled={isLoading}
                  className={cx(
                    "mt-6 w-full rounded-full px-6 py-4 font-extrabold uppercase tracking-wide",
                    "bg-[#19c37d] text-black",
                    "transition duration-300",
                    "hover:bg-[#22e08f] hover:shadow-[0_12px_40px_rgba(25,195,125,0.35)] hover:scale-[1.02]",
                    "active:scale-[0.99]",
                    "disabled:opacity-60 disabled:cursor-not-allowed"
                  )}
                >
                  {isLoading ? "CARREGANDO..." : `QUERO O ${p.titulo}`}
                </button>

                {/* brilho no hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
