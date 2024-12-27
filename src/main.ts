import 'reflect-metadata';
import './di/container';

import fastify from 'fastify';

import { container } from './di/container';
import { PlaceOrder } from './useCases/PlaceOrder';

const app = fastify();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

app.post('/orders', async (_, reply) => {
  const placeOrder = container.resolve<PlaceOrder>('PlaceOrder');

  await delay(1000);
  const { orderId } = await placeOrder.execute();

  reply.status(201).send({ orderId });
});

app
  .listen({ port: 3001 })
  .then(() => console.log('> Server started at http://localhost:3001'));
