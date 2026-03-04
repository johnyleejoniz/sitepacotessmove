require('dotenv').config()

const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

console.log("DEBUG STRIPE KEY:", stripeSecretKey)

if (!stripeSecretKey) {
  console.error("❌ STRIPE_SECRET_KEY NÃO FOI CARREGADA")
  process.exit(1)
}

const stripe = new Stripe(stripeSecretKey)

const app = express()
app.use(cors())
app.use(express.json())

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { price } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: `Pacote ${price}` },
            unit_amount: Number(price) * 100,
          },
          quantity: 1,
        },
      ],
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(process.env.PORT || 4242, () => {
  console.log("🔥 Server rodando")
})