import { fastify } from './index.mjs';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
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
