import fastify from 'fastify';
import { PlaceOrder } from './useCases/PlaceOrder';

const app = fastify();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

app.post('/orders', async (request, reply) => {
  const placeOrder = new PlaceOrder();
  await delay(1000);
  const { orderId } = await placeOrder.execute();

  reply.status(201).send({ orderId });
});

app
  .listen({ port: 3001 })
  .then(() => console.log('> Server started at http://localhost:3001'));
