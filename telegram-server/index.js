const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');

const app = express();
const port = 8000; 

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true,
});


app.use(bodyParser.json());

app.use(cors());


app.post('/submitOrder', (req, res) => {
  const { name, phoneNumber, city, totalFinalPrice, products } = req.body;

  const productInfo = products
    .map((product) => `${product.name}: ${product.count} шт.`)
    .join('\n');
  const message = `Новый заказ!\nИмя: ${name}\nНомер телефона: ${phoneNumber}\nГород: ${city}\n\nТовары:\n${productInfo}\n\nСумма заказа: ${totalFinalPrice}р.`;


  bot.sendMessage(process.env.TELEGRAM_ID, message); 

  res.send('Заказ отправлен в Telegram!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
