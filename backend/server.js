require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.post('/payment', cors(), async (req, res) => {
  const { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'CAD',
      description: 'Payment for development',
      payment_method: id,
      confirm: true
    });

    console.log('Payment: ', payment);
    res.json({
      message: 'Payment was successful',
      success: true
    });
  } catch (error) {
    console.log('Error: ', error);
    res.json({
      message: 'Payment failed',
      success: false
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});