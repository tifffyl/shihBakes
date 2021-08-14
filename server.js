if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(express.json())
app.use(express.static("public"))


//stripe stuff

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 120, name: "Pineapple Cake" }],
  [2, { priceInCents: 280, name: "Egg Yolk Pastry" }],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

const indexRouter = require('./routes/index') //reference to index router

app.set('view engine', 'ejs') //sets what view engine is being used   
app.set('views', __dirname + '/views') //tell where views are
app.set('layout', 'layouts/layout') //tell where layouts are
app.use(expressLayouts) //tell express application to use 
app.use(express.static('public'))//tell express where public files are (html, css javascript)

const mongoose = require('mongoose') //set up mongoDB data base
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }) //setting up and connecting mongodb within the appliation
const db = mongoose.connection 
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

app.use('/', indexRouter) //index router handling the root

app.listen(process.env.PORT || 3000) //location of server is stored in variable PORT, and if not, just on localhost port 3000

