const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();

// CORS + JSON (mas ATENÇÃO: webhook vai usar RAW numa rota separada)
app.use(cors());
app.use(express.json());

// Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Supabase (SERVICE ROLE - só backend)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Health
app.get("/health", (_, res) => res.json({ ok: true }));

/**
 * 1) CREATE CHECKOUT SESSION
 * recebe: amount, packageName, userId
 */
app.post("/create-checkout-session", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Não autenticado" });
    }
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: "Token inválido" });
    }
    
    const userId = user.id;
    
    const { amount, packageName } = req.body;
    if (!amount || isNaN(Number(amount))) return res.status(400).json({ error: "amount inválido" });

    const amountNumber = Number(amount);

    // (Opcional mas recomendado) checar limite ANTES de cobrar:
    // Ajuste o nome da tabela conforme sua estrutura.
    // Ex.: purchases, compras, pacotes, etc.
    // Se você já tem isso via trigger/RLS, pode tirar esse bloco.
    const { count, error: countErr } = await supabase
      .from("purchases")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    if (countErr) console.warn("countErr:", countErr.message);
    if ((count || 0) >= 3) return res.status(403).json({ error: "Limite de 3 compras atingido." });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: packageName || `Pacote ${amountNumber}`,
            },
            unit_amount: amountNumber * 100,
          },
          quantity: 1,
        },
      ],
      // ✅ metadata é o coração do sistema:
      metadata: {
        user_id: userId,
        package_amount: String(amountNumber),
        package_name: packageName || `Pacote ${amountNumber}`,
      },
      success_url: `${process.env.SUCCESS_URL}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL}?cancel=true`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return res.status(500).json({ error: "Erro ao criar checkout", message: err.message });
  }
});

/**
 * 2) STRIPE WEBHOOK
 * IMPORTANTÍSSIMO: express.raw nessa rota
 */
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // ✅ evento principal para pagamento do Checkout:
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session?.metadata?.user_id;
      const amount = Number(session?.metadata?.package_amount || 0);
      const packageName = session?.metadata?.package_name || "Pacote";

      if (!userId) {
        console.error("Sem user_id na metadata. Abortando.");
        return res.status(200).json({ received: true });
      }

      // (Opcional) Checar limite novamente, pra segurança total:
      const { count } = await supabase
        .from("purchases")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId);

      if ((count || 0) >= 3) {
        console.warn("Usuário já tinha 3 compras, ignorando insert.");
        return res.status(200).json({ received: true });
      }

      // ✅ Salvar compra no banco (ajuste colunas conforme sua tabela real)
      const { error: insErr } = await supabase.from("purchases").insert({
        user_id: userId,
        package_name: packageName,
        amount: amount,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
        status: "active",
      });

      if (insErr) {
        console.error("Erro insert purchases:", insErr.message);
      } else {
        console.log("✅ Compra salva no Supabase:", userId, amount);
      }

      // Se você já tem lógica diária/percentual:
      // ✅ aqui é um bom lugar pra chamar uma RPC/função sua:
      // await supabase.rpc("ativar_pacote", { p_user_id: userId, p_amount: amount });

    }

    return res.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return res.status(500).send("Webhook handler failed");
  }
});

// Start
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`🔥 Server ON: http://localhost:${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
});
