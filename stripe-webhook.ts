import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

const PRICE_MAP: Record<string, { valor: number; limite: number }> = {
  "100": { valor: 100, limite: 100 },
  "500": { valor: 500, limite: 1000 },
  "1000": { valor: 1000, limite: 3000 },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable)
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).send("Method Not Allowed");

  const sig = req.headers["stripe-signature"] as string;
  const rawBody = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      await supabase.from("pagamentos_pacotes").insert({
        user_id: session.metadata?.user_id,
        pacote: session.metadata?.pacote,
        stripe_event_id: event.id,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        payment_status: session.payment_status,
        payment_method_types: session.payment_method_types,
        amount: session.amount_total,
        currency: session.currency,
        raw: session,
      });
    }

    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object as Stripe.PaymentIntent;

      const { data: pagamento } = await supabase
        .from("pagamentos_pacotes")
        .select("*")
        .eq("stripe_payment_intent", intent.id)
        .maybeSingle();

      if (!pagamento) return res.status(200).json({ ok: true });

      await supabase
        .from("pagamentos_pacotes")
        .update({
          payment_status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_payment_intent", intent.id);

      await supabase.rpc("ativar_pacote_por_pagamento", {
        p_user_id: pagamento.user_id,
        p_pacote: pagamento.pacote,
        p_valor: PRICE_MAP[pagamento.pacote].valor,
        p_limite: PRICE_MAP[pagamento.pacote].limite,
        p_payment_intent: intent.id,
      });
    }

    if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object as Stripe.PaymentIntent;

      await supabase
        .from("pagamentos_pacotes")
        .update({
          payment_status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_payment_intent", intent.id);
    }

    return res.status(200).json({ received: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
