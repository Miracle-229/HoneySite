    const express = require('express');
    const bodyParser = require('body-parser');
    const TelegramBot = require('node-telegram-bot-api');
    const cors = require('cors');

    const app = express();
    const port = 8000; // Задайте свой порт

    // Создайте экземпляр бота с вашим токеном
    const bot = new TelegramBot('6733904937:AAGhYuBRc3WyV6Wj85cc-D0xsauAJVMMafI', {
    polling: true,
    });

    // Разрешите приложению парсить данные формы
    app.use(bodyParser.json());

    app.use(cors());

    // Обработка POST-запроса с данными из модального окна
    app.post('/submitOrder', (req, res) => {
    const { name, phoneNumber, city, totalFinalPrice, products } = req.body;

    const productInfo = products.map(product => `${product.name}: ${product.count} шт.`).join('\n');
    const message = `Новый заказ!\nИмя: ${name}\nНомер телефона: ${phoneNumber}\nГород: ${city}\n\nТовары:\n${productInfo}\n\nСумма заказа: ${totalFinalPrice}р.`;


    // Отправьте сообщение в чат бота
    bot.sendMessage('912715586', message); // Замените YOUR_CHAT_ID на идентификатор чата

    // Здесь вы можете добавить логику обработки заказа и отправки подтверждения обратно в ваше веб-приложение

    res.send('Заказ отправлен в Telegram!');
    });

    app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
    });
