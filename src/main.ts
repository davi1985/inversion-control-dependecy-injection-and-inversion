
import fastify from 'fastify';

const app  = fastify();

app.post('/checkout',() => {
  return {
    hello: 'JStack'
  };
});

app.listen({port: 3001}).then(() => console.log('> Server started at http://localhost:3001'));
