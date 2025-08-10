const { Client, GatewayIntentBits, Partials } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');

const TOKEN = process.env.BOT_TOKEN; // ناخذ التوكن من متغير بيئة

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

const app = express();
app.use(bodyParser.json());

app.post('/send-number', async (req, res) => {
  const { userId, number } = req.body;

  try {
    const user = await client.users.fetch(userId);
    await user.send(`📩 الرقم المُدخل هو: ${number}`);
    res.send({ success: true });
  } catch (error) {
    console.error('خطأ أثناء الإرسال:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

client.once('ready', () => {
  console.log(`✅ البوت شغّال باسم: ${client.user.tag}`);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 API شغّالة على المنفذ ${port}`);
  });
});

client.login(TOKEN);
