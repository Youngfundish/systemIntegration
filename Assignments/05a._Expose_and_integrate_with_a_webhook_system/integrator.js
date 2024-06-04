import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const webhookUrl = 'http://localhost:3000/webhook'; // URL'en på din integrator-server
const exposeeUrl = 'https://funder.serveo.net/registerPayment'; // URL'en til registerPayment endpoint på exposee-serveren
const pingUrl = 'https://funder.serveo.net/ping'; // URL'en til ping endpoint på exposee-serveren

// Endpoint to register webhook
app.post('/registerWebhook', async (req, res) => {
  try {
    const response = await fetch(exposeeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webhook: webhookUrl,
      }),
    });

      const responseData = await response.json();
      res.json({ message: 'Webhook registered successfully', data: responseData });

  } catch (error) {
    console.error('Error registering webhook:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to receive webhook calls
app.post('/webhook', (req, res) => {
    console.log('Received webhook:', req.body);
    res.status(200).json({ message: 'Webhook received' });
  });

// Endpoint to ping the registered webhook
app.post('/pingWebhook', async (req, res) => {
    try {
      const response = await fetch(pingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webhook: webhookUrl,
        }),
      });
        const responseData = await response.json();
        res.json({ message: 'Ping sent to webhook', data: responseData });
    } catch (error) {
      console.error('Error pinging webhook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Integrator server is running on port ${PORT}`);
});