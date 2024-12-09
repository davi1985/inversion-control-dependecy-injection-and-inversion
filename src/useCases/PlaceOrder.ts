import { Order } from '../entities/Order';
import { SESGateway } from '../gateways/SESGateway';
import { SQSGateway } from '../gateways/SQSGateway';
import { DynamoOrdersRepository } from '../repository/DynamoOrdersRepository';

export class PlaceOrder {
  async execute() {
    const customerEmail = 'davisilvaphoto@gmail.com';
    const amount = Math.ceil(Math.random() * 1000);
    const order = new Order(customerEmail, amount);
    const dynamoOrdersRepository = new DynamoOrdersRepository();
    const sqsGateway = new SQSGateway();
    const sesGateway = new SESGateway();

    await dynamoOrdersRepository.create(order);
    await sqsGateway.publishMessage({ orderId: order.id });
    await sesGateway.sendEmail({
      from: 'JStoe <noreplay@mateus.dev.br>',
      to: [customerEmail],
      subject: `Pedido #${order.id} confirmado.`,
      html: `
        <h1>E ai Davi!</h1>
        <p>Passando aqui só avisar que o seu pedido já foi confirmado e em breve você receberá a confirmação do pagamento e a nota fiscal aqui no seu e-mail.</p>

        <small>{{ tabela com os itens do pedido }}</small>`,
    });

    return { orderId: order.id };
  }
}
