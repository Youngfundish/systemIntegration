import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
app.use(express.json());


// Run: ssh -R funder.serveo.net:80:localhost:8080 serveo.net

// MongoDB connection
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define webhook schema and model
const webhookSchema = new mongoose.Schema(
    {
      paymentID: String,
      webhook: String,
      status: {
        type: String,
        default: 'payment pending',
      },
    },
    { collection: 'registeredWebhooks' }
  );
  
  const Webhook = mongoose.model('Webhook', webhookSchema);
  
  // Endpoint to registerPayment a webhook
  app.post('/registerPayment', async (req, res) => {
    try {
      const paymentID = uuidv4();
      const {webhook} = req.body;
      const newWebhook = new Webhook({ paymentID, webhook });
      await newWebhook.save();
  
      const responseWebhook = {
        paymentID: newWebhook.paymentID,
        status: newWebhook.status,
        webhook: newWebhook.webhook,
      };
  
      res.json(responseWebhook);
    } catch (error) {
      console.error('Error registering webhook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint to delete a webhook
  app.delete('/delete', async (req, res) => {
    try {
      const {paymentID}  = req.body;
  
      const updatedWebhook = await Webhook.findOneAndUpdate(
        { paymentID},
        { status: 'deleting' },
        { new: true }
      );
  
      if (!updatedWebhook) {
        return res.status(404).json({ error: 'Webhook not found' });
      }
  
      await Webhook.deleteOne({ paymentID, webhook });
  
      res.json({ message: 'Webhook unregistered successfully' });
    } catch (error) {
      console.error('Error unregistering webhook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Endpoint to ping a specific webhook
app.post('/ping', async (req, res) => {
    try {
      const { webhook } = req.body;
      const registeredWebhook = await Webhook.findOne({ webhook });
  
      if (!registeredWebhook) {
        return res.status(404).json({ error: 'Webhook not found' });
      }
  
      try {
        const pingResponse = await fetch(registeredWebhook.webhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ping: true }),
          timeout: 10000,
        });
        const responseData = await pingResponse.json();
        res.json({
          message: 'Ping sent to webhook',
          webhook: registeredWebhook.webhook,
          response: responseData,
        });
      } catch (error) {
        console.error(`Error pinging webhook ${registeredWebhook.webhook}:`, error);
        res.status(500).json({ error: `Failed to ping webhook ${registeredWebhook.webhook}` });
      }
    } catch (error) {
      console.error('Error pinging webhook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint to update the status of a webhook
  app.post('/updateStatus', async (req, res) => {
    try {
      const { paymentID } = req.body;
  
      const webhook = await Webhook.findOne({ paymentID });
  
      if (!webhook) {
        return res.status(404).json({ error: 'Webhook not found' });
      }
  
      webhook.status = newStatus;
      await webhook.save();
  
      const notificationEndpoint = webhook.webhook;
      const notificationResponse = await fetch(notificationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentID: webhook.paymentID,
          newStatus: "Payment completed",
        }),
      });
  
      if (!notificationResponse.ok) {
        console.error('Failed to send notification');
        return res.status(500).json({ error: 'Failed to send notification' });
      }
  
      res.json({ message: 'Webhook status updated successfully' });
    } catch (error) {
      console.error('Error updating webhook status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Exposee server is running on port ${PORT}`);
  });