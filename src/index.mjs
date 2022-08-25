import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';

import * as dotenv from 'dotenv';
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

// fastify.post('/order', async(request, reply) => {
//     const
// })

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' });
});
