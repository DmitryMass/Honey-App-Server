import { fastify } from './index.mjs';
import * as models from './Models/Order.mjs';
import * as dotenv from 'dotenv';
import sequelize from './db.mjs';
dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await fastify
      .listen({
        port: PORT,
        host: '0.0.0.0',
      })
      .then(() => console.log(PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
