import axios from 'axios';
import { config } from 'dotenv';
import express from 'express';

config();
const app = express();

const TELEGRAM_URI = `https://api.telegram.org/bot5904267648:AAEDPlDuSIPLcHYXGyR7CQYzFg4pLKw-7GQ/sendMessage`;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', async (req, res) => {
  return res.send('ololo');
});

app.post('/new-message', async (req, res) => {
  console.log(req, 'req');
  const { message } = req.body;

  const messageText = message?.text?.toLowerCase()?.trim();
  const chatId = message?.chat?.id;
  if (!messageText || !chatId) {
    return res.sendStatus(400);
  }

  let responseText = 'I have nothing to say.';
  if (messageText === 'joke') {
    try {
      responseText = 'joke';
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  }

  // send response
  try {
    await axios.post(TELEGRAM_URI, {
      chat_id: chatId,
      text: responseText,
    });
    res.send('Done');
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
