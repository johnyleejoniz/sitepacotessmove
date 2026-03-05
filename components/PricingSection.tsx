import React from "react";
import { supabase } from "../supabaseClient";

type Pacote = "100" | "500" | "1000";

const PricingSection: React.FC = () => {
  const handleCheckout = async (pacote: Pacote) => {
    try {
      // Pega o usuário logado (id)
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw userErr;

      const user_id = userData.user?.id;
      if (!user_id) {
        alert("Usuário não autenticado.");
        return;
      }

      // ✅ URL correta para PRODUÇÃO no Vercel:
      // chama sua função serverless em /api/create-checkout-session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, pacote }),
      });

      const dataResponse = await response.json();

      if (!response.ok) {
        alert(dataResponse.error || "Erro ao criar sessão.");
        return;
      }

      // Redireciona para Stripe Checkout
      window.location.href = dataResponse.url;
    } catch (error) {
      console.error("Erro no checkout:", error);
      alert("Erro inesperado.");
    }
  };

  return (
    <section>
      <h2>Escolha seu pacote</h2>

      <div>
        <button onClick={() => handleCheckout("100")}>Comprar 100</button>
      </div>

      <div>
        <button onClick={() => handleCheckout("500")}>Comprar 500</button>
      </div>

      <div>
        <button onClick={() => handleCheckout("1000")}>Comprar 1000</button>
      </div>
    </section>
  );
};

export default PricingSection;
