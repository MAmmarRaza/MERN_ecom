const express = require('express');
const paypal = require('paypal-rest-sdk');
const paymentRouter = express.Router();
const stripe = require('stripe')('sk_test_51Nc2OOLGRkNtZORN9Anzetah9AzIheGGqssYQ58U6NOp5Dennc0IJcLt2fuAnePVEmhGQ1iYbxoOsDLvyTv7KcGC00gPy7JTPk');


const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;

paypal.configure({
  'mode': PAYPAL_MODE, //sandbox or live
  'client_id': PAYPAL_CLIENT_KEY,
  'client_secret': PAYPAL_SECRET_KEY
});

paymentRouter.get('/productpage',async(req,res)=>{

    try {
        
        res.render('productpage');

    } catch (error) {
        console.log(error.message);
    }

});

paymentRouter.post('/payment', async (req, res) => {
    try {
      const creditCardData = {
        number: "4111111111111111",
        type: "visa",
        expire_month: "12",
        expire_year: "2023",
        cvv2: "123",
        first_name: "John",
        last_name: "Doe",
      };
  
      paypal.creditCard.create(creditCardData, function (error, creditCard) {
        if (error) {
          console.error("Error creating credit card:", error.message);
          console.error("PayPal API response status code:", error.httpStatusCode);
          return res.status(500).json({ message: "Error processing payment" });
        } else {
          const paymentData = {
            intent: "sale",
            payer: {
              payment_method: "credit_card",
              funding_instruments: [
                {
                  credit_card_token: {
                    credit_card_id: creditCard.id,
                    external_customer_id: creditCard.external_customer_id,
                  },
                },
              ],
            },
            transactions: [
              {
                amount: {
                  currency: "USD",
                  total: "1.00",
                },
                description: "Hat for the best team ever",
              },
            ],
          };
  
          paypal.payment.create(paymentData, function (error, payment) {
            if (error) {
              console.error("Error creating payment:", error.message);
              console.error("PayPal API response status code:", error.httpStatusCode);
              return res.status(500).json({ message: "Error processing payment" });
            } else {
              const paymentId = payment.id;
              return res.json({ paymentId });
            }
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  });
  

  paymentRouter.post('/success', async(req,res)=>{

    try {
        
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.status(200).json({paymentId});

            }
        });

    } catch (error) {
        console.log(error.message);
    }

});

paymentRouter.post('/cancel', async(req,res)=>{

    try {

        res.status(500).json({page:"cancel"});

    } catch (error) {
        console.log(error.message);
    }

});

// Payment route
paymentRouter.post('/create-payment-intent', async (req, res) => {
    try {
      // Retrieve the amount, currency, and credit card details from the request body
      const { amount, currency, token } = req.body;
  
      // Create a PaymentIntent with the given amount, currency, and payment_method_data
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        payment_method: token
      });
  
      // Send the client secret to the front-end
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      // Handle errors
      res.status(500).json({ error: err.message });
    }
  });

module.exports = paymentRouter;