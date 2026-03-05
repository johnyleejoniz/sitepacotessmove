import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

const PRICE_MAP: Record<
  string,
  { priceId: string; valor: number; limite: number }
> = {
  "100": {
    priceId: process.env.PRICE_PACOTE_100 as string,
    valor: 100,
    limite: 100,
  },
  "500": {
    priceId: process.env.PRICE_PACOTE_500 as string,
    valor: 500,
    limite: 1000,
  },
  "1000": {
    priceId: process.env.PRICE_PACOTE_1000 as string,
    valor: 1000,
    limite: 3000,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { user_id, pacote } = req.body;

    if (!user_id || !pacote || !PRICE_MAP[pacote]) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    if (!process.env.PUBLIC_BASE_URL) {
      return res.status(500).json({ error: "PUBLIC_BASE_URL não configurado" });
    }

    const { count, error: countErr } = await supabase
      .from("pacotes_usuario")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id)
      .eq("ativo", true);

    if (countErr) {
      console.error("Erro Supabase:", countErr);
      return res.status(500).json({ error: "Erro ao verificar pacotes ativos" });
    }

    if ((count ?? 0) >= 3) {
      return res
        .status(400)
        .json({ error: "Limite de 3 pacotes ativos atingido." });
    }

    const { priceId } = PRICE_MAP[pacote];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      client_reference_id: user_id,

      metadata: {
        user_id,
        pacote,
      },

      success_url: `${process.env.PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_BASE_URL}/cancel`,

      payment_method_types: ["card"],
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Erro checkout:", error);
    return res.status(500).json({
      error: error.message || "Erro inesperado no checkout",
    });
  }
}
