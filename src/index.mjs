import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';

import * as dotenv from 'dotenv';
import { UserOrder } from './Models/Order.mjs';
import { UserQuestionMail } from './Models/Questions.mjs';
import { transporter } from './senderMail.mjs';
import {
  mainValidationSchema,
  questionValidationSchema,
} from './ValidationScheme/validation.mjs';
dotenv.config();

export const fastify = Fastify({ logger: true });

fastify.register(fastifyCors);
fastify.register(fastifyCookie, {
  secret: process.env.MY_SECRET,
  parseOption: {},
});
fastify.register(fastifyMultipart, {
  addToBody: true,
  preservePath: true,
});

fastify.post('/api/order', mainValidationSchema, async (request, reply) => {
  const {
    body: { email, name, amount, container, message },
  } = request;

  try {
    const order = await UserOrder.create({
      email,
      name,
      amount,
      container,
      message,
    });
    await order.save();

    const mailForUser = {
      from: 'yourhoneyparadise@gmail.com',
      to: email,
      subject: 'HP: Дякуємо за замовлення.',
      text: 'Дякуємо за замовлення. Очікуйте на повідомлення або дзвінок. Гарного та безпечного вам Дня! ',
    };
    const mailForAdmin = {
      from: 'yourhoneyparadise@gmail.com',
      to: 'yourhoneyparadise@gmail.com',
      subject: `Клієнт ${email} - ${name} зробив замовлення.`,
      text: `Замовлення: ${amount} - ${container}. Доповнення: ${message}`,
    };

    transporter.sendMail(mailForUser);
    transporter.sendMail(mailForAdmin);
    return reply.send({ info: 'Дякуємо за замовлення!' });
  } catch (err) {
    return reply.status(400).send({
      info: 'Вибачте сервер не працює, бджілки трохи втомилися, намагаємося їх підбадьорити',
    });
  }
});

fastify.post(
  '/api/questions',
  questionValidationSchema,
  async (request, reply) => {
    const {
      body: { email },
    } = request;
    const question = await UserQuestionMail.create({
      email,
    });
    await question.save();

    const adminAlert = {
      from: 'yourhoneyparadise@gmail.com',
      to: 'yourhoneyparadise@gmail.com',
      subject: `Користувач ${email} має питання.`,
      text: `Не забудь відповісти цьому користувачу ${email}`,
    };

    const userAlert = {
      from: 'yourhoneyparadise@gmail.com',
      to: email,
      subject: `Зворотній зв'язок.`,
      text: `Доброго дня! Ми отримали ваше повідомлення, очікуйте зворотній звязок протягом двух годин. Дякуємо за довіру !`,
    };

    transporter.sendMail(adminAlert);
    transporter.sendMail(userAlert);

    return reply.send({ info: 'Чекайте повідомлення.' });
  }
);

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' });
});
